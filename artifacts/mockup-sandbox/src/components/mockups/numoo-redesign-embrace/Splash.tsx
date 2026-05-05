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
  Heart,
  Home,
  BookOpen,
} from "lucide-react";

export default function Splash() {
  const easeCurve = [0.4, 0, 0.2, 1] as const;

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: easeCurve } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
      className="min-h-[1700px] w-[402px] mx-auto bg-[#FFF7EE] text-[#0D2137] overflow-x-hidden font-sans relative shadow-2xl pb-20"
      style={{
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 1. HERO SECTION & APP IDENTITY */}
      <section
        className="relative pt-12 pb-16 px-6 text-center"
        style={{
          background:
            "radial-gradient(circle at 50% 120%, rgba(224, 168, 88, 0.25) 0%, rgba(255, 247, 238, 1) 70%)",
        }}
      >
        <div className="flex justify-between items-center mb-12 relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E0A858]" />
            <span className="text-2xl font-bold tracking-tight text-[#0D2137]">
              نمو
            </span>
          </div>
          <div className="bg-white/60 backdrop-blur-sm text-[#0D2137] px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-[#E0A858]/20 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0BB4B0]" />
            معتمد طبياً
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center relative z-10"
        >
          <motion.h1
            variants={fadeUp}
            className="text-[40px] font-medium leading-[1.3] text-[#0D2137] mb-6"
            style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
          >
            نحن هنا لنحمل عنكِ ثقل القلق.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[#0D2137]/70 text-[16px] leading-relaxed mb-10 max-w-[300px]"
          >
            رفيقكِ المتخصص في رحلة طفلكِ مع طيف التوحد. مساحة آمنة، أدوات موثوقة، ووضوح تام.
          </motion.p>
        </motion.div>
      </section>

      {/* 3. NUMBERS / CREDIBILITY ROW */}
      <section className="px-6 pb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(13,33,55,0.04)] border border-[#E0A858]/10"
        >
          <div className="grid grid-cols-4 gap-2">
            <motion.div variants={fadeUp} className="text-center">
              <div className="text-[#E0A858] font-serif font-bold text-2xl mb-1">
                ٥٢
              </div>
              <div className="text-[#0D2137]/60 text-[10px] leading-tight">
                مقالة
                <br />
                متخصصة
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="text-center border-r border-[#0D2137]/5"
            >
              <div className="text-[#E0A858] font-serif font-bold text-2xl mb-1">
                ٥٩
              </div>
              <div className="text-[#0D2137]/60 text-[10px] leading-tight">
                طبيب
                <br />
                موثق
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="text-center border-r border-[#0D2137]/5"
            >
              <div className="text-[#E0A858] font-serif font-bold text-2xl mb-1">
                ٧
              </div>
              <div className="text-[#0D2137]/60 text-[10px] leading-tight">
                مراكز
                <br />
                رسمية
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="text-center border-r border-[#0D2137]/5"
            >
              <div className="text-[#E0A858] font-serif font-bold text-2xl mb-1">
                ٦
              </div>
              <div className="text-[#0D2137]/60 text-[10px] leading-tight">
                أدلة
                <br />
                مطبوعة
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 4. PRIMARY CTAs */}
      <section className="px-6 pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col gap-4"
        >
          <motion.button
            variants={fadeUp}
            className="w-full bg-[#0D2137] hover:bg-[#0D2137]/90 text-white font-medium py-4 rounded-[24px] flex items-center justify-center gap-3 transition-colors shadow-lg shadow-[#0D2137]/10"
          >
            <ClipboardList className="w-5 h-5 text-[#E0A858]" />
            <span className="text-[15px]">ابدئي تقييم M-CHAT-R™</span>
          </motion.button>
          <motion.button
            variants={fadeUp}
            className="w-full bg-white hover:bg-gray-50 text-[#0D2137] font-medium py-4 rounded-[24px] flex items-center justify-center gap-3 transition-colors border border-[#0D2137]/10 shadow-sm"
          >
            <Stethoscope className="w-5 h-5 text-[#0BB4B0]" />
            <span className="text-[15px]">تصفّح المختصين في الكويت</span>
          </motion.button>
        </motion.div>
      </section>

      {/* 5. SERVICES GRID */}
      <section className="px-6 pb-16">
        <div className="mb-8 text-center">
          <h2
            className="text-2xl font-medium text-[#0D2137] mb-2"
            style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
          >
            دعم متكامل
          </h2>
          <p className="text-[#0D2137]/60 text-sm">
            كل ما تحتاجينه في مكان واحد
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 gap-4"
        >
          {[
            {
              icon: BotMessageSquare,
              title: "المساعد الذكي",
              desc: "إجابات موثقة لحيرتك",
            },
            {
              icon: Stethoscope,
              title: "دليل الأطباء",
              desc: "أفضل المختصين محلياً",
            },
            {
              icon: Building2,
              title: "مراكز التقييم",
              desc: "أماكن رسمية ومعتمدة",
            },
            {
              icon: Languages,
              title: "ترجمة التقارير",
              desc: "فهم أعمق لحالة طفلك",
            },
            {
              icon: CalendarDays,
              title: "الجدول البصري",
              desc: "روتين يومي هادئ",
            },
            {
              icon: LayoutGrid,
              title: "لوحة التواصل",
              desc: "لغة بصرية AAC",
            },
          ].map((service, idx) => (
            <motion.div
              variants={fadeUp}
              key={idx}
              className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(13,33,55,0.03)] border border-[#0D2137]/5 flex flex-col items-start"
            >
              <div className="p-2.5 bg-[#FFF7EE] rounded-2xl mb-4">
                <service.icon className="w-5 h-5 text-[#0BB4B0]" />
              </div>
              <h3 className="text-[#0D2137] font-bold text-sm mb-1.5">
                {service.title}
              </h3>
              <p className="text-[#0D2137]/60 text-xs leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="px-6 pb-16">
        <div className="mb-8 text-center">
          <h2
            className="text-2xl font-medium text-[#0D2137] mb-2"
            style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
          >
            صوت الأمهات
          </h2>
          <p className="text-[#0D2137]/60 text-sm">
            لستِ وحدكِ في هذا المسار
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="flex flex-col gap-4"
        >
          <motion.div
            variants={fadeUp}
            className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(13,33,55,0.03)] border border-[#E0A858]/10 relative"
          >
            <Quote className="w-6 h-6 text-[#E0A858]/20 absolute top-4 left-6" />
            <p
              className="text-[#0D2137] text-[15px] leading-relaxed mb-4 mt-2"
              style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
            >
              "لمّا حصلتُ على تشخيص ابني كنتُ ضائعة تماماً. نمو فتح لي الطريق
              وأضاء لي الخطوات الأولى."
            </p>
            <div className="flex items-center gap-2">
              <Heart className="w-3 h-3 text-[#E0A858]" />
              <p className="text-xs text-[#0D2137]/50">— أم من الكويت</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(13,33,55,0.03)] border border-[#E0A858]/10 relative"
          >
            <Quote className="w-6 h-6 text-[#E0A858]/20 absolute top-4 left-6" />
            <p
              className="text-[#0D2137] text-[15px] leading-relaxed mb-4 mt-2"
              style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
            >
              "ترجمة التقارير الطبية بلغة نفهمها سهّلت علينا التواصل مع
              العائلة والمدرسة."
            </p>
            <div className="flex items-center gap-2">
              <Heart className="w-3 h-3 text-[#E0A858]" />
              <p className="text-xs text-[#0D2137]/50">— أم من الكويت</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(13,33,55,0.03)] border border-[#E0A858]/10 relative"
          >
            <Quote className="w-6 h-6 text-[#E0A858]/20 absolute top-4 left-6" />
            <p
              className="text-[#0D2137] text-[15px] leading-relaxed mb-4 mt-2"
              style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
            >
              "الجدول البصري غيّر روتيننا اليومي. ابنتي أصبحت أكثر هدوءاً لأنها
              تعرف ما سيحدث."
            </p>
            <div className="flex items-center gap-2">
              <Heart className="w-3 h-3 text-[#E0A858]" />
              <p className="text-xs text-[#0D2137]/50">— أم من الكويت</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 7. RAMADAN STRIP */}
      <section className="px-6 pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-[#E0A858]/5 rounded-3xl p-6 text-center border border-[#E0A858]/20"
        >
          <p
            className="text-[#E0A858] text-[16px] mb-2 flex items-center justify-center gap-2"
            style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
          >
            <Sparkles className="w-4 h-4" />
            رمضان كريم • العيد مبارك
            <Sparkles className="w-4 h-4" />
          </p>
          <p className="text-[#0D2137]/70 text-xs leading-relaxed max-w-[280px] mx-auto">
            وضع خاص لدعم التحديات الحسية خلال مواسم الصيام والاحتفالات، لبيئة
            عائلية هادئة.
          </p>
        </motion.div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="px-6 pb-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUp}
            className="text-[28px] font-medium text-[#0D2137] mb-6"
            style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", serif' }}
          >
            خطوة واحدة تفصلكِ عن الوضوح.
          </motion.h2>
          <motion.button
            variants={fadeUp}
            className="w-full bg-[#0BB4B0] hover:bg-[#0BB4B0]/90 text-white font-medium py-4 rounded-[24px] flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#0BB4B0]/20"
          >
            <span className="text-[16px]">انضمي إلى المنصة مجاناً</span>
          </motion.button>
        </motion.div>
      </section>

      {/* 9. BOTTOM TAB BAR */}
      <nav
        aria-label="التنقّل الرئيسي"
        className="bg-white border-t border-[#0D2137]/10 px-2 pt-2 pb-6 shadow-[0_-4px_20px_rgba(13,33,55,0.04)] fixed bottom-0 w-[402px] z-50 left-1/2 -translate-x-1/2"
      >
        <ul className="flex items-stretch justify-around">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            return (
              <li key={idx} className="flex-1">
                <button
                  type="button"
                  className={`w-full flex flex-col items-center gap-1.5 py-2 rounded-lg transition-colors ${
                    tab.active
                      ? "text-[#0BB4B0]"
                      : "text-[#475569] hover:text-[#0D2137]"
                  }`}
                  aria-current={tab.active ? "page" : undefined}
                >
                  <span className="relative flex items-center justify-center">
                    {tab.active && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-[#E0A858]" />
                    )}
                    <Icon
                      className="w-[22px] h-[22px]"
                      strokeWidth={tab.active ? 2.5 : 1.8}
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
