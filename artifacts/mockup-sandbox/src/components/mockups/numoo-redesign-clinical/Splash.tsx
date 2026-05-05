import React from "react";
import { motion } from "framer-motion";
import { 
  ClipboardList, 
  BotMessageSquare, 
  Stethoscope, 
  Building2, 
  Languages, 
  LayoutGrid, 
  CalendarDays, 
  MoonStar, 
  HeartHandshake,
  CheckCircle2,
  ChevronLeft,
  ShieldCheck,
  MessagesSquare,
  Brain
} from "lucide-react";

export default function Splash() {
  return (
    <div dir="rtl" className="w-[402px] min-h-screen bg-[#FFFFFF] font-sans overflow-x-hidden text-[#1E293B] mx-auto relative shadow-2xl">
      {/* Top hero: dark navy surface with a fine teal hairline divider at bottom */}
      <section className="bg-[#0D2137] text-white pt-12 pb-10 px-6 relative border-b border-[#0BB4B0]">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0BB4B0] flex items-center justify-center text-white font-bold text-xl">
              ن
            </div>
            <span className="text-xl font-bold tracking-tight">نمو</span>
          </div>
          <div className="bg-[#E0A858]/10 text-[#E0A858] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-[#E0A858]/30">
            <ShieldCheck className="w-3 h-3" />
            معتمد طبياً
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold leading-snug mb-3">
            منصة الدعم الأولى لعائلات أطفال طيف التوحد في الكويت.
          </h1>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            رفيقك المتخصص في رحلة طفلك مع طيف التوحد.
          </p>

          <div className="grid grid-cols-4 gap-2 mb-8 border-y border-white/10 py-4">
            <div className="text-center">
              <div className="text-[#0BB4B0] font-bold text-xl mb-1">٥٢</div>
              <div className="text-white/70 text-[10px] leading-tight">مقالة<br/>متخصصة</div>
            </div>
            <div className="text-center border-r border-white/10">
              <div className="text-[#0BB4B0] font-bold text-xl mb-1">٥٩</div>
              <div className="text-white/70 text-[10px] leading-tight">طبيب<br/>موثق</div>
            </div>
            <div className="text-center border-r border-white/10">
              <div className="text-[#0BB4B0] font-bold text-xl mb-1">٧</div>
              <div className="text-white/70 text-[10px] leading-tight">مركز تشخيص<br/>رسمي</div>
            </div>
            <div className="text-center border-r border-white/10">
              <div className="text-[#0BB4B0] font-bold text-xl mb-1">٢٤/٧</div>
              <div className="text-white/70 text-[10px] leading-tight">مساعد<br/>ذكي</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full bg-[#0BB4B0] hover:bg-[#0BB4B0]/90 text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors">
              <ClipboardList className="w-5 h-5" />
              <span>ابدئي تقييم M-CHAT-R™</span>
            </button>
            <button className="w-full bg-transparent border border-white/20 hover:bg-white/5 text-white font-semibold py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors">
              <Stethoscope className="w-5 h-5" />
              <span>تصفّح المختصين</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-10 px-6 bg-[#FFFFFF]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-[#0D2137] mb-6 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-[#0BB4B0] rounded-full"></div>
            خدماتنا الأساسية
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: BotMessageSquare, title: "المساعد الذكي", desc: "إجابات موثقة من ٥٢ مقالة", dot: true },
              { icon: Stethoscope, title: "دليل الأطباء", desc: "٥٩ مختصاً في الكويت", dot: false },
              { icon: Building2, title: "مراكز التقييم", desc: "٧ مراكز حكومية رسمية", dot: false },
              { icon: Languages, title: "ترجمة التقارير", desc: "شرح التقارير الطبية بوضوح", dot: true },
              { icon: LayoutGrid, title: "لوحة التواصل", desc: "لغة بصرية معتمدة (AAC)", dot: false },
              { icon: CalendarDays, title: "الجدول البصري", desc: "تنظيم الروتين اليومي", dot: false }
            ].map((service, idx) => (
              <div key={idx} className="border border-[#0D2137]/10 rounded-xl p-4 bg-white relative overflow-hidden group">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-[#FFF7EE] rounded-lg">
                    <service.icon className="w-5 h-5 text-[#0BB4B0]" />
                  </div>
                  {service.dot && (
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span className="text-[9px] text-slate-500 font-medium">متاح الآن</span>
                    </div>
                  )}
                </div>
                <h3 className="text-[#0D2137] font-bold text-sm mb-1">{service.title}</h3>
                <p className="text-[#475569] text-xs leading-relaxed line-clamp-2 pb-2">
                  {service.desc}
                </p>
                <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#0D2137]/5 to-transparent"></div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Additional Features */}
      <section className="py-8 px-6 bg-[#FFF7EE] border-y border-[#E0A858]/20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-[#0D2137]/5">
              <div className="bg-[#0D2137]/5 p-3 rounded-full">
                <MoonStar className="w-6 h-6 text-[#0D2137]" />
              </div>
              <div>
                <h4 className="font-bold text-[#0D2137] text-sm">وضع رمضان والعيد</h4>
                <p className="text-[#475569] text-xs mt-1">دعم الصيام والاحتفال بمراعاة الحساسية الحسية.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-[#0D2137]/5">
              <div className="bg-[#E0A858]/10 p-3 rounded-full">
                <HeartHandshake className="w-6 h-6 text-[#E0A858]" />
              </div>
              <div>
                <h4 className="font-bold text-[#0D2137] text-sm">ركن رعاية الأم</h4>
                <p className="text-[#475569] text-xs mt-1">موارد مخصصة لدعم الصحة النفسية للأمهات.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Expert Spotlight */}
      <section className="py-10 px-6 bg-[#FFFFFF]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0D2137]/5 rounded-2xl p-6 border border-[#0D2137]/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#0BB4B0]/5 rounded-bl-full -z-10"></div>
          
          <h2 className="text-[#0D2137] font-bold mb-4">نخبة من المتخصصين</h2>
          <p className="text-[#475569] text-sm leading-relaxed mb-6">
            أكثر من ٥٩ مختصاً في طب الأطفال، التخاطب، التحليل السلوكي.
          </p>

          <div className="flex items-center gap-4 mb-2">
            <div className="flex -space-x-3 space-x-reverse">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#FFF7EE] flex items-center justify-center text-[#0BB4B0] shadow-sm">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#FFF7EE] flex items-center justify-center text-[#E0A858] shadow-sm">
                <MessagesSquare className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#FFF7EE] flex items-center justify-center text-[#0D2137] shadow-sm">
                <Brain className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xs text-[#475569] font-medium">موثقون طبياً</div>
          </div>
        </motion.div>
      </section>

      {/* Trust Band */}
      <section className="py-8 px-6 bg-[#0D2137]/[0.02] border-t border-[#0D2137]/5 text-center">
        <h3 className="text-xs text-[#94A3B8] font-bold mb-6 tracking-wide">معايير المحتوى</h3>
        <div className="grid grid-cols-2 gap-3 mb-6 text-right">
          <div className="border border-[#0D2137]/10 rounded-lg p-3 bg-white">
            <div className="text-[11px] font-bold text-[#0D2137] mb-1">مراجعة دورية</div>
            <div className="text-[10px] text-[#475569] leading-relaxed">يُحدَّث المحتوى الطبي بانتظام بمراجعة مختصين.</div>
          </div>
          <div className="border border-[#0D2137]/10 rounded-lg p-3 bg-white">
            <div className="text-[11px] font-bold text-[#0D2137] mb-1">مصادر موثقة</div>
            <div className="text-[10px] text-[#475569] leading-relaxed">٥٢ مقالة مع استشهادات علمية واضحة.</div>
          </div>
          <div className="border border-[#0D2137]/10 rounded-lg p-3 bg-white">
            <div className="text-[11px] font-bold text-[#0D2137] mb-1">٦ أدلة مطبوعة</div>
            <div className="text-[10px] text-[#475569] leading-relaxed">جاهزة للطباعة لدعم الروتين اليومي للأسرة.</div>
          </div>
          <div className="border border-[#0D2137]/10 rounded-lg p-3 bg-white">
            <div className="text-[11px] font-bold text-[#0D2137] mb-1">خصوصية الأسرة</div>
            <div className="text-[10px] text-[#475569] leading-relaxed">لا تتم مشاركة بيانات طفلك مع أي طرف خارجي.</div>
          </div>
        </div>
        <p className="text-[10px] text-[#94A3B8] flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          محتوى تثقيفي لا يُغني عن استشارة المختص.
        </p>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0D2137] pt-12 pb-16 px-6 text-center text-white">
        <h2 className="text-3xl font-extrabold mb-8">ابدئي اليوم.<br/>مجاناً تماماً.</h2>
        <button className="w-full bg-[#0BB4B0] hover:bg-[#0BB4B0]/90 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-colors text-lg shadow-lg shadow-[#0BB4B0]/20">
          <span>انضمي إلى المنصة</span>
          <ChevronLeft className="w-5 h-5" />
        </button>
      </section>

    </div>
  );
}
