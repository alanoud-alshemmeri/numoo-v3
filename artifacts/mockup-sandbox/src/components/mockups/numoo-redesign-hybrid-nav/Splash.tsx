import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  ClipboardList,
  Stethoscope,
  BotMessageSquare,
  Building2,
  Languages,
  LayoutGrid,
  CalendarDays,
  Quote,
  ChevronLeft,
  Home,
  BookOpen,
} from "lucide-react";

export default function Splash() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const tabs = [
    { icon: Home, label: "الرئيسية", active: true },
    { icon: Stethoscope, label: "المختصون", active: false },
    { icon: Building2, label: "المراكز", active: false },
    { icon: BookOpen, label: "المكتبة", active: false },
    { icon: BotMessageSquare, label: "المساعد", active: false },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen w-[402px] mx-auto bg-[#FFFFFF] text-[#0D2137] overflow-x-hidden font-sans relative shadow-2xl"
      style={{
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 1. NAVY HERO */}
      <section className="bg-[#0D2137] text-white pt-12 pb-10 relative border-b border-[#0BB4B0]">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23E0A858' stroke-width='0.5' opacity='0.03'/%3E%3C/svg%3E\")",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 px-6">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E0A858]" />
              <span className="text-xl font-bold tracking-tight text-white">
                نمو
              </span>
            </div>
            <div className="bg-[#E0A858]/10 text-[#E0A858] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-[#E0A858]/30">
              <CheckCircle2 className="w-3 h-3" />
              معتمد طبياً
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center text-center py-12"
          >
            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl font-medium leading-[1.4] text-white mb-6"
            >
              كل خطوة تكبر معه.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/70 text-[15px] leading-relaxed mb-10 font-normal"
            >
              رفيقكِ المتخصص في رحلة طفلكِ مع طيف التوحد. دليلكِ الموثوق
              للوضوح والهدوء.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-4 gap-2 mb-10 border-y border-[#0BB4B0] py-4"
          >
            <div className="text-center">
              <div className="text-[#E0A858] font-serif font-bold text-2xl mb-1">
                ٥٢
              </div>
              <div className="text-white/70 text-[10px] leading-tight">
                مقالة
                <br />
                متخصصة
              </div>
            </div>
            <div className="text-center border-r border-[#0BB4B0]/30">
              <div className="text-[#E0A858] font-serif font-bold text-2xl mb-1">
                ٥٩
              </div>
              <div className="text-white/70 text-[10px] leading-tight">
                طبيب
                <br />
                موثق
              </div>
            </div>
            <div className="text-center border-r border-[#0BB4B0]/30">
              <div className="text-[#E0A858] font-serif font-bold text-2xl mb-1">
                ٧
              </div>
              <div className="text-white/70 text-[10px] leading-tight">
                مركز
                <br />
                رسمي
              </div>
            </div>
            <div className="text-center border-r border-[#0BB4B0]/30">
              <div className="text-[#E0A858] font-serif font-bold text-2xl mb-1">
                ٢٤/٧
              </div>
              <div className="text-white/70 text-[10px] leading-tight">
                مساعد
                <br />
                ذكي
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-3"
          >
            <button className="w-full bg-[#0BB4B0] hover:bg-[#0BB4B0]/90 text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors">
              <ClipboardList className="w-5 h-5" />
              <span>ابدئي تقييم M-CHAT-R™</span>
            </button>
            <button className="w-full bg-transparent border border-white/20 hover:bg-white/5 text-white font-semibold py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors">
              <Stethoscope className="w-5 h-5" />
              <span>تصفّح المختصين</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. WHITE SECTION — "خدماتنا الأساسية" */}
      <section className="py-10 px-6 bg-[#FFFFFF]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUp}
            className="text-xl font-bold text-[#0D2137] mb-6 flex items-center gap-2"
          >
            <div className="w-1.5 h-6 bg-[#0BB4B0] rounded-full"></div>
            خدماتنا الأساسية
          </motion.h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: BotMessageSquare,
                title: "المساعد الذكي",
                desc: "إجابات موثقة من ٥٢ مقالة",
                dot: true,
              },
              {
                icon: Stethoscope,
                title: "دليل الأطباء",
                desc: "٥٩ مختصاً في الكويت",
                dot: false,
              },
              {
                icon: Building2,
                title: "مراكز التقييم",
                desc: "٧ مراكز حكومية رسمية",
                dot: false,
              },
              {
                icon: Languages,
                title: "ترجمة التقارير",
                desc: "شرح التقارير الطبية بوضوح",
                dot: true,
              },
              {
                icon: CalendarDays,
                title: "الجدول البصري",
                desc: "تنظيم الروتين اليومي",
                dot: false,
              },
              {
                icon: LayoutGrid,
                title: "لوحة التواصل",
                desc: "لغة بصرية معتمدة (AAC)",
                dot: false,
              },
            ].map((service, idx) => (
              <motion.div
                variants={fadeUp}
                key={idx}
                className="border border-[#0D2137]/10 rounded-xl p-4 bg-white relative overflow-hidden group shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-[#FFF7EE] rounded-lg">
                    <service.icon className="w-5 h-5 text-[#0BB4B0]" />
                  </div>
                  {service.dot && (
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span className="text-[9px] text-slate-500 font-medium">
                        متاح الآن
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-[#0D2137] font-bold text-sm mb-1">
                  {service.title}
                </h3>
                <p className="text-[#475569] text-xs leading-relaxed line-clamp-2 pb-2">
                  {service.desc}
                </p>
                <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#0D2137]/5 to-transparent"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. SAND SECTION — "صوت الأمهات" */}
      <section className="py-14 px-6 bg-[#FFF7EE] relative">
        <div className="absolute right-[35px] top-[80px] bottom-[40px] w-[1px] bg-gradient-to-b from-[#E0A858]/0 via-[#E0A858]/40 to-[#E0A858]/0 z-0" />

        <div className="mb-10 text-center relative z-10">
          <h3 className="text-xl font-bold text-[#0D2137] mb-2 font-serif">
            صوت الأمهات
          </h3>
          <p className="text-sm text-[#475569]">لستِ وحدكِ في هذا المسار</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="flex flex-col gap-6 relative z-10 pl-2 pr-6"
        >
          <motion.div
            variants={fadeUp}
            className="bg-white p-5 rounded-2xl shadow-sm border border-[#0D2137]/5 border-r-2 border-r-[#E0A858] relative"
          >
            <Quote className="w-6 h-6 text-[#E0A858]/20 absolute -top-3 -right-2 bg-white px-1" />
            <p className="text-[#0D2137] font-serif italic text-[15px] leading-relaxed mb-3">
              "لمّا حصلتُ على تشخيص ابني كنتُ ضائعة تماماً. نمو فتح لي الطريق
              وأضاء لي الخطوات الأولى."
            </p>
            <p className="text-xs text-[#94A3B8]">— أم من الكويت</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-white p-5 rounded-2xl shadow-sm border border-[#0D2137]/5 border-r-2 border-r-[#E0A858] relative"
          >
            <Quote className="w-6 h-6 text-[#E0A858]/20 absolute -top-3 -right-2 bg-white px-1" />
            <p className="text-[#0D2137] font-serif italic text-[15px] leading-relaxed mb-3">
              "ترجمة التقارير الطبية بلغة نفهمها سهّلت علينا التواصل مع
              العائلة والمدرسة."
            </p>
            <p className="text-xs text-[#94A3B8]">— أم من الكويت</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-white p-5 rounded-2xl shadow-sm border border-[#0D2137]/5 border-r-2 border-r-[#E0A858] relative"
          >
            <Quote className="w-6 h-6 text-[#E0A858]/20 absolute -top-3 -right-2 bg-white px-1" />
            <p className="text-[#0D2137] font-serif italic text-[15px] leading-relaxed mb-3">
              "الجدول البصري غيّر روتيننا اليومي. ابنتي أصبحت أكثر هدوءاً لأنها
              تعرف ما سيحدث."
            </p>
            <p className="text-xs text-[#94A3B8]">— أم من الكويت</p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. CULTURAL STRIP — رمضان كريم */}
      <section className="py-6 px-6 bg-[#FFF7EE] border-y border-[#E0A858]/10 text-center">
        <p className="text-[#E0A858] italic font-serif text-[15px] mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3" />
          رمضان كريم • العيد مبارك
          <Sparkles className="w-3 h-3" />
        </p>
        <p className="text-[#475569] text-xs max-w-[280px] mx-auto">
          وضع خاص لدعم التحديات الحسية خلال مواسم الصيام والاحتفالات.
        </p>
      </section>

      {/* 5. NAVY BOTTOM CTA */}
      <section className="bg-[#0D2137] py-12 px-6 text-center text-white relative overflow-hidden flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 w-full max-w-[320px]"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-1 text-[#E0A858] mb-3"
          >
            <Sparkles className="w-3 h-3" />
            <span className="text-xs font-medium">رحلة نمو تبدأ الآن</span>
            <Sparkles className="w-3 h-3" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold mb-8 leading-snug"
          >
            ابدئي اليوم.
            <br />
            مجاناً تماماً.
          </motion.h2>

          <motion.button
            variants={fadeUp}
            className="w-full bg-[#0BB4B0] hover:bg-[#0BB4B0]/90 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-colors text-lg shadow-lg shadow-[#0BB4B0]/20"
          >
            <span>انضمي إلى المنصة</span>
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>

      {/* 6. BOTTOM TAB BAR — sticky in production, shown inline here for preview */}
      <nav
        aria-label="التنقّل الرئيسي"
        className="bg-white border-t border-[#0D2137]/10 px-2 pt-2 pb-3 shadow-[0_-4px_20px_rgba(13,33,55,0.06)]"
      >
        <ul className="flex items-stretch justify-around">
          {tabs.map((tab, idx) => {
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
                  <span
                    className={`relative flex items-center justify-center ${
                      tab.active ? "" : ""
                    }`}
                  >
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
