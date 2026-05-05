import React from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Stethoscope,
  Building2,
  BookOpen,
  BotMessageSquare,
  HeartHandshake,
  Landmark,
  Wrench,
  Bell,
  ArrowLeft,
  Home,
  Sparkles,
} from "lucide-react";

const LOGO_URL = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/numoo-logo.png`;

const TABS = [
  { icon: Home, label: "الرئيسية", active: true },
  { icon: BookOpen, label: "المكتبة", active: false },
  { icon: Stethoscope, label: "المختصون", active: false },
  { icon: Wrench, label: "الأدوات", active: false },
  { icon: BotMessageSquare, label: "المساعد", active: false },
];

const STATS = [
  { n: "٥٢", l: "مقالة" },
  { n: "٥٩", l: "طبيب" },
  { n: "٧", l: "مراكز" },
  { n: "٦", l: "أدلة" },
];

export default function Splash() {
  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen w-[402px] mx-auto bg-[#FFF7EE] text-[#0D2137] overflow-x-hidden font-sans relative"
      style={{
        fontFamily:
          "'Tajawal', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Decorative blob */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-[260px] h-[260px] rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(11,180,176,0.55) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-[120px] right-[-60px] w-[200px] h-[200px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(224,168,88,0.55) 0%, transparent 70%)",
        }}
      />

      {/* HEADER — compact */}
      <header className="relative z-10 flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center ring-1 ring-[#0BB4B0]/15">
            <img
              src={LOGO_URL}
              alt="نمو"
              className="w-9 h-9 object-contain"
            />
          </div>
          <div className="leading-tight">
            <div className="text-[#0D2137] font-extrabold text-[18px]">
              نمو
            </div>
            <div className="text-[#475569] text-[10px] font-medium">
              رفيقكِ في رحلة طيف التوحد
            </div>
          </div>
        </div>
        <button
          type="button"
          aria-label="الإشعارات"
          className="relative w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
        >
          <Bell className="w-4 h-4 text-[#0D2137]" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#E0A858]" />
        </button>
      </header>

      {/* GREETING */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 px-5 pt-5"
      >
        <motion.h1
          variants={fadeUp}
          className="text-[#0D2137] text-[26px] font-extrabold leading-tight tracking-tight"
        >
          أهلاً بكِ في
          <span className="text-[#0BB4B0]"> نمو</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-[#475569] text-[12.5px] mt-1 leading-relaxed"
        >
          محتوى موثوق وأدوات عملية لرحلة طفلكِ.
        </motion.p>

        {/* Inline stats — compact */}
        <motion.div
          variants={fadeUp}
          className="mt-3 flex items-center justify-between bg-white/70 backdrop-blur rounded-2xl px-4 py-2.5 border border-white"
        >
          {STATS.map((s, i) => (
            <React.Fragment key={i}>
              <div className="text-center">
                <div className="text-[#0D2137] text-[15px] font-extrabold leading-none">
                  {s.n}
                </div>
                <div className="text-[#94A3B8] text-[9px] mt-0.5 leading-none">
                  {s.l}
                </div>
              </div>
              {i < STATS.length - 1 && (
                <span className="w-px h-6 bg-[#0D2137]/10" />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </motion.section>

      {/* BENTO GRID */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 px-5 pt-4 pb-32 grid grid-cols-2 gap-2.5"
      >
        {/* HERO TILE — M-CHAT-R, full width, premium gradient */}
        <motion.button
          variants={fadeUp}
          type="button"
          className="col-span-2 relative overflow-hidden rounded-3xl text-right p-5 text-white shadow-lg shadow-[#0D2137]/20"
          style={{
            background:
              "linear-gradient(135deg, #0BB4B0 0%, #0D2137 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-white/10"
          />
          <div
            aria-hidden
            className="absolute -left-2 bottom-2 w-16 h-16 rounded-full bg-[#E0A858]/20"
          />
          <div className="relative">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="bg-[#E0A858] text-[#0D2137] text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                ابدئي هنا
              </span>
              <Sparkles className="w-3 h-3 text-[#E0A858]" />
            </div>
            <h2 className="text-[20px] font-extrabold leading-tight mb-1">
              تقييم M-CHAT-R™
            </h2>
            <p className="text-white/85 text-[12px] leading-snug mb-4 max-w-[240px]">
              أداة فحص مبدئي معتمدة طبياً، تأخذ ٥ دقائق فقط.
            </p>
            <div className="inline-flex items-center gap-1.5 bg-white text-[#0D2137] font-bold text-[12px] px-3.5 py-2 rounded-full shadow-md">
              <span>ابدئي الآن</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            <div
              aria-hidden
              className="absolute left-1 bottom-0 w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center"
            >
              <ClipboardList className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.button>

        {/* المكتبة — count tile */}
        <motion.button
          variants={fadeUp}
          type="button"
          className="relative overflow-hidden rounded-3xl bg-white p-4 text-right shadow-sm border border-[#0D2137]/5"
        >
          <div className="w-9 h-9 rounded-xl bg-[#E6F7F6] flex items-center justify-center mb-3">
            <BookOpen className="w-[18px] h-[18px] text-[#0BB4B0]" />
          </div>
          <div className="text-[#0BB4B0] text-[22px] font-extrabold leading-none">
            ٥٢
          </div>
          <div className="text-[#0D2137] font-bold text-[13px] mt-1 leading-tight">
            المكتبة
          </div>
          <div className="text-[#94A3B8] text-[10px] leading-tight">
            مقالة موثوقة
          </div>
        </motion.button>

        {/* المختصون — count tile */}
        <motion.button
          variants={fadeUp}
          type="button"
          className="relative overflow-hidden rounded-3xl bg-white p-4 text-right shadow-sm border border-[#0D2137]/5"
        >
          <div className="w-9 h-9 rounded-xl bg-[#FFF7EE] flex items-center justify-center mb-3">
            <Stethoscope className="w-[18px] h-[18px] text-[#B8862F]" />
          </div>
          <div className="text-[#B8862F] text-[22px] font-extrabold leading-none">
            ٥٩
          </div>
          <div className="text-[#0D2137] font-bold text-[13px] mt-1 leading-tight">
            المختصون
          </div>
          <div className="text-[#94A3B8] text-[10px] leading-tight">
            طبيب وأخصائي
          </div>
        </motion.button>

        {/* المراكز */}
        <motion.button
          variants={fadeUp}
          type="button"
          className="relative overflow-hidden rounded-3xl bg-white p-4 text-right shadow-sm border border-[#0D2137]/5"
        >
          <div className="w-9 h-9 rounded-xl bg-[#E6F7F6] flex items-center justify-center mb-3">
            <Building2 className="w-[18px] h-[18px] text-[#0BB4B0]" />
          </div>
          <div className="text-[#0BB4B0] text-[22px] font-extrabold leading-none">
            ٧
          </div>
          <div className="text-[#0D2137] font-bold text-[13px] mt-1 leading-tight">
            المراكز
          </div>
          <div className="text-[#94A3B8] text-[10px] leading-tight">
            مراكز معتمدة
          </div>
        </motion.button>

        {/* الأدوات */}
        <motion.button
          variants={fadeUp}
          type="button"
          className="relative overflow-hidden rounded-3xl bg-white p-4 text-right shadow-sm border border-[#0D2137]/5"
        >
          <div className="w-9 h-9 rounded-xl bg-[#FBF1E0] flex items-center justify-center mb-3">
            <Wrench className="w-[18px] h-[18px] text-[#B8862F]" />
          </div>
          <div className="text-[#B8862F] text-[22px] font-extrabold leading-none">
            ٦
          </div>
          <div className="text-[#0D2137] font-bold text-[13px] mt-1 leading-tight">
            الأدوات
          </div>
          <div className="text-[#94A3B8] text-[10px] leading-tight">
            جدول • AAC • أدلة
          </div>
        </motion.button>

        {/* المساعد الذكي — wide tile */}
        <motion.button
          variants={fadeUp}
          type="button"
          className="col-span-2 relative overflow-hidden rounded-3xl bg-[#0D2137] p-4 text-right text-white shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0BB4B0] animate-pulse" />
                <span className="text-[#0BB4B0] text-[10px] font-bold">
                  متاح الآن
                </span>
              </div>
              <div className="text-white font-extrabold text-[15px] leading-tight">
                المساعد الذكي
              </div>
              <div className="text-white/65 text-[11px] mt-0.5">
                اسألي بأي وقت — إجابات مبنية على مصادر طبية
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#0BB4B0]/20 flex items-center justify-center flex-shrink-0">
              <BotMessageSquare className="w-6 h-6 text-[#0BB4B0]" />
            </div>
          </div>
        </motion.button>

        {/* ركن الأم */}
        <motion.button
          variants={fadeUp}
          type="button"
          className="relative overflow-hidden rounded-3xl bg-white p-4 text-right shadow-sm border border-[#0D2137]/5"
        >
          <div className="w-9 h-9 rounded-xl bg-[#E6F7F6] flex items-center justify-center mb-2">
            <HeartHandshake className="w-[18px] h-[18px] text-[#0BB4B0]" />
          </div>
          <div className="text-[#0D2137] font-bold text-[13px] leading-tight">
            ركن الأم
          </div>
          <div className="text-[#94A3B8] text-[10px] mt-0.5 leading-tight">
            دعم نفسي ومجتمع
          </div>
        </motion.button>

        {/* الدعم الحكومي */}
        <motion.button
          variants={fadeUp}
          type="button"
          className="relative overflow-hidden rounded-3xl bg-white p-4 text-right shadow-sm border border-[#0D2137]/5"
        >
          <div className="w-9 h-9 rounded-xl bg-[#FFF7EE] flex items-center justify-center mb-2">
            <Landmark className="w-[18px] h-[18px] text-[#0D2137]" />
          </div>
          <div className="text-[#0D2137] font-bold text-[13px] leading-tight">
            الدعم الرسمي
          </div>
          <div className="text-[#94A3B8] text-[10px] mt-0.5 leading-tight">
            خدمات حكومية في الكويت
          </div>
        </motion.button>
      </motion.section>

      {/* FLOATING BOTTOM TAB BAR */}
      <nav
        aria-label="التنقّل الرئيسي"
        className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[378px] z-30"
      >
        <div className="bg-white rounded-[28px] shadow-[0_10px_30px_rgba(13,33,55,0.18)] border border-[#0D2137]/5 px-2 py-2">
          <ul className="flex items-stretch justify-around">
            {TABS.map((tab, idx) => {
              const Icon = tab.icon;
              return (
                <li key={idx} className="flex-1">
                  <button
                    type="button"
                    aria-current={tab.active ? "page" : undefined}
                    className={`w-full flex flex-col items-center gap-0.5 py-1.5 rounded-2xl transition-colors ${
                      tab.active ? "bg-[#0BB4B0] text-white" : "text-[#475569]"
                    }`}
                  >
                    <Icon
                      className="w-[18px] h-[18px]"
                      strokeWidth={tab.active ? 2.4 : 1.8}
                    />
                    <span
                      className={`text-[9.5px] leading-none ${
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
        </div>
      </nav>
    </div>
  );
}
