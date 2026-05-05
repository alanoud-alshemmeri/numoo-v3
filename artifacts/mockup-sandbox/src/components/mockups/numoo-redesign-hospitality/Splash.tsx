import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Quote, BookOpen, UserCheck, Stethoscope, HeartHandshake, ArrowLeft, ArrowUpRight } from "lucide-react";

export default function Splash() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div 
      dir="rtl" 
      className="min-h-[1400px] w-[402px] mx-auto bg-[#FFF7EE] text-[#0D2137] overflow-x-hidden font-sans relative shadow-xl"
      style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Hero Section */}
      <section 
        className="relative pt-12 pb-24 px-6 flex flex-col items-center text-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0D2137 0%, #0BB4B0 100%)",
        }}
      >
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23E0A858' stroke-width='0.5' opacity='0.15'/%3E%3C/svg%3E\")",
            backgroundSize: "40px 40px"
          }}
        />

        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Logo Mark */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 as const }}
            className="flex flex-col items-center mb-8"
          >
            <Sparkles className="w-5 h-5 text-[#E0A858] mb-2" />
            <h1 className="text-2xl font-bold text-[#E0A858] tracking-wider">نمو</h1>
            <div className="h-[1px] w-8 bg-[#E0A858]/50 mt-3" />
          </motion.div>

          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.span variants={fadeUp} className="text-[#E0A858] text-sm font-medium mb-4 tracking-wide">
              رحلة نمو
            </motion.span>
            
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white leading-tight mb-4 px-2" style={{ fontFamily: "serif" }}>
              في كل طفل، عالم.<br/>وفي كل أم، قائد.
            </motion.h2>
            
            <motion.p variants={fadeUp} className="text-white/80 text-[15px] leading-relaxed mb-10 max-w-[280px]">
              رفيقك المتخصص في رحلة طفلك مع طيف التوحد. دليلك الواضح في أوقات الحيرة.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col w-full gap-3 px-4">
              <a href="#" className="w-full py-3.5 rounded-full bg-[#E0A858] text-white font-semibold text-[15px] shadow-[0_4px_14px_rgba(224,168,88,0.4)] flex items-center justify-center gap-2 transition-transform active:scale-95">
                <span>ابدئي الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
              <a href="#" className="w-full py-3.5 rounded-full bg-transparent border border-white/30 text-white font-medium text-[15px] flex items-center justify-center transition-colors hover:bg-white/10 active:scale-95">
                تعرّفي على نمو
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative bottom curve */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#FFF7EE]" style={{ borderTopLeftRadius: "100%", borderTopRightRadius: "100%" }} />
      </section>

      {/* Stats Band */}
      <section className="py-6 border-b border-[#E0A858]/20 relative z-20 -mt-2">
        <div className="flex justify-center items-center gap-2 px-3 flex-wrap">
          <div className="flex flex-col items-center text-center min-w-[60px]">
            <span className="text-xl font-bold text-[#E0A858] mb-1 font-serif">٥٢</span>
            <span className="text-[11px] text-[#475569]">مقالة موثقة</span>
          </div>
          <div className="w-1.5 h-1.5 rotate-45 border border-[#E0A858]/50" />
          <div className="flex flex-col items-center text-center min-w-[60px]">
            <span className="text-xl font-bold text-[#E0A858] mb-1 font-serif">٥٩</span>
            <span className="text-[11px] text-[#475569]">مختصاً معتمداً</span>
          </div>
          <div className="w-1.5 h-1.5 rotate-45 border border-[#E0A858]/50" />
          <div className="flex flex-col items-center text-center min-w-[60px]">
            <span className="text-xl font-bold text-[#E0A858] mb-1 font-serif">٧</span>
            <span className="text-[11px] text-[#475569]">مراكز رسمية</span>
          </div>
          <div className="w-1.5 h-1.5 rotate-45 border border-[#E0A858]/50" />
          <div className="flex flex-col items-center text-center min-w-[60px]">
            <span className="text-xl font-bold text-[#E0A858] mb-1 font-serif">٦</span>
            <span className="text-[11px] text-[#475569]">أدلة مطبوعة</span>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-12 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
          <div className="text-center mb-10">
            <h3 className="text-xl font-bold text-[#0D2137] mb-2 font-serif">دعامة لكل خطوة</h3>
            <p className="text-sm text-[#475569]">أدوات مصممة خصيصاً للبيئة الكويتية</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div variants={fadeUp} className="bg-white rounded-xl p-5 shadow-sm border border-[#E0A858]/10 flex flex-col items-start relative group">
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#E0A858]/30 rounded-tr-xl opacity-50" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#E0A858]/30 rounded-bl-xl opacity-50" />
              
              <div className="w-10 h-10 flex items-center justify-center border border-[#E0A858]/40 rounded-lg mb-4 relative">
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#E0A858] rounded-full" />
                <BookOpen className="w-5 h-5 text-[#0BB4B0]" />
              </div>
              <h4 className="text-sm font-bold text-[#0D2137] mb-1.5">مكتبة موثقة</h4>
              <p className="text-xs text-[#475569] leading-relaxed">مقالات مبنية على أسس علمية وأدلة محلية.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white rounded-xl p-5 shadow-sm border border-[#E0A858]/10 flex flex-col items-start relative">
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#E0A858]/30 rounded-tr-xl opacity-50" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#E0A858]/30 rounded-bl-xl opacity-50" />
              
              <div className="w-10 h-10 flex items-center justify-center border border-[#E0A858]/40 rounded-lg mb-4 relative">
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#E0A858] rounded-full" />
                <UserCheck className="w-5 h-5 text-[#0BB4B0]" />
              </div>
              <h4 className="text-sm font-bold text-[#0D2137] mb-1.5">تقييم مبكر</h4>
              <p className="text-xs text-[#475569] leading-relaxed">أداة فحص M-CHAT-R™ معتمدة وسريعة.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white rounded-xl p-5 shadow-sm border border-[#E0A858]/10 flex flex-col items-start relative">
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#E0A858]/30 rounded-tr-xl opacity-50" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#E0A858]/30 rounded-bl-xl opacity-50" />
              
              <div className="w-10 h-10 flex items-center justify-center border border-[#E0A858]/40 rounded-lg mb-4 relative">
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#E0A858] rounded-full" />
                <Stethoscope className="w-5 h-5 text-[#0BB4B0]" />
              </div>
              <h4 className="text-sm font-bold text-[#0D2137] mb-1.5">أدلّة المختصين</h4>
              <p className="text-xs text-[#475569] leading-relaxed">دليل شامل للأطباء والمراكز في الكويت.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white rounded-xl p-5 shadow-sm border border-[#E0A858]/10 flex flex-col items-start relative">
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#E0A858]/30 rounded-tr-xl opacity-50" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#E0A858]/30 rounded-bl-xl opacity-50" />
              
              <div className="w-10 h-10 flex items-center justify-center border border-[#E0A858]/40 rounded-lg mb-4 relative">
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#E0A858] rounded-full" />
                <HeartHandshake className="w-5 h-5 text-[#0BB4B0]" />
              </div>
              <h4 className="text-sm font-bold text-[#0D2137] mb-1.5">دعم الأم</h4>
              <p className="text-xs text-[#475569] leading-relaxed">مساحة خاصة لرعايتك النفسية والذاتية.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Cultural Touch */}
      <section className="py-6 px-6 bg-white/50 border-y border-[#E0A858]/10 text-center">
        <p className="text-[#E0A858] italic font-serif text-[15px] mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3" />
          رمضان كريم • العيد مبارك
          <Sparkles className="w-3 h-3" />
        </p>
        <p className="text-[#475569] text-xs max-w-[280px] mx-auto">
          وضع خاص لدعم التحديات الحسية خلال مواسم الصيام والاحتفالات، لبيئة عائلية هادئة.
        </p>
      </section>

      {/* Testimonials Spine */}
      <section className="py-14 px-6 relative">
        {/* Central decorative line */}
        <div className="absolute right-[35px] top-[80px] bottom-[40px] w-[1px] bg-gradient-to-b from-[#E0A858]/0 via-[#E0A858]/40 to-[#E0A858]/0 z-0" />

        <div className="mb-10 text-center relative z-10">
          <h3 className="text-xl font-bold text-[#0D2137] mb-2 font-serif">صوت الأمهات</h3>
          <p className="text-sm text-[#475569]">لستِ وحدك في هذا المسار</p>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col gap-6 relative z-10 pl-2 pr-6">
          <motion.div variants={fadeUp} className="bg-white p-5 rounded-2xl shadow-sm border border-[#0D2137]/5 border-r-2 border-r-[#E0A858] relative">
            <Quote className="w-6 h-6 text-[#E0A858]/20 absolute -top-3 -right-2 bg-white px-1" />
            <p className="text-[#0D2137] font-serif italic text-[15px] leading-relaxed mb-3">
              "لمّا حصلتُ على تشخيص ابني كنتُ ضائعة تماماً. نمو فتح لي الطريق وأضاء لي الخطوات الأولى."
            </p>
            <p className="text-xs text-[#94A3B8]">— أم من الكويت</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white p-5 rounded-2xl shadow-sm border border-[#0D2137]/5 border-r-2 border-r-[#E0A858] relative">
            <Quote className="w-6 h-6 text-[#E0A858]/20 absolute -top-3 -right-2 bg-white px-1" />
            <p className="text-[#0D2137] font-serif italic text-[15px] leading-relaxed mb-3">
              "ترجمة التقارير الطبية بلغة نفهمها سهلت علينا التواصل مع العائلة والمدرسة."
            </p>
            <p className="text-xs text-[#94A3B8]">— أم من الكويت</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white p-5 rounded-2xl shadow-sm border border-[#0D2137]/5 border-r-2 border-r-[#E0A858] relative">
            <Quote className="w-6 h-6 text-[#E0A858]/20 absolute -top-3 -right-2 bg-white px-1" />
            <p className="text-[#0D2137] font-serif italic text-[15px] leading-relaxed mb-3">
              "الجدول البصري غيّر روتيننا اليومي. ابنتي أصبحت أكثر هدوءاً لأنها تعرف ما سيحدث."
            </p>
            <p className="text-xs text-[#94A3B8]">— أم من الكويت</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#0D2137] py-12 px-6 rounded-t-3xl relative overflow-hidden flex flex-col items-center text-center mt-6">
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23E0A858' stroke-width='0.5' opacity='0.05'/%3E%3C/svg%3E\")",
            backgroundSize: "40px 40px"
          }}
        />
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-3 font-serif">كل خطوة تبدأ هنا</h3>
          <p className="text-white/70 text-sm mb-8 max-w-[260px] mx-auto leading-relaxed">
            أنشئي حسابك الآن للحصول على خطة مخصصة لطفلك ومساحة آمنة لكِ.
          </p>
          
          <button className="w-full max-w-[280px] mx-auto py-4 rounded-full bg-gradient-to-l from-[#E0A858] to-[#cca058] text-white font-bold text-[15px] shadow-[0_4px_20px_rgba(224,168,88,0.3)] flex items-center justify-center gap-2 transition-transform active:scale-95">
            <span>دخول إلى المنصة</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
