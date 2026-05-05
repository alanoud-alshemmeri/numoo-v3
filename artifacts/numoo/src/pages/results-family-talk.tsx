import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MessageCircleHeart,
  AlertTriangle,
  Lightbulb,
  Quote,
  Ban,
  ChevronDown,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { useAssessmentStore } from "@/lib/store";
import { FAMILY_SCRIPTS } from "@/lib/result-resources";
import { useLangStore } from "@/lib/lang-store";

const TXT = {
  ar: {
    backToResults: "النتائج",
    heroTitle: "كيف أقول لعائلتي؟",
    heroSubtitle: "كلمات حقيقية لأصعب ٤ محادثات بحياتكِ",
    heroNote:
      "ما تحتاجين تخترعين الكلام. هذه سيناريوهات جاهزة من أمهات مرّوا قبلكِ. اقرئي، اختاري الذي يناسب طبعكِ، وكلمي عائلتكِ بثقة.",
    tapToClose: "اضغطي للإغلاق",
    tapToOpen: "اضغطي لقراءة السيناريو الكامل",
    challengeTitle: "التحدي",
    openingTitle: "كيف تفتحين الموضوع",
    keyPhrasesTitle: "جمل جاهزة قوليها",
    tipsTitle: "نصائح ذهبية",
    avoidTitle: "تجنّبي هذي",
    rememberTitle: "تذكّري...",
    rememberBody:
      "ردة فعل عائلتكِ، ليس مسؤوليتكِ. مسؤوليتكِ هي طفلكِ. لو أحد ما تقبّل، ابتعدي بهدوء وأكملي طريقكِ. الوقت يعالج معظم المواقف.",
  },
  en: {
    backToResults: "Results",
    heroTitle: "How do I tell my family?",
    heroSubtitle: "Real words for the four hardest conversations of your life",
    heroNote:
      "You don't need to invent the words. These are ready-made scripts from mothers who walked this road before you. Read them, choose what fits your style, and speak to your family with confidence.",
    tapToClose: "Tap to close",
    tapToOpen: "Tap to read the full script",
    challengeTitle: "The challenge",
    openingTitle: "How to open the conversation",
    keyPhrasesTitle: "Ready-made phrases to say",
    tipsTitle: "Golden tips",
    avoidTitle: "Avoid these",
    rememberTitle: "Remember...",
    rememberBody:
      "Your family's reaction is not your responsibility. Your child is. If someone doesn't accept it, step back calmly and keep walking your path. Time heals most situations.",
  },
} as const;

type ScriptText = {
  audience: string;
  challenge: string;
  opening: string;
  keyPhrases: string[];
  tips: string[];
  avoid: string[];
};

const EN_SCRIPTS: Record<string, ScriptText> = {
  husband: {
    audience: "With your husband / the father",
    challenge:
      "The most common reaction: the father refuses the idea from the start. He says \"my son is fine,\" \"you're exaggerating,\" or \"all of you were late talkers.\" This is a major reason for delayed diagnosis.",
    opening:
      "Choose a calm time, after dinner, with no children around. Begin with:\n\n\"Ahmed, I need you to sit with me for five minutes. There's something important I want to tell you and I need your support.\"",
    keyPhrases: [
      "\"I took an evaluation for [child's name] on a trusted medical platform. The result says we should take him to a doctor to be sure.\"",
      "\"The result doesn't mean he's sick. It means there are signs that deserve a specialist's check.\"",
      "\"I don't want you to worry. I want you to help me feel reassured.\"",
      "\"If we delay until next year, the chances shrink. Every month makes a difference.\"",
      "\"If everything turns out fine, alhamdulillah. If something shows up, we face it together early.\"",
      "\"I'm scared, but I know I have a strong man behind me. Help me.\"",
    ],
    tips: [
      "Give him a clear role: \"You book the doctor's appointment.\" Men love a concrete task.",
      "Share the Numoo PDF report with him — numbers and references convince more than words.",
      "Mention that M-CHAT-R/F is a clinical tool endorsed by the American Academy of Pediatrics, not an \"internet quiz.\"",
      "Suggest he comes with you to the doctor's visit so he hears it himself.",
    ],
    avoid: [
      "Avoid \"You never pay attention!\" or \"I told you a long time ago\" — it turns into a fight.",
      "Don't lead with the word \"autism\" — use \"a small delay we want to confirm.\"",
      "Don't bring up the topic in front of children or guests.",
      "If he gets angry or refuses, don't get angry back. Give him an hour and return calmly.",
    ],
  },
  mother: {
    audience: "With your mother / mother-in-law / grandmother",
    challenge:
      "Kuwaiti grandmothers often respond with \"all of you were late,\" \"kids today have no patience,\" \"let him play, he'll be fine.\" These are natural reactions from a generation that raised children without diagnoses — not stubbornness.",
    opening:
      "Begin with love and respect, not confrontation:\n\n\"Mama, I need your help with something. You raised seven children without doctors — I trust your judgment. But I want you to come with me for [child's name] so we can agree together.\"",
    keyPhrases: [
      "\"You lived in a sweeter time when everything was simple. Today things are more complex; doctors catch things earlier.\"",
      "\"Taking him to the doctor doesn't mean there's a problem — it means I want you to feel reassured with me.\"",
      "\"Your prayers are what make the difference for me. I need them.\"",
      "\"Even if nothing shows up, we're at peace. And if something small shows up, we catch it before it grows.\"",
      "\"Come with me to the next visit and hear the doctor yourself.\"",
      "\"I want him to grow up like [another grandchild]; that's why I'm starting now.\"",
    ],
    tips: [
      "Use \"I need you to reassure me\" instead of \"I'm worried\" — a grandmother loves being the reference.",
      "Mention another child in the family who had a delay and recovered (if it applies).",
      "Name specific known doctors and clinics — details reassure her.",
      "Offer to bring her to one speech therapy session — she'll be convinced by seeing it.",
    ],
    avoid: [
      "Don't say \"you don't understand, times have changed\" — it crushes her.",
      "Don't mention \"the internet\" or \"apps\" — she'll doubt the source.",
      "Don't say \"the doctor said\" before she has heard it from you — she'll feel hidden from.",
      "Don't use the word \"autism\" in the first conversation. The grandmother fears the term.",
    ],
  },
  siblings: {
    audience: "With the child's brothers and sisters",
    challenge:
      "Older siblings (5–12 years) notice everything. If you don't explain, they invent the wrong story: \"Mama loves my brother more,\" \"It's my fault.\" The younger ones sense the change without understanding.",
    opening:
      "Gather all the siblings in a comfortable place, without the child. Begin with:\n\n\"My loves, I want you to understand something about your brother [child's name]. It's nothing scary, but it's important.\"",
    keyPhrases: [
      "\"Your brother is growing in his own way. Some children learn to talk fast, others need more time.\"",
      "\"It doesn't mean he is sick. It means he needs more help from all of us.\"",
      "\"I'm taking him to doctors who help him. Sometimes I'm busy with him, but I love you all just the same.\"",
      "\"You're the older one — you can help me. Bless you.\"",
      "\"If kids at school ask about him, say: 'My brother is special, he learns in his own way.'\"",
      "\"If you ever feel sad or jealous, come tell me. That's normal and it's allowed.\"",
    ],
    tips: [
      "Set aside 15 minutes a day for each sibling alone, even when busy. It's the most important thing in the world.",
      "Give the older one a small role (teach him a new word) — they'll feel valued instead of jealous.",
      "Tell them a story or show a video about a child like their brother (Sesame Street: Julia is a beautiful example).",
      "Don't turn siblings into \"nurses\" — they're children, not therapists.",
    ],
    avoid: [
      "Don't say \"your brother is sick\" — the word frightens them and isolates him.",
      "Don't compare them: \"Look at your brother, you're the older one.\" It plants permanent jealousy.",
      "Don't hide the topic completely — children sense things and feel betrayed.",
      "Don't discuss his details in front of them — protect his dignity.",
    ],
  },
  relatives: {
    audience: "With curious relatives",
    challenge:
      "At gatherings and events the questions pour in: \"Why doesn't your son talk?\", \"You're spoiling him!\", \"Have you tried so-and-so's ruqyah?\" Some are well-meaning, some curious, some hurtful.",
    opening:
      "You don't owe anyone a detailed explanation. You have every right to answer briefly, with dignity:",
    keyPhrases: [
      "\"Every child grows in his own way. Thank you for asking.\" (Then change the subject.)",
      "\"Alhamdulillah, we're following up with a doctor and everything is under control.\"",
      "\"I know you mean well, but I understand my child's situation. Please pray for us.\"",
      "\"If you really want to help, tell me when you can sit with him for an hour so I can step out of the house.\"",
      "\"Ruqyah and prayer are part of my life, and I'm following up medically. The two go together.\"",
      "\"Thank you for the advice, but I'm with a specialized medical team that decides his treatment path.\"",
    ],
    tips: [
      "You don't owe anyone an explanation. \"Thank you, please pray for us\" is enough.",
      "Memorize three short ready replies so you can answer without thinking.",
      "If someone hurts your child publicly, leave the place. Your child's dignity is more important than a gathering.",
      "Negativity is contagious. Reduce visits with people who hurt you.",
    ],
    avoid: [
      "Don't explain the diagnosis details with every question — it drains you emotionally.",
      "Don't justify your child's behavior to anyone. He doesn't need justification.",
      "Don't challenge them — \"you don't understand!\" only creates needless enemies.",
      "Don't sit through a long gathering if it harms you. You have the right to leave.",
    ],
  },
};

export default function ResultsFamilyTalk() {
  const [, setLocation] = useLocation();
  const { ageGroup } = useAssessmentStore();
  const { lang } = useLangStore();
  const [openId, setOpenId] = useState<string | null>(FAMILY_SCRIPTS[0]?.id ?? null);
  const T = TXT[lang];

  useEffect(() => {
    if (!ageGroup) setLocation("/");
  }, [ageGroup, setLocation]);

  if (!ageGroup) return null;

  return (
    <Layout>
      <div className="pb-32 bg-[#f4fafa] min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#9333ea] to-[#7e22ce] text-white px-5 pt-6 pb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white" />
          </div>
          <Link href="/results">
            <button className="relative z-10 mb-4 flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium">
              <ArrowRight size={16} />
              {T.backToResults}
            </button>
          </Link>
          <div className="relative z-10 flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <MessageCircleHeart size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold leading-tight">
                {T.heroTitle}
              </h1>
              <p className="text-sm text-white/85 mt-1">
                {T.heroSubtitle}
              </p>
            </div>
          </div>
          <div className="relative z-10 mt-4 bg-white/10 rounded-2xl p-3 text-[12px] leading-relaxed">
            {T.heroNote}
          </div>
        </div>

        {/* Scripts */}
        <div className="px-5 pt-5 space-y-3">
          {FAMILY_SCRIPTS.map((script, idx) => {
            const isOpen = openId === script.id;
            const localized: ScriptText =
              lang === "en" && EN_SCRIPTS[script.id]
                ? EN_SCRIPTS[script.id]
                : {
                    audience: script.audience,
                    challenge: script.challenge,
                    opening: script.opening,
                    keyPhrases: script.keyPhrases,
                    tips: script.tips,
                    avoid: script.avoid,
                  };
            return (
              <motion.div
                key={script.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-3xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : script.id)}
                  className="w-full p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#9333ea]/10 flex items-center justify-center text-2xl">
                    {script.emoji}
                  </div>
                  <div className={`flex-1 min-w-0 ${lang === "ar" ? "text-right" : "text-left"}`}>
                    <h2 className="text-base font-extrabold text-foreground">
                      {localized.audience}
                    </h2>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {isOpen ? T.tapToClose : T.tapToOpen}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 space-y-4 border-t border-border pt-4">
                        {/* Challenge */}
                        <Section
                          icon={<AlertTriangle size={15} />}
                          title={T.challengeTitle}
                          color="#dc2626"
                          bg="#fef2f2"
                          border="#fecaca"
                        >
                          <p className="text-sm text-foreground leading-relaxed">
                            {localized.challenge}
                          </p>
                        </Section>

                        {/* Opening */}
                        <Section
                          icon={<MessageCircleHeart size={15} />}
                          title={T.openingTitle}
                          color="#0d9488"
                          bg="#f0fdfa"
                          border="#99f6e4"
                        >
                          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                            {localized.opening}
                          </p>
                        </Section>

                        {/* Key phrases */}
                        <Section
                          icon={<Quote size={15} />}
                          title={T.keyPhrasesTitle}
                          color="#7c3aed"
                          bg="#faf5ff"
                          border="#e9d5ff"
                        >
                          <ul className="space-y-2">
                            {localized.keyPhrases.map((p, i) => (
                              <li
                                key={i}
                                className="text-sm text-foreground leading-relaxed bg-white rounded-xl p-2.5 border border-purple-100"
                              >
                                {p}
                              </li>
                            ))}
                          </ul>
                        </Section>

                        {/* Tips */}
                        <Section
                          icon={<Lightbulb size={15} />}
                          title={T.tipsTitle}
                          color="#d97706"
                          bg="#fffbeb"
                          border="#fde68a"
                        >
                          <ul className="space-y-1.5">
                            {localized.tips.map((tip, i) => (
                              <li
                                key={i}
                                className="text-sm text-foreground leading-relaxed flex gap-2"
                              >
                                <span className="text-amber-600 font-bold flex-shrink-0">
                                  ✓
                                </span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </Section>

                        {/* Avoid */}
                        <Section
                          icon={<Ban size={15} />}
                          title={T.avoidTitle}
                          color="#dc2626"
                          bg="#fef2f2"
                          border="#fecaca"
                        >
                          <ul className="space-y-1.5">
                            {localized.avoid.map((a, i) => (
                              <li
                                key={i}
                                className="text-sm text-foreground leading-relaxed flex gap-2"
                              >
                                <span className="text-red-600 font-bold flex-shrink-0">
                                  ✗
                                </span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </Section>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-3xl p-4 text-center">
            <p className="text-sm font-bold text-foreground mb-1">
              {T.rememberTitle}
            </p>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              {T.rememberBody}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Section({
  icon,
  title,
  color,
  bg,
  border,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  bg: string;
  border: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-3.5"
      style={{ backgroundColor: bg, border: `1px solid ${border}` }}
    >
      <div
        className="flex items-center gap-1.5 mb-2.5 font-extrabold text-sm"
        style={{ color }}
      >
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}
