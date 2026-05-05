import { useEffect, useState, useRef } from "react";
import { Layout } from "@/components/layout";
import { useLangStore } from "@/lib/lang-store";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, RotateCcw, Trash2, Play, MessageSquare } from "lucide-react";
import { AAC_CATEGORIES, type AACWord } from "@/lib/aac-vocabulary";

type SpokenItem = AACWord & { catId: string; catColor: string };

const TXT = {
  ar: {
    title: "لوحة تواصل صوتية",
    subtitle: "اضغطي الصورة لينطقها التطبيق بالعربية",
    loadingVoice: "جارٍ تحميل الصوت",
    emptyStrip: "اضغطي على الصور لتكوين جملة...",
    playSentence: "اقرأ الجملة",
    undo: "تراجع",
    clear: "مسح",
  },
  en: {
    title: "Voice Communication Board",
    subtitle: "Tap a picture and the app will speak it aloud in Arabic",
    loadingVoice: "Loading voice",
    emptyStrip: "Tap pictures to build a sentence...",
    playSentence: "Play sentence",
    undo: "Undo",
    clear: "Clear",
  },
} as const;

export default function Aac() {
  const { lang } = useLangStore();
  const T = TXT[lang];
  const [active, setActive] = useState(AAC_CATEGORIES[0].id);
  const [strip, setStrip] = useState<SpokenItem[]>([]);
  const [voiceReady, setVoiceReady] = useState(false);
  const arabicVoice = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    const findVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const ar =
        voices.find((v) => v.lang?.startsWith("ar")) ??
        voices.find((v) => v.name.toLowerCase().includes("arab")) ??
        null;
      arabicVoice.current = ar;
      setVoiceReady(true);
    };
    findVoice();
    window.speechSynthesis.onvoiceschanged = findVoice;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ar-SA";
    u.rate = 0.85;
    u.pitch = 1;
    if (arabicVoice.current) u.voice = arabicVoice.current;
    window.speechSynthesis.speak(u);
  };

  const tap = (word: AACWord, catId: string, catColor: string) => {
    speak(word.speak ?? word.ar);
    setStrip((s) => {
      const next = [...s, { ...word, catId, catColor }];
      return next.slice(-12);
    });
  };

  const playSentence = () => {
    if (strip.length === 0) return;
    const text = strip.map((w) => w.speak ?? w.ar).join(" ");
    speak(text);
  };

  const clearStrip = () => setStrip([]);
  const popLast = () => setStrip((s) => s.slice(0, -1));

  const cat = AAC_CATEGORIES.find((c) => c.id === active) ?? AAC_CATEGORIES[0];

  return (
    <Layout hideFooter>
      <div className="h-[100dvh] flex flex-col overflow-hidden">
        <div className="bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] text-white px-6 pt-20 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
              <MessageSquare size={20} className="text-primary-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-black truncate">{T.title}</h2>
              <p className="text-[11px] text-white/60 leading-tight">
                {T.subtitle}
              </p>
            </div>
            {!voiceReady && (
              <span className="text-[10px] bg-amber-500/20 text-amber-100 px-2 py-1 rounded-full">
                {T.loadingVoice}
              </span>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
            {AAC_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-2xl text-xs font-bold transition-all border-2 flex items-center gap-1.5 ${
                  active === c.id
                    ? "bg-white text-[#0D2137] border-white shadow-lg"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }`}
                data-testid={`cat-${c.id}`}
              >
                <span className="text-base">{c.emoji}</span>
                <span>{lang === "ar" ? c.ar : c.en}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#FFF7EE] border-b-2 border-[#E0A858]/30 px-3 py-2 flex items-center gap-2 flex-shrink-0">
          <div className="flex-1 overflow-x-auto flex items-center gap-1.5 min-h-[52px] py-1">
            {strip.length === 0 ? (
              <span className="text-xs text-muted-foreground px-2">
                {T.emptyStrip}
              </span>
            ) : (
              strip.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex-shrink-0 bg-white border-2 rounded-xl px-2 py-1 flex items-center gap-1 shadow-sm"
                  style={{ borderColor: w.catColor }}
                >
                  <span className="text-lg">{w.emoji}</span>
                  <span className="text-[11px] font-bold text-[#0D2137]">
                    {lang === "ar" ? w.ar : w.en}
                  </span>
                </motion.div>
              ))
            )}
          </div>
          {strip.length > 0 && (
            <div className="flex gap-1.5 flex-shrink-0">
              <button
                onClick={playSentence}
                className="w-10 h-10 rounded-xl bg-[#0BB4B0] text-white flex items-center justify-center hover:bg-[#099894] transition-colors"
                aria-label={T.playSentence}
                data-testid="button-play-sentence"
              >
                <Play size={16} fill="white" />
              </button>
              <button
                onClick={popLast}
                className="w-10 h-10 rounded-xl bg-white border-2 border-border flex items-center justify-center hover:border-[#0D2137] transition-colors"
                aria-label={T.undo}
              >
                <RotateCcw size={16} className="text-[#0D2137]" />
              </button>
              <button
                onClick={clearStrip}
                className="w-10 h-10 rounded-xl bg-white border-2 border-border flex items-center justify-center hover:border-rose-500 transition-colors"
                aria-label={T.clear}
              >
                <Trash2 size={16} className="text-rose-500" />
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
            >
              {cat.words.map((w, i) => (
                <motion.button
                  key={`${cat.id}-${w.ar}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => tap(w, cat.id, cat.color)}
                  className="bg-white border-2 rounded-2xl p-3 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow active:scale-95"
                  style={{ borderColor: `${cat.color}40` }}
                  data-testid={`word-${cat.id}-${w.en.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="text-5xl leading-none">{w.emoji}</div>
                  <div className="text-center">
                    <div
                      className="text-sm font-black leading-tight"
                      style={{ color: cat.color }}
                    >
                      {lang === "ar" ? w.ar : w.en}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      {lang === "ar" ? w.en : w.ar}
                    </div>
                  </div>
                  <Volume2
                    size={12}
                    className="text-muted-foreground opacity-50"
                  />
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
