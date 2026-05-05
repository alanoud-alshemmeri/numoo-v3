import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Sparkles,
  ClipboardCheck,
  Stethoscope,
  Grid3X3,
  MessageSquare,
  Building2,
  HeartHandshake,
  ArrowLeft,
  Award,
  Users,
  BookOpenCheck,
  Globe,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useLangStore } from "@/lib/lang-store";

const STEPS = [
  {
    n: 1,
    title: { ar: "ابدئي بالفحص المبكر", en: "Start with the early screening" },
    desc: {
      ar: "تقييم M-CHAT-R/F معتمد دولياً، نتيجة فورية بالعربية",
      en: "Internationally validated M-CHAT-R/F screening with an instant result",
    },
    href: "/age",
    icon: <ClipboardCheck size={20} />,
    color: "#0BB4B0",
  },
  {
    n: 2,
    title: { ar: "ترجمي تقرير الطبيب", en: "Translate the doctor's report" },
    desc: {
      ar: "صوّري أي تقرير → شرح مبسط + ٥ أسئلة جاهزة للطبيب",
      en: "Snap any report → a clear plain-language summary plus 5 ready questions for the doctor",
    },
    href: "/report-translator",
    icon: <Stethoscope size={20} />,
    color: "#9333ea",
  },
  {
    n: 3,
    title: { ar: "ولّدي جدول طفلكِ البصري", en: "Generate your child's visual schedule" },
    desc: {
      ar: "وصف لفظي → جدول PECS مصوّر قابل للطباعة",
      en: "Describe a routine → get a printable picture-based PECS schedule",
    },
    href: "/visual-schedule",
    icon: <Grid3X3 size={20} />,
    color: "#E0A858",
  },
  {
    n: 4,
    title: { ar: "جربي لوحة التواصل الصوتية", en: "Try the speech communication board" },
    desc: {
      ar: "للطفل غير الناطق — يضغط الصورة فينطقها التطبيق",
      en: "For non-verbal children — tap a picture and the app speaks it aloud",
    },
    href: "/aac",
    icon: <MessageSquare size={20} />,
    color: "#dc2626",
  },
];

const STATS = [
  { n: "59", label: { ar: "دكتور موصى بهم", en: "Recommended doctors" }, icon: <Stethoscope size={16} /> },
  { n: "7", label: { ar: "مراكز تقييم رسمية", en: "Official assessment centers" }, icon: <ShieldCheck size={16} /> },
  { n: "8", label: { ar: "مصادر دعم حكومي", en: "Government support resources" }, icon: <Building2 size={16} /> },
  { n: "20+", label: { ar: "مقالات علمية مرجعة", en: "Peer-reviewed articles" }, icon: <BookOpenCheck size={16} /> },
];

const PROMISES = [
  {
    title: { ar: "بدون تشخيص متسرع", en: "No rushed diagnosis" },
    desc: {
      ar: "نوضح أن M-CHAT-R/F أداة فحص — لا تشخيص. التشخيص فقط من المختص.",
      en: "We make it clear that M-CHAT-R/F is a screening tool — not a diagnosis. Diagnosis comes only from a specialist.",
    },
  },
  {
    title: { ar: "بدون بيع أو إعلانات", en: "No selling, no ads" },
    desc: {
      ar: "كل المحتوى مجاني. لا روابط مدفوعة، لا توصيات تجارية.",
      en: "All content is free. No paid links, no commercial recommendations.",
    },
  },
  {
    title: { ar: "خصوصية كاملة", en: "Full privacy" },
    desc: {
      ar: "كل البيانات محفوظة على جهاز الأم محلياً. الرفع للسحابة اختياري ومرمّز.",
      en: "All data stays on the mother's device. Cloud backup is optional and encrypted.",
    },
  },
  {
    title: { ar: "مصادر معلنة", en: "Transparent sources" },
    desc: {
      ar: "كل رقم وكل توصية لها مصدر علمي/رسمي مذكور في صفحة المصادر.",
      en: "Every number and every recommendation has a scientific or official source listed on the sources page.",
    },
  },
];

const PILLARS = [
  {
    title: { ar: "علم معتمد", en: "Evidence-based" },
    desc: {
      ar: "M-CHAT-R/F، PECS، ABA — أدوات معترف بها دولياً",
      en: "M-CHAT-R/F, PECS, ABA — internationally recognized tools",
    },
    icon: <Award size={24} />,
    color: "#0BB4B0",
  },
  {
    title: { ar: "كويتي ١٠٠٪", en: "100% Kuwaiti" },
    desc: {
      ar: "بالعربية الفصحى، أمثلة من بيئتنا، مراكز محلية",
      en: "Standard Arabic, examples from our environment, local centers",
    },
    icon: <Globe size={24} />,
    color: "#E0A858",
  },
  {
    title: { ar: "للأم أولاً", en: "Mother-first" },
    desc: {
      ar: "بدون تشخيص قاسٍ، بدون تخويف، بدعم نفسي حقيقي",
      en: "No harsh labels, no fear-mongering — real emotional support",
    },
    icon: <HeartHandshake size={24} />,
    color: "#dc2626",
  },
  {
    title: { ar: "مجتمع حقيقي", en: "A real community" },
    desc: {
      ar: "تجارب أمهات حقيقيات، توصيات من القلب",
      en: "Stories from real mothers and recommendations from the heart",
    },
    icon: <Users size={24} />,
    color: "#9333ea",
  },
];

const TXT = {
  ar: {
    forJudges: "للجنة التحكيم",
    brand: "نمو",
    tagline: "من لحظة القلق الأولى — إلى الخطوة الصحيحة التالية.",
    subtitle:
      "منصة كويتية شاملة لدعم أسر أطفال طيف التوحد — من الفحص المبكر، إلى فهم التقارير، إلى أدوات يومية معتمدة علاجياً.",
    tryTitle: "جربي نمو في ٦٠ ثانية",
    tryDesc: "أربع خطوات تعرّض المنصة بالكامل — اضغطي على أي خطوة للتجربة المباشرة.",
    whyTitle: "ليش نمو؟",
    whySub: "أربعة مبادئ تميّزنا",
    promisesTitle: "وعودنا للأهل",
    promisesSub: "معايير ثابتة نلتزم بها — قابلة للتحقق من الكود والمصادر",
    ctaTitle: "جاهزة لتجربة نمو؟",
    ctaDesc: "ابدئي من الصفحة الرئيسية لتجربة المسار الكامل، أو اقفزي مباشرة لأي ميزة من الخطوات أعلاه.",
    ctaHome: "الصفحة الرئيسية",
    ctaSources: "مراجعنا العلمية",
  },
  en: {
    forJudges: "For the judging panel",
    brand: "Numoo",
    tagline: "From the first moment of worry — to the right next step.",
    subtitle:
      "A complete Kuwaiti platform supporting families of children on the autism spectrum — from early screening, to understanding reports, to daily evidence-based tools.",
    tryTitle: "Try Numoo in 60 seconds",
    tryDesc: "Four steps that walk through the entire platform — tap any step for a live try.",
    whyTitle: "Why Numoo?",
    whySub: "Four principles that set us apart",
    promisesTitle: "Our promises to families",
    promisesSub: "Standards we hold ourselves to — verifiable in the code and sources",
    ctaTitle: "Ready to try Numoo?",
    ctaDesc: "Start from the home page for the full journey, or jump straight into any feature from the steps above.",
    ctaHome: "Home page",
    ctaSources: "Our scientific references",
  },
};

export default function Judges() {
  const { lang } = useLangStore();
  const T = TXT[lang];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#0a1628] via-[#0D2137] to-[#063048] text-white px-6 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#0BB4B0]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#E0A858]/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-[#E0A858]/20 border border-[#E0A858]/40 rounded-full px-4 py-1.5 mb-6"
          >
            <Award size={14} className="text-[#E0A858]" />
            <span className="text-xs font-bold text-[#E0A858]">
              {T.forJudges}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-20 h-20 mx-auto mb-4 bg-primary rounded-3xl p-2 shadow-[0_18px_55px_rgba(10,191,188,0.4)] overflow-hidden"
          >
            <img
              src="/numoo-logo.png"
              alt="Numoo"
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-5xl font-black bg-gradient-to-br from-white to-primary text-transparent bg-clip-text mb-3 tracking-tight"
          >
            {T.brand}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/85 leading-relaxed max-w-xl mx-auto mb-2"
          >
            {T.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-sm text-white/55 max-w-xl mx-auto"
          >
            {T.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8"
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/15 backdrop-blur-md rounded-2xl p-4 text-center"
              >
                <div className="flex items-center justify-center gap-1 text-[#0BB4B0] mb-1">
                  {s.icon}
                </div>
                <div className="text-2xl font-black text-white">{s.n}</div>
                <div className="text-[10px] text-white/60 leading-tight">
                  {s.label[lang]}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="bg-background flex-1 pb-32">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0BB4B0]/10 to-[#0BB4B0]/5 border-2 border-[#0BB4B0]/30 rounded-3xl p-6 mb-12"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={20} className="text-[#0BB4B0]" />
              <h2 className="text-xl font-black text-[#0D2137]">
                {T.tryTitle}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              {T.tryDesc}
            </p>
            <div className="space-y-3">
              {STEPS.map((step, i) => (
                <Link key={step.n} href={step.href}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ x: -4 }}
                    className="bg-white border-2 border-border rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:border-[#0BB4B0] transition-colors"
                    data-testid={`judges-step-${step.n}`}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white flex-shrink-0 font-black text-lg"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.n}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span style={{ color: step.color }}>{step.icon}</span>
                        <h3 className="font-black text-base text-[#0D2137]">
                          {step.title[lang]}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step.desc[lang]}
                      </p>
                    </div>
                    <ArrowLeft
                      size={18}
                      className="text-muted-foreground flex-shrink-0"
                    />
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          <h2 className="text-xl font-black text-[#0D2137] mb-1 text-center">
            {T.whyTitle}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {T.whySub}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-12">
            {PILLARS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3"
                  style={{ backgroundColor: p.color }}
                >
                  {p.icon}
                </div>
                <h3 className="font-black text-sm text-[#0D2137] mb-1">
                  {p.title[lang]}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {p.desc[lang]}
                </p>
              </motion.div>
            ))}
          </div>

          <h2 className="text-xl font-black text-[#0D2137] mb-1 text-center">
            {T.promisesTitle}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {T.promisesSub}
          </p>
          <div className="space-y-3 mb-12">
            {PROMISES.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#FFF7EE] border border-[#E0A858]/30 rounded-2xl p-4 flex items-start gap-3"
              >
                <CheckCircle2
                  size={22}
                  className="text-[#0BB4B0] flex-shrink-0 mt-0.5"
                />
                <div>
                  <div className="text-sm font-black text-[#0D2137] mb-1">
                    {p.title[lang]}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {p.desc[lang]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#0D2137] to-[#063048] rounded-3xl p-6 text-center text-white">
            <h3 className="text-lg font-black mb-2">{T.ctaTitle}</h3>
            <p className="text-xs text-white/70 mb-4 max-w-md mx-auto">
              {T.ctaDesc}
            </p>
            <div className="flex gap-2 flex-wrap justify-center">
              <Link
                href="/"
                className="bg-[#0BB4B0] hover:bg-[#099894] text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors"
              >
                {T.ctaHome}
              </Link>
              <Link
                href="/sources"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors border border-white/20"
              >
                {T.ctaSources}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
