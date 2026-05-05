import { Layout } from "@/components/layout";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Scissors,
  Stethoscope,
  Sparkles,
  School,
  Moon,
  Gift,
  Printer,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLangStore } from "@/lib/lang-store";

type Bilingual = { ar: string; en: string };

export type Printable = {
  id: string;
  title: Bilingual;
  desc: Bilingual;
  emoji: string;
  Icon: typeof Scissors;
  color: string;
  steps: { emoji: string; title: Bilingual; desc: Bilingual }[];
  tips: Bilingual[];
};

export const PRINTABLES: Printable[] = [
  {
    id: "haircut",
    title: { ar: "يوم الحلاقة", en: "Haircut Day" },
    desc: {
      ar: "تسلسل بصري مصوّر يهيّئ الطفل قبل وأثناء الحلاقة",
      en: "An illustrated visual sequence that helps your child feel ready before and during a haircut",
    },
    emoji: "✂️",
    Icon: Scissors,
    color: "#0BB4B0",
    steps: [
      {
        emoji: "🪞",
        title: { ar: "نشوف صورة الحلّاق", en: "We look at the barber" },
        desc: {
          ar: "نتفرّج على صورة المحل قبل ما نطلع من البيت.",
          en: "We look at a photo of the shop together before leaving the house.",
        },
      },
      {
        emoji: "🚗",
        title: { ar: "نروح بالسيارة", en: "We drive there" },
        desc: {
          ar: "ركوب السيارة لمدة قصيرة. نسمع الموسيقى المفضّلة.",
          en: "A short car ride. We listen to your favorite music on the way.",
        },
      },
      {
        emoji: "🪑",
        title: { ar: "نقعد على الكرسي", en: "We sit in the chair" },
        desc: {
          ar: "كرسي الحلّاق. الحلّاق يحطّ شال على الرقبة.",
          en: "The barber's chair. The barber gently places a cape around your neck.",
        },
      },
      {
        emoji: "💧",
        title: { ar: "نبلّل الشعر", en: "We wet the hair" },
        desc: {
          ar: "ماء بسيطة على الشعر. صوت رذاذ خفيف.",
          en: "A little water on the hair. A soft spraying sound.",
        },
      },
      {
        emoji: "✂️",
        title: { ar: "نقصّ الشعر", en: "We cut the hair" },
        desc: {
          ar: "صوت المقص. ممكن نسمع فقط أو نبتعد عن المرآة.",
          en: "The sound of the scissors. We can just listen, or look away from the mirror.",
        },
      },
      {
        emoji: "🎁",
        title: { ar: "ننتهي ونفرح", en: "We finish and celebrate" },
        desc: {
          ar: "نقول 'خلصنا!' ونحصل على مكافأة صغيرة.",
          en: "We say \"All done!\" and enjoy a small reward together.",
        },
      },
    ],
    tips: [
      {
        ar: "اشتري شال حلاقة من البيت واتركه يلبسه قبل بأسبوع.",
        en: "Buy a barber cape and let your child wear it at home for a week before the visit.",
      },
      {
        ar: "اعرضي على الطفل فيديو قصير لطفل آخر يقصّ شعره.",
        en: "Show your child a short video of another child getting a haircut.",
      },
      {
        ar: "احجزي أوّل موعد بالصباح — المحل أهدأ.",
        en: "Book the first morning appointment — the shop will be calmer and quieter.",
      },
      {
        ar: "خذي ساعات حاجبة للصوت إذا الطفل حساس.",
        en: "Bring noise-cancelling headphones if your child is sound sensitive.",
      },
    ],
  },
  {
    id: "doctor",
    title: { ar: "زيارة الطبيب", en: "Doctor's Visit" },
    desc: {
      ar: "خطوات واضحة للعيادة من الانتظار حتى الفحص",
      en: "Clear, gentle steps for the clinic — from the waiting room to the exam",
    },
    emoji: "🩺",
    Icon: Stethoscope,
    color: "#0D2137",
    steps: [
      {
        emoji: "📅",
        title: { ar: "اليوم موعد الطبيب", en: "Today is the doctor's day" },
        desc: {
          ar: "نذكّر الطفل صباحاً ونريه التقويم.",
          en: "We remind your child in the morning and show them the day on the calendar.",
        },
      },
      {
        emoji: "🚗",
        title: { ar: "نروح للعيادة", en: "We go to the clinic" },
        desc: {
          ar: "نأخذ لعبته المفضّلة أو سمّاعات.",
          en: "We bring along a favorite toy or a pair of headphones.",
        },
      },
      {
        emoji: "🪑",
        title: { ar: "ننتظر دورنا", en: "We wait for our turn" },
        desc: {
          ar: "نقعد بهدوء. ممكن نلوّن أو نلعب.",
          en: "We sit quietly together. We can color or play a small game.",
        },
      },
      {
        emoji: "🩺",
        title: { ar: "الطبيب يفحص", en: "The doctor examines" },
        desc: {
          ar: "يسمع نبضات القلب، ينظر للأذن والعين.",
          en: "The doctor listens to your heart and looks at your ears and eyes.",
        },
      },
      {
        emoji: "💉",
        title: { ar: "إذا فيه إبرة", en: "If there is a shot" },
        desc: {
          ar: "نقول الحقيقة: 'بتحسّ بوخزة سريعة فقط'.",
          en: "We tell the truth: \"You'll feel a quick little pinch, that's all.\"",
        },
      },
      {
        emoji: "🎉",
        title: { ar: "ننتهي ونفرح", en: "We finish and celebrate" },
        desc: {
          ar: "ملصق أو مكافأة صغيرة بعد الزيارة.",
          en: "A sticker or a small reward to mark the end of the visit.",
        },
      },
    ],
    tips: [
      {
        ar: "اطلبي من العيادة أوّل موعد لتقليل الانتظار.",
        en: "Ask the clinic for the very first appointment to keep waiting time short.",
      },
      {
        ar: "خذي بطاقة الطفل الطبية وقائمة أدويته.",
        en: "Bring your child's medical card and a list of any current medications.",
      },
      {
        ar: "أخبري الطبيب مسبقاً أن طفلك على الطيف — قد يخصّص وقتاً أطول.",
        en: "Let the doctor know in advance that your child is on the spectrum — they may set aside extra time.",
      },
      {
        ar: "صوّري الفحص بكاميرا الجوال (إن سُمح) لاستخدامه كتدريب للزيارة القادمة.",
        en: "If allowed, record a short video of the visit on your phone to use as practice for next time.",
      },
    ],
  },
  {
    id: "dental",
    title: { ar: "تنظيف الأسنان", en: "Brushing Teeth" },
    desc: {
      ar: "روتين مصوّر صباحي ومسائي للأسنان",
      en: "A picture-based morning and bedtime routine for healthy teeth",
    },
    emoji: "🦷",
    Icon: Sparkles,
    color: "#E0A858",
    steps: [
      {
        emoji: "🪥",
        title: { ar: "نمسك الفرشاة", en: "We pick up the brush" },
        desc: {
          ar: "نشوف الفرشاة ونحطّ معجون بحجم حبة بازلاء.",
          en: "We look at the toothbrush and add a pea-sized drop of toothpaste.",
        },
      },
      {
        emoji: "💧",
        title: { ar: "نبلّل بالماء", en: "We add a little water" },
        desc: {
          ar: "ماء قليلة على الفرشاة.",
          en: "Just a small splash of water on the brush.",
        },
      },
      {
        emoji: "🦷",
        title: { ar: "نفرّش الأسنان الأمامية", en: "We brush the front teeth" },
        desc: {
          ar: "حركات دائرية لطيفة. نعدّ من ١-٢٠.",
          en: "Soft circular movements. We count slowly from 1 to 20.",
        },
      },
      {
        emoji: "😁",
        title: { ar: "نفرّش الجوانب", en: "We brush the sides" },
        desc: {
          ar: "اليمين، اليسار، الأعلى، الأسفل.",
          en: "Right side, left side, top and bottom.",
        },
      },
      {
        emoji: "👅",
        title: { ar: "نمسح اللسان", en: "We brush the tongue" },
        desc: {
          ar: "مسحة خفيفة على اللسان.",
          en: "A light, gentle sweep across the tongue.",
        },
      },
      {
        emoji: "🚰",
        title: { ar: "نمضمض ونبصق", en: "We rinse and spit" },
        desc: {
          ar: "ماء، نمضمض، ثم نبصق في الحوض.",
          en: "A sip of water, swish it around, then spit into the sink.",
        },
      },
    ],
    tips: [
      {
        ar: "اختاري فرشاة كهربائية بصوت هادئ إذا الطفل يحب الاهتزاز، أو يدوية ناعمة إذا يكره الصوت.",
        en: "Choose a quiet electric brush if your child enjoys vibration, or a soft manual one if sound bothers them.",
      },
      {
        ar: "جرّبي معاجين بنكهات مختلفة (فراولة، بطّيخ) — قد يقبل بعضها.",
        en: "Try different toothpaste flavors (strawberry, watermelon) — your child may accept one over another.",
      },
      {
        ar: "غنّي أغنية محبّبة مدة دقيقتين — هذا الوقت المثالي للتفريش.",
        en: "Sing a favorite two-minute song together — that's the perfect brushing time.",
      },
      {
        ar: "كوني قدوة: فرّشي معه أمام المرآة في نفس الوقت.",
        en: "Be the model: brush together in front of the mirror at the same time.",
      },
    ],
  },
  {
    id: "school",
    title: { ar: "أول يوم مدرسة", en: "First Day of School" },
    desc: {
      ar: "قصة اجتماعية مصوّرة لتهيئة الطفل لليوم الأول",
      en: "An illustrated social story to help your child feel prepared for the first day",
    },
    emoji: "🎒",
    Icon: School,
    color: "#0BB4B0",
    steps: [
      {
        emoji: "👕",
        title: { ar: "نلبس الزي", en: "We put on the uniform" },
        desc: {
          ar: "زي المدرسة جاهز من الذيل. نلبسه بالصباح.",
          en: "The uniform is ready from the night before. We put it on in the morning.",
        },
      },
      {
        emoji: "🥪",
        title: { ar: "نأكل الفطور", en: "We have breakfast" },
        desc: {
          ar: "فطور بسيط — لا أكل جديد في يوم جديد.",
          en: "A simple breakfast — no new foods on a new day.",
        },
      },
      {
        emoji: "🚌",
        title: { ar: "نروح للمدرسة", en: "We go to school" },
        desc: {
          ar: "ماما أو بابا يوصّلني. نغنّي بالطريق.",
          en: "Mama or Baba drops you off. We sing a little song on the way.",
        },
      },
      {
        emoji: "🏫",
        title: { ar: "نقابل المعلّمة", en: "We meet the teacher" },
        desc: {
          ar: "اسمها سنعرفه. تبتسم لنا. نقول 'صباح الخير'.",
          en: "We'll learn her name. She smiles at us. We say \"Good morning.\"",
        },
      },
      {
        emoji: "📝",
        title: { ar: "نلعب ونتعلّم", en: "We play and learn" },
        desc: {
          ar: "نلعب مع الأصحاب الجدد. نسمع، نرسم، نلوّن.",
          en: "We play with new friends. We listen, draw and color.",
        },
      },
      {
        emoji: "🤗",
        title: { ar: "ماما ترجع", en: "Mama comes back" },
        desc: {
          ar: "بعد أن تنتهي الحصص، ماما تجي وتأخذني للبيت.",
          en: "When class is over, Mama comes to pick you up and take you home.",
        },
      },
    ],
    tips: [
      {
        ar: "زوري المدرسة قبل اليوم الأول — خذي صوراً للفصل والمعلّمة والحمّامات.",
        en: "Visit the school before the first day — take photos of the classroom, the teacher and the bathrooms.",
      },
      {
        ar: "اصنعي 'كتاب المدرسة' مصوّر يضم اسم المعلّمة وصور الزملاء.",
        en: "Make a small \"school book\" with photos of the teacher and your child's classmates.",
      },
      {
        ar: "اتّفقي مع المعلّمة على إشارة سرية للراحة (مثل بطاقة ملوّنة).",
        en: "Agree with the teacher on a quiet signal for breaks (such as a colored card).",
      },
      {
        ar: "اجعلي اللقاء الأول مع المعلّمة في بيئة هادئة قبل بدء الدراسة.",
        en: "Arrange the first meeting with the teacher in a calm setting before school begins.",
      },
    ],
  },
  {
    id: "bedtime",
    title: { ar: "روتين النوم", en: "Bedtime Routine" },
    desc: {
      ar: "خطوات هادئة من العشاء حتى النوم",
      en: "Calm, gentle steps from dinner all the way to sleep",
    },
    emoji: "🌙",
    Icon: Moon,
    color: "#063048",
    steps: [
      {
        emoji: "🍽️",
        title: { ar: "نأكل العشاء", en: "We have dinner" },
        desc: {
          ar: "العشاء الساعة ٧:٠٠. أكل خفيف ومألوف.",
          en: "Dinner at 7:00. A light, familiar meal.",
        },
      },
      {
        emoji: "🛁",
        title: { ar: "نستحمّ بماء دافئ", en: "We take a warm bath" },
        desc: {
          ar: "حمام لطيف لمدة ١٠ دقائق. ماء دافئة وليست حارّة.",
          en: "A gentle ten-minute bath. The water is warm, never hot.",
        },
      },
      {
        emoji: "👕",
        title: { ar: "نلبس البيجامة", en: "We put on pajamas" },
        desc: {
          ar: "البيجامة المفضّلة — الناعمة.",
          en: "Your favorite pajamas — the soft, cozy ones.",
        },
      },
      {
        emoji: "🪥",
        title: { ar: "نفرّش الأسنان", en: "We brush our teeth" },
        desc: {
          ar: "تنظيف هادئ بإضاءة خافتة.",
          en: "A calm brushing under soft, dim light.",
        },
      },
      {
        emoji: "📖",
        title: { ar: "نقرأ قصة", en: "We read a story" },
        desc: {
          ar: "قصة قصيرة في الفراش. نفس القصة كل ليلة مفضّلة.",
          en: "A short story in bed. The same favorite story every night feels safe.",
        },
      },
      {
        emoji: "😴",
        title: { ar: "نطفّي الضوء وننام", en: "We turn off the light and sleep" },
        desc: {
          ar: "ضوء خافت أو ضوء ليلي. صوت أبيض إن أحبّه.",
          en: "A dim lamp or night light. White noise if your child finds it soothing.",
        },
      },
    ],
    tips: [
      {
        ar: "ابدئي الروتين بنفس الوقت كل ليلة — حتى عطلة الأسبوع.",
        en: "Start the routine at the same time every night — even on weekends.",
      },
      {
        ar: "اخفضي الإضاءة قبل النوم بساعة كاملة.",
        en: "Lower the lights a full hour before bedtime.",
      },
      {
        ar: "تجنّبي الشاشات قبل النوم بساعة على الأقل.",
        en: "Avoid screens for at least an hour before sleep.",
      },
      {
        ar: "استخدمي بطّانية ثقيلة (مرجّحة) إذا الطفل يحب الضغط العميق.",
        en: "Try a weighted blanket if your child enjoys gentle, deep pressure.",
      },
    ],
  },
  {
    id: "eid-visit",
    title: { ar: "زيارة الأقارب في العيد", en: "Visiting Family on Eid" },
    desc: {
      ar: "تهيئة الطفل لزحمة العيد والضيوف والعيدية",
      en: "Helping your child get ready for the bustle of Eid — the guests, the gatherings and the Eidiya",
    },
    emoji: "🎁",
    Icon: Gift,
    color: "#E0A858",
    steps: [
      {
        emoji: "👔",
        title: { ar: "نلبس ملابس العيد", en: "We wear our Eid clothes" },
        desc: {
          ar: "ملابس جديدة — جرّبها قبل بأيام لتعتاد.",
          en: "New clothes — try them on a few days before so they feel familiar.",
        },
      },
      {
        emoji: "🚗",
        title: {
          ar: "نروح لبيت جدّو وجدّتي",
          en: "We visit Grandma and Grandpa",
        },
        desc: {
          ar: "نوصل، نسلّم، نقول 'عيد مبارك'.",
          en: "We arrive, greet everyone, and say \"Eid Mubarak.\"",
        },
      },
      {
        emoji: "💰",
        title: { ar: "نأخذ العيدية", en: "We receive Eidiya" },
        desc: {
          ar: "الكبار يعطوننا فلوس — نقول 'شكراً'.",
          en: "The grown-ups give us money — we say \"Thank you.\"",
        },
      },
      {
        emoji: "🍫",
        title: { ar: "نأكل حلويات قليلة", en: "We enjoy a few sweets" },
        desc: {
          ar: "قليل من الحلويات المعروفة فقط.",
          en: "Only a small amount of familiar sweets.",
        },
      },
      {
        emoji: "🛋️",
        title: { ar: "نقعد بزاوية هادئة", en: "We find a quiet corner" },
        desc: {
          ar: "إذا كثر الضجيج، نروح لغرفة هادئة قليلاً.",
          en: "If it gets too loud, we slip away to a quiet room for a little while.",
        },
      },
      {
        emoji: "👋",
        title: { ar: "نسلّم ونرجع", en: "We say goodbye and head home" },
        desc: {
          ar: "بعد ساعة أو ساعتين، نقول 'مع السلامة' ونرجع.",
          en: "After an hour or two, we say goodbye and head home.",
        },
      },
    ],
    tips: [
      {
        ar: "اتّفقي مع العائلة مسبقاً على غرفة هادئة للطفل عند الحاجة.",
        en: "Arrange a quiet room with the host family in advance, in case your child needs a break.",
      },
      {
        ar: "حدّدي مدة الزيارة قبل الذهاب (ساعة، ساعتان) وأخبري الطفل.",
        en: "Decide on the visit length before leaving (one or two hours) and tell your child clearly.",
      },
      {
        ar: "خذي معك سمّاعات حاجبة للصوت ولعبة مفضّلة.",
        en: "Bring noise-cancelling headphones and a favorite toy along with you.",
      },
      {
        ar: "أخبري الأقارب: 'يحب السلام عن بُعد، الرجاء عدم الحضن'.",
        en: "Let relatives know kindly: \"He prefers a wave from a distance — please no hugs.\"",
      },
    ],
  },
];

export default function Printables() {
  const [, setLocation] = useLocation();
  const { lang } = useLangStore();

  const TXT = {
    ar: {
      home: "الرئيسية",
      badge: "مكتبة الطباعة",
      title: "موارد جاهزة للطباعة",
      subtitle:
        "ستّ بطاقات بصرية تساعد طفلكِ يستعدّ لمواقف يومية صعبة. اطبعيها وعلّقيها في البيت أو احفظيها PDF.",
      viewPrint: "عرض وطباعة",
      howTitle: "كيف تطبعين؟",
      step1: "اضغطي على البطاقة الذي تريدينها.",
      step2: "اضغطي زر \"طباعة\" أعلى الصفحة.",
      step3: "اختاري \"حفظ كـ PDF\" من نافذة الطباعة لو ليس لديكِ طابعة.",
      step4: "علّقي البطاقة على باب الغرفة أو الحمّام أو الثلاجة.",
      back: "رجوع للرئيسية",
    },
    en: {
      home: "Home",
      badge: "Print Library",
      title: "Ready-to-print resources",
      subtitle:
        "Six visual cards to help your child prepare for tricky everyday moments. Print them, hang them at home, or save them as PDF.",
      viewPrint: "View & print",
      howTitle: "How to print?",
      step1: "Tap the card you'd like to use.",
      step2: "Press the \"Print\" button at the top of the page.",
      step3: "Choose \"Save as PDF\" from the print dialog if you don't have a printer.",
      step4: "Hang the card on the bedroom door, the bathroom or the fridge.",
      back: "Back to home",
    },
  } as const;
  const T = TXT[lang];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#0D2137] to-[#063048] text-white px-6 pt-20 pb-10">
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-1 text-xs text-white/70 hover:text-white mb-4"
        >
          <ArrowLeft size={14} /> {T.home}
        </button>
        <div className="max-w-md">
          <div className="inline-flex items-center gap-1.5 bg-[#E0A858]/20 border border-[#E0A858]/40 rounded-full px-3 py-1 mb-3">
            <FileText size={12} className="text-[#E0A858]" />
            <span className="text-[10px] font-black text-[#E0A858]">{T.badge}</span>
          </div>
          <h1 className="text-3xl font-black mb-2">{T.title}</h1>
          <p className="text-sm text-white/70 leading-relaxed">
            {T.subtitle}
          </p>
        </div>
      </div>

      <div className="px-6 py-8 max-w-2xl mx-auto pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRINTABLES.map((p, i) => (
            <Link key={p.id} href={`/printables/${p.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border-2 border-border rounded-3xl p-5 cursor-pointer hover:border-primary hover:shadow-lg transition-all"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 text-3xl"
                  style={{ background: `${p.color}20` }}
                >
                  {p.emoji}
                </div>
                <h3 className="text-lg font-black text-[#0D2137] mb-1">{p.title[lang]}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {p.desc[lang]}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-primary font-bold">
                  <Printer size={12} />
                  <span>{T.viewPrint}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-8 bg-[#FFF7EE] border border-[#E0A858]/30 rounded-3xl p-5">
          <h3 className="text-sm font-black text-[#0D2137] mb-2">{T.howTitle}</h3>
          <ol className={`text-xs text-muted-foreground leading-relaxed space-y-1.5 list-decimal ${lang === "ar" ? "pr-4" : "pl-4"}`}>
            <li>{T.step1}</li>
            <li>{T.step2}</li>
            <li>{T.step3}</li>
            <li>{T.step4}</li>
          </ol>
        </div>

        <div className="mt-6 text-center">
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            className="rounded-full"
          >
            {T.back}
          </Button>
        </div>
      </div>
    </Layout>
  );
}
