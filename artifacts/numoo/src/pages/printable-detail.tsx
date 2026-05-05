import { useRoute, useLocation } from "wouter";
import { Printer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRINTABLES } from "./printables";
import { useLangStore } from "@/lib/lang-store";

export default function PrintableDetail() {
  const [, params] = useRoute("/printables/:id");
  const [, setLocation] = useLocation();
  const { lang } = useLangStore();
  const id = params?.id;
  const item = PRINTABLES.find((p) => p.id === id);

  const TXT = {
    ar: {
      notFound: "المورد غير موجود",
      backToLibrary: "رجوع للمكتبة",
      library: "المكتبة",
      printSave: "طباعة / حفظ PDF",
      brand: "نمو — منصة دعم أسر التوحد الكويتية",
      stepsTitle: "الخطوات",
      tipsTitle: "نصائح للأم",
      disclaimer: "تنبيه: هذه البطاقة أداة دعم بصرية وليست بديلاً عن استشارة المختص.",
      copyright: "© 2026 نمو — جميع الحقوق محفوظة. قابل للطباعة والمشاركة المجانية للأهل.",
    },
    en: {
      notFound: "Resource not found",
      backToLibrary: "Back to library",
      library: "Library",
      printSave: "Print / Save as PDF",
      brand: "Numoo — a Kuwaiti support platform for autism families",
      stepsTitle: "Steps",
      tipsTitle: "Tips for mom",
      disclaimer:
        "Note: This card is a visual support tool and is not a substitute for professional advice.",
      copyright:
        "© 2026 Numoo — All rights reserved. Free to print and share with families.",
    },
  } as const;
  const T = TXT[lang];

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-xl font-black mb-3">{T.notFound}</h2>
          <Button onClick={() => setLocation("/printables")}>{T.backToLibrary}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Toolbar — hidden on print */}
      <div className="print:hidden bg-[#0D2137] text-white px-6 py-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={() => setLocation("/printables")}
            className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft size={16} /> {T.library}
          </button>
          <Button
            onClick={() => window.print()}
            className="bg-[#0BB4B0] hover:bg-[#089b98] text-white rounded-full"
          >
            <Printer size={16} className="ml-2" />
            {T.printSave}
          </Button>
        </div>
      </div>

      {/* Printable area */}
      <div className="max-w-3xl mx-auto px-8 py-10 print:py-6 print:px-6">
        <header className="border-b-4 border-double pb-4 mb-6" style={{ borderColor: item.color }}>
          <div className="flex items-center gap-4 mb-2">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{ background: `${item.color}20` }}
            >
              {item.emoji}
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#0D2137]">{item.title[lang]}</h1>
              <p className="text-sm text-muted-foreground">{item.desc[lang]}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-3">
            <span>{T.brand}</span>
            <span>numoo.kw</span>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-black text-[#0D2137] mb-4">{T.stepsTitle}</h2>
          <div className="grid grid-cols-2 gap-4 print:gap-3">
            {item.steps.map((step, i) => (
              <div
                key={i}
                className="border-2 rounded-2xl p-4 flex flex-col items-center text-center break-inside-avoid"
                style={{ borderColor: `${item.color}40` }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm mb-2"
                  style={{ background: item.color }}
                >
                  {i + 1}
                </div>
                <div className="text-5xl mb-2 leading-none">{step.emoji}</div>
                <h3 className="text-sm font-black text-[#0D2137] mb-1">{step.title[lang]}</h3>
                <p className="text-[11px] text-muted-foreground leading-snug">{step.desc[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#FFF7EE] border border-[#E0A858]/40 rounded-2xl p-5 print:bg-white print:border-2">
          <h2 className="text-sm font-black text-[#0D2137] mb-3">{T.tipsTitle}</h2>
          <ul className="space-y-2">
            {item.tips.map((tip, i) => (
              <li key={i} className="text-xs text-[#0D2137] leading-relaxed flex items-start gap-2">
                <span className="text-[#E0A858] font-black flex-shrink-0">◆</span>
                <span>{tip[lang]}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-8 pt-4 border-t border-border text-[10px] text-muted-foreground text-center">
          <p>{T.disclaimer}</p>
          <p className="mt-1">{T.copyright}</p>
        </footer>
      </div>

      <style>{`
        @media print {
          @page { margin: 1.5cm; size: A4 portrait; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}
