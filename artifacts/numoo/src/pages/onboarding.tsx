import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, Check, SkipForward, User, Calendar, Heart } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAssessmentStore, type AgeGroup } from "@/lib/store";
import { useT } from "@/lib/i18n";

const CONCERNS: { ar: string; en: string }[] = [
  { ar: "تأخّر في الكلام", en: "Speech delay" },
  { ar: "تواصل بصري ضعيف", en: "Weak eye contact" },
  { ar: "حركات متكرّرة", en: "Repetitive movements" },
  { ar: "انعزال عن الأطفال", en: "Social withdrawal" },
  { ar: "حساسية حسّية (أصوات/إضاءة)", en: "Sensory sensitivity (sound/light)" },
  { ar: "نوبات غضب عند التغيير", en: "Tantrums on routine change" },
  { ar: "عدم الاستجابة للاسم", en: "Doesn't respond to name" },
  { ar: "اهتمامات محدودة جداً", en: "Very narrow interests" },
  { ar: "صعوبة في النوم أو الأكل", en: "Sleep or eating difficulty" },
  { ar: "حدسي يخبرني بأن شيئاً مختلف", en: "My intuition says something's different" },
];

const AGE_BANDS: { id: NonNullable<AgeGroup>; ar: string; en: string }[] = [
  { id: "toddler", ar: "١٦ — ٣٠ شهراً", en: "16 — 30 months" },
  { id: "preschool", ar: "٣ — ٥ سنوات", en: "3 — 5 years" },
  { id: "school", ar: "٦ — ١٢ سنة", en: "6 — 12 years" },
  { id: "teen", ar: "١٣ — ١٧ سنة", en: "13 — 17 years" },
];

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { lang } = useT();
  const setChildProfile = useAssessmentStore((s) => s.setChildProfile);
  const existing = useAssessmentStore((s) => s.childProfile);

  const [step, setStep] = useState(0);
  const [name, setName] = useState(existing?.name ?? "");
  const [ageBand, setAgeBand] = useState<NonNullable<AgeGroup> | "">(
    existing?.ageBand ?? ""
  );
  const [concerns, setConcerns] = useState<string[]>(existing?.concerns ?? []);

  const totalSteps = 3;
  const progress = ((step + 1) / totalSteps) * 100;

  const toggleConcern = (c: string) => {
    setConcerns((prev) =>
      prev.includes(c)
        ? prev.filter((x) => x !== c)
        : prev.length < 3
          ? [...prev, c]
          : prev,
    );
  };

  const handleSave = () => {
    setChildProfile({
      name: name.trim(),
      ageBand: ageBand || "",
      concerns,
      completedAt: new Date().toISOString(),
    });
    setLocation("/");
  };

  const handleSkip = () => setLocation("/");

  const canNext =
    (step === 0) ||
    (step === 1 && ageBand !== "") ||
    (step === 2 && concerns.length > 0);

  return (
    <Layout hideNav hideFooter>
      <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0D2137] to-[#063048] text-white px-6 py-12 pb-20 flex flex-col">
        {/* Background glow */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-md mx-auto w-full flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 mt-12">
            <button
              onClick={handleSkip}
              className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-bold transition-colors"
            >
              <SkipForward className="w-3.5 h-3.5" />
              {lang === "ar" ? "تخطّي" : "Skip"}
            </button>
            <span className="text-[10px] font-black tracking-[0.2em] text-[#E0A858]">
              {lang === "ar" ? "تعريف بالطفل" : "GET STARTED"}
            </span>
            <span className="text-xs font-bold text-white/60">
              {step + 1} / {totalSteps}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-8">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {/* Step 0 — Name */}
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-5">
                  <User className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-2xl font-black mb-2">
                  {lang === "ar" ? "ما اسم طفلكِ؟" : "What's your child's name?"}
                </h1>
                <p className="text-sm text-white/60 mb-6 leading-relaxed">
                  {lang === "ar"
                    ? "نستخدمه حتى نخصّص تجربتكِ. يبقى محفوظ على جهازكِ فقط ولا يُرسل لأي خادم."
                    : "We use it to personalize your experience. Stored only on your device."}
                </p>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "ar" ? "مثلاً: نواف" : "e.g. Naseem"}
                  className="bg-white/[0.06] border-white/15 text-white placeholder:text-white/40 h-14 rounded-2xl text-base"
                  autoFocus
                />
                <p className="text-[11px] text-white/40 mt-3">
                  {lang === "ar"
                    ? "اختياري — يمكنكِ تركه فارغاً."
                    : "Optional — you can leave it blank."}
                </p>
              </motion.div>
            )}

            {/* Step 1 — Age band */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-5">
                  <Calendar className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-2xl font-black mb-2">
                  {lang === "ar" ? "كم عمر طفلكِ؟" : "How old is your child?"}
                </h1>
                <p className="text-sm text-white/60 mb-6 leading-relaxed">
                  {lang === "ar"
                    ? "نخصّص الأسئلة والمحتوى حسب المرحلة العمرية."
                    : "We tailor questions and content to the age stage."}
                </p>
                <div className="space-y-2.5">
                  {AGE_BANDS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setAgeBand(b.id)}
                      className={`w-full text-right p-4 rounded-2xl border transition-all flex items-center justify-between ${
                        ageBand === b.id
                          ? "bg-primary/15 border-primary text-white"
                          : "bg-white/[0.04] border-white/10 text-white/70 hover:border-white/30"
                      }`}
                    >
                      <span className="font-bold text-sm">
                        {lang === "ar" ? b.ar : b.en}
                      </span>
                      {ageBand === b.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2 — Top concerns */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-5">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-2xl font-black mb-2">
                  {lang === "ar"
                    ? "ما أكثر ما يُقلقكِ؟"
                    : "What concerns you most?"}
                </h1>
                <p className="text-sm text-white/60 mb-3 leading-relaxed">
                  {lang === "ar"
                    ? "اختاري حتى ٣ مخاوف رئيسية. نستخدمها لتوجيه المحتوى."
                    : "Pick up to 3 main concerns. We use them to suggest content."}
                </p>
                <div className="text-[11px] text-[#E0A858] font-bold mb-4">
                  {concerns.length} / 3 {lang === "ar" ? "محدّدة" : "selected"}
                </div>
                <div className="space-y-1.5">
                  {CONCERNS.map((c) => {
                    const key = c.ar;
                    const label = lang === "ar" ? c.ar : c.en;
                    const active = concerns.includes(key);
                    const disabled = !active && concerns.length >= 3;
                    return (
                      <button
                        key={key}
                        onClick={() => toggleConcern(key)}
                        disabled={disabled}
                        className={`w-full ${lang === "ar" ? "text-right" : "text-left"} p-3 rounded-xl border transition-all flex items-center justify-between text-sm ${
                          active
                            ? "bg-primary/15 border-primary text-white font-bold"
                            : disabled
                              ? "bg-white/[0.02] border-white/5 text-white/30 cursor-not-allowed"
                              : "bg-white/[0.04] border-white/10 text-white/70 hover:border-white/30"
                        }`}
                      >
                        <span>{label}</span>
                        {active && (
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer buttons */}
          <div className="mt-6 flex gap-2">
            {step > 0 && (
              <Button
                variant="ghost"
                onClick={() => setStep((s) => s - 1)}
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-2xl px-5"
              >
                {lang === "ar" ? (
                  <>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                    رجوع
                  </>
                ) : (
                  <>
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Back
                  </>
                )}
              </Button>
            )}
            {step < totalSteps - 1 ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext}
                className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 font-bold disabled:opacity-40 shadow-[0_8px_24px_rgba(10,191,188,0.35)]"
              >
                {lang === "ar" ? "التالي" : "Next"}
                {lang === "ar" ? (
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                ) : (
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                )}
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                disabled={!canNext}
                className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 font-black disabled:opacity-40 shadow-[0_8px_24px_rgba(10,191,188,0.35)]"
              >
                <Sparkles className="w-4 h-4 ml-1.5" />
                {lang === "ar" ? "ابدئي مع نمو" : "Start with Numoo"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
