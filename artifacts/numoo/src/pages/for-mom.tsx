import { Layout } from "@/components/layout";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Wind,
  BookOpen,
  ArrowLeft,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useLangStore } from "@/lib/lang-store";

const AFFIRMATIONS = {
  ar: [
    "أنتِ تكفينَ. ما تقومين فيه يومياً عظيم.",
    "حبكِ لطفلكِ هو أهم علاج. لا أحد يحلّ محلّكِ.",
    "تقدّم طفلكِ — حتى لو بطيء — هو إنجازكِ كذلك.",
    "أن تطلبي المساعدة قوة، لا ضعف.",
    "ساعة لكِ اليوم تعني صبراً أكثر غداً.",
    "أنتِ لستِ وحدكِ. كل أم تمرّ بلحظات مثل لحظتكِ.",
    "أخطاء اليوم لا تعني فشل الغد.",
  ],
  en: [
    "You are enough. What you do every day is remarkable.",
    "Your love is your child's most important therapy. No one can replace you.",
    "Every step forward — however small — is your achievement too.",
    "Asking for help is a sign of strength, not weakness.",
    "An hour for yourself today means more patience tomorrow.",
    "You are not alone. Every mother has moments just like yours.",
    "Today's mistakes are not tomorrow's failures.",
  ],
};

const PROMPTS = {
  ar: [
    "ما الشيء الصغير الذي أبهجكِ اليوم؟",
    "متى آخر مرة فعلتِ شيئاً لنفسكِ؟",
    "ما الذي تحتاجين إليه لتتنفّسي بعمق هذا الأسبوع؟",
    "ما إنجاز طفلكِ الذي لا يلاحظه غيركِ؟",
    "كلمة تقولينها لنفسكِ كصديقة عزيزة؟",
  ],
  en: [
    "What small thing brought you joy today?",
    "When was the last time you did something just for you?",
    "What do you need this week to breathe deeply?",
    "What achievement of your child's do only you notice?",
    "What would you say to yourself as a dear friend?",
  ],
};

type MoodEntry = { date: string; mood: number; note: string };

const MOODS = [
  { v: 1, emoji: "😢", label: { ar: "متعبة جداً", en: "Exhausted" }, color: "#dc2626" },
  { v: 2, emoji: "😟", label: { ar: "مرهقة", en: "Worn out" }, color: "#ea580c" },
  { v: 3, emoji: "😐", label: { ar: "عادية", en: "Okay" }, color: "#ca8a04" },
  { v: 4, emoji: "🙂", label: { ar: "بخير", en: "Good" }, color: "#16a34a" },
  { v: 5, emoji: "😄", label: { ar: "ممتازة", en: "Wonderful" }, color: "#0BB4B0" },
];

const STORAGE_KEY = "numoo_mom_journal_v1";

const TXT = {
  ar: {
    home: "الرئيسية",
    badge: "للأم — لأنكِ مهمة",
    title: "نمو لكِ",
    subtitle: "مساحة هادئة لكِ أنتِ. تنفّسي، عبّري، وذكّري نفسكِ أنكِ لستِ وحدكِ.",
    tabBreathe: "تنفّس",
    tabJournal: "مذكرة",
    tabAffirm: "تذكيرات",
  },
  en: {
    home: "Home",
    badge: "For mom — because you matter",
    title: "Numoo for you",
    subtitle: "A calm space just for you. Breathe, express, and remind yourself you are not alone.",
    tabBreathe: "Breathe",
    tabJournal: "Journal",
    tabAffirm: "Affirmations",
  },
};

export default function ForMom() {
  const [, setLocation] = useLocation();
  const [tab, setTab] = useState<"breathe" | "journal" | "affirm">("breathe");
  const { lang } = useLangStore();
  const T = TXT[lang];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#0BB4B0] via-[#089b98] to-[#0D2137] text-white px-6 pt-20 pb-10 relative overflow-hidden">
        <div className="absolute top-10 left-10 text-[140px] opacity-10 select-none">💚</div>
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-1 text-xs text-white/80 hover:text-white mb-4 relative z-10"
        >
          <ArrowLeft size={14} /> {T.home}
        </button>
        <div className="max-w-md relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/30 rounded-full px-3 py-1 mb-3">
            <Heart size={12} className="fill-white" />
            <span className="text-[10px] font-black">{T.badge}</span>
          </div>
          <h1 className="text-3xl font-black mb-2">{T.title}</h1>
          <p className="text-sm text-white/85 leading-relaxed">
            {T.subtitle}
          </p>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto pb-32">
        <div className="flex gap-2 mb-6 bg-muted rounded-2xl p-1.5">
          <button
            onClick={() => setTab("breathe")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
              tab === "breathe" ? "bg-white text-[#0D2137] shadow-md" : "text-muted-foreground"
            }`}
          >
            <Wind size={14} className="inline ml-1" />
            {T.tabBreathe}
          </button>
          <button
            onClick={() => setTab("journal")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
              tab === "journal" ? "bg-white text-[#0D2137] shadow-md" : "text-muted-foreground"
            }`}
          >
            <BookOpen size={14} className="inline ml-1" />
            {T.tabJournal}
          </button>
          <button
            onClick={() => setTab("affirm")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
              tab === "affirm" ? "bg-white text-[#0D2137] shadow-md" : "text-muted-foreground"
            }`}
          >
            <Sparkles size={14} className="inline ml-1" />
            {T.tabAffirm}
          </button>
        </div>

        {tab === "breathe" && <BreathePanel />}
        {tab === "journal" && <JournalPanel />}
        {tab === "affirm" && <AffirmPanel />}
      </div>
    </Layout>
  );
}

function BreathePanel() {
  const [phase, setPhase] = useState<"in" | "hold" | "out" | "rest" | "idle">("idle");
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const tickRef = useRef<number | null>(null);
  const { lang } = useLangStore();

  useEffect(() => {
    if (!running) return;
    const sequence: { name: typeof phase; secs: number }[] = [
      { name: "in", secs: 4 },
      { name: "hold", secs: 7 },
      { name: "out", secs: 8 },
      { name: "rest", secs: 1 },
    ];
    let idx = 0;
    let secLeft = sequence[idx]!.secs;
    setPhase(sequence[idx]!.name);
    setCount(secLeft);

    tickRef.current = window.setInterval(() => {
      secLeft -= 1;
      if (secLeft <= 0) {
        idx = (idx + 1) % sequence.length;
        if (idx === 0) setCycles((c) => c + 1);
        secLeft = sequence[idx]!.secs;
        setPhase(sequence[idx]!.name);
      }
      setCount(secLeft);
    }, 1000);

    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [running]);

  const stop = () => {
    setRunning(false);
    setPhase("idle");
    setCount(0);
    if (tickRef.current) window.clearInterval(tickRef.current);
  };

  const phaseLabels = {
    ar: {
      in: "شهيق...",
      hold: "احبسي النفس",
      out: "زفير...",
      rest: "...",
      idle: "اضغطي ابدئي",
    },
    en: {
      in: "Breathe in...",
      hold: "Hold...",
      out: "Breathe out...",
      rest: "...",
      idle: "Press start",
    },
  };
  const phaseLabel = phaseLabels[lang][phase];

  const scale = phase === "in" ? 1.4 : phase === "hold" ? 1.4 : phase === "out" ? 0.7 : 1;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
      <div className={`bg-[#FFF7EE] border border-[#E0A858]/30 rounded-2xl p-4 mb-6 ${lang === "ar" ? "text-right" : "text-left"}`}>
        <h3 className="text-sm font-black text-[#0D2137] mb-1">
          {lang === "ar" ? "تمرين 4-7-8" : "The 4-7-8 exercise"}
        </h3>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {lang === "ar"
            ? "تقنية معتمدة من د. أندرو ويل (Harvard) للتهدئة. شهيق ٤، حبس ٧، زفير ٨. كرّري ٤ مرات."
            : "A calming technique developed by Dr. Andrew Weil (Harvard). Inhale for 4, hold for 7, exhale for 8. Repeat 4 times."}
        </p>
      </div>

      <div className="relative w-72 h-72 mx-auto flex items-center justify-center mb-8">
        <motion.div
          animate={{ scale }}
          transition={{ duration: phase === "in" ? 4 : phase === "out" ? 8 : phase === "hold" ? 7 : 1, ease: "easeInOut" }}
          className="absolute w-56 h-56 rounded-full bg-gradient-to-br from-[#0BB4B0] to-[#089b98] opacity-20"
        />
        <motion.div
          animate={{ scale }}
          transition={{ duration: phase === "in" ? 4 : phase === "out" ? 8 : phase === "hold" ? 7 : 1, ease: "easeInOut" }}
          className="absolute w-44 h-44 rounded-full bg-gradient-to-br from-[#0BB4B0] to-[#089b98] opacity-40"
        />
        <motion.div
          animate={{ scale }}
          transition={{ duration: phase === "in" ? 4 : phase === "out" ? 8 : phase === "hold" ? 7 : 1, ease: "easeInOut" }}
          className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-[#0BB4B0] to-[#089b98] flex items-center justify-center text-white"
        >
          <div>
            <div className="text-3xl font-black">{count > 0 ? count : ""}</div>
            <div className="text-[10px] mt-1 opacity-90">{phaseLabel}</div>
          </div>
        </motion.div>
      </div>

      <div className="flex gap-3 justify-center mb-4">
        {!running ? (
          <Button
            onClick={() => {
              setCycles(0);
              setRunning(true);
            }}
            className="rounded-full bg-[#0BB4B0] hover:bg-[#089b98] text-white px-8"
          >
            {lang === "ar" ? "ابدئي التنفّس" : "Start breathing"}
          </Button>
        ) : (
          <Button onClick={stop} variant="outline" className="rounded-full px-8">
            {lang === "ar" ? "توقّف" : "Stop"}
          </Button>
        )}
      </div>
      {cycles > 0 && (
        <p className="text-xs text-muted-foreground">
          {lang === "ar" ? (
            <>
              أكملتِ <strong className="text-[#0BB4B0]">{cycles}</strong> دورة
              {cycles >= 4 && " — أحسنتِ!"}
            </>
          ) : (
            <>
              You completed <strong className="text-[#0BB4B0]">{cycles}</strong> {cycles === 1 ? "cycle" : "cycles"}
              {cycles >= 4 && " — well done!"}
            </>
          )}
        </p>
      )}
    </motion.div>
  );
}

function JournalPanel() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [mood, setMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const { lang } = useLangStore();
  const [prompt] = useState(
    () => PROMPTS[lang][Math.floor(Math.random() * PROMPTS[lang].length)]!,
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch {}
  }, []);

  const save = () => {
    if (!mood) return;
    const today = new Date().toISOString().split("T")[0]!;
    const next: MoodEntry[] = [
      { date: today, mood, note: note.trim() },
      ...entries.filter((e) => e.date !== today),
    ].slice(0, 30);
    setEntries(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setMood(null);
    setNote("");
  };

  const remove = (date: string) => {
    const next = entries.filter((e) => e.date !== date);
    setEntries(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bg-white border-2 border-[#0BB4B0]/30 rounded-3xl p-5 mb-6">
        <h3 className="text-base font-black text-[#0D2137] mb-1">
          {lang === "ar" ? "كيف حالكِ اليوم؟" : "How are you today?"}
        </h3>
        <p className="text-[11px] text-muted-foreground mb-4">{prompt}</p>

        <div className="grid grid-cols-5 gap-2 mb-4">
          {MOODS.map((m) => (
            <button
              key={m.v}
              onClick={() => setMood(m.v)}
              className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                mood === m.v
                  ? "border-[#0BB4B0] bg-[#0BB4B0]/10 scale-105"
                  : "border-border bg-white hover:border-muted-foreground"
              }`}
            >
              <span className="text-3xl mb-0.5">{m.emoji}</span>
              <span className="text-[9px] font-bold text-muted-foreground">{m.label[lang]}</span>
            </button>
          ))}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={lang === "ar" ? "اكتبي ما تشعرين به (اختياري)..." : "Write what you're feeling (optional)..."}
          className="w-full min-h-[80px] p-3 rounded-2xl border border-border bg-card text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
          maxLength={300}
        />

        <Button
          onClick={save}
          disabled={!mood}
          className="w-full mt-3 rounded-full bg-[#0BB4B0] hover:bg-[#089b98] disabled:opacity-40"
        >
          {lang === "ar" ? "احفظي اليوم" : "Save today"}
        </Button>
      </div>

      {entries.length > 0 && (
        <div>
          <h4 className="text-sm font-black text-[#0D2137] mb-3">
            {lang === "ar" ? "آخر أيامكِ" : "Your recent days"}
          </h4>
          <div className="space-y-2">
            {entries.map((e) => {
              const m = MOODS.find((mm) => mm.v === e.mood);
              return (
                <div
                  key={e.date}
                  className="bg-white border border-border rounded-2xl p-3 flex items-start gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `${m?.color}15` }}
                  >
                    {m?.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-black text-muted-foreground">{e.date}</span>
                      <span className="text-[10px] font-bold" style={{ color: m?.color }}>
                        {m?.label[lang]}
                      </span>
                    </div>
                    {e.note && <p className="text-xs text-foreground leading-relaxed">{e.note}</p>}
                  </div>
                  <button
                    onClick={() => remove(e.date)}
                    className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-destructive flex-shrink-0"
                    aria-label={lang === "ar" ? "حذف" : "Delete"}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-4">
            {lang === "ar"
              ? "مذكرتكِ محفوظة على جهازكِ فقط — لا تُرسل لأي خادم."
              : "Your journal stays on your device only — nothing is sent to any server."}
          </p>
        </div>
      )}
    </motion.div>
  );
}

function AffirmPanel() {
  const [idx, setIdx] = useState(0);
  const { lang } = useLangStore();
  const list = AFFIRMATIONS[lang];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
      <div className="relative min-h-[260px] flex items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-[#0BB4B0]/10 to-[#E0A858]/10 border-2 border-[#0BB4B0]/30 rounded-3xl p-8 max-w-md mx-auto"
          >
            <Heart className="text-[#0BB4B0] fill-[#0BB4B0]/30 mx-auto mb-4" size={32} />
            <p className="text-lg text-[#0D2137] leading-relaxed font-bold">
              {list[idx]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 justify-center items-center mb-6">
        <Button
          onClick={() => setIdx((i) => (i - 1 + list.length) % list.length)}
          variant="outline"
          className="rounded-full"
        >
          {lang === "ar" ? "السابقة" : "Previous"}
        </Button>
        <span className="text-xs text-muted-foreground">
          {idx + 1} / {list.length}
        </span>
        <Button
          onClick={() => setIdx((i) => (i + 1) % list.length)}
          className="rounded-full bg-[#0BB4B0] hover:bg-[#089b98]"
        >
          {lang === "ar" ? "التالية" : "Next"}
        </Button>
      </div>

      <div className={`bg-[#FFF7EE] border border-[#E0A858]/30 rounded-2xl p-4 max-w-md mx-auto ${lang === "ar" ? "text-right" : "text-left"}`}>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {lang === "ar" ? (
            <>
              العناية بنفسكِ ليست أنانية — هي شرط أن تستمرّي في العناية بطفلكِ. لو تحتاجين دعماً نفسياً، تواصلي مع <strong className="text-[#0D2137]">مركز الصحة النفسية الكويتي 1888888</strong>.
            </>
          ) : (
            <>
              Caring for yourself isn't selfish — it's how you keep caring for your child. If you need mental health support, please reach out to the <strong className="text-[#0D2137]">Kuwait Mental Health Center at 1888888</strong>.
            </>
          )}
        </p>
      </div>
    </motion.div>
  );
}
