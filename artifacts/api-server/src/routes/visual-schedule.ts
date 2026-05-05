import { Router, type IRouter } from "express";
import { openai, generateImageBuffer } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

router.post("/visual-schedule", async (req, res) => {
  try {
    const { description, childName } = req.body as { description?: string; childName?: string };
    if (!description || typeof description !== "string" || description.trim().length < 5) {
      return res.status(400).json({ error: "description_required" });
    }
    const name = (typeof childName === "string" && childName.trim()) || "الطفل";

    const planPrompt = `أنت مختص في تحليل السلوك التطبيقي (ABA) ومتخصص في أنظمة PECS البصرية لأطفال طيف التوحد.
حوّل وصف اليوم التالي إلى جدول بصري منظم. أعِد JSON بالشكل:
{
  "title": "عنوان قصير لليوم بالعربية الفصحى (مثل: يوم الأحد - يوم المدرسة)",
  "tasks": [
    {
      "time": "الوقت بصيغة 12 ساعة بالعربية (مثل: 7:00 ص)",
      "titleAr": "اسم النشاط بالعربية الفصحى المبسطة (كلمتين أو ثلاث)",
      "titleEn": "Activity name in simple English",
      "icon": "اسم رمز إيموجي مناسب يمثل النشاط (مثل: 🍳 🚌 📚 🍎 😴)",
      "duration": "المدة بالدقائق كرقم",
      "tip": "نصيحة قصيرة للأهل لتنفيذ هذا النشاط بنجاح مع طفل التوحد"
    }
  ]
}
- اجعل الجدول واقعياً ومناسباً لقدرات طفل التوحد.
- 6 إلى 10 أنشطة كحد أقصى.
- استخدم العربية الفصحى البسيطة.
- إذا لم يكن الوصف واضحاً، خمّن جدولاً يومياً معقولاً.
- أعد JSON فقط.

وصف اليوم: ${description}
اسم الطفل: ${name}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5.4",
      messages: [{ role: "user", content: planPrompt }],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return res.status(500).json({ error: "no_response" });

    let schedule: unknown;
    try {
      schedule = JSON.parse(content);
    } catch {
      return res.status(502).json({ error: "invalid_model_json" });
    }

    if (
      !schedule ||
      typeof schedule !== "object" ||
      typeof (schedule as { title?: unknown }).title !== "string" ||
      !Array.isArray((schedule as { tasks?: unknown }).tasks)
    ) {
      return res.status(502).json({ error: "invalid_schedule_shape" });
    }

    const rawTasks = (schedule as { tasks: unknown[] }).tasks;
    const tasks = rawTasks
      .filter((t): t is Record<string, unknown> => !!t && typeof t === "object")
      .map((t) => ({
        time: typeof t.time === "string" ? t.time : "—",
        titleAr: typeof t.titleAr === "string" ? t.titleAr : "نشاط",
        titleEn: typeof t.titleEn === "string" ? t.titleEn : "Activity",
        icon: typeof t.icon === "string" ? t.icon : "✨",
        duration:
          typeof t.duration === "number"
            ? t.duration
            : typeof t.duration === "string"
              ? Number.parseInt(t.duration, 10) || 15
              : 15,
        tip: typeof t.tip === "string" ? t.tip : "",
      }));

    if (tasks.length === 0) {
      return res.status(502).json({ error: "no_tasks_generated" });
    }

    return res.json({
      title: (schedule as { title: string }).title,
      tasks,
    });
  } catch (err) {
    req.log.error({ err }, "visual-schedule failed");
    const message = err instanceof Error ? err.message : "unknown";
    return res.status(500).json({ error: "processing_failed", detail: message });
  }
});

router.post("/visual-schedule/illustrate", async (req, res) => {
  try {
    const { taskTitle } = req.body as { taskTitle?: string };
    if (!taskTitle || typeof taskTitle !== "string" || taskTitle.length > 200) {
      return res.status(400).json({ error: "task_required" });
    }

    const prompt = `Simple flat vector illustration in PECS (Picture Exchange Communication System) style for an autism visual schedule card.
Subject: ${taskTitle}.
Style: clean modern flat illustration, friendly cartoon style, single subject centered on white background, bright cheerful colors (teal, soft yellow, warm beige), thick clean outlines, rounded shapes, no text, no words, no letters, child-friendly, similar to Boardmaker or LessonPix symbols. High clarity, instantly recognizable.`;

    const buffer = await generateImageBuffer(prompt, "1024x1024");

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=3600");
    return res.send(buffer);
  } catch (err) {
    req.log.error({ err }, "visual-schedule illustrate failed");
    return res.status(500).json({ error: "illustration_failed" });
  }
});

export default router;
