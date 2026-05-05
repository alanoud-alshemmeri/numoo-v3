import React from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Stethoscope,
  Building2,
  Languages,
  BookOpen,
  BotMessageSquare,
  CalendarDays,
  LayoutGrid,
  Printer,
  HeartHandshake,
  MoonStar,
  Users,
  Landmark,
  ChevronLeft,
  Home,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const LOGO_URL = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/numoo-logo.png`;

type CategoryItem = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  meta?: string;
};

type Category = {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  bg: string;
  iconColor: string;
  items: CategoryItem[];
};

const CATEGORIES: Category[] = [
  {
    id: "start",
    title: "ابدئي رحلتك",
    subtitle: "أدوات التشخيص المبدئي والتقييم",
    accent: "#0BB4B0",
    bg: "#E6F7F6",
    iconColor: "#0BB4B0",
    items: [
      { icon: ClipboardList, title: "تقييم M-CHAT-R™", meta: "٢٠ سؤالاً" },
      { icon: Building2, title: "مراكز التقييم الرسمية", meta: "٧ مراكز" },
      { icon: Stethoscope, title: "دليل المختصين", meta: "٥٩ طبيباً" },
    ],
  },
  {
    id: "knowledge",
    title: "المعرفة والوعي",
    subtitle: "محتوى موثوق بمراجعة طبية",
    accent: "#0D2137",
    bg: "#FFF7EE",
    iconColor: "#0D2137",
    items: [
      { icon: BookOpen, title: "المكتبة المتخصصة", meta: "٥٢ مقالة" },
      { icon: BotMessageSquare, title: "المساعد الذكي", meta: "متاح ٢٤/٧" },
      { icon: Languages, title: "ترجمة التقارير الطبية" },
    ],
  },
  {
    id: "tools",
    title: "أدوات يومية",
    subtitle: "دعم عملي للروتين والتواصل",
    accent: "#E0A858",
    bg: "#FBF1E0",
    iconColor: "#B8862F",
    items: [
      { icon: CalendarDays, title: "الجدول البصري" },
      { icon: LayoutGrid, title: "لوحة التواصل (AAC)" },
      { icon: Printer, title: "أدلة مطبوعة", meta: "٦ أدلة" },
    ],
  },
  {
    id: "family",
    title: "دعم الأم والعائلة",
    subtitle: "لأنكِ لستِ وحدكِ في هذا المسار",
    accent: "#0BB4B0",
    bg: "#E6F7F6",
    iconColor: "#0BB4B0",
    items: [
      { icon: HeartHandshake, title: "ركن الأم" },
      { icon: Users, title: "مجتمع الأمهات" },
      { icon: MoonStar, title: "وضع رمضان والمواسم" },
    ],
  },
  {
    id: "official",
    title: "الدعم الرسمي",
    subtitle: "الخدمات الحكومية وورش العمل",
    accent: "#0D2137",
    bg: "#FFF7EE",
    iconColor: "#0D2137",
    items: [
      { icon: Landmark, title: "الدعم الحكومي في الكويت" },
      { icon: CalendarDays, title: "ورش العمل القادمة" },
    ],
  },
];

const TABS = [
  { icon: Home, label: "الرئيسية", active: true },
  { icon: Stethoscope, label: "المختصون", active: false },
  { icon: Building2, label: "المراكز", active: false },
  { icon: BookOpen, label: "المكتبة", active: false },
  { icon: BotMessageSquare, label: "المساعد", active: false },
];

export default function Splash() {
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen w-[402px] mx-auto bg-[#FAFBFC] text-[#0D2137] overflow-x-hidden font-sans relative shadow-2xl"
      style={{
        fontFamily:
          "'Tajawal', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* HERO — Teal forward, logo first */}
      <section className="relative bg-gradient-to-b from-[#0BB4B0] to-[#0AA09C] text-white pt-8 pb-10 px-6 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 0%, white 0%, transparent 35%), radial-gradient(circle at 80% 100%, white 0%, transparent 35%)",
          }}
        />

        <div className="relative z-10">
          {/* Top bar: trust badge + nothing else (logo is the hero) */}
          <div className="flex justify-end mb-4">
            <div className="bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 border border-white/25">
              <CheckCircle2 className="w-3 h-3" />
              معتمد طبياً
            </div>
          </div>

          {/* Logo + name */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              variants={fadeUp}
              className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-4 ring-4 ring-white/30"
            >
              <img
                src={LOGO_URL}
                alt="نمو"
                className="w-16 h-16 object-contain"
              />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-3xl font-extrabold mb-2 tracking-tight"
            >
              نمو
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/85 text-[14px] leading-relaxed max-w-[300px] mb-6"
            >
              رفيقكِ المتخصص في رحلة طفلكِ مع طيف التوحد. كل ما تحتاجينه في مكان واحد.
            </motion.p>

            {/* Stat row inside hero */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-4 gap-2 w-full max-w-[340px] bg-white/10 backdrop-blur-sm rounded-2xl py-3 px-2 border border-white/15"
            >
              {[
                { n: "٥٢", l: "مقالة" },
                { n: "٥٩", l: "طبيب" },
                { n: "٧", l: "مراكز" },
                { n: "٦", l: "أدلة" },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`text-center ${
                    i < 3 ? "border-l border-white/20" : ""
                  }`}
                >
                  <div className="text-white text-xl font-extrabold leading-none mb-1">
                    {s.n}
                  </div>
                  <div className="text-white/75 text-[10px] leading-tight">
                    {s.l}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PRIMARY CTA strip — sits half over the hero */}
      <section className="px-6 -mt-6 relative z-20">
        <button className="w-full bg-[#0D2137] hover:bg-[#0D2137]/95 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#0D2137]/20 transition-colors">
          <ClipboardList className="w-5 h-5" />
          <span>ابدئي تقييم M-CHAT-R™</span>
        </button>
      </section>

      {/* CATEGORIES — each one is a clear "section" */}
      <section className="px-5 py-8 space-y-5">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="bg-white rounded-2xl border border-[#0D2137]/8 overflow-hidden shadow-sm"
          >
            {/* Category header */}
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ backgroundColor: cat.bg }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-1 h-10 rounded-full"
                  style={{ backgroundColor: cat.accent }}
                />
                <div>
                  <h3 className="text-[#0D2137] font-bold text-[15px] leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-[#475569] text-[11px] mt-0.5 leading-tight">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
              <div
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  color: cat.accent,
                  backgroundColor: "white",
                  border: `1px solid ${cat.accent}30`,
                }}
              >
                {String(idx + 1).replace(/\d/g, (d) =>
                  "٠١٢٣٤٥٦٧٨٩"[Number(d)],
                )}
              </div>
            </div>

            {/* Category items */}
            <div className="divide-y divide-[#0D2137]/5">
              {cat.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={i}
                    variants={fadeUp}
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#FAFBFC] transition-colors text-right"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: cat.bg }}
                      >
                        <Icon
                          className="w-4 h-4"
                          strokeWidth={2}
                        />
                      </div>
                      <div>
                        <div className="text-[#0D2137] font-semibold text-[13px] leading-tight">
                          {item.title}
                        </div>
                        {item.meta && (
                          <div className="text-[#94A3B8] text-[10px] mt-0.5">
                            {item.meta}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </section>

      {/* TRUST FOOTER */}
      <section className="px-6 pb-6 pt-2 text-center">
        <p className="text-[10px] text-[#94A3B8] flex items-center justify-center gap-1.5 leading-relaxed">
          <Sparkles className="w-3 h-3" />
          محتوى تثقيفي لا يُغني عن استشارة المختص.
        </p>
      </section>

      {/* BOTTOM TAB BAR — sticky in production, inline here for preview */}
      <nav
        aria-label="التنقّل الرئيسي"
        className="bg-white border-t border-[#0D2137]/10 px-2 pt-2 pb-3 shadow-[0_-4px_20px_rgba(13,33,55,0.06)]"
      >
        <ul className="flex items-stretch justify-around">
          {TABS.map((tab, idx) => {
            const Icon = tab.icon;
            return (
              <li key={idx} className="flex-1">
                <button
                  type="button"
                  className={`w-full flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
                    tab.active
                      ? "text-[#0BB4B0]"
                      : "text-[#475569] hover:text-[#0D2137]"
                  }`}
                  aria-current={tab.active ? "page" : undefined}
                >
                  <span className="relative flex items-center justify-center">
                    {tab.active && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-[#E0A858]" />
                    )}
                    <Icon
                      className="w-5 h-5"
                      strokeWidth={tab.active ? 2.4 : 1.8}
                    />
                  </span>
                  <span
                    className={`text-[10px] leading-none ${
                      tab.active ? "font-bold" : "font-medium"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
