import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Stethoscope,
  Microscope,
  Pill,
  Calendar,
  Activity,
  Download,
  Loader2,
  Printer,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useAssessmentStore } from "@/lib/store";
import { getDoctorQuestions, type DoctorQuestion } from "@/lib/result-resources";
import { useLangStore } from "@/lib/lang-store";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const CATEGORY_META: Record<
  DoctorQuestion["category"],
  { label: { ar: string; en: string }; icon: React.ReactNode; color: string }
> = {
  general: {
    label: { ar: "أسئلة عامة", en: "General questions" },
    icon: <Stethoscope size={14} />,
    color: "#0d9488",
  },
  examination: {
    label: { ar: "فحوصات", en: "Examinations" },
    icon: <Microscope size={14} />,
    color: "#2563eb",
  },
  treatment: {
    label: { ar: "علاج", en: "Treatment" },
    icon: <Pill size={14} />,
    color: "#9333ea",
  },
  logistics: {
    label: { ar: "ترتيب وتنظيم", en: "Logistics" },
    icon: <Calendar size={14} />,
    color: "#ea580c",
  },
  monitoring: {
    label: { ar: "متابعة ومراقبة", en: "Monitoring" },
    icon: <Activity size={14} />,
    color: "#dc2626",
  },
};

const UI_TXT = {
  ar: {
    backToResults: "النتائج",
    pageTitle: "أسئلة جاهزة للطبيب",
    pageSubtitle: (n: number) => `${n} سؤال مهم — اطبعيها وخذيها معكِ للزيارة`,
    chip1: "لا تخجلي من السؤال",
    chip2: "ضعي علامة عند كل سؤال جاوب الطبيب",
    printTitle: "أسئلتي لطبيب الأطفال",
    printSubtitle: "مأخوذة من منصة نمو — numoo.site",
    reportRefPrefix: "مرجع التقرير:",
    closingNote:
      "ملاحظة: هذه الأسئلة إرشادية. الطبيب الجيد يرحّب بأسئلتكِ ولا يستهين بقلقكِ. لو الطبيب رفض الإجابة، فكّري بطبيب ثاني.",
    loading: "جاري التحميل...",
    savePdf: "حفظ PDF لهاتفكِ",
    print: "طباعة (لو عندكِ طابعة)",
    saveTip: "نصيحة: احفظي الـPDF بمجلد \"صحة [اسم الطفل]\" بهاتفكِ، حقها يوم الزيارة.",
    pdfFileName: "اسئلة-الطبيب-نمو.pdf",
  },
  en: {
    backToResults: "Results",
    pageTitle: "Ready Questions for the Doctor",
    pageSubtitle: (n: number) => `${n} important questions — print them and take them along to the visit.`,
    chip1: "Don't be shy about asking",
    chip2: "Tick each question once the doctor answers it",
    printTitle: "My Questions for the Pediatrician",
    printSubtitle: "From the Numoo platform — numoo.site",
    reportRefPrefix: "Report reference:",
    closingNote:
      "Note: These questions are guidance. A good doctor welcomes your questions and never dismisses your worry. If a doctor refuses to answer, consider seeing another one.",
    loading: "Preparing...",
    savePdf: "Save PDF to your phone",
    print: "Print (if you have a printer)",
    saveTip: "Tip: Save the PDF in a \"[child's name] health\" folder on your phone, ready for visit day.",
    pdfFileName: "numoo-doctor-questions.pdf",
  },
};

const QUESTIONS_EN: Record<string, { q: string; why?: string }> = {
  // General
  "بناءً على نتيجة فحص M-CHAT-R/F، هل تنصح بتقييم متخصص؟": {
    q: "Based on the M-CHAT-R/F result, do you recommend a specialist assessment?",
    why: "The most important question — the doctor's answer shapes every step that follows.",
  },
  "ما الفحوصات الإضافية الذي تنصحني فيها (سمع، نظر، فحص جيني)؟": {
    q: "Which additional tests do you recommend (hearing, vision, genetic screening)?",
    why: "Speech delay can be caused by hearing issues — we have to rule that out first.",
  },
  "متى نعيد التقييم؟ بعد كم أسبوع/شهر؟": {
    q: "When should we repeat the assessment? In how many weeks or months?",
    why: "You need a specific date — not just \"wait and watch.\"",
  },
  "هل أحتاج تحويل لطبيب نفسي تطوري أو طبيب أعصاب أطفال؟": {
    q: "Do I need a referral to a developmental psychologist or pediatric neurologist?",
    why: "A general pediatrician can't diagnose autism alone — a referral is needed.",
  },
  "ما الخطوة الفورية الذي يجب أفعلها هذا الأسبوع؟": {
    q: "What is the immediate step I should take this week?",
    why: "You should leave with a concrete plan, not generic advice.",
  },
  // High-risk
  "كم يحتاج الانتظار لموعد عند المختص؟ هل في طريقة لتسريع الموعد؟": {
    q: "How long is the wait for a specialist appointment? Is there a way to speed it up?",
    why: "Sometimes the waitlist runs 3–6 months — you'll need alternatives.",
  },
  "ما العلامات الذي يجب أراقبها وأخبرك فيها فوراً؟": {
    q: "What signs should I watch for and report to you immediately?",
    why: "Some signs call for urgent intervention (regression, seizures, self-harm).",
  },
  "هل يستفيد طفلي من جلسات تخاطب وعلاج وظيفي قبل التشخيص النهائي؟": {
    q: "Would my child benefit from speech and occupational therapy before the final diagnosis?",
    why: "Recent research (2024): early intervention before diagnosis makes a big difference.",
  },
  "ما المراكز الموثوقة بالكويت الذي تنصح فيها؟": {
    q: "Which centers in Kuwait do you trust and recommend?",
    why: "Your doctor's personal recommendation is more reliable than online reviews.",
  },
  "ما الفرق بين ABA، تخاطب، وعلاج وظيفي؟ متى يبدأ كل واحد؟": {
    q: "What's the difference between ABA, speech therapy, and OT? When does each one begin?",
    why: "Each therapy serves a different purpose — you need an integrated plan.",
  },
  "هل أحتاج فحص جيني (Chromosomal Microarray, Fragile X)؟": {
    q: "Do I need genetic testing (Chromosomal Microarray, Fragile X)?",
    why: "The 2024 American guidelines recommend genetic testing for every case.",
  },
  "هل MRI أو EEG ضروري حالياً؟": {
    q: "Is an MRI or EEG necessary at this stage?",
    why: "If there's any suspicion of seizures or neurological signs, it becomes essential.",
  },
  "ما الأعراض المرافقة (صرع، مشاكل هضم، اضطراب نوم) الذي يجب أرصدها؟": {
    q: "Which co-occurring symptoms (seizures, digestion, sleep) should I be tracking?",
    why: "Around 30% of these children have co-occurring conditions worth treating.",
  },
  "هل عندكم خطة متابعة دورية؟ كل كم نشوفك؟": {
    q: "Do you have a regular follow-up plan? How often will we see you?",
    why: "Don't leave without your next follow-up date in hand.",
  },
  "كم ساعة جلسات تخاطب أسبوعياً موصى بها لعمر طفلي؟": {
    q: "How many weekly hours of speech therapy are recommended for my child's age?",
    why: "Guidelines suggest 15–25 hours per week for intensive early intervention.",
  },
  "هل عند الكويت دعم حكومي للعلاج؟ كيف أحصل عليه؟": {
    q: "Is there government support for treatment in Kuwait? How do I access it?",
    why: "Disability ID + health insurance + charities are options you must know about.",
  },
  "ما الأكل أو الفيتامينات الذي تنصح فيها لعمر طفلي؟": {
    q: "What foods or vitamins do you recommend for my child's age?",
    why: "Instead of trying Instagram diets, ask a specialist.",
  },
  // Medium
  "ما هي العلامات الذي إذا ظهرت أرجع لك فوراً بدون موعد؟": {
    q: "What signs, if they appear, should bring me back to you immediately, without an appointment?",
    why: "You need a clear red line — not constant lingering doubt.",
  },
  "هل نبدأ تخاطب احترازياً وقت ما ننتظر التقييم النهائي؟": {
    q: "Should we begin speech therapy preventively while we wait for the final assessment?",
    why: "It does no harm and could matter a great deal if autism is confirmed.",
  },
  "ما الأنشطة اليومية الذي تنصحني أزيدها مع طفلي؟": {
    q: "Which daily activities do you recommend I do more of with my child?",
    why: "A mother's role at home is 70% of early intervention.",
  },
  "متى نعيد M-CHAT-R/F؟ بعد ٣ أسابيع، شهرين، ٦ شهور؟": {
    q: "When do we repeat the M-CHAT-R/F? In 3 weeks, 2 months, 6 months?",
    why: "Re-screening at a specific interval gives you a clearer picture.",
  },
  // Low
  "متى يفترض أعيد التقييم للاطمئنان؟": {
    q: "When should I repeat the assessment just for reassurance?",
    why: "Even when results are reassuring, periodic screening still matters.",
  },
  "ما المؤشرات الذي إذا ظهرت بمستقبل أرجع لك فوراً؟": {
    q: "Which signs, if they appear later, should bring me back to you right away?",
    why: "A mother who knows the signs is the first line of defense.",
  },
  "ما الأنشطة الذي أزيدها مع طفلي لدعم تطوره أكثر؟": {
    q: "Which activities should I add with my child to further support his development?",
    why: "Early enrichment benefits every child, even a typically-developing one.",
  },
};

export default function ResultsDoctorQuestions() {
  const [, setLocation] = useLocation();
  const { riskLevel, ageGroup, reportCode, reportDate } = useAssessmentStore();
  const { lang } = useLangStore();
  const T = UI_TXT[lang];
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [checked, setChecked] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!ageGroup) setLocation("/");
  }, [ageGroup, setLocation]);

  const questions = getDoctorQuestions(riskLevel);

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const handleDownloadPdf = async () => {
    if (!printRef.current || isGenerating) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(printRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const img = new Image();
      img.src = dataUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 24;
      const maxWidth = pageWidth - margin * 2;
      const ratio = img.height / img.width;
      const imgWidth = maxWidth;
      const imgHeight = imgWidth * ratio;
      if (imgHeight <= pageHeight - margin * 2) {
        pdf.addImage(dataUrl, "PNG", margin, margin, imgWidth, imgHeight);
      } else {
        const pageContentHeight = pageHeight - margin * 2;
        const sliceHeightPx = (pageContentHeight / imgHeight) * img.height;
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        const ctx = canvas.getContext("2d")!;
        let y = 0;
        let firstPage = true;
        while (y < img.height) {
          const slice = Math.min(sliceHeightPx, img.height - y);
          canvas.height = slice;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, y, img.width, slice, 0, 0, img.width, slice);
          const sliceData = canvas.toDataURL("image/png");
          const sliceImgHeight = (slice / img.width) * imgWidth;
          if (!firstPage) pdf.addPage();
          pdf.addImage(sliceData, "PNG", margin, margin, imgWidth, sliceImgHeight);
          firstPage = false;
          y += slice;
        }
      }
      pdf.save(T.pdfFileName);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!ageGroup) return null;

  const dateStr = reportDate
    ? new Date(reportDate).toLocaleDateString(lang === "ar" ? "ar-KW" : "en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Layout>
      <div className="pb-32 bg-[#f4fafa] min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0d9488] to-[#0f766e] text-white px-5 pt-6 pb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white" />
          </div>
          <Link href="/results">
            <button className="relative z-10 mb-4 flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium">
              <ArrowRight size={16} />
              {T.backToResults}
            </button>
          </Link>
          <div className="relative z-10 flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <Stethoscope size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold leading-tight">
                {T.pageTitle}
              </h1>
              <p className="text-sm text-white/85 mt-1">
                {T.pageSubtitle(questions.length)}
              </p>
            </div>
          </div>
          <div className="relative z-10 flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-[11px] bg-white/15 px-2.5 py-1 rounded-full">
              {T.chip1}
            </span>
            <span className="text-[11px] bg-white/15 px-2.5 py-1 rounded-full">
              {T.chip2}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pt-5">
          <motion.div
            ref={printRef}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-border p-5 mb-5"
          >
            {/* Print header */}
            <div className="text-center mb-5 pb-4 border-b border-border">
              <h2 className="text-lg font-extrabold text-foreground mb-1">
                {T.printTitle}
              </h2>
              <p className="text-xs text-muted-foreground">
                {T.printSubtitle}
              </p>
              {reportCode && (
                <p className="text-[10px] text-muted-foreground mt-1">
                  {T.reportRefPrefix} {reportCode} {dateStr && `• ${dateStr}`}
                </p>
              )}
            </div>

            <div className="space-y-3">
              {questions.map((item, i) => {
                const meta = CATEGORY_META[item.category];
                const isChecked = checked.has(i);
                const localized =
                  lang === "en"
                    ? QUESTIONS_EN[item.q] ?? { q: item.q, why: item.why }
                    : { q: item.q, why: item.why };
                return (
                  <div
                    key={i}
                    role="checkbox"
                    aria-checked={isChecked}
                    aria-label={localized.q}
                    tabIndex={0}
                    onClick={() => toggle(i)}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        toggle(i);
                      }
                    }}
                    className={`group rounded-2xl p-3.5 border-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                      isChecked
                        ? "bg-emerald-50 border-emerald-300"
                        : "bg-card border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="flex-shrink-0 mt-0.5">
                        {isChecked ? (
                          <CheckCircle2 size={20} className="text-emerald-600" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                          <span
                            className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: meta.color }}
                          >
                            {meta.icon}
                            {meta.label[lang]}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-bold">
                            #{i + 1}
                          </span>
                        </div>
                        <p
                          className={`text-sm font-bold leading-relaxed ${
                            isChecked ? "line-through text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {localized.q}
                        </p>
                        {localized.why && (
                          <p className="text-[11px] text-muted-foreground leading-relaxed mt-1.5 pr-3 border-r-2 border-primary/30 inline-flex items-start gap-1">
                            <Lightbulb size={11} className="mt-0.5 flex-shrink-0 text-amber-500" />
                            <span>{localized.why}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-border text-center text-[10px] text-muted-foreground leading-relaxed">
              {T.closingNote}
            </div>
          </motion.div>

          {/* Action buttons */}
          <div className="space-y-2.5">
            <Button
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="w-full h-12 rounded-2xl font-bold gap-2 bg-[#0d9488] hover:bg-[#0f766e]"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {T.loading}
                </>
              ) : (
                <>
                  <Download size={18} />
                  {T.savePdf}
                </>
              )}
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="w-full h-12 rounded-2xl font-bold gap-2"
            >
              <Printer size={18} />
              {T.print}
            </Button>
          </div>

          <div className="mt-4 text-[10px] text-muted-foreground text-center px-2">
            {T.saveTip}
          </div>
        </div>
      </div>
    </Layout>
  );
}
