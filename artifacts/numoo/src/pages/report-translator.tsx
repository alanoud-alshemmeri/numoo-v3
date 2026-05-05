import { useRef, useState } from "react";
import { Layout } from "@/components/layout";
import { useLangStore } from "@/lib/lang-store";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Loader2,
  Sparkles,
  AlertCircle,
  Pill,
  HelpCircle,
  BookOpen,
  AlertTriangle,
  RotateCcw,
  Camera,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Result = {
  summary?: string;
  diagnoses?: string[];
  medications?: { name: string; purpose: string }[];
  keyTerms?: { term: string; explanation: string }[];
  doctorQuestions?: string[];
  warnings?: string[];
};

const TXT = {
  ar: {
    title: "مترجم التقارير الطبية",
    subtitle: "صوّري التقرير، نشرحه لكِ بالعربية المبسطة",
    chooseImage: "الرجاء اختيار صورة فقط",
    notMedical:
      "الصورة لا تبدو كتقرير طبي واضح. تأكدي من وضوح الصورة وحاولي مرة أخرى.",
    analyzeFailed: "تعذّر تحليل التقرير. حاولي مرة أخرى.",
    connection: "خطأ في الاتصال. تأكدي من الإنترنت.",
    translateBtn: "ترجم وحلّل",
    reading: "نقرأ التقرير ونحلله...",
    mayTake: "قد يستغرق 15-30 ثانية",
    uploadTitle: "ارفعي صورة التقرير الطبي",
    uploadDesc:
      "تقرير الطبيب، نتائج فحص، روشتة دواء — أي تقرير عربي أو إنجليزي",
    takePhoto: "صوّري التقرير",
    fromGallery: "من المعرض",
    noteLabel: "ملاحظة: ",
    noteText:
      "هذا التحليل توعوي ولا يستبدل استشارة الطبيب. لا تُحفظ الصور على الخادم.",
    summary: "الملخص بالعربية المبسطة",
    diagnoses: "التشخيصات",
    medications: "الأدوية",
    keyTerms: "مصطلحات مهمة",
    doctorQs: "أسئلة لطبيبكِ",
    warnings: "تنبيهات مهمة",
    another: "تقرير آخر",
    print: "طباعة",
    aiNote:
      "هذا التحليل توعوي بالذكاء الاصطناعي. الكلمة الأخيرة دائماً للطبيب.",
  },
  en: {
    title: "Medical Report Translator",
    subtitle: "Photograph your report, get a clear plain-language explanation",
    chooseImage: "Please choose an image only",
    notMedical:
      "This doesn't look like a clear medical report. Please make sure the image is clear and try again.",
    analyzeFailed: "Couldn't analyze the report. Please try again.",
    connection: "Connection error. Please check your internet.",
    translateBtn: "Translate & analyze",
    reading: "Reading and analyzing the report...",
    mayTake: "May take 15-30 seconds",
    uploadTitle: "Upload your medical report image",
    uploadDesc:
      "Doctor's report, test results, prescription — any Arabic or English document",
    takePhoto: "Take a photo",
    fromGallery: "From gallery",
    noteLabel: "Note: ",
    noteText:
      "This is educational analysis and does not replace your doctor's advice. Images are not stored on the server.",
    summary: "Plain-language summary",
    diagnoses: "Diagnoses",
    medications: "Medications",
    keyTerms: "Key terms",
    doctorQs: "Questions for your doctor",
    warnings: "Important warnings",
    another: "Another report",
    print: "Print",
    aiNote:
      "This is AI-powered educational analysis. The doctor always has the final say.",
  },
} as const;

export default function ReportTranslator() {
  const { lang } = useLangStore();
  const T = TXT[lang];
  const fileInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError(T.chooseImage);
      return;
    }
    setError(null);
    setResult(null);
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const translate = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch("/api/translate-report", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.error === "not_medical_report") {
          setError(T.notMedical);
        } else {
          setError(T.analyzeFailed);
        }
        return;
      }
      const data: Result = await res.json();
      setResult(data);
    } catch {
      setError(T.connection);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] text-white p-6 pt-24 pb-8 flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Stethoscope size={22} className="text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-black">{T.title}</h2>
            <p className="text-xs text-white/70 mt-0.5">{T.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-background flex-1 pb-32 max-w-3xl mx-auto w-full">
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl p-6 shadow-sm border border-border"
          >
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
            <input
              ref={cameraInput}
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />

            {preview ? (
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-border bg-black/5 max-h-[400px] flex items-center justify-center">
                  <img
                    src={preview}
                    alt="report"
                    className="max-h-[400px] w-auto object-contain"
                  />
                </div>
                {!loading && (
                  <div className="flex gap-2">
                    <Button
                      onClick={translate}
                      className="flex-1 bg-[#0BB4B0] hover:bg-[#099894] text-white font-bold"
                      data-testid="button-translate-report"
                    >
                      <Sparkles size={16} className="me-2" />
                      {T.translateBtn}
                    </Button>
                    <Button
                      onClick={reset}
                      variant="outline"
                      className="border-border"
                    >
                      <RotateCcw size={16} />
                    </Button>
                  </div>
                )}
                {loading && (
                  <div className="bg-[#0BB4B0]/10 rounded-2xl p-4 flex items-center gap-3">
                    <Loader2
                      size={20}
                      className="animate-spin text-[#0BB4B0]"
                    />
                    <div className="text-sm">
                      <div className="font-bold text-foreground">
                        {T.reading}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {T.mayTake}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-center py-6">
                  <FileText
                    size={48}
                    className="mx-auto text-[#0BB4B0] mb-3"
                  />
                  <h3 className="font-black text-lg text-foreground mb-1">
                    {T.uploadTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    {T.uploadDesc}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => cameraInput.current?.click()}
                    className="bg-[#0BB4B0] hover:bg-[#099894] text-white rounded-2xl p-5 flex flex-col items-center gap-2 font-bold transition-colors"
                    data-testid="button-camera"
                  >
                    <Camera size={28} />
                    <span className="text-sm">{T.takePhoto}</span>
                  </button>
                  <button
                    onClick={() => fileInput.current?.click()}
                    className="bg-card border-2 border-border hover:border-[#0BB4B0] text-foreground rounded-2xl p-5 flex flex-col items-center gap-2 font-bold transition-colors"
                    data-testid="button-upload"
                  >
                    <Upload size={28} className="text-[#0BB4B0]" />
                    <span className="text-sm">{T.fromGallery}</span>
                  </button>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 mt-4">
                  <p className="text-xs text-amber-900 leading-relaxed">
                    <strong>{T.noteLabel}</strong>
                    {T.noteText}
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-2xl p-3 flex gap-2">
                <AlertCircle
                  size={18}
                  className="text-red-600 flex-shrink-0 mt-0.5"
                />
                <p className="text-xs text-red-900">{error}</p>
              </div>
            )}
          </motion.div>
        )}

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {preview && (
                <div className="rounded-2xl overflow-hidden border border-border bg-black/5 max-h-[200px] flex items-center justify-center">
                  <img
                    src={preview}
                    alt="report"
                    className="max-h-[200px] w-auto object-contain"
                  />
                </div>
              )}

              {result.summary && (
                <Section
                  icon={<BookOpen size={18} />}
                  title={T.summary}
                  color="#0BB4B0"
                >
                  <p className="text-sm leading-loose text-foreground whitespace-pre-wrap">
                    {result.summary}
                  </p>
                </Section>
              )}

              {result.diagnoses && result.diagnoses.length > 0 && (
                <Section
                  icon={<Stethoscope size={18} />}
                  title={T.diagnoses}
                  color="#0D2137"
                >
                  <ul className="space-y-2">
                    {result.diagnoses.map((d, i) => (
                      <li
                        key={i}
                        className="text-sm bg-[#0D2137]/5 rounded-xl px-3 py-2 text-foreground"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {result.medications && result.medications.length > 0 && (
                <Section
                  icon={<Pill size={18} />}
                  title={T.medications}
                  color="#9333ea"
                >
                  <div className="space-y-2">
                    {result.medications.map((m, i) => (
                      <div
                        key={i}
                        className="bg-purple-50 border border-purple-100 rounded-xl p-3"
                      >
                        <div className="font-bold text-sm text-purple-900">
                          {m.name}
                        </div>
                        <div className="text-xs text-purple-800 mt-1">
                          {m.purpose}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {result.keyTerms && result.keyTerms.length > 0 && (
                <Section
                  icon={<HelpCircle size={18} />}
                  title={T.keyTerms}
                  color="#E0A858"
                >
                  <div className="space-y-2">
                    {result.keyTerms.map((k, i) => (
                      <div
                        key={i}
                        className="bg-[#FFF7EE] rounded-xl p-3 border border-[#E0A858]/30"
                      >
                        <div className="font-bold text-sm text-[#0D2137]">
                          {k.term}
                        </div>
                        <div className="text-xs text-foreground mt-1 leading-relaxed">
                          {k.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {result.doctorQuestions && result.doctorQuestions.length > 0 && (
                <Section
                  icon={<Sparkles size={18} />}
                  title={T.doctorQs}
                  color="#0BB4B0"
                >
                  <ol className="space-y-2 list-decimal list-inside">
                    {result.doctorQuestions.map((q, i) => (
                      <li
                        key={i}
                        className="text-sm bg-[#0BB4B0]/8 rounded-xl px-3 py-2 text-foreground leading-relaxed marker:text-[#0BB4B0] marker:font-black"
                      >
                        {q}
                      </li>
                    ))}
                  </ol>
                </Section>
              )}

              {result.warnings && result.warnings.length > 0 && (
                <Section
                  icon={<AlertTriangle size={18} />}
                  title={T.warnings}
                  color="#dc2626"
                >
                  <ul className="space-y-2">
                    {result.warnings.map((w, i) => (
                      <li
                        key={i}
                        className="text-sm bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-red-900"
                      >
                        ⚠️ {w}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={reset}
                  className="flex-1 bg-[#0D2137] hover:bg-[#0a1a2c] text-white font-bold"
                  data-testid="button-new-report"
                >
                  <RotateCcw size={16} className="me-2" />
                  {T.another}
                </Button>
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  className="border-border"
                >
                  {T.print}
                </Button>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 mt-2">
                <p className="text-xs text-amber-900 leading-relaxed text-center">
                  {T.aiNote}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

function Section({
  icon,
  title,
  color,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-3xl p-5 shadow-sm border border-border"
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <h3 className="font-black text-base text-foreground">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}
