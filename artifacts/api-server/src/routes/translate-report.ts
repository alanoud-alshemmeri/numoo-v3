import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import multer from "multer";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();
const ALLOWED_MIMES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIMES.has(file.mimetype.toLowerCase())) cb(null, true);
    else cb(null, false);
  },
});

const uploadHandler = (req: Request, res: Response, next: NextFunction): void => {
  upload.single("image")(req, res, (err: unknown) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        res.status(413).json({ error: "file_too_large", limitMb: 10 });
        return;
      }
      res.status(400).json({ error: "upload_error", code: err.code });
      return;
    }
    if (err) {
      res.status(400).json({ error: "upload_error" });
      return;
    }
    next();
  });
};

router.post("/translate-report", uploadHandler, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "image_required_or_unsupported_type" });
    }
    const mime = (req.file.mimetype || "image/jpeg").toLowerCase();
    if (!ALLOWED_MIMES.has(mime)) {
      return res.status(415).json({ error: "unsupported_image_type" });
    }
    const b64 = req.file.buffer.toString("base64");
    const dataUrl = `data:${mime};base64,${b64}`;

    const systemPrompt = `أنت مساعد طبي خبير لعائلات أطفال التوحد في الكويت.
ستحلل صورة تقرير طبي (عربي أو إنجليزي) وتُخرج JSON صارم بالشكل التالي:
{
  "summary": "ملخص بسيط بالعربية الفصحى المبسطة (3-5 جمل) لما يقوله التقرير، بدون مصطلحات معقدة",
  "diagnoses": ["قائمة بالتشخيصات الرئيسية المذكورة، مكتوبة بالعربية"],
  "medications": [{"name": "اسم الدواء بالعربية ثم بالإنجليزية بين قوسين", "purpose": "لماذا يُستخدم هذا الدواء بلغة بسيطة"}],
  "keyTerms": [{"term": "المصطلح الطبي", "explanation": "شرح بسيط بكلمات يفهمها الأهل"}],
  "doctorQuestions": ["خمسة أسئلة مهمة يجب على الأهل سؤالها للطبيب بناءً على هذا التقرير"],
  "warnings": ["أي تنبيهات أو نقاط مهمة يجب الانتباه لها"]
}
- استخدم العربية الفصحى المبسطة، تجنّب المصطلحات الطبية المعقدة.
- إذا لم تكن الصورة تقريراً طبياً واضحاً، أعِد: {"error":"not_medical_report"}.
- لا تخترع معلومات غير موجودة في التقرير.
- أعد JSON فقط بدون أي نص إضافي.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5.4",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            { type: "text", text: "حلّل هذا التقرير الطبي وأعِد JSON كما هو مطلوب." },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return res.status(500).json({ error: "no_response" });
    }
    const parsed = JSON.parse(content);
    if (parsed.error === "not_medical_report") {
      return res.status(400).json({ error: "not_medical_report" });
    }
    return res.json(parsed);
  } catch (err) {
    req.log.error({ err }, "translate-report failed");
    const message = err instanceof Error ? err.message : "unknown";
    return res.status(500).json({ error: "processing_failed", detail: message });
  }
});

export default router;
