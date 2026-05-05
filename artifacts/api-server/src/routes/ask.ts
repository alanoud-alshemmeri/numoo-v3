import { Router, type IRouter } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

type ArticleRef = { id: string; title: string; summary: string };

function validateBody(body: unknown): { question: string; articles: ArticleRef[] } | null {
  if (!body || typeof body !== "object") return null;
  const b = body as { question?: unknown; articles?: unknown };
  if (typeof b.question !== "string" || b.question.trim().length < 2 || b.question.length > 500) {
    return null;
  }
  if (!Array.isArray(b.articles) || b.articles.length === 0 || b.articles.length > 80) {
    return null;
  }
  const articles: ArticleRef[] = [];
  for (const item of b.articles) {
    if (!item || typeof item !== "object") return null;
    const it = item as { id?: unknown; title?: unknown; summary?: unknown };
    if (typeof it.id !== "string" || typeof it.title !== "string" || typeof it.summary !== "string") {
      return null;
    }
    articles.push({ id: it.id, title: it.title, summary: it.summary });
  }
  return { question: b.question, articles };
}

router.post("/ask", async (req, res) => {
  try {
    const parsed = validateBody(req.body);
    if (!parsed) {
      return res.status(400).json({ error: "invalid_request" });
    }
    const { question, articles } = parsed;

    const catalog = articles
      .map((a: ArticleRef) => `[${a.id}] ${a.title}\n${a.summary}`)
      .join("\n\n");

    const systemPrompt = `أنت "نمو" — مساعد كويتي ودود لأمهات أطفال التوحد.
مهمتك: تجاوبين على سؤال الأم بناءً على مكتبة المقالات المعتمدة فقط.

قواعد صارمة:
- استخدمي المقالات المعطاة لج فقط. لا تخترعي معلومات.
- جاوبي بالعربية الفصحى المبسطة (سهلة الفهم) — لا لهجة، لا مصطلحات معقدة.
- الجواب قصير: 3-5 جمل فقط.
- إذا السؤال طبي بحت أو يطلب تشخيص، ذكّري الأم إن نمو ما يعطي تشخيص — التشخيص للمختص.
- إذا ما لقيتي إجابة في المقالات، قولي صراحة "ما عندي معلومة موثقة عن هذا في مكتبة نمو" واقترحي تستشير مختص.
- في النهاية، اختاري معرّفات المقالات (IDs) اللي اعتمدتي عليها فعلاً.

أعيدي JSON فقط بهذا الشكل:
{
  "answer": "إجابتك القصيرة الواضحة هنا",
  "citationIds": ["id1", "id2"],
  "needsSpecialist": false
}

اجعلي needsSpecialist=true فقط إذا السؤال يحتاج تدخل طبي عاجل أو تشخيص.`;

    const userPrompt = `سؤال الأم: ${question}

مكتبة المقالات المتاحة:
${catalog}

جاوبي بصيغة JSON فقط.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5.4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return res.status(500).json({ error: "no_response" });
    }
    const result = JSON.parse(content) as {
      answer?: string;
      citationIds?: string[];
      needsSpecialist?: boolean;
    };
    if (!result.answer) {
      return res.status(500).json({ error: "invalid_response" });
    }

    const validIds = new Set(articles.map((a: ArticleRef) => a.id));
    const citationIds = (result.citationIds || []).filter((id: string) =>
      validIds.has(id),
    );

    return res.json({
      answer: result.answer,
      citationIds,
      needsSpecialist: Boolean(result.needsSpecialist),
    });
  } catch (err) {
    req.log.error({ err }, "ask failed");
    const message = err instanceof Error ? err.message : "unknown";
    return res.status(500).json({ error: "processing_failed", detail: message });
  }
});

export default router;
