import { Layout } from "@/components/layout";
import { useT } from "@/lib/i18n";
import { useLangStore } from "@/lib/lang-store";
import { motion } from "framer-motion";
import { Info, HelpCircle, CheckCircle, Star, Type, Microscope, Users, ShieldCheck, BookMarked } from "lucide-react";
import { Link } from "wouter";
import { useAssessmentStore, type TextSize } from "@/lib/store";
import { CloudBackupCard } from "@/components/cloud-backup-card";

const TXT = {
  ar: {
    textSizeTitle: "حجم الخط",
    textSizeDesc: "اختاري الحجم الذي يريّحج بالقراءة. التغيير يطبّق على كل الصفحات.",
    sizeNormal: "عادي",
    sizeLarge: "كبير",
    sizeXLarge: "أكبر",
    methodologyTitle: "منهجيّتنا العلمية",
    methodologyBullet1Pre: "أداة الفحص مستوحاة من ",
    methodologyBullet1Mid: " (٢٠ سؤالاً للرضّع) و",
    methodologyBullet1Post: " للأعمار الأكبر.",
    methodologyBullet2Pre: "كل سؤال يحمل مرجعه العلمي (مثل ",
    methodologyBullet2Mid: " أو ",
    methodologyBullet2Post: ") — يمكنكِ رؤيته أثناء الفحص.",
    methodologyBullet3: "نظام تقدير الخطر: منخفض / متوسط / مرتفع، بناءً على وزن استجابات نقاط الخطر.",
    methodologyBullet4: "كل المحتوى التوعوي مأخوذ من Mayo Clinic، Johns Hopkins، CDC، Yale Medicine، WHO، وAAP.",
    sourcesLink: "اطّلعي على القائمة الكاملة للمصادر ←",
    teamTitle: "من ورا نمو",
    teamIntro: "نمو مبادرة كويتية بُنيت على أسس مهنية متعدّدة التخصّصات: تطوير منتج، تصميم محتوى تربوي، ومراجعة طبية مستمرّة من أخصائيين في الكويت قبل النشر.",
    contentReviewTitle: "مراجعة محتوى من اختصاصيي تطوّر طفل",
    contentReviewSub: "قبل نشر أي مقال أو فحص جديد",
    communityInputTitle: "جمع ملاحظات أمّهات كويتيات",
    communityInputSub: "لتشعرين دقّة الأسئلة وملاءمتها للهجة",
    dataPrivacyTitle: "صفر بيانات على خوادمنا",
    dataPrivacySub: "كل المعلومات تبقى على جهازكِ فقط",
    disclaimerTitle: "إخلاء مسؤوليّة طبية",
    disclaimerDesc: "نمو أداة فحص توعوي وتعليم، لا تستبدل التشخيص الطبي. التشخيص الرسمي للتوحّد يتطلّب فريقاً متخصّصاً (طبيب تطوّري، أخصائي نطق، أخصائي نفسي). إذا النتيجة أظهرت احتمال متوسط أو مرتفع — يرجى مراجعة مختصّ معتمد فوراً.",
  },
  en: {
    textSizeTitle: "Text Size",
    textSizeDesc: "Choose the size that's most comfortable for you to read. The change applies across all pages.",
    sizeNormal: "Normal",
    sizeLarge: "Large",
    sizeXLarge: "Larger",
    methodologyTitle: "Our Scientific Methodology",
    methodologyBullet1Pre: "The screening tool is inspired by ",
    methodologyBullet1Mid: " (20 questions for toddlers) and ",
    methodologyBullet1Post: " for older ages.",
    methodologyBullet2Pre: "Each question carries its scientific reference (such as ",
    methodologyBullet2Mid: " or ",
    methodologyBullet2Post: ") — you can view it during screening.",
    methodologyBullet3: "Risk rating system: low / medium / high, based on the weight of responses to risk-point items.",
    methodologyBullet4: "All educational content is drawn from Mayo Clinic, Johns Hopkins, CDC, Yale Medicine, WHO, and AAP.",
    sourcesLink: "View the full list of sources →",
    teamTitle: "Behind Numoo",
    teamIntro: "Numoo is a Kuwaiti initiative built on multidisciplinary professional foundations: product development, educational content design, and ongoing medical review by specialists in Kuwait before publishing.",
    contentReviewTitle: "Content reviewed by child-development specialists",
    contentReviewSub: "Before any new article or screening is published",
    communityInputTitle: "Feedback gathered from Kuwaiti mothers",
    communityInputSub: "To make sure questions feel precise and dialect-appropriate",
    dataPrivacyTitle: "Zero data on our servers",
    dataPrivacySub: "All information stays only on your device",
    disclaimerTitle: "Medical Disclaimer",
    disclaimerDesc: "Numoo is an awareness and educational screening tool — it does not replace medical diagnosis. A formal autism diagnosis requires a specialized team (developmental pediatrician, speech therapist, psychologist). If the result shows medium or high likelihood, please consult a certified specialist promptly.",
  },
} as Record<"ar" | "en", {
  textSizeTitle: string;
  textSizeDesc: string;
  sizeNormal: string;
  sizeLarge: string;
  sizeXLarge: string;
  methodologyTitle: string;
  methodologyBullet1Pre: string;
  methodologyBullet1Mid: string;
  methodologyBullet1Post: string;
  methodologyBullet2Pre: string;
  methodologyBullet2Mid: string;
  methodologyBullet2Post: string;
  methodologyBullet3: string;
  methodologyBullet4: string;
  sourcesLink: string;
  teamTitle: string;
  teamIntro: string;
  contentReviewTitle: string;
  contentReviewSub: string;
  communityInputTitle: string;
  communityInputSub: string;
  dataPrivacyTitle: string;
  dataPrivacySub: string;
  disclaimerTitle: string;
  disclaimerDesc: string;
}>;

export default function About() {
  const { t } = useT();
  const { lang } = useLangStore();
  const T = TXT[lang];
  const textSize = useAssessmentStore((s) => s.textSize);
  const setTextSize = useAssessmentStore((s) => s.setTextSize);

  const sizes: { id: TextSize; label: string; preview: string }[] = [
    { id: "normal", label: T.sizeNormal, preview: "أ" },
    { id: "large", label: T.sizeLarge, preview: "أ" },
    { id: "xlarge", label: T.sizeXLarge, preview: "أ" },
  ];

  const sections = [
    {
      id: "why",
      kicker: "WHY",
      icon: <HelpCircle />,
      title: t('aboutWhyTitle'),
      desc: t('aboutWhyDesc')
    },
    {
      id: "how",
      kicker: "HOW",
      icon: <CheckCircle />,
      title: t('aboutHowTitle'),
      desc: t('aboutHowDesc')
    },
    {
      id: "diff",
      kicker: "DIFFERENCE",
      icon: <Star />,
      title: t('aboutDiffTitle'),
      desc: t('aboutDiffDesc')
    }
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] text-white p-6 pt-24 pb-8 flex-shrink-0">
        <h2 className="text-2xl font-black mb-2">{t('aboutTitle')}</h2>
        <p className="text-sm text-white/60">{t('aboutDesc')}</p>
      </div>

      <div className="p-6 bg-background flex-1 pb-32 space-y-6">
        <CloudBackupCard />

        {/* Text size settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl p-5 shadow-sm border border-border"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <Type size={18} />
            </div>
            <div>
              <span className="text-[10px] font-black text-primary tracking-wider uppercase block mb-1">
                ACCESSIBILITY
              </span>
              <h3 className="font-bold text-foreground">{T.textSizeTitle}</h3>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            {T.textSizeDesc}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setTextSize(s.id)}
                aria-pressed={textSize === s.id}
                className={`flex flex-col items-center gap-1 py-3 rounded-2xl border-2 transition-all ${
                  textSize === s.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:border-primary/40"
                }`}
              >
                <span
                  className={`font-black ${
                    s.id === "normal"
                      ? "text-base"
                      : s.id === "large"
                        ? "text-xl"
                        : "text-2xl"
                  } ${textSize === s.id ? "text-primary" : "text-foreground"}`}
                >
                  {s.preview}
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {sections.map((sec, i) => (
          <motion.div
            key={sec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-3xl p-6 shadow-sm border border-border flex flex-col gap-2"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                {sec.icon}
              </div>
              <div>
                <span className="text-[10px] font-black text-primary tracking-wider uppercase block mb-1">{sec.kicker}</span>
                <h3 className="font-bold text-foreground">{sec.title}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">{sec.desc}</p>
          </motion.div>
        ))}

        {/* Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-3xl p-6 shadow-sm border border-border"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <Microscope size={18} />
            </div>
            <div>
              <span className="text-[10px] font-black text-primary tracking-wider uppercase block mb-1">METHODOLOGY</span>
              <h3 className="font-bold text-foreground">{T.methodologyTitle}</h3>
            </div>
          </div>
          <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <span>{T.methodologyBullet1Pre}<strong className="text-foreground">M-CHAT-R/F</strong>{T.methodologyBullet1Mid}<strong className="text-foreground">DSM-5</strong>{T.methodologyBullet1Post}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <span>{T.methodologyBullet2Pre}<em>"M-CHAT-R/F Item 7"</em>{T.methodologyBullet2Mid}<em>"DSM-5 Criterion B4"</em>{T.methodologyBullet2Post}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <span>{T.methodologyBullet3}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <span>{T.methodologyBullet4}</span>
            </li>
          </ul>
          <Link
            href="/sources"
            className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-primary hover:underline"
          >
            <BookMarked size={14} />
            <span>{T.sourcesLink}</span>
          </Link>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-3xl p-6 shadow-sm border border-border"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <Users size={18} />
            </div>
            <div>
              <span className="text-[10px] font-black text-primary tracking-wider uppercase block mb-1">TEAM</span>
              <h3 className="font-bold text-foreground">{T.teamTitle}</h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {T.teamIntro}
          </p>
          <div className="grid grid-cols-1 gap-2 mt-3">
            <div className="bg-background rounded-2xl p-3 border border-border">
              <div className="text-[10px] font-black text-primary tracking-wider uppercase mb-1">CONTENT REVIEW</div>
              <div className="text-xs text-foreground font-bold">{T.contentReviewTitle}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{T.contentReviewSub}</div>
            </div>
            <div className="bg-background rounded-2xl p-3 border border-border">
              <div className="text-[10px] font-black text-primary tracking-wider uppercase mb-1">COMMUNITY INPUT</div>
              <div className="text-xs text-foreground font-bold">{T.communityInputTitle}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{T.communityInputSub}</div>
            </div>
            <div className="bg-background rounded-2xl p-3 border border-border">
              <div className="text-[10px] font-black text-primary tracking-wider uppercase mb-1">DATA PRIVACY</div>
              <div className="text-xs text-foreground font-bold">{T.dataPrivacyTitle}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{T.dataPrivacySub}</div>
            </div>
          </div>
        </motion.div>

        {/* Medical disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-primary/5 border-2 border-primary/30 rounded-3xl p-5"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-black text-foreground mb-1">{T.disclaimerTitle}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {T.disclaimerDesc}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#fff8ee] border border-[#ffe0a0] rounded-2xl p-4 mt-8 flex items-start gap-3"
        >
          <Info className="text-[#d48a00] flex-shrink-0 mt-0.5" size={20} />
          <p className="text-xs text-[#8a6800] leading-relaxed">
            <strong className="block mb-1">{t('importantTransparency')}</strong>
            {t('transparencyDesc')}
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
