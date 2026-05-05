import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Calendar,
  MapPin,
  Stethoscope,
  ShieldCheck,
  Building2,
  BookOpen,
  Bot,
  Printer,
  Heart,
  MessageSquareText,
  Award,
  ArrowLeft,
  BookMarked,
  Info,
  FileText,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { useT } from "@/lib/i18n";
import { useLangStore } from "@/lib/lang-store";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ARTICLES } from "@/lib/library";
import { useAssessmentStore } from "@/lib/store";

const toArabic = (n: number) =>
  n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);

type Bilingual = { ar: string; en: string };

type SectionItem = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: Bilingual;
  desc: Bilingual;
  href: string;
  badge?: { text: Bilingual; tone: "teal" | "gold" };
  count?: Bilingual;
};

const TXT = {
  ar: {
    welcomeMother: (name: string) => `أهلاً بِكِ يا أم ${name}`,
    sectionDiagnosis: "التشخيص والمختصون",
    sectionKnowledge: "المعرفة والمحتوى",
    sectionDailyTools: "أدوات يومية",
    sectionFamily: "الأم والعائلة",
    centersTileTitle: "مراكز متخصصة في الكويت",
    centersTileDesc: "جلسات وتدخّل مبكر",
    libraryTitle: "مكتبة المراجع الموثوقة",
    librarySources: "من Mayo · Hopkins · CDC · Yale · WHO",
    libraryCount: (n: string) => `${n} مقالة موثوقة`,
    badgeNew: "جديد",
    badgeOfficial: "رسمي",
    badgeTransparency: "شفافية",
    badgeSpecial: "خاص",
    momTitle: "نمو لكِ",
    momDesc: "تنفّس ومذكّرة الأم — لأنكِ لستِ وحدكِ",
    onboardTitle: "عرّفينا على طفلكِ",
    onboardDesc: "٣٠ ثانية — نخصّص التطبيق لكِ ولطفلكِ",
    judgesTitle: "للجنة التحكيم",
    judgesDesc: "جولة في ٦٠ ثانية تعرض المنصة كاملة",
  },
  en: {
    welcomeMother: (name: string) => `Welcome, mother of ${name}`,
    sectionDiagnosis: "Diagnosis & Specialists",
    sectionKnowledge: "Knowledge & Content",
    sectionDailyTools: "Daily Tools",
    sectionFamily: "Mother & Family",
    centersTileTitle: "Specialized centers in Kuwait",
    centersTileDesc: "Sessions and early intervention",
    libraryTitle: "Trusted reference library",
    librarySources: "From Mayo · Hopkins · CDC · Yale · WHO",
    libraryCount: (n: string) => `${n} trusted articles`,
    badgeNew: "New",
    badgeOfficial: "Official",
    badgeTransparency: "Transparency",
    badgeSpecial: "Featured",
    momTitle: "Numoo for you",
    momDesc: "Breathing and a mother's journal — because you are not alone",
    onboardTitle: "Tell us about your child",
    onboardDesc: "30 seconds — we'll tailor the app for you and your child",
    judgesTitle: "For the judging panel",
    judgesDesc: "A 60-second tour showcasing the full platform",
  },
} as const;

export default function Splash() {
  const { t } = useT();
  const { lang } = useLangStore();
  const T = TXT[lang];
  const [, setLocation] = useLocation();
  const childProfile = useAssessmentStore((s) => s.childProfile);
  const lastResult = useAssessmentStore((s) => s.riskLevel);

  const textAlign = lang === "ar" ? "text-right" : "text-left";
  const justifyEnd = lang === "ar" ? "justify-end" : "justify-start";

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-2 mt-2 mb-2 px-1">
      <span className="h-px flex-1 bg-white/10" />
      <span className="text-[10px] font-black tracking-[0.2em] text-[#E0A858]">
        {title}
      </span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );

  const TileGrid = ({ items }: { items: SectionItem[] }) => (
    <div className="grid grid-cols-2 gap-2.5">
      {items.map((it, i) => {
        const Icon = it.icon;
        return (
          <button
            key={i}
            onClick={() => setLocation(it.href)}
            className={`bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-primary/40 rounded-2xl p-3 ${textAlign} transition-all group`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                <Icon className="w-[18px] h-[18px] text-primary" strokeWidth={2} />
              </div>
              {it.badge && (
                <span
                  className={`text-[8.5px] px-1.5 py-0.5 rounded-full font-black ${
                    it.badge.tone === "gold"
                      ? "bg-[#E0A858]/25 text-[#E0A858]"
                      : "bg-primary/25 text-primary"
                  }`}
                >
                  {it.badge.text[lang]}
                </span>
              )}
              {it.count && (
                <span className="text-[10px] font-extrabold text-primary">
                  {it.count[lang]}
                </span>
              )}
            </div>
            <div className="font-bold text-white text-[12px] leading-tight mb-0.5">
              {it.title[lang]}
            </div>
            <div className="text-[10px] text-white/60 leading-tight">
              {it.desc[lang]}
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <Layout hideNav={false}>
      <div className="relative min-h-[90vh] flex flex-col items-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0D2137] to-[#063048] text-white px-6 py-16 pb-32">
        {/* Decorative backgrounds */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] animate-pulse pointer-events-none"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
          {/* HERO — Logo + Name + Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-24 bg-primary rounded-[28px] p-2 shadow-[0_18px_55px_rgba(10,191,188,0.38)] mb-5 flex items-center justify-center overflow-hidden"
          >
            <img
              src="/numoo-logo.png"
              alt="Numoo Logo"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-black bg-gradient-to-br from-white to-primary text-transparent bg-clip-text mb-2 tracking-tight"
          >
            {t("appTitle")}
          </motion.h1>

          {childProfile?.name ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm font-bold text-[#E0A858] mb-3 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {T.welcomeMother(childProfile.name)}
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm font-bold text-white/70 mb-3"
            >
              {t("splashDesc")}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[13px] text-white/80 leading-relaxed mb-5 max-w-sm"
          >
            {t("appTagline")}
          </motion.p>

          {/* 3 stat chips */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full grid grid-cols-3 gap-2 mb-6"
          >
            {[
              {
                icon: ClipboardList,
                top: t("earlyScreening"),
                bottom: t("mchat"),
              },
              {
                icon: Calendar,
                top: t("weeklyPlan"),
                bottom: t("atHome"),
              },
              {
                icon: MapPin,
                top: t("centersGuide"),
                bottom: t("inKuwait"),
              },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="bg-white/[0.06] border border-white/10 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center gap-1"
                >
                  <Icon className="w-4 h-4 text-primary" strokeWidth={2} />
                  <span className="text-[10px] text-white/70 leading-tight">
                    {c.top}
                  </span>
                  <strong className="text-[10px] text-white block leading-tight">
                    {c.bottom}
                  </strong>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-full space-y-2.5"
          >
            {/* PRIMARY CTA */}
            <Button
              size="lg"
              className="w-full h-14 rounded-full text-lg font-bold bg-gradient-to-r from-primary to-[#089b98] hover:from-primary hover:to-primary shadow-[0_10px_38px_rgba(10,191,188,0.42)] hover:-translate-y-1 transition-all"
              onClick={() => setLocation("/privacy")}
            >
              {t("splashBtn")}
            </Button>

            {/* === SECTION 1: Diagnosis & Specialists === */}
            <SectionHeader title={T.sectionDiagnosis} />
            <TileGrid
              items={[
                {
                  icon: Stethoscope,
                  title: { ar: "دكاترة يستقبلون أطفالنا", en: "Doctors who welcome our kids" },
                  desc: { ar: "من تجارب الأمهات", en: "From mothers' experiences" },
                  href: "/doctors",
                  badge: { text: { ar: "جديد", en: "New" }, tone: "teal" },
                },
                {
                  icon: ShieldCheck,
                  title: { ar: "أماكن التقييم الرسمية", en: "Official assessment centers" },
                  desc: { ar: "جهات معتمدة حكومياً", en: "Government-approved entities" },
                  href: "/assessment-centers",
                  badge: { text: { ar: "رسمي", en: "Official" }, tone: "gold" },
                },
              ]}
            />
            <button
              onClick={() => setLocation("/centers")}
              className={`w-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-primary/40 rounded-2xl p-3 ${textAlign} transition-all`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-[18px] h-[18px] text-primary" strokeWidth={2} />
                </div>
                <div className={`flex-1 min-w-0 ${textAlign}`}>
                  <div className="font-bold text-white text-[13px] leading-tight">
                    {T.centersTileTitle}
                  </div>
                  <div className="text-[10px] text-white/60 leading-tight mt-0.5">
                    {T.centersTileDesc}
                  </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-white/40" />
              </div>
            </button>

            {/* === SECTION 2: Knowledge & Content === */}
            <SectionHeader title={T.sectionKnowledge} />
            <button
              onClick={() => setLocation("/library")}
              className={`w-full bg-white/[0.06] hover:bg-white/[0.1] border border-primary/25 hover:border-primary/50 rounded-2xl p-3.5 ${textAlign} transition-all group`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-primary" strokeWidth={2} />
                </div>
                <div className={`flex-1 min-w-0 ${textAlign}`}>
                  <div className={`flex items-center gap-1.5 ${justifyEnd} mb-0.5`}>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-black">
                      {T.badgeNew}
                    </span>
                    <span className="font-bold text-white text-[14px]">
                      {T.libraryTitle}
                    </span>
                  </div>
                  <div className="text-[10.5px] text-white/70 leading-tight mb-1">
                    {T.librarySources}
                  </div>
                  <div className="text-[10px] text-primary font-bold">
                    {T.libraryCount(lang === "ar" ? toArabic(ARTICLES.length) : String(ARTICLES.length))}
                  </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-white/40" />
              </div>
            </button>
            <TileGrid
              items={[
                {
                  icon: Bot,
                  title: { ar: t("navAsk"), en: "Ask Numoo" },
                  desc: { ar: "إجابات مبنية على مصادر طبية", en: "Answers grounded in medical sources" },
                  href: "/chatbot",
                },
                {
                  icon: BookMarked,
                  title: { ar: "مصادرنا", en: "Our sources" },
                  desc: { ar: "كل المراجع والروابط الموثوقة", en: "All trusted references and links" },
                  href: "/sources",
                  badge: { text: { ar: "شفافية", en: "Transparency" }, tone: "gold" },
                },
              ]}
            />

            {/* === SECTION 3: Daily Tools === */}
            <SectionHeader title={T.sectionDailyTools} />
            <TileGrid
              items={[
                {
                  icon: Printer,
                  title: { ar: "مكتبة طباعة", en: "Printables library" },
                  desc: { ar: "بطاقات بصرية جاهزة", en: "Ready-to-print visual cards" },
                  href: "/printables",
                  count: { ar: "٦", en: "6" },
                },
                {
                  icon: MessageSquareText,
                  title: { ar: "لوحة التواصل", en: "Communication board" },
                  desc: { ar: "للطفل غير الناطق", en: "For non-verbal children" },
                  href: "/aac",
                },
                {
                  icon: FileText,
                  title: { ar: "ورقة زيارة الدكتور", en: "Doctor visit sheet" },
                  desc: { ar: "ملخّص قابل للطباعة", en: "Printable summary" },
                  href: lastResult ? "/results/visit-prep" : "/privacy",
                  badge: { text: { ar: "جديد", en: "New" }, tone: "teal" },
                },
                {
                  icon: Info,
                  title: { ar: "عن نمو", en: "About Numoo" },
                  desc: { ar: "منهجيّتنا وفريقنا", en: "Our methodology and team" },
                  href: "/about",
                },
              ]}
            />

            {/* === SECTION 4: Mother & Family === */}
            <SectionHeader title={T.sectionFamily} />
            <button
              onClick={() => setLocation("/for-mom")}
              className={`w-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-primary/40 rounded-2xl p-3.5 ${textAlign} transition-all`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-primary" strokeWidth={2} />
                </div>
                <div className={`flex-1 min-w-0 ${textAlign}`}>
                  <div className="font-bold text-white text-[14px] leading-tight">
                    {T.momTitle}
                  </div>
                  <div className="text-[10.5px] text-white/70 leading-tight mt-0.5">
                    {T.momDesc}
                  </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-white/40" />
              </div>
            </button>

            {/* Onboarding CTA — only when no profile */}
            {!childProfile && (
              <button
                onClick={() => setLocation("/onboarding")}
                className={`w-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent hover:from-primary/30 border-2 border-dashed border-primary/40 hover:border-primary/70 rounded-2xl p-3.5 ${textAlign} transition-all`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/25 flex items-center justify-center flex-shrink-0">
                    <UserPlus className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                  <div className={`flex-1 min-w-0 ${textAlign}`}>
                    <div className={`font-bold text-white text-[14px] leading-tight flex items-center gap-1.5 ${justifyEnd}`}>
                      <Sparkles className="w-3.5 h-3.5 text-[#E0A858]" />
                      {T.onboardTitle}
                    </div>
                    <div className="text-[10.5px] text-white/70 leading-tight mt-0.5">
                      {T.onboardDesc}
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-primary" />
                </div>
              </button>
            )}
          </motion.div>

          {/* JUDGES — featured gold card */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={() => setLocation("/judges")}
            className={`mt-5 w-full bg-gradient-to-br from-[#E0A858]/25 via-[#E0A858]/15 to-[#E0A858]/5 border-2 border-[#E0A858]/50 rounded-2xl p-3.5 ${textAlign} hover:border-[#E0A858] transition-all group`}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#E0A858] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#E0A858]/30">
                <Award className="w-5 h-5 text-[#0D2137]" strokeWidth={2.4} />
              </div>
              <div className={`flex-1 min-w-0 ${textAlign}`}>
                <div className={`flex items-center gap-1.5 ${justifyEnd} mb-0.5`}>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#E0A858] text-[#0D2137] font-black">
                    {T.badgeSpecial}
                  </span>
                  <span className="font-bold text-white text-sm">
                    {T.judgesTitle}
                  </span>
                </div>
                <div className="text-[10px] text-white/70 leading-tight">
                  {T.judgesDesc}
                </div>
              </div>
              <ArrowLeft className="w-4 h-4 text-[#E0A858] group-hover:-translate-x-1 transition-transform" />
            </div>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 text-[11px] text-white/50 text-center leading-relaxed"
          >
            {t("pgTime")}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
