import { Layout } from "@/components/layout";
import { useT } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ExternalLink, BookMarked, ShieldCheck } from "lucide-react";

interface Source {
  org: string;
  area: string;
  url: string;
  note: string;
}

const SOURCES: Source[] = [
  {
    org: "M-CHAT-R/F (Robins, Fein & Barton)",
    area: "أداة الفحص الأولي للتوحد لدى الأطفال ١٦-٣٠ شهراً",
    url: "https://mchatscreen.com/",
    note: "الإصدار الرسمي والإرشادات. أسئلة نمو للرضّع مستوحاة بترخيص استخدام تعليمي توعوي.",
  },
  {
    org: "Centers for Disease Control and Prevention (CDC)",
    area: "علامات التوحد ومؤشّرات النموّ المبكر",
    url: "https://www.cdc.gov/ncbddd/autism/signs.html",
    note: 'مرجع "Learn the Signs. Act Early". معتمد كمرجع رئيسي في المحتوى التعليمي.',
  },
  {
    org: "Mayo Clinic",
    area: "أعراض التوحد وأسبابه وخيارات العلاج",
    url: "https://www.mayoclinic.org/diseases-conditions/autism-spectrum-disorder/symptoms-causes/syc-20352928",
    note: "مرجع طبي مراجع من قبل أطبّاء مختصّين. مستخدم في عدّة مقالات في مكتبة نمو.",
  },
  {
    org: "Johns Hopkins Medicine",
    area: "اضطراب طيف التوحد — تشخيص وعلاج",
    url: "https://www.hopkinsmedicine.org/health/conditions-and-diseases/autism",
    note: "نقلنا منه ملخّصات حول التدخّل المبكر وأنواع التقييم.",
  },
  {
    org: "Yale Medicine — Child Study Center",
    area: "بحوث التوحد عند الأطفال والمراهقين",
    url: "https://www.yalemedicine.org/conditions/autism-spectrum-disorder",
    note: "مرجع للمقالات حول الفروقات بين الأعمار وعلامات التوحد لدى المراهقين.",
  },
  {
    org: "World Health Organization (WHO)",
    area: "اضطرابات طيف التوحد — حقائق رئيسية",
    url: "https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders",
    note: "إحصائيات عالمية وتوصيات للسياسات الصحية.",
  },
  {
    org: "American Academy of Pediatrics (AAP)",
    area: "إرشادات الكشف والمراقبة لدى الأطفال",
    url: "https://publications.aap.org/pediatrics/article/145/1/e20193447/36917/Identification-Evaluation-and-Management-of",
    note: 'بيان السياسة لعام ٢٠٢٠ "Identification, Evaluation, and Management of Children With Autism Spectrum Disorder".',
  },
  {
    org: "DSM-5 — American Psychiatric Association",
    area: "معيير التشخيص الرسمية لاضطراب طيف التوحد",
    url: "https://www.psychiatry.org/psychiatrists/practice/dsm",
    note: "المعيير المرجعية للتشخيص (Criterion A1–A3, B1–B4) المستخدمة في تصميم أسئلة نمو.",
  },
  {
    org: "PADA — الهيئة العامة لشؤون ذوي الإعاقة (الكويت)",
    area: "خدمات وتسجيل ذوي الإعاقة في الكويت",
    url: "https://www.pada.gov.kw/",
    note: "مرجعنا الرسمي لمعلومات التسجيل، البطاقة، والمزايا الحكومية.",
  },
  {
    org: "وزارة الصحة الكويتية — الطب التطوّري",
    area: "وحدة الطب التطوّري والسلوكي بمستشفى الصباح",
    url: "https://www.moh.gov.kw/",
    note: "مرجع لخدمات التقييم الرسمية وقائمة المراكز الحكومية المعتمدة.",
  },
];

export default function Sources() {
  const { t, lang } = useT();

  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] text-white p-6 pt-24 pb-8 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-black tracking-[0.2em] text-[#E0A858]">
              {lang === "ar" ? "شفافية كاملة" : "FULL TRANSPARENCY"}
            </span>
          </div>
          <h2 className="text-3xl font-black mb-2">
            {lang === "ar" ? "مصادرنا" : "Our Sources"}
          </h2>
          <p className="text-sm text-white/70 leading-relaxed max-w-2xl">
            {lang === "ar"
              ? "كل محتوى نمو مبني على مراجع طبية وعلمية موثوقة. هذه قائمة كاملة بالمصادر وروابطها الرسمية — يمكنكِ التأكّد من كل معلومة."
              : "All Numoo content is built on trusted medical and scientific references. This is the full list with official links — every fact is verifiable."}
          </p>
        </div>
      </div>

      <div className="bg-background flex-1 pb-32">
        <div className="max-w-3xl mx-auto p-6 space-y-3">
          {/* Trust banner */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 flex items-start gap-3 mb-4">
            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-foreground text-sm mb-1">
                {lang === "ar"
                  ? "مبني على إجماع طبي عالمي"
                  : "Built on global medical consensus"}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {lang === "ar"
                  ? "نلتزم بمعيير DSM-5 و M-CHAT-R/F و AAP. أي محتوى لا يستند إلى مرجع موثوق لا يدخل المنصّة."
                  : "We follow DSM-5, M-CHAT-R/F, and AAP guidelines. No unverified content enters the platform."}
              </p>
            </div>
          </div>

          {SOURCES.map((s, i) => (
            <motion.a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="block bg-card hover:bg-primary/5 rounded-2xl p-4 border border-border hover:border-primary/40 transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BookMarked size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-sm text-foreground leading-tight">
                      {s.org}
                    </h3>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-0.5" />
                  </div>
                  <div className="text-[11px] font-bold text-primary mb-1.5">
                    {s.area}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {s.note}
                  </p>
                  <div className="text-[10px] text-muted-foreground/70 mt-2 truncate font-mono">
                    {s.url.replace(/^https?:\/\//, "")}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}

          <div className="mt-6 p-4 rounded-2xl bg-[#FFF7EE] border border-[#E0A858]/30">
            <p className="text-xs text-[#8a6800] leading-relaxed">
              <strong>{lang === "ar" ? "ملاحظة مهمّة: " : "Important note: "}</strong>
              {lang === "ar"
                ? "نمو أداة توعوية وفحص أوّلي. أي قرار طبّي يُؤخذ مع طبيب أطفال أو أخصّائي نطق أو طبيب تطوّري معتمد."
                : "Numoo is awareness and initial screening. Any medical decision should be made with a pediatrician, speech therapist, or licensed developmental specialist."}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
