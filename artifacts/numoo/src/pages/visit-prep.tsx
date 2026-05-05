import { useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useAssessmentStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { ArrowRight, Printer, FileText, ListChecks, Sparkles } from "lucide-react";

const AGE_LABEL: Record<string, { ar: string; en: string }> = {
  toddler: { ar: "١٦ — ٣٠ شهراً", en: "16 — 30 months" },
  preschool: { ar: "٣ — ٥ سنوات", en: "3 — 5 years" },
  school: { ar: "٦ — ١٢ سنة", en: "6 — 12 years" },
  teen: { ar: "١٣ — ١٧ سنة", en: "13 — 17 years" },
};

const RISK_LABEL: Record<string, { ar: string; en: string; tone: string }> = {
  low: { ar: "احتمال منخفض", en: "Low likelihood", tone: "#0BB4B0" },
  medium: { ar: "احتمال متوسط", en: "Medium likelihood", tone: "#E0A858" },
  high: { ar: "احتمال مرتفع", en: "High likelihood", tone: "#d97757" },
};

const DOCTOR_QUESTIONS_AR = [
  "هل النتيجة تستوجب تقييماً اختصاصياً؟ ومتى؟",
  "ما الفحوصات المخبرية أو السمعية التي تنصحون بها قبل التحويل؟",
  "هل توجد علامات أخرى ينبغي أن أراقبها في الأسابيع القادمة؟",
  "هل يمكن التحويل إلى أخصائي تطوّر أو نطق أو تعديل سلوك؟",
  "ما الأنشطة المنزلية البسيطة التي أبدأ بها هذا الأسبوع؟",
  "كل كم شهر نعيد التقييم لمتابعة التطوّر؟",
];

const DOCTOR_QUESTIONS_EN = [
  "Does this result warrant a specialist evaluation, and how soon?",
  "Are any lab or hearing tests recommended before referral?",
  "What other signs should I watch for in the coming weeks?",
  "Can you refer us to a developmental, speech, or behavior specialist?",
  "What simple home activities should I start this week?",
  "How often should we re-screen to monitor progress?",
];

export default function VisitPrep() {
  const [, setLocation] = useLocation();
  const { lang } = useT();
  const childProfile = useAssessmentStore((s) => s.childProfile);
  const riskLevel = useAssessmentStore((s) => s.riskLevel);
  const reportCode = useAssessmentStore((s) => s.reportCode);
  const reportDate = useAssessmentStore((s) => s.reportDate);
  const score = useAssessmentStore((s) => s.score);
  const ageGroup = useAssessmentStore((s) => s.ageGroup);

  useEffect(() => {
    document.title = lang === "ar" ? "ورقة زيارة الدكتور — نمو" : "Visit Prep — Numoo";
  }, [lang]);

  const handlePrint = () => window.print();

  const childName = childProfile?.name?.trim() || (lang === "ar" ? "—" : "—");
  const ageBand = childProfile?.ageBand || ageGroup;
  const ageText = ageBand && AGE_LABEL[ageBand]
    ? lang === "ar" ? AGE_LABEL[ageBand].ar : AGE_LABEL[ageBand].en
    : (lang === "ar" ? "—" : "—");
  const concerns = childProfile?.concerns ?? [];
  const risk = riskLevel ? RISK_LABEL[riskLevel] : null;
  const formattedDate = reportDate
    ? new Date(reportDate).toLocaleDateString(lang === "ar" ? "ar-KW" : "en-GB")
    : "—";
  const questions = lang === "ar" ? DOCTOR_QUESTIONS_AR : DOCTOR_QUESTIONS_EN;

  return (
    <Layout hideNav hideFooter>
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-page { padding: 0 !important; background: white !important; }
          body { background: white !important; }
        }
        @page { size: A4; margin: 18mm; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0D2137] to-[#063048] py-10 px-4 print-page">
        {/* Top toolbar — hidden on print */}
        <div className="no-print max-w-2xl mx-auto mb-6 flex items-center justify-between mt-12">
          <Button
            variant="ghost"
            onClick={() => setLocation("/results")}
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
          >
            <ArrowRight className="w-4 h-4 ml-1.5" />
            {lang === "ar" ? "رجوع للنتيجة" : "Back to Result"}
          </Button>
          <Button
            onClick={handlePrint}
            className="bg-primary hover:bg-primary/90 text-white rounded-full font-bold shadow-[0_8px_24px_rgba(10,191,188,0.35)]"
          >
            <Printer className="w-4 h-4 ml-1.5" />
            {lang === "ar" ? "طباعة الورقة" : "Print Sheet"}
          </Button>
        </div>

        {/* The printable sheet */}
        <div className="max-w-2xl mx-auto bg-white text-[#0D2137] rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#0BB4B0] pb-4 mb-6">
            <div>
              <h1 className="text-2xl font-black text-[#0D2137] mb-1">
                {lang === "ar" ? "ورقة زيارة الدكتور" : "Doctor Visit Sheet"}
              </h1>
              <p className="text-xs text-gray-500">
                {lang === "ar"
                  ? "ملخّص شامل لتقديمه لطبيب طفلكِ"
                  : "A summary to share with your child's doctor"}
              </p>
            </div>
            <div className="text-right">
              <div className="w-12 h-12 bg-[#0BB4B0] rounded-xl flex items-center justify-center mb-1 mr-auto">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-[10px] font-black text-[#0BB4B0]">نمو · NUMOO</div>
            </div>
          </div>

          {/* Child info */}
          <section className="mb-6">
            <h2 className="text-[11px] font-black tracking-[0.2em] text-[#0BB4B0] mb-3">
              {lang === "ar" ? "معلومات الطفل" : "CHILD INFORMATION"}
            </h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-[#f9fafb] rounded-xl p-3">
                <div className="text-[11px] text-gray-500 mb-1">
                  {lang === "ar" ? "الاسم" : "Name"}
                </div>
                <div className="font-bold text-[#0D2137]">{childName}</div>
              </div>
              <div className="bg-[#f9fafb] rounded-xl p-3">
                <div className="text-[11px] text-gray-500 mb-1">
                  {lang === "ar" ? "الفئة العمرية" : "Age Band"}
                </div>
                <div className="font-bold text-[#0D2137]">{ageText}</div>
              </div>
            </div>
          </section>

          {/* Top concerns */}
          {concerns.length > 0 && (
            <section className="mb-6">
              <h2 className="text-[11px] font-black tracking-[0.2em] text-[#0BB4B0] mb-3">
                {lang === "ar" ? "أهم المخاوف" : "TOP CONCERNS"}
              </h2>
              <ul className="space-y-1.5">
                {concerns.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-[#0D2137]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0BB4B0] mt-2 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Screening result */}
          {risk && (
            <section className="mb-6">
              <h2 className="text-[11px] font-black tracking-[0.2em] text-[#0BB4B0] mb-3">
                {lang === "ar" ? "نتيجة فحص نمو (M-CHAT-R/F مُكيَّف)" : "Numoo Screening Result (Adapted M-CHAT-R/F)"}
              </h2>
              <div
                className="rounded-2xl p-4 border-2"
                style={{ borderColor: risk.tone, background: `${risk.tone}10` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-[11px] text-gray-600 mb-0.5">
                      {lang === "ar" ? "التقدير" : "Assessment"}
                    </div>
                    <div
                      className="text-xl font-black"
                      style={{ color: risk.tone }}
                    >
                      {lang === "ar" ? risk.ar : risk.en}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-gray-600 mb-0.5">
                      {lang === "ar" ? "النقاط" : "Score"}
                    </div>
                    <div className="text-xl font-black text-[#0D2137]">
                      {Math.round(score * 10) / 10}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-600 pt-2 border-t border-gray-200">
                  <span>
                    {lang === "ar" ? "رمز التقرير: " : "Report Code: "}
                    <span className="font-mono font-bold">{reportCode || "—"}</span>
                  </span>
                  <span>{formattedDate}</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                {lang === "ar"
                  ? "تنبيه: هذا فحص توعوي وليس تشخيص. التشخيص يتطلّب فريقاً متخصّصاً."
                  : "Note: This is an awareness screening, not a diagnosis. A formal diagnosis requires a specialist team."}
              </p>
            </section>
          )}

          {/* Questions to ask */}
          <section className="mb-6">
            <h2 className="text-[11px] font-black tracking-[0.2em] text-[#0BB4B0] mb-3 flex items-center gap-2">
              <ListChecks className="w-3.5 h-3.5" />
              {lang === "ar" ? "أسئلة تسألينها للدكتور" : "QUESTIONS TO ASK"}
            </h2>
            <ol className="space-y-2.5">
              {questions.map((q, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-[#0D2137]"
                >
                  <span className="w-6 h-6 rounded-full bg-[#0BB4B0] text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{q}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Notes section */}
          <section className="mb-2">
            <h2 className="text-[11px] font-black tracking-[0.2em] text-[#0BB4B0] mb-3 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              {lang === "ar" ? "ملاحظات الدكتور" : "DOCTOR'S NOTES"}
            </h2>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="border-b border-gray-300 h-6"
                />
              ))}
            </div>
          </section>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-200 text-center text-[10px] text-gray-400">
            {lang === "ar"
              ? "نمو · منصّة كويتية لدعم أسر أطفال التوحد · numoo.kw"
              : "Numoo · Kuwait family support platform · numoo.kw"}
          </div>
        </div>

        {/* Help text — hidden on print */}
        <p className="no-print max-w-2xl mx-auto text-center text-xs text-white/50 mt-6 leading-relaxed">
          {lang === "ar"
            ? "اطبعي الورقة وخذيها معكِ للزيارة الطبية. كل المعلومات تأتي من بيانات جهازكِ وتبقى عليه فقط."
            : "Print the sheet and bring it to your medical visit. All information stays on your device only."}
        </p>
      </div>
    </Layout>
  );
}
