import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Brain, 
  FileText, 
  CalendarDays, 
  MessageSquare, 
  Stethoscope, 
  Building, 
  BookOpen, 
  Languages,
  MoonStar
} from 'lucide-react';

export default function Splash() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div 
      dir="rtl" 
      className="relative mx-auto bg-[#FFF7EE] text-[#0D2137] min-h-screen overflow-x-hidden font-sans"
      style={{ maxWidth: '402px', width: '100%', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      {/* Background ambient gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#FFF7EE] via-[#FFF7EE]/80 to-transparent pointer-events-none z-0" />
      
      {/* Header */}
      <header className="relative z-10 flex justify-center pt-12 pb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#0D2137] flex items-center justify-center">
            <span className="text-[#FFF7EE] font-serif font-bold text-lg leading-none">ن</span>
          </div>
          <span className="text-xl font-bold tracking-wide">نمو</span>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 px-8 pt-8 pb-16 text-center"
      >
        <motion.h1 variants={fadeIn} className="font-serif text-5xl font-medium leading-[1.15] mb-6 text-[#0D2137]">
          كل خطوة<br />تكبر معه.
        </motion.h1>
        <motion.p variants={fadeIn} className="text-[#475569] text-lg leading-relaxed mb-10 max-w-[280px] mx-auto">
          رفيقك المتخصص في رحلة طفلك مع طيف التوحد. دليلك الموثوق للوضوح والهدوء.
        </motion.p>
        <motion.button variants={fadeIn} className="bg-[#0BB4B0] text-white w-full py-4 rounded-full text-lg font-medium shadow-sm hover:bg-[#099b98] transition-colors">
          ابدئي رحلة نمو
        </motion.button>
      </motion.section>

      {/* Trust Strip */}
      <section className="border-y border-[#0D2137]/10 py-6 mb-16 relative z-10">
        <p className="text-center text-[#475569] text-sm font-medium tracking-wide flex items-center justify-center gap-2">
          <span>٥٢ مقالة</span>
          <span className="w-1 h-1 rounded-full bg-[#E0A858]" />
          <span>٥٩ طبيب</span>
          <span className="w-1 h-1 rounded-full bg-[#E0A858]" />
          <span>٧ مركز رسمي</span>
        </p>
      </section>

      {/* Story Chapters */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="px-8 pb-16 relative z-10"
      >
        <div className="space-y-16">
          <motion.div variants={fadeIn} className="relative">
            <span className="text-[#E0A858] font-serif text-6xl opacity-30 absolute -top-8 -right-4 -z-10">٠١</span>
            <h2 className="text-[#0D2137] font-serif text-3xl font-medium mb-3">فهم مبكر، بخطوات هادئة</h2>
            <p className="text-[#475569] leading-relaxed text-base">
              ابدئي بتقييم مبكر من خلال فحص M-CHAT-R™ المعتمد. ٥ دقائق فقط باللغة العربية، لتتضحي لك الرؤية.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="relative">
            <span className="text-[#E0A858] font-serif text-6xl opacity-30 absolute -top-8 -right-4 -z-10">٠٢</span>
            <h2 className="text-[#0D2137] font-serif text-3xl font-medium mb-3">دعم متخصص، بلغتك</h2>
            <p className="text-[#475569] leading-relaxed text-base">
              تحدثي مع "اسأل نمو"، مساعدك الذكي الموثق بـ ٥٢ مقالة علمية، أو اعتمدي على مترجم التقارير الطبية لشرح التشخيص بوضوح تام.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="relative">
            <span className="text-[#E0A858] font-serif text-6xl opacity-30 absolute -top-8 -right-4 -z-10">٠٣</span>
            <h2 className="text-[#0D2137] font-serif text-3xl font-medium mb-3">لأنكِ الأساس، نعتني بكِ</h2>
            <p className="text-[#475569] leading-relaxed text-base">
              في زاوية عناية الأم، تجدين مساحتك الخاصة للدعم النفسي، لتكوني قوية ومستعدة لرحلة نمو طفلك.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Feature Cards */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="px-6 pb-20 relative z-10 space-y-4"
      >
        <h3 className="font-serif text-2xl text-[#0D2137] mb-8 text-center">أدوات ترافقك كل يوم</h3>
        
        {[
          { icon: <MessageSquare size={20} />, title: "لوحة التواصل الميسر (AAC)", desc: "وسيلة مرئية لمساعدة الأطفال غير الناطقين على التعبير عن احتياجاتهم بثقة." },
          { icon: <CalendarDays size={20} />, title: "صانع الجدول البصري", desc: "أداة لتنظيم يوم طفلك بخطوات واضحة تقلل من التوتر والقلق." },
          { icon: <MoonStar size={20} />, title: "وضع رمضان والعيد", desc: "أدلة مخصصة لتجربة صيام واحتفال تناسب الاحتياجات الحسية للطفل." },
          { icon: <FileText size={20} />, title: "مكتبة الأدلة المطبوعة", desc: "٦ أدلة مصورة جاهزة للطباعة، مصممة خصيصاً للمواقف اليومية." }
        ].map((feature, i) => (
          <motion.div variants={fadeIn} key={i} className="bg-white/60 p-6 rounded-2xl border border-[#0D2137]/5 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FFF7EE] border border-[#0D2137]/5 flex items-center justify-center text-[#0BB4B0]">
              {feature.icon}
            </div>
            <div>
              <h4 className="text-[#0D2137] font-medium text-lg mb-2">{feature.title}</h4>
              <p className="text-[#475569] text-sm leading-relaxed mb-3">{feature.desc}</p>
              <a href="#" className="text-[#0BB4B0] text-sm font-medium inline-flex items-center gap-1 hover:opacity-80">
                <span>اعرفي أكثر</span>
                <span className="text-lg leading-none">&larr;</span>
              </a>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Testimonial Pull-quote */}
      <section className="px-8 pb-20 relative z-10">
        <div className="border-t border-[#0D2137]/20 pt-10">
          <blockquote className="font-serif text-2xl leading-relaxed text-[#0D2137] text-center mb-6">
            "منذ أن استخدمت نمو، شعرت لأول مرة أن هناك من يفهمني ويرتب أفكاري المشتتة. لقد كان فعلاً الرفيق الذي أحتاجه."
          </blockquote>
          <p className="text-center text-[#475569] text-sm font-medium">— أم من الكويت</p>
        </div>
      </section>

      {/* Bottom CTA */}
      <footer className="px-8 pb-16 relative z-10 flex justify-center">
        <button className="bg-[#0BB4B0] text-white px-10 py-4 rounded-full text-lg font-medium shadow-sm hover:bg-[#099b98] transition-colors">
          ابدئي الآن
        </button>
      </footer>
    </div>
  );
}
