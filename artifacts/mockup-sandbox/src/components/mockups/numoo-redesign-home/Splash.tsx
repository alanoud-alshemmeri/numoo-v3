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
  FileText
} from "lucide-react";

export default function Splash() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const tabs = [
    { icon: Home, label: "الرئيسية", active: true },
    { icon: Stethoscope, label: "المختصون", active: false },
    { icon: Building2, label: "المراكز", active: false },
    { icon: BookOpen, label: "المكتبة", active: false },
    { icon: BotMessageSquare, label: "المساعد", active: false }
  ];

  const stats = [
    { number: "٥٢", label: "مقالة متخصصة" },
    { number: "٥٩", label: "طبيب موثق" },
    { number: "٧", label: "مراكز تقييم" },
    { number: "٦", label: "أدلة مطبوعة" }
  ];

  const services = [
    { icon: BotMessageSquare, title: "المساعد الذكي", desc: "إجابات موثقة على مدار الساعة" },
    { icon: Stethoscope, title: "دليل الأطباء", desc: "نخبة من المختصين في الكويت" },
    { icon: Building2, title: "مراكز التقييم", desc: "مراكز رسمية للتشخيص" },
    { icon: Languages, title: "ترجمة التقارير", desc: "فهم التقارير الطبية المعقدة" },
    { icon: CalendarDays, title: "الجدول البصري", desc: "تنظيم الروتين اليومي بوضوح" },
    { icon: LayoutGrid, title: "لوحة التواصل", desc: "أدوات تواصل بصرية معتمدة" }
  ];

  return (
    <div 
      dir="rtl" 
      className="w-[402px] mx-auto min-h-screen bg-[#FFF7EE] text-[#0D2137] overflow-x-hidden font-sans relative shadow-2xl pb-[76px]"
      style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* 1. App identity & Hero */}
      <section className="relative pt-12 pb-8 px-6 overflow-hidden">
        {/* Soft amber radial light from top-right */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#E0A858]/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex justify-between items-center mb-10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#0D2137] text-[#FFF7EE] flex items-center justify-center font-bold text-xl shadow-sm">
              ن
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#0D2137]">نمو</span>
          </div>
          <div className="bg-white/60 backdrop-blur-sm text-[#0D2137] px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-[#0D2137]/10 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0BB4B0]" />
            معتمد طبياً
          </div>
        </div>

        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-[#0D2137]/5 shadow-[0_8px_30px_rgb(13,33,55,0.04)] text-center relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFF7EE] to-transparent opacity-50 rounded-tr-3xl pointer-events-none" />
          
          <motion.h1 
            variants={fadeUp} 
            className="text-[34px] font-medium leading-[1.3] text-[#0D2137] mb-4"
            style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif" }}
          >
            أهلاً بكِ في رحلة نمو
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-[#475569] text-[15px] leading-relaxed">
            مساحتكِ الآمنة والمنظمة. كل ما تحتاجينه لدعم طفلكِ في مكان واحد، بوضوح وهدوء.
          </motion.p>
        </motion.div>
      </section>

      {/* 3. Numbers / Credibility Row */}
      <section className="px-6 mb-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="grid grid-cols-4 gap-2 bg-white rounded-2xl p-4 shadow-sm border border-[#0D2137]/5 relative overflow-hidden"
        >
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#E0A858]/30 to-transparent opacity-50" />
          {stats.map((stat, idx) => (
            <motion.div variants={fadeUp} key={idx} className={`text-center ${idx < 3 ? 'border-l border-[#0D2137]/5' : ''}`}>
              <div className="text-[#E0A858] font-bold text-xl mb-1" style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif" }}>{stat.number}</div>
              <div className="text-[#475569] text-[9px] leading-tight font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. Primary CTAs */}
      <section className="px-6 mb-12">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="flex flex-col gap-3"
        >
          <motion.button variants={fadeUp} className="w-full bg-[#0D2137] hover:bg-[#0D2137]/90 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
            <ClipboardList className="w-5 h-5 text-[#E0A858]" />
            <span className="text-[15px]">تقييم مبدئي (M-CHAT-R™)</span>
          </motion.button>
          
          <motion.button variants={fadeUp} className="w-full bg-white hover:bg-gray-50 text-[#0D2137] border border-[#0D2137]/10 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-sm">
            <Stethoscope className="w-5 h-5 text-[#0BB4B0]" />
            <span className="text-[15px]">حجز موعد مع مختص</span>
          </motion.button>
        </motion.div>
      </section>

      {/* 5. Services Grid */}
      <section className="px-6 mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-[#0D2137]" style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif" }}>غرف الرعاية</h2>
          <span className="text-xs text-[#0BB4B0] font-bold bg-[#0BB4B0]/10 px-2.5 py-1 rounded-full">٦ خدمات</span>
        </div>
        
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
          className="grid grid-cols-2 gap-3"
        >
          {services.map((service, idx) => (
            <motion.div variants={fadeUp} key={idx} className="bg-white rounded-2xl p-4 border border-[#0D2137]/[0.08] shadow-[0_2px_10px_rgb(13,33,55,0.02)] hover:border-[#0BB4B0]/30 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#0BB4B0]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-10 h-10 rounded-xl bg-[#FFF7EE] flex items-center justify-center mb-3">
                <service.icon className="w-5 h-5 text-[#0BB4B0]" />
              </div>
              <h3 className="text-[#0D2137] font-bold text-[14px] mb-1.5">{service.title}</h3>
              <p className="text-[#475569] text-[11px] leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 7. Cultural Moment - Ramadan */}
      <section className="px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#0D2137] to-[#1a365d] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden flex items-center justify-between"
        >
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgMEwyMCA0ME0wIDIwTDQwIDIwIiBzdHJva2U9IiNFMEE4NTgiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20 mix-blend-overlay" />
          
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-[#E0A858]" />
              <h3 className="font-bold text-[15px]" style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif" }}>رمضان كريم</h3>
            </div>
            <p className="text-white/80 text-xs">نصائح مخصصة للروتين في شهر رمضان.</p>
          </div>
          <button className="relative z-10 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl backdrop-blur-sm transition-colors border border-white/10">
            تصفح الدليل
          </button>
        </motion.div>
      </section>

      {/* 6. Testimonials */}
      <section className="px-6 mb-12">
        <h2 className="text-[22px] font-bold text-[#0D2137] mb-6" style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif" }}>من عائلاتنا</h2>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="flex flex-col gap-4">
          {[
            "التنظيم والوضوح في المنصة خفف عني الكثير من القلق المشتت.",
            "ميزة الجدول البصري رائعة، سهلت علينا الروتين الصباحي بشكل ملحوظ.",
            "أخيراً وجدت مكاناً يجمع كل المعلومات التي أحتاجها دون تشتت."
          ].map((quote, idx) => (
            <motion.div variants={fadeUp} key={idx} className="bg-white p-5 rounded-2xl border border-[#0D2137]/[0.08] relative shadow-sm">
              <Quote className="w-8 h-8 text-[#FFF7EE] absolute top-4 left-4" />
              <p className="text-[#0D2137] text-[14px] leading-relaxed mb-3 relative z-10 font-medium">"{quote}"</p>
              <p className="text-[11px] text-[#475569] font-bold">— أم من الكويت</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 8. Final CTA */}
      <section className="px-6 mb-8 text-center">
        <div className="bg-[#FFF7EE] border border-[#0D2137]/10 rounded-3xl p-8 pb-10 shadow-inner">
          <div className="w-16 h-1 bg-[#E0A858] mx-auto rounded-full mb-6" />
          <h2 className="text-[24px] font-bold text-[#0D2137] mb-3" style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif" }}>جاهزة للبدء؟</h2>
          <p className="text-[#475569] text-sm mb-6 max-w-[280px] mx-auto leading-relaxed">
            أنشئي حسابكِ المجاني للوصول إلى كافة الموارد والأدوات المخصصة.
          </p>
          <button className="w-full bg-[#0BB4B0] hover:bg-[#0BB4B0]/90 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#0BB4B0]/20">
            <span>تسجيل الدخول</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 9. Bottom Tab Bar */}
      <nav 
        className="absolute bottom-0 left-0 w-full bg-white border-t border-[#0D2137]/10 px-2 pt-2 pb-5 shadow-[0_-10px_40px_rgba(13,33,55,0.08)] z-50 rounded-t-3xl"
      >
        <ul className="flex items-stretch justify-around">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            return (
              <li key={idx} className="flex-1 relative">
                <button 
                  type="button" 
                  className={`w-full flex flex-col items-center gap-1.5 py-2 transition-colors ${tab.active ? 'text-[#0BB4B0]' : 'text-[#475569] hover:text-[#0D2137]'}`}
                >
                  <div className="relative">
                    {tab.active && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E0A858]" />
                    )}
                    <Icon className="w-6 h-6" strokeWidth={tab.active ? 2.5 : 2} />
                  </div>
                  <span className={`text-[10px] ${tab.active ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
