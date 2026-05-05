import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Svg,
  Text,
  View,
  Path,
  Circle,
  Rect,
  G,
  pdf,
} from "@react-pdf/renderer";

const here = dirname(fileURLToPath(import.meta.url));
const fontDir = resolve(here, "../assets/fonts");
const logoDir = resolve(here, "../assets/logos");
const outDir = resolve(here, "../../exports");

const LOGOS = {
  main: resolve(logoDir, "numoo-main.png"),
  navy: resolve(logoDir, "numoo-navy.png"),
  reversed: resolve(logoDir, "numoo-reversed.png"),
};

Font.register({
  family: "Cairo",
  fonts: [
    { src: resolve(fontDir, "Cairo-Regular.ttf"), fontWeight: 400 },
    { src: resolve(fontDir, "Cairo-SemiBold.ttf"), fontWeight: 600 },
    { src: resolve(fontDir, "Cairo-Bold.ttf"), fontWeight: 700 },
    { src: resolve(fontDir, "Cairo-ExtraBold.ttf"), fontWeight: 800 },
  ],
});

Font.register({
  family: "Inter",
  fonts: [
    { src: resolve(fontDir, "Inter-Regular.ttf"), fontWeight: 400 },
    { src: resolve(fontDir, "Inter-SemiBold.ttf"), fontWeight: 600 },
    { src: resolve(fontDir, "Inter-Bold.ttf"), fontWeight: 700 },
    { src: resolve(fontDir, "Inter-ExtraBold.ttf"), fontWeight: 800 },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

const C = {
  navy: "#0D2137",
  navyDeep: "#081627",
  teal: "#0BB4B0",
  tealDeep: "#089391",
  sand: "#FFF7EE",
  sandDeep: "#F6E9D6",
  gold: "#E0A858",
  goldDeep: "#B8853E",
  ink: "#1A2A3A",
  inkSoft: "#5A6878",
  line: "#E8DDD0",
  white: "#FFFFFF",
} as const;

type Lang = "ar" | "en";

interface Feature {
  iconColor: string;
  iconBg: string;
  badge: string;
  title: string;
  desc: string;
  icon: "spark" | "calendar" | "book" | "stethoscope" | "building" | "shield" | "cloud" | "chart" | "share" | "wifi" | "lock" | "globe" | "robot" | "chat" | "academy" | "users";
  soon?: boolean;
}

const FEATURES_AR: Feature[] = [
  {
    iconColor: C.teal,
    iconBg: "#E1F7F6",
    badge: "١",
    title: "تقييم سريع باللغة العربية",
    desc: "أربعون سؤالاً موثوقاً موزّعة على أربع فئات عمرية، من ١٨ شهراً إلى ١٢ سنة. النتيجة تظهر فوراً مع تفسير مفصّل.",
    icon: "spark",
  },
  {
    iconColor: C.gold,
    iconBg: "#FCEEDA",
    badge: "٢",
    title: "خطة شخصية لثلاثين يوماً",
    desc: "نشاطات يومية مصمّمة وفقاً لنتيجة طفلكِ، يمكن تصديرها إلى تقويم الهاتف بضغطة واحدة.",
    icon: "calendar",
  },
  {
    iconColor: C.navy,
    iconBg: "#DDE5EE",
    badge: "٣",
    title: "مكتبة مراجع موثوقة",
    desc: "مقالات مختارة من أعرق المؤسسات الصحية، مترجمة ومرتّبة بالفئة، مع إمكانية حفظ المفضّلة وتكبير الخط.",
    icon: "book",
  },
  {
    iconColor: C.tealDeep,
    iconBg: "#E1F7F6",
    badge: "٤",
    title: "دليل الأطباء",
    desc: "أطباء أطفال ومختصّو نمو معتمدون في دولة الكويت، مع أرقام التواصل والمستشفيات.",
    icon: "stethoscope",
  },
  {
    iconColor: C.gold,
    iconBg: "#FCEEDA",
    badge: "٥",
    title: "مراكز التقييم والتشخيص",
    desc: "قائمة المراكز الكويتية المتخصّصة في تشخيص وتقييم اضطراب طيف التوحّد، بكل تفاصيل التواصل.",
    icon: "building",
  },
  {
    iconColor: C.navy,
    iconBg: "#DDE5EE",
    badge: "٦",
    title: "دليل الدعم الحكومي",
    desc: "خطوات استخراج بطاقة الإعاقة، التأمين الصحي، عيادات تطوّر الطفل، الجمعيات الخيرية، وبيت الزكاة.",
    icon: "shield",
  },
  {
    iconColor: C.teal,
    iconBg: "#E1F7F6",
    badge: "٧",
    title: "نسخة احتياطية سحابية",
    desc: "رمز استرجاع مكوَّن من ثماني خانات يحفظ بياناتكِ وسجلّكِ، ويمكنكِ استعادتها على أي جهاز.",
    icon: "cloud",
  },
  {
    iconColor: C.gold,
    iconBg: "#FCEEDA",
    badge: "٨",
    title: "متابعة التطوّر",
    desc: "سجلّ التقييمات السابقة مع رسم بياني للمقارنة بين الجلسات، لمتابعة تقدّم طفلكِ بمرور الوقت.",
    icon: "chart",
  },
  {
    iconColor: C.tealDeep,
    iconBg: "#E1F7F6",
    badge: "٩",
    title: "مشاركة عبر الواتساب",
    desc: "بضغطة واحدة يمكنكِ مشاركة النتيجة أو المقال أو بيانات الطبيب أو المركز برسالة منسّقة جاهزة.",
    icon: "share",
  },
  {
    iconColor: C.navy,
    iconBg: "#DDE5EE",
    badge: "١٠",
    title: "يعمل بدون إنترنت",
    desc: "قابل للتثبيت كتطبيق على الهاتف (PWA)، مع نسخة HTML مستقلّة تُحفظ على الجهاز وتعمل دون اتصال.",
    icon: "wifi",
  },
  {
    iconColor: C.teal,
    iconBg: "#E1F7F6",
    badge: "١١",
    title: "خصوصية كاملة",
    desc: "كل البيانات محفوظة على جهازكِ. لا نطلب اسماً، ولا بريداً إلكترونياً، ولا رقم هاتف.",
    icon: "lock",
  },
  {
    iconColor: C.gold,
    iconBg: "#FCEEDA",
    badge: "١٢",
    title: "صُنع في الكويت",
    desc: "صُمِّم في الكويت لخدمة الأسر الكويتية. واجهة عربية أنيقة، ألوان دافئة، وأسلوب يحترم خصوصية كل أم.",
    icon: "globe",
  },
];

const COMING_SOON_AR: Feature[] = [
  {
    iconColor: C.teal,
    iconBg: "#E1F7F6",
    badge: "١٣",
    title: "مساعد الذكاء الاصطناعي",
    desc: "مجموعة أدوات ذكية تساعد الأم على تحليل سلوكيات الطفل، وكتابة تقارير مختصرة، وتلخيص المقالات.",
    icon: "robot",
    soon: true,
  },
  {
    iconColor: C.gold,
    iconBg: "#FCEEDA",
    badge: "١٤",
    title: "محادثة فورية ذكية",
    desc: "روبوت محادثة مدرَّب على مصادر علمية، يجيب عن أسئلة الأم اليومية بلغة هادئة وواضحة.",
    icon: "chat",
    soon: true,
  },
  {
    iconColor: C.navy,
    iconBg: "#DDE5EE",
    badge: "١٥",
    title: "ورش وجلسات استشارية",
    desc: "لقاءات أسبوعية مع مختصّين عبر الإنترنت، بمواضيع مختارة وفقاً لاحتياجات الأمّهات.",
    icon: "academy",
    soon: true,
  },
  {
    iconColor: C.tealDeep,
    iconBg: "#E1F7F6",
    badge: "١٦",
    title: "مجتمع الأمّهات",
    desc: "مساحة آمنة لتبادل التجارب بين أمّهات أطفال طيف التوحّد في الكويت، باحترام كامل للخصوصية.",
    icon: "users",
    soon: true,
  },
];

const FEATURES_EN: Feature[] = [
  {
    iconColor: C.teal,
    iconBg: "#E1F7F6",
    badge: "1",
    title: "Quick Arabic-first screening",
    desc: "Validated questions across four age bands (18 months to 12 years). Results in minutes, written in everyday Kuwaiti language.",
    icon: "spark",
  },
  {
    iconColor: C.gold,
    iconBg: "#FCEEDA",
    badge: "2",
    title: "Personalised 30-day plan",
    desc: "Daily activities tailored to your child's score, with one-tap export to your phone calendar (.ics).",
    icon: "calendar",
  },
  {
    iconColor: C.navy,
    iconBg: "#DDE5EE",
    badge: "3",
    title: "Trusted library",
    desc: "Original articles in plain language with bookmarks, large-text mode, and offline access.",
    icon: "book",
  },
  {
    iconColor: C.tealDeep,
    iconBg: "#E1F7F6",
    badge: "4",
    title: "Pediatricians directory",
    desc: "Kuwait-based pediatric and developmental specialists, each card lists hospital and direct phone number.",
    icon: "stethoscope",
  },
  {
    iconColor: C.gold,
    iconBg: "#FCEEDA",
    badge: "5",
    title: "Assessment centers",
    desc: "Curated list of Kuwaiti centers specialised in autism diagnosis and assessment, with parent contact numbers.",
    icon: "building",
  },
  {
    iconColor: C.navy,
    iconBg: "#DDE5EE",
    badge: "6",
    title: "Government support guide",
    desc: "Step-by-step paths for the disability card, public insurance, child development clinics, charities, and Bait Al Zakat.",
    icon: "shield",
  },
  {
    iconColor: C.teal,
    iconBg: "#E1F7F6",
    badge: "7",
    title: "Cloud backup",
    desc: "An 8-character recovery code safely stores your data and history; restore on any device, any time.",
    icon: "cloud",
  },
  {
    iconColor: C.gold,
    iconBg: "#FCEEDA",
    badge: "8",
    title: "Progress tracking",
    desc: "Saved screening history with side-by-side comparison and a trend chart so you can follow growth over time.",
    icon: "chart",
  },
  {
    iconColor: C.tealDeep,
    iconBg: "#E1F7F6",
    badge: "9",
    title: "Share via WhatsApp",
    desc: "Share results, articles, doctors, or centers with another mom in one tap — preformatted, respectful messages.",
    icon: "share",
  },
  {
    iconColor: C.navy,
    iconBg: "#DDE5EE",
    badge: "10",
    title: "Works offline",
    desc: "Installable as a PWA on your phone, plus a single-file .html download that runs fully offline.",
    icon: "wifi",
  },
  {
    iconColor: C.teal,
    iconBg: "#E1F7F6",
    badge: "11",
    title: "Privacy by design",
    desc: "Everything stays on your device. No name, no email, no phone number is ever requested.",
    icon: "lock",
  },
  {
    iconColor: C.gold,
    iconBg: "#FCEEDA",
    badge: "12",
    title: "Made in Kuwait, with love",
    desc: "Designed in Kuwait for Kuwaiti families. Native Arabic UI, warm palette, and a calm home-like tone.",
    icon: "globe",
  },
];

const COMING_SOON_EN: Feature[] = [
  {
    iconColor: C.teal,
    iconBg: "#E1F7F6",
    badge: "13",
    title: "AI assistant suite",
    desc: "A toolkit of small AI helpers — analyse behaviours, draft brief reports, and summarise long articles for busy moms.",
    icon: "robot",
    soon: true,
  },
  {
    iconColor: C.gold,
    iconBg: "#FCEEDA",
    badge: "14",
    title: "Smart chatbot",
    desc: "A scientifically-trained chatbot that answers everyday questions in calm, clear, parent-friendly language.",
    icon: "chat",
    soon: true,
  },
  {
    iconColor: C.navy,
    iconBg: "#DDE5EE",
    badge: "15",
    title: "Workshops & live sessions",
    desc: "Weekly online sessions with specialists, on themes chosen based on what mothers ask about most.",
    icon: "academy",
    soon: true,
  },
  {
    iconColor: C.tealDeep,
    iconBg: "#E1F7F6",
    badge: "16",
    title: "Mothers' community",
    desc: "A safe space for Kuwaiti autism moms to share experiences — fully respecting privacy and dignity.",
    icon: "users",
    soon: true,
  },
];

const STATS_AR = [
  { value: "٤٠", label: "سؤال تقييمي" },
  { value: "٣٠", label: "يوم خطة عملية" },
  { value: "٤٢", label: "مقال موثَّق" },
  { value: "٨١", label: "مركز ومدرسة" },
];

const STATS_EN = [
  { value: "40", label: "Screening questions" },
  { value: "30", label: "Day action plan" },
  { value: "42", label: "Trusted articles" },
  { value: "81", label: "Centers & schools" },
];

function FeatureIcon({ name, color }: { name: Feature["icon"]; color: string }) {
  const stroke = color;
  const sw = "1.6";
  switch (name) {
    case "spark":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path d="M12 3 L13.5 9.5 L20 12 L13.5 14.5 L12 21 L10.5 14.5 L4 12 L10.5 9.5 Z" fill={stroke} />
        </Svg>
      );
    case "calendar":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke={stroke} strokeWidth={sw} fill="none" />
          <Path d="M3.5 10 L20.5 10" stroke={stroke} strokeWidth={sw} />
          <Path d="M8 3 L8 7 M16 3 L16 7" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <Circle cx="8.5" cy="14" r="1" fill={stroke} />
          <Circle cx="12" cy="14" r="1" fill={stroke} />
          <Circle cx="15.5" cy="14" r="1" fill={stroke} />
        </Svg>
      );
    case "book":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path d="M4 4 L11 4 Q12 4 12 5 L12 20 Q12 19 11 19 L4 19 Z" stroke={stroke} strokeWidth={sw} fill="none" strokeLinejoin="round" />
          <Path d="M20 4 L13 4 Q12 4 12 5 L12 20 Q12 19 13 19 L20 19 Z" stroke={stroke} strokeWidth={sw} fill="none" strokeLinejoin="round" />
        </Svg>
      );
    case "stethoscope":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path d="M5 3 L5 11 Q5 15 9 15 Q13 15 13 11 L13 3" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
          <Path d="M9 15 L9 18 Q9 21 13 21 Q17 21 17 18 L17 15" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
          <Circle cx="18" cy="13" r="2.5" stroke={stroke} strokeWidth={sw} fill="none" />
        </Svg>
      );
    case "building":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Rect x="4" y="4" width="16" height="17" rx="1.5" stroke={stroke} strokeWidth={sw} fill="none" />
          <Path d="M8 8 L10 8 M14 8 L16 8 M8 12 L10 12 M14 12 L16 12 M8 16 L10 16 M14 16 L16 16" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </Svg>
      );
    case "shield":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path d="M12 3 L20 6 L20 12 Q20 17 12 21 Q4 17 4 12 L4 6 Z" stroke={stroke} strokeWidth={sw} fill="none" strokeLinejoin="round" />
          <Path d="M9 12 L11 14 L15 10" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "cloud":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path d="M7 17 Q3 17 3 13 Q3 10 6 9.5 Q7 5 12 5 Q17 5 17.5 10 Q21 10.5 21 14 Q21 17 17 17 Z" stroke={stroke} strokeWidth={sw} fill="none" strokeLinejoin="round" />
        </Svg>
      );
    case "chart":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path d="M4 20 L20 20" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <Rect x="6" y="12" width="3" height="6" rx="0.5" fill={stroke} />
          <Rect x="11" y="8" width="3" height="10" rx="0.5" fill={stroke} />
          <Rect x="16" y="4" width="3" height="14" rx="0.5" fill={stroke} />
        </Svg>
      );
    case "share":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Circle cx="6" cy="12" r="2.5" stroke={stroke} strokeWidth={sw} fill="none" />
          <Circle cx="17" cy="6" r="2.5" stroke={stroke} strokeWidth={sw} fill="none" />
          <Circle cx="17" cy="18" r="2.5" stroke={stroke} strokeWidth={sw} fill="none" />
          <Path d="M8.5 11 L14.5 7.5 M8.5 13 L14.5 16.5" stroke={stroke} strokeWidth={sw} />
        </Svg>
      );
    case "wifi":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path d="M3 9 Q12 2 21 9" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
          <Path d="M6 13 Q12 8 18 13" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
          <Path d="M9 17 Q12 14 15 17" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
          <Circle cx="12" cy="20" r="1.2" fill={stroke} />
        </Svg>
      );
    case "lock":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Rect x="5" y="11" width="14" height="10" rx="2" stroke={stroke} strokeWidth={sw} fill="none" />
          <Path d="M8 11 L8 7 Q8 3 12 3 Q16 3 16 7 L16 11" stroke={stroke} strokeWidth={sw} fill="none" />
          <Circle cx="12" cy="16" r="1.4" fill={stroke} />
        </Svg>
      );
    case "globe":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth={sw} fill="none" />
          <Path d="M3 12 L21 12" stroke={stroke} strokeWidth={sw} />
          <Path d="M12 3 Q17 7 17 12 Q17 17 12 21 Q7 17 7 12 Q7 7 12 3" stroke={stroke} strokeWidth={sw} fill="none" />
        </Svg>
      );
    case "robot":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Rect x="4" y="8" width="16" height="12" rx="2.5" stroke={stroke} strokeWidth={sw} fill="none" />
          <Path d="M12 4 L12 8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <Circle cx="12" cy="3.5" r="1.2" fill={stroke} />
          <Circle cx="9" cy="13.5" r="1.3" fill={stroke} />
          <Circle cx="15" cy="13.5" r="1.3" fill={stroke} />
          <Path d="M9 17 L15 17" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </Svg>
      );
    case "chat":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path d="M4 5 Q4 4 5 4 L19 4 Q20 4 20 5 L20 15 Q20 16 19 16 L10 16 L6 20 L6 16 L5 16 Q4 16 4 15 Z" stroke={stroke} strokeWidth={sw} fill="none" strokeLinejoin="round" />
          <Circle cx="9" cy="10" r="1" fill={stroke} />
          <Circle cx="12" cy="10" r="1" fill={stroke} />
          <Circle cx="15" cy="10" r="1" fill={stroke} />
        </Svg>
      );
    case "academy":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path d="M2 9 L12 4 L22 9 L12 14 Z" stroke={stroke} strokeWidth={sw} fill="none" strokeLinejoin="round" />
          <Path d="M6 11 L6 16 Q6 18 12 18 Q18 18 18 16 L18 11" stroke={stroke} strokeWidth={sw} fill="none" />
          <Path d="M22 9 L22 14" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </Svg>
      );
    case "users":
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Circle cx="9" cy="8" r="3" stroke={stroke} strokeWidth={sw} fill="none" />
          <Circle cx="17" cy="9" r="2.5" stroke={stroke} strokeWidth={sw} fill="none" />
          <Path d="M3 19 Q3 13 9 13 Q15 13 15 19" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
          <Path d="M16 19 Q16 14 20 14 Q22 14 22 16" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
        </Svg>
      );
  }
}

type LogoVariant = "main" | "navy" | "reversed";

function NumooMark({ size = 56, variant = "main" }: { size?: number; variant?: LogoVariant }) {
  return (
    <Image
      src={LOGOS[variant]}
      style={{ width: size, height: size }}
    />
  );
}

const baseStyles = (lang: Lang) => {
  const fontFamily = lang === "ar" ? "Cairo" : "Inter";
  return StyleSheet.create({
    page: {
      backgroundColor: C.sand,
      padding: 0,
      fontFamily,
    },
    pageInner: {
      flex: 1,
      paddingTop: 38,
      paddingBottom: 38,
      paddingHorizontal: 44,
    },
    coverPage: {
      backgroundColor: C.navy,
      padding: 0,
      fontFamily,
    },
    coverInner: {
      flex: 1,
      paddingTop: 56,
      paddingBottom: 0,
      paddingHorizontal: 0,
      alignItems: "center",
    },
    coverTopKicker: {
      position: "absolute",
      top: 44,
      left: 0,
      right: 0,
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 56,
    },
    coverTopKickerLine: {
      flex: 1,
      height: 1,
      backgroundColor: C.teal,
      opacity: 0.35,
    },
    coverTopKickerText: {
      color: C.teal,
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: 3,
      paddingHorizontal: 16,
    },
    coverLogoWrap: {
      alignItems: "center",
      marginTop: 70,
    },
    coverWordmark: {
      color: C.white,
      fontSize: 64,
      fontWeight: 700,
      lineHeight: 1.15,
      marginTop: 44,
      textAlign: "center",
    },
    coverTagAr: {
      color: C.sand,
      fontSize: 18,
      fontWeight: 500,
      lineHeight: 1.5,
      marginTop: 22,
      textAlign: "center",
    },
    coverTagDivider: {
      width: 36,
      height: 2,
      backgroundColor: C.teal,
      marginTop: 28,
      marginBottom: 28,
      alignSelf: "center",
      opacity: 0.7,
    },
    coverStatsStrip: {
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: 0,
      paddingHorizontal: 36,
      marginTop: 8,
    },
    coverStatCell: {
      paddingHorizontal: 22,
      alignItems: "center",
      gap: 6,
    },
    coverStatDivider: {
      width: 1,
      height: 38,
      backgroundColor: C.teal,
      opacity: 0.25,
      marginTop: 4,
    },
    coverStatValue: {
      color: C.white,
      fontSize: 30,
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: lang === "en" ? -0.5 : 0,
    },
    coverStatLabel: {
      color: C.sandDeep,
      fontSize: 9,
      fontWeight: 500,
      textAlign: "center",
      letterSpacing: lang === "en" ? 0.4 : 0,
      opacity: 0.75,
    },
    coverBottomStrip: {
      position: "absolute",
      bottom: 36,
      left: 0,
      right: 0,
      paddingHorizontal: 56,
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    coverBottomLeft: {
      color: C.white,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 0.5,
    },
    coverBottomRight: {
      color: C.sandDeep,
      fontSize: 9,
      fontWeight: 500,
      letterSpacing: 1.5,
      opacity: 0.75,
    },
    sectionHeader: {
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 6,
    },
    sectionKicker: {
      color: C.teal,
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: 1.6,
    },
    sectionDot: {
      width: 18,
      height: 2,
      backgroundColor: C.teal,
    },
    h1: {
      color: C.navy,
      fontSize: 28,
      fontWeight: 800,
      lineHeight: 1.25,
      textAlign: lang === "ar" ? "right" : "left",
    },
    h2: {
      color: C.navy,
      fontSize: 19,
      fontWeight: 700,
      lineHeight: 1.3,
      textAlign: lang === "ar" ? "right" : "left",
    },
    body: {
      color: C.ink,
      fontSize: 11,
      fontWeight: 400,
      lineHeight: 1.7,
      textAlign: lang === "ar" ? "right" : "left",
    },
    soft: {
      color: C.inkSoft,
      fontSize: 10,
      fontWeight: 400,
      lineHeight: 1.65,
      textAlign: lang === "ar" ? "right" : "left",
    },
    statsRow: {
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      gap: 10,
      marginTop: 22,
    },
    statBox: {
      flex: 1,
      backgroundColor: C.white,
      borderRadius: 8,
      padding: 14,
      borderWidth: 1,
      borderColor: C.line,
      alignItems: lang === "ar" ? "flex-end" : "flex-start",
    },
    statValue: {
      color: C.navy,
      fontSize: 26,
      fontWeight: 800,
      lineHeight: 1.1,
    },
    statLabel: {
      color: C.inkSoft,
      fontSize: 9,
      fontWeight: 600,
      marginTop: 4,
      letterSpacing: lang === "en" ? 0.5 : 0,
    },
    pillarRow: {
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      gap: 12,
      marginTop: 24,
    },
    pillar: {
      flex: 1,
      backgroundColor: C.white,
      borderRadius: 10,
      padding: 16,
      borderWidth: 1,
      borderColor: C.line,
      alignItems: lang === "ar" ? "flex-end" : "flex-start",
      gap: 8,
    },
    pillarBadge: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: C.sand,
      alignItems: "center",
      justifyContent: "center",
    },
    pillarTitle: {
      color: C.navy,
      fontSize: 12,
      fontWeight: 700,
      textAlign: lang === "ar" ? "right" : "left",
    },
    pillarDesc: {
      color: C.inkSoft,
      fontSize: 9.5,
      lineHeight: 1.6,
      textAlign: lang === "ar" ? "right" : "left",
    },
    grid: {
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 18,
    },
    card: {
      width: "31.5%",
      backgroundColor: C.white,
      borderRadius: 10,
      padding: 14,
      borderWidth: 1,
      borderColor: C.line,
      gap: 8,
      minHeight: 150,
    },
    cardHead: {
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cardIcon: {
      width: 36,
      height: 36,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    cardBadge: {
      color: C.inkSoft,
      fontSize: 11,
      fontWeight: 700,
    },
    cardTitle: {
      color: C.navy,
      fontSize: 11.5,
      fontWeight: 700,
      lineHeight: 1.35,
      textAlign: lang === "ar" ? "right" : "left",
    },
    cardDesc: {
      color: C.inkSoft,
      fontSize: 9,
      lineHeight: 1.6,
      textAlign: lang === "ar" ? "right" : "left",
    },
    cardSoonPill: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      backgroundColor: "#FCEEDA",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: C.gold,
    },
    cardSoonText: {
      color: "#7A4F0E",
      fontSize: 8,
      fontWeight: 800,
      letterSpacing: lang === "en" ? 1 : 0,
    },
    soonHeroBox: {
      marginTop: 18,
      backgroundColor: C.white,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: C.line,
      padding: 22,
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      gap: 18,
      alignItems: "center",
    },
    soonHeroIcon: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: "#FCEEDA",
      alignItems: "center",
      justifyContent: "center",
    },
    soonHeroBody: {
      flex: 1,
      gap: 4,
      alignItems: lang === "ar" ? "flex-end" : "flex-start",
    },
    soonHeroLabel: {
      color: "#7A4F0E",
      fontSize: 8.5,
      fontWeight: 800,
      letterSpacing: lang === "en" ? 1.6 : 0,
    },
    soonHeroTitle: {
      color: C.navy,
      fontSize: 16,
      fontWeight: 800,
      textAlign: lang === "ar" ? "right" : "left",
    },
    soonHeroDesc: {
      color: C.inkSoft,
      fontSize: 10.5,
      lineHeight: 1.7,
      textAlign: lang === "ar" ? "right" : "left",
    },
    accessBox: {
      backgroundColor: C.navy,
      borderRadius: 14,
      padding: 28,
      marginTop: 22,
      gap: 18,
    },
    accessHero: {
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      alignItems: "center",
      gap: 16,
    },
    accessLabel: {
      color: C.gold,
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: 1.6,
      textAlign: lang === "ar" ? "right" : "left",
    },
    accessUrl: {
      color: C.white,
      fontSize: 26,
      fontWeight: 800,
      letterSpacing: 0.5,
      textAlign: lang === "ar" ? "right" : "left",
    },
    accessRow: {
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      gap: 12,
    },
    accessCard: {
      flex: 1,
      backgroundColor: C.navyDeep,
      borderRadius: 10,
      padding: 14,
      borderWidth: 1,
      borderColor: "#1A3550",
      gap: 4,
      alignItems: lang === "ar" ? "flex-end" : "flex-start",
    },
    accessCardTitle: {
      color: C.teal,
      fontSize: 11,
      fontWeight: 700,
      textAlign: lang === "ar" ? "right" : "left",
    },
    accessCardDesc: {
      color: C.sandDeep,
      fontSize: 9,
      lineHeight: 1.55,
      textAlign: lang === "ar" ? "right" : "left",
    },
    footerBar: {
      position: "absolute",
      bottom: 18,
      left: 44,
      right: 44,
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: C.line,
    },
    footerText: {
      color: C.inkSoft,
      fontSize: 8,
      fontWeight: 500,
      letterSpacing: lang === "en" ? 0.6 : 0,
    },
    footerNumber: {
      color: C.navy,
      fontSize: 9,
      fontWeight: 700,
    },
    pageHeader: {
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18,
    },
    pageHeaderBrand: {
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      alignItems: "center",
      gap: 8,
    },
    pageHeaderText: {
      color: C.navy,
      fontSize: 11,
      fontWeight: 700,
    },
    pageHeaderTag: {
      color: C.inkSoft,
      fontSize: 8,
      fontWeight: 600,
      letterSpacing: 1,
    },
    tocList: {
      marginTop: 28,
      gap: 14,
    },
    tocRow: {
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      alignItems: "stretch",
      backgroundColor: C.white,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: C.line,
      overflow: "hidden",
    },
    tocNumberCell: {
      width: 56,
      backgroundColor: C.navy,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
    },
    tocNumberText: {
      color: C.teal,
      fontSize: 18,
      fontWeight: 800,
    },
    tocBody: {
      flex: 1,
      paddingVertical: 14,
      paddingHorizontal: 18,
      gap: 4,
      alignItems: lang === "ar" ? "flex-end" : "flex-start",
    },
    tocTitle: {
      color: C.navy,
      fontSize: 14,
      fontWeight: 700,
      textAlign: lang === "ar" ? "right" : "left",
    },
    tocDesc: {
      color: C.inkSoft,
      fontSize: 10,
      lineHeight: 1.55,
      textAlign: lang === "ar" ? "right" : "left",
    },
    tocPageCell: {
      width: 64,
      alignItems: "center",
      justifyContent: "center",
      borderLeftWidth: lang === "ar" ? 0 : 1,
      borderRightWidth: lang === "ar" ? 1 : 0,
      borderColor: C.line,
    },
    tocPageLabel: {
      color: C.inkSoft,
      fontSize: 7,
      fontWeight: 700,
      letterSpacing: 1,
      marginBottom: 2,
    },
    tocPageValue: {
      color: C.navy,
      fontSize: 22,
      fontWeight: 800,
    },
    tocFooterNote: {
      marginTop: 32,
      padding: 18,
      backgroundColor: C.sandDeep,
      borderRadius: 10,
      borderLeftWidth: lang === "ar" ? 0 : 4,
      borderRightWidth: lang === "ar" ? 4 : 0,
      borderColor: C.teal,
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },
    tocFooterNoteLabel: {
      color: C.teal,
      fontSize: 8,
      fontWeight: 700,
      letterSpacing: 1.4,
      marginBottom: 4,
      textAlign: lang === "ar" ? "right" : "left",
    },
    tocFooterNoteText: {
      color: C.navy,
      fontSize: 11,
      fontWeight: 500,
      lineHeight: 1.6,
      textAlign: lang === "ar" ? "right" : "left",
    },
  });
};

function PageFooter({ lang, n, total, styles }: { lang: Lang; n: number; total: number; styles: ReturnType<typeof baseStyles> }) {
  const left = lang === "ar"
    ? "نمو — رفيق الأمّهات في رحلة التوحّد"
    : "Numoo — a companion for autism families";
  const right = lang === "ar"
    ? `صفحة ${toArabicNum(n)} من ${toArabicNum(total)}`
    : `Page ${n} of ${total}`;
  return (
    <View style={styles.footerBar} fixed>
      <Text style={styles.footerText}>{left}</Text>
      <Text style={styles.footerNumber}>{right}</Text>
    </View>
  );
}

function PageHeader({ lang, styles }: { lang: Lang; styles: ReturnType<typeof baseStyles> }) {
  return (
    <View style={styles.pageHeader} fixed>
      <View style={styles.pageHeaderBrand}>
        <NumooMark size={28} variant="main" />
        <Text style={styles.pageHeaderText}>
          {lang === "ar" ? "نمو · Numoo" : "Numoo"}
        </Text>
      </View>
      <Text style={styles.pageHeaderTag}>
        {lang === "ar" ? "دليل الخصائص الكامل" : "FEATURE GUIDE"}
      </Text>
    </View>
  );
}

function CoverPage({ lang, styles }: { lang: Lang; styles: ReturnType<typeof baseStyles> }) {
  const stats = lang === "ar" ? STATS_AR : STATS_EN;
  return (
    <Page size="A4" style={styles.coverPage}>
      {/* Subtle decorative accent — single soft glow, top-right */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 460,
            height: 460,
            borderRadius: 230,
            backgroundColor: C.teal,
            opacity: 0.07,
          }}
        />
      </View>

      {/* Top kicker — editorial signature */}
      <View style={styles.coverTopKicker}>
        <View style={styles.coverTopKickerLine} />
        <Text style={styles.coverTopKickerText}>
          {lang === "ar" ? "PRODUCT BOOK  ·  EDITION 02  ·  MAY 2026" : "PRODUCT BOOK  ·  EDITION 02  ·  MAY 2026"}
        </Text>
        <View style={styles.coverTopKickerLine} />
      </View>

      <View style={styles.coverInner}>
        {/* Refined logo */}
        <View style={styles.coverLogoWrap}>
          <NumooMark size={132} variant="main" />
        </View>

        {/* Wordmark — refined size */}
        <Text style={styles.coverWordmark}>
          {lang === "ar" ? "نمو" : "Numoo"}
        </Text>

        {/* Hero tagline */}
        <Text style={styles.coverTagAr}>
          {lang === "ar" ? "رفيق كل أمّ\u00A0\u00A0في رحلة التوحّد" : "The companion for autism families in Kuwait"}
        </Text>

        {/* Thin teal divider */}
        <View style={styles.coverTagDivider} />

        {/* Stats as elegant inline strip — no boxes, just numbers + dividers */}
        <View style={styles.coverStatsStrip}>
          {stats.flatMap((s, i) => {
            const cell = (
              <View key={`cell-${i}`} style={styles.coverStatCell}>
                <Text style={styles.coverStatValue}>{s.value}</Text>
                <Text style={styles.coverStatLabel}>{s.label}</Text>
              </View>
            );
            if (i === 0) return [cell];
            return [<View key={`div-${i}`} style={styles.coverStatDivider} />, cell];
          })}
        </View>
      </View>

      {/* Bottom signature — single refined line */}
      <View style={styles.coverBottomStrip}>
        <Text style={styles.coverBottomLeft}>numoo.site</Text>
        <Text style={styles.coverBottomRight}>
          {lang === "ar" ? "ARABIC-FIRST  ·  PRIVATE  ·  OFFLINE-READY" : "ARABIC-FIRST  ·  PRIVATE  ·  OFFLINE-READY"}
        </Text>
      </View>
    </Page>
  );
}

type TocItem = { num: string; title: string; desc: string; page: number };

function ContentsPage({ lang, styles, total }: { lang: Lang; styles: ReturnType<typeof baseStyles>; total: number }) {
  const items: TocItem[] = lang === "ar"
    ? [
        { num: "٠١", title: "نظرة عامة", desc: "ما هي منصّة نمو، والركائز الثلاث التي تقوم عليها، مع أبرز الإحصائيات.", page: 3 },
        { num: "٠٢", title: "المزايا الأساسية — الجزء الأول", desc: "التقييم السريع، خطة الثلاثين يوماً، المكتبة الموثوقة، الأطباء، المراكز، والدعم الحكومي.", page: 4 },
        { num: "٠٣", title: "المزايا الأساسية — الجزء الثاني", desc: "التقويم، الخط الكبير، المفضّلة، متابعة التطوّر، النسخ الاحتياطية، والمشاركة.", page: 5 },
        { num: "٠٤", title: "قريباً", desc: "أربع مزايا قيد التطوير ستضاف للمنصّة قريباً، مع لمحة عن أهداف كل ميزة.", page: 6 },
        { num: "٠٥", title: "الخصوصية والوصول", desc: "كيف تُحفظ بياناتكِ، رمز الاسترجاع، والوصول بدون إنترنت — مع روابط الموقع.", page: 7 },
      ]
    : [
        { num: "01", title: "At a glance", desc: "What Numoo is, the three pillars, and the key facts behind the platform.", page: 3 },
        { num: "02", title: "Core features — Part One", desc: "Quick screening, 30-day plan, trusted library, doctors, centers, government support.", page: 4 },
        { num: "03", title: "Core features — Part Two", desc: "Calendar, large text, bookmarks, progress tracking, backups, and sharing.", page: 5 },
        { num: "04", title: "Coming soon", desc: "Four upcoming features under development — AI assistant, chatbot, workshops, and community.", page: 6 },
        { num: "05", title: "Privacy & access", desc: "How your data is stored, the recovery code, offline access — and how to visit the site.", page: 7 },
      ];

  const pageLabel = lang === "ar" ? "الصفحة" : "PAGE";

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.pageInner}>
        <PageHeader lang={lang} styles={styles} />

        <View style={styles.sectionHeader}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionKicker}>
            {lang === "ar" ? "المحتويات" : "CONTENTS"}
          </Text>
        </View>

        <Text style={styles.h1}>
          {lang === "ar"
            ? "كل ما تحتاجينه — مرتَّباً بهدوء."
            : "Everything you need — calmly organised."}
        </Text>

        <Text style={[styles.body, { marginTop: 10, maxWidth: 460, ...(lang === "ar" ? { alignSelf: "flex-end" } : {}) }]}>
          {lang === "ar"
            ? "يشرح هذا الدليل كل ميزة في منصّة نمو — من أوّل لحظة تفتحين فيها الموقع، إلى أدقّ تفاصيل خصوصيتكِ وكيف يعمل الموقع بدون اتصال بالإنترنت."
            : "This guide walks through every feature in Numoo — from the moment you open the site, to every detail of how your privacy is protected and how it works fully offline."}
        </Text>

        <View style={styles.tocList}>
          {items.map((it) => (
            <View key={it.num} style={styles.tocRow}>
              <View style={styles.tocNumberCell}>
                <Text style={styles.tocNumberText}>{it.num}</Text>
              </View>
              <View style={styles.tocBody}>
                <Text style={styles.tocTitle}>{it.title}</Text>
                <Text style={styles.tocDesc}>{it.desc}</Text>
              </View>
              <View style={styles.tocPageCell}>
                <Text style={styles.tocPageLabel}>{pageLabel}</Text>
                <Text style={styles.tocPageValue}>
                  {lang === "ar" ? toArabicNum(it.page) : String(it.page).padStart(2, "0")}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.tocFooterNote}>
          <Text style={styles.tocFooterNoteLabel}>
            {lang === "ar" ? "ملاحظة" : "A NOTE"}
          </Text>
          <Text style={styles.tocFooterNoteText}>
            {lang === "ar"
              ? "هذا الدليل لوصف المزايا فقط، وليس بديلاً عن التشخيص الطبّي. إن كنتِ قلقةً على طفلكِ، يُرجى استشارة مختصّ. منصّة نمو تساعدكِ على تنظيم رحلتكِ، بكل خصوصية ومن دون أي حكم."
              : "This is a feature guide — not a medical diagnosis. If you're worried about your child, please consult a specialist. Numoo helps you organise the journey, privately and without judgement."}
          </Text>
        </View>
      </View>
      <PageFooter lang={lang} n={2} total={total} styles={styles} />
    </Page>
  );
}

function OverviewPage({ lang, styles, total }: { lang: Lang; styles: ReturnType<typeof baseStyles>; total: number }) {
  const stats = lang === "ar" ? STATS_AR : STATS_EN;
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.pageInner}>
        <PageHeader lang={lang} styles={styles} />

        <View style={styles.sectionHeader}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionKicker}>
            {lang === "ar" ? "نظرة عامة" : "AT A GLANCE"}
          </Text>
        </View>

        <Text style={styles.h1}>
          {lang === "ar"
            ? "منصّة دعم متكاملة، مصمَّمة لراحة الأسرة الكويتية."
            : "An end-to-end support platform, designed for Kuwaiti families."}
        </Text>

        <View style={{ marginTop: 14 }}>
          <Text style={styles.body}>
            {lang === "ar"
              ? "منصّة نمو تجمع في مكان واحد كل ما تحتاجينه في رحلة طفلكِ: من اللحظة الأولى التي تلاحظين فيها علامةً ما، إلى بناء روتين يومي يدعمه ويعزّز نموّه. كل ميزة صُمّمت بهدوء وعناية، بلغة عربية واضحة، واحترام كامل لخصوصيتكِ."
              : "Numoo brings together everything a family needs on this journey: from the first moment you notice a sign, to building a calm daily routine that supports your child. Every feature is crafted in plain Arabic, with deep care for your privacy."}
          </Text>
        </View>

        <View style={styles.statsRow}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statBox}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.sectionHeader, { marginTop: 30 }]}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionKicker}>
            {lang === "ar" ? "الركائز الثلاث" : "THREE PILLARS"}
          </Text>
        </View>

        <Text style={styles.h2}>
          {lang === "ar"
            ? "نُقيّم. نُخطِّط. نَصِلكِ بالدعم المناسب."
            : "We screen. We plan. We connect you with real support."}
        </Text>

        <View style={styles.pillarRow}>
          <View style={styles.pillar}>
            <View style={styles.pillarBadge}>
              <FeatureIcon name="spark" color={C.teal} />
            </View>
            <Text style={styles.pillarTitle}>
              {lang === "ar" ? "تقييم في دقائق" : "Screen in minutes"}
            </Text>
            <Text style={styles.pillarDesc}>
              {lang === "ar"
                ? "أسئلة قصيرة موزّعة على أربع فئات عمرية، تظهر النتيجة فوراً مع توصيات مفصَّلة."
                : "Short, validated questions across four age bands. Instant, tailored results."}
            </Text>
          </View>
          <View style={styles.pillar}>
            <View style={styles.pillarBadge}>
              <FeatureIcon name="calendar" color={C.gold} />
            </View>
            <Text style={styles.pillarTitle}>
              {lang === "ar" ? "خطة لثلاثين يوماً" : "30-day personal plan"}
            </Text>
            <Text style={styles.pillarDesc}>
              {lang === "ar"
                ? "نشاط يومي بسيط يبني العلاقة ويعزّز التواصل، مع تذكيرات في التقويم."
                : "A simple daily activity that builds bonding and communication, synced to your calendar."}
            </Text>
          </View>
          <View style={styles.pillar}>
            <View style={styles.pillarBadge}>
              <FeatureIcon name="shield" color={C.navy} />
            </View>
            <Text style={styles.pillarTitle}>
              {lang === "ar" ? "دعم حقيقي في الكويت" : "Real Kuwait support"}
            </Text>
            <Text style={styles.pillarDesc}>
              {lang === "ar"
                ? "أطباء، مراكز، خطوات بطاقة الإعاقة، التأمين الصحّي، والجمعيات الخيرية."
                : "Doctors, centers, steps for the disability card, insurance, and charities."}
            </Text>
          </View>
        </View>
      </View>
      <PageFooter lang={lang} n={3} total={total} styles={styles} />
    </Page>
  );
}

function FeaturesPage({ lang, styles, page, total, features, kicker, title }: {
  lang: Lang;
  styles: ReturnType<typeof baseStyles>;
  page: number;
  total: number;
  features: Feature[];
  kicker: string;
  title: string;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.pageInner}>
        <PageHeader lang={lang} styles={styles} />

        <View style={styles.sectionHeader}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionKicker}>{kicker}</Text>
        </View>

        <Text style={styles.h1}>{title}</Text>

        <View style={styles.grid}>
          {features.map((f, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.cardHead}>
                <View style={[styles.cardIcon, { backgroundColor: f.iconBg }]}>
                  <FeatureIcon name={f.icon} color={f.iconColor} />
                </View>
                {f.soon ? (
                  <View style={styles.cardSoonPill}>
                    <Text style={styles.cardSoonText}>
                      {lang === "ar" ? "قريباً" : "SOON"}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.cardBadge}>{f.badge}</Text>
                )}
              </View>
              <Text style={styles.cardTitle}>{f.title}</Text>
              <Text style={styles.cardDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>
      </View>
      <PageFooter lang={lang} n={page} total={total} styles={styles} />
    </Page>
  );
}

function AccessPage({ lang, styles, total }: { lang: Lang; styles: ReturnType<typeof baseStyles>; total: number }) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.pageInner}>
        <PageHeader lang={lang} styles={styles} />

        <View style={styles.sectionHeader}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionKicker}>
            {lang === "ar" ? "الخصوصية والوصول" : "PRIVACY & ACCESS"}
          </Text>
        </View>

        <Text style={styles.h1}>
          {lang === "ar"
            ? "خصوصية دون تنازلات. وصول دون حواجز."
            : "Privacy without compromise. Access without barriers."}
        </Text>

        <View style={{ marginTop: 14 }}>
          <Text style={styles.body}>
            {lang === "ar"
              ? "لا تطلب منصّة نمو اسماً، ولا بريداً إلكترونياً، ولا رقم هاتف. كل بياناتكِ محفوظة على جهازكِ وحده. وإن أردتِ الاحتفاظ بنسخة سحابية، نُولِّد لكِ رمز استرجاع مكوَّناً من ثماني خانات، يخصّكِ وحدكِ — لا يطّلع عليه أحد سواكِ."
              : "Numoo never asks for a name, email, or phone number. Your data lives only on your device. If you want a cloud backup, we generate a private 8-character recovery code that belongs to you alone — no one else can read it."}
          </Text>
        </View>

        <View style={styles.pillarRow}>
          <View style={styles.pillar}>
            <View style={styles.pillarBadge}>
              <FeatureIcon name="lock" color={C.teal} />
            </View>
            <Text style={styles.pillarTitle}>
              {lang === "ar" ? "البيانات على جهازكِ" : "Local-first data"}
            </Text>
            <Text style={styles.pillarDesc}>
              {lang === "ar"
                ? "تُحفظ كل التقييمات والمفضّلة والسجلّ في المتصفّح. لا تخرج من جهازكِ إلا إذا طلبتِ ذلك."
                : "Assessments, bookmarks, and history stay in your browser. Nothing leaves unless you ask."}
            </Text>
          </View>
          <View style={styles.pillar}>
            <View style={styles.pillarBadge}>
              <FeatureIcon name="cloud" color={C.gold} />
            </View>
            <Text style={styles.pillarTitle}>
              {lang === "ar" ? "رمز استرجاع من ثماني خانات" : "8-character recovery code"}
            </Text>
            <Text style={styles.pillarDesc}>
              {lang === "ar"
                ? "بدلاً من البريد الإلكتروني، رمز سرّي قصير يسترجع بياناتكِ على أي جهاز."
                : "Instead of an email, one short private code restores your data on any device."}
            </Text>
          </View>
          <View style={styles.pillar}>
            <View style={styles.pillarBadge}>
              <FeatureIcon name="wifi" color={C.navy} />
            </View>
            <Text style={styles.pillarTitle}>
              {lang === "ar" ? "متاحة دائماً دون اتصال" : "Always available offline"}
            </Text>
            <Text style={styles.pillarDesc}>
              {lang === "ar"
                ? "ثبّتيها كتطبيق على هاتفكِ، أو نزّلي نسخة HTML تعمل بدون إنترنت."
                : "Install as a PWA on your phone, or download a .html copy that works without internet."}
            </Text>
          </View>
        </View>

        <View style={styles.accessBox}>
          <View style={styles.accessHero}>
            <View style={{ flex: 1, alignItems: lang === "ar" ? "flex-end" : "flex-start", gap: 4 }}>
              <Text style={styles.accessLabel}>
                {lang === "ar" ? "زوروا الموقع الآن" : "VISIT THE PLATFORM"}
              </Text>
              <Text style={styles.accessUrl}>numoo.site</Text>
            </View>
            <NumooMark size={64} variant="reversed" />
          </View>
          <View style={styles.accessRow}>
            <View style={styles.accessCard}>
              <Text style={styles.accessCardTitle}>
                {lang === "ar" ? "افتحيها من المتصفّح" : "Open in any browser"}
              </Text>
              <Text style={styles.accessCardDesc}>
                {lang === "ar"
                  ? "بلا تحميل، بلا تسجيل. ادخلي وابدئي مباشرةً."
                  : "No download, no signup. Open and start instantly."}
              </Text>
            </View>
            <View style={styles.accessCard}>
              <Text style={styles.accessCardTitle}>
                {lang === "ar" ? "ثبّتيها على الهاتف" : "Install on your phone"}
              </Text>
              <Text style={styles.accessCardDesc}>
                {lang === "ar"
                  ? "من قائمة المتصفّح: «إضافة إلى الشاشة الرئيسية»."
                  : "From the browser menu: 'Add to Home Screen.'"}
              </Text>
            </View>
            <View style={styles.accessCard}>
              <Text style={styles.accessCardTitle}>
                {lang === "ar" ? "نسخة مستقلّة" : "Standalone copy"}
              </Text>
              <Text style={styles.accessCardDesc}>
                {lang === "ar"
                  ? "حمّلي ملف HTML واحداً، يعمل بدون إنترنت تماماً."
                  : "Download a single HTML file that runs fully offline."}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <PageFooter lang={lang} n={7} total={total} styles={styles} />
    </Page>
  );
}

function ComingSoonPage({ lang, styles, total }: { lang: Lang; styles: ReturnType<typeof baseStyles>; total: number }) {
  const features = lang === "ar" ? COMING_SOON_AR : COMING_SOON_EN;
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.pageInner}>
        <PageHeader lang={lang} styles={styles} />

        <View style={styles.sectionHeader}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionKicker}>
            {lang === "ar" ? "قريباً · COMING SOON" : "COMING SOON"}
          </Text>
        </View>

        <Text style={styles.h1}>
          {lang === "ar"
            ? "نَعدُكِ بمزيدٍ من الدعم — قريباً."
            : "More support is on the way — coming soon."}
        </Text>

        <View style={{ marginTop: 12 }}>
          <Text style={styles.body}>
            {lang === "ar"
              ? "نعمل على أربع مزايا جديدة لتعزيز رحلتكِ مع طفلكِ، صُمّمت بناءً على أكثر ما طلبته الأمّهات. هذه المزايا قيد التطوير وستُتاح في الإصدارات القادمة من المنصّة."
              : "We're building four new features to deepen your journey, shaped by what mothers told us they need most. These are in active development and will roll out in upcoming releases."}
          </Text>
        </View>

        <View style={styles.grid}>
          {features.map((f, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.cardHead}>
                <View style={[styles.cardIcon, { backgroundColor: f.iconBg }]}>
                  <FeatureIcon name={f.icon} color={f.iconColor} />
                </View>
                <View style={styles.cardSoonPill}>
                  <Text style={styles.cardSoonText}>
                    {lang === "ar" ? "قريباً" : "SOON"}
                  </Text>
                </View>
              </View>
              <Text style={styles.cardTitle}>{f.title}</Text>
              <Text style={styles.cardDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>

        <View style={styles.soonHeroBox}>
          <View style={styles.soonHeroIcon}>
            <FeatureIcon name="spark" color={C.gold} />
          </View>
          <View style={styles.soonHeroBody}>
            <Text style={styles.soonHeroLabel}>
              {lang === "ar" ? "الإصدار القادم" : "NEXT EDITION"}
            </Text>
            <Text style={styles.soonHeroTitle}>
              {lang === "ar"
                ? "نمو يكبر معكِ — خطوةً بخطوة."
                : "Numoo grows with you — one step at a time."}
            </Text>
            <Text style={styles.soonHeroDesc}>
              {lang === "ar"
                ? "نُضيف الميزات تباعاً، ونستمع إلى ملاحظات الأمّهات قبل إطلاق كل تحديث. هدفنا أن تجدي كل ما تحتاجينه في مكان واحد، بهدوء وعناية."
                : "We add features gradually, listening to mothers before every release. Our goal is for you to find everything in one place — calmly and carefully."}
            </Text>
          </View>
        </View>
      </View>
      <PageFooter lang={lang} n={6} total={total} styles={styles} />
    </Page>
  );
}

function toArabicNum(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]!);
}

function NumooDoc({ lang }: { lang: Lang }) {
  const styles = baseStyles(lang);
  const features = lang === "ar" ? FEATURES_AR : FEATURES_EN;
  const featuresPart1 = features.slice(0, 6);
  const featuresPart2 = features.slice(6, 12);
  const TOTAL = 7;
  return (
    <Document
      title={lang === "ar" ? "نمو — دليل الخصائص" : "Numoo — Feature Guide"}
      author="Numoo"
      subject={lang === "ar" ? "دليل الخصائص الكامل لمنصّة نمو" : "Complete feature guide for the Numoo platform"}
      keywords="autism, kuwait, numoo, support, التوحّد, الكويت, نمو"
      language={lang === "ar" ? "ar-KW" : "en"}
    >
      <CoverPage lang={lang} styles={styles} />
      <ContentsPage lang={lang} styles={styles} total={TOTAL} />
      <OverviewPage lang={lang} styles={styles} total={TOTAL} />
      <FeaturesPage
        lang={lang}
        styles={styles}
        page={4}
        total={TOTAL}
        features={featuresPart1}
        kicker={lang === "ar" ? "المزايا الأساسية — الجزء الأول" : "CORE FEATURES — PART ONE"}
        title={lang === "ar" ? "أدوات للتقييم والتخطيط والمعرفة." : "Tools to assess, plan, and learn."}
      />
      <FeaturesPage
        lang={lang}
        styles={styles}
        page={5}
        total={TOTAL}
        features={featuresPart2}
        kicker={lang === "ar" ? "المزايا الأساسية — الجزء الثاني" : "CORE FEATURES — PART TWO"}
        title={lang === "ar" ? "متابعة التطوّر، الخصوصية، والمشاركة." : "Track progress, protect privacy, share with care."}
      />
      <ComingSoonPage lang={lang} styles={styles} total={TOTAL} />
      <AccessPage lang={lang} styles={styles} total={TOTAL} />
    </Document>
  );
}

async function build() {
  await mkdir(outDir, { recursive: true });

  for (const lang of ["en", "ar"] as Lang[]) {
    const filename = lang === "ar" ? "numoo-features-ar.pdf" : "numoo-features-en.pdf";
    const outPath = resolve(outDir, filename);
    console.log(`Building ${filename}…`);
    const instance = pdf(<NumooDoc lang={lang} />);
    const buffer = await instance.toBuffer();
    const chunks: Buffer[] = [];
    for await (const chunk of buffer) {
      chunks.push(chunk as Buffer);
    }
    const data = Buffer.concat(chunks);
    await writeFile(outPath, data);
    const kb = (data.length / 1024).toFixed(1);
    console.log(`  → ${outPath} (${kb} KB)`);
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
