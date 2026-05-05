import { useState } from "react";
import { Layout } from "@/components/layout";
import { useLangStore } from "@/lib/lang-store";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  Grid3X3,
  Printer,
  RotateCcw,
  AlertCircle,
  Lightbulb,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Task = {
  time: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  duration: number;
  tip: string;
};

type Schedule = {
  title: string;
  tasks: Task[];
};

const SAMPLES: Record<"ar" | "en", string[]> = {
  ar: [
    "يستيقظ الساعة ٧، فطور، يلبس ملابس المدرسة، باص ٧:٣٠، رجوع من المدرسة ١:٠٠، غداء، قيلولة، لعب، تلفزيون قصير، عشاء، حمام، نوم ٩",
    "صباح هادي بالبيت: لعب حر، فطور، نشاط ألوان، نزهة قصيرة في الحديقة، غداء، قيلولة، قصة قبل النوم",
    "زيارة الطبيب: استيقاظ مبكر، فطور خفيف، استعداد، السيارة للمستشفى، انتظار، الكشف، صيدلية، عودة للبيت، راحة",
  ],
  en: [
    "Wakes up at 7, breakfast, gets dressed for school, bus at 7:30, back from school at 1:00, lunch, nap, play, short TV, dinner, bath, sleep at 9",
    "Quiet morning at home: free play, breakfast, coloring activity, short walk in the garden, lunch, nap, bedtime story",
    "Doctor visit: early wake-up, light breakfast, getting ready, car ride to the hospital, waiting, the appointment, pharmacy, back home, rest",
  ],
};

const TXT = {
  ar: {
    title: "مولّد الجدول البصري",
    subtitle: "وصف يومكم → جدول مصوّر بأسلوب PECS قابل للطباعة",
    childNameLabel: "اسم الطفل (اختياري)",
    childNamePh: "مثلاً: علي",
    descLabel: "وصف يومكم",
    descPh:
      "اكتبي بأسلوبك العادي... مثال: علي يستيقظ الساعة ٧، يفطر، يلبس ملابس المدرسة...",
    descHelp: "لا حاجة لأن تكتبي بترتيب — نمو يرتبه ويصممه لكِ",
    examples: "أمثلة جاهزة:",
    designing: "نصمم الجدول...",
    generate: "اصنعي جدول طفلي",
    failed: "تعذّر إنشاء الجدول. حاولي مرة أخرى.",
    connection: "خطأ في الاتصال. تأكدي من الإنترنت.",
    pecsTip:
      "الجداول البصرية أداة معتمدة في علاج التوحد (PECS) — تساعد طفلكِ على فهم تسلسل اليوم وتقلل القلق من المجهول.",
    forPrefix: "لـ ",
    illustrateAll: "صوّر الكل",
    print: "طباعة",
    minUnit: "د",
    illustrate: "صوّرها",
    parentTips: "نصائح للأم لكل نشاط",
    newSchedule: "جدول جديد",
  },
  en: {
    title: "Visual Schedule Generator",
    subtitle: "Describe your day → a printable PECS-style picture schedule",
    childNameLabel: "Child's name (optional)",
    childNamePh: "e.g. Ali",
    descLabel: "Describe your day",
    descPh:
      "Write naturally... e.g. Ali wakes up at 7, has breakfast, gets dressed for school...",
    descHelp:
      "No need to write in order — Numoo arranges and designs it for you",
    examples: "Ready-made examples:",
    designing: "Designing the schedule...",
    generate: "Create my child's schedule",
    failed: "Couldn't generate the schedule. Please try again.",
    connection: "Connection error. Please check your internet.",
    pecsTip:
      "Visual schedules are an evidence-based autism intervention (PECS) — they help your child understand the day's sequence and ease anxiety about the unknown.",
    forPrefix: "For ",
    illustrateAll: "Illustrate all",
    print: "Print",
    minUnit: "min",
    illustrate: "Illustrate",
    parentTips: "Parent tips for each activity",
    newSchedule: "New schedule",
  },
} as const;

export default function VisualSchedule() {
  const { lang } = useLangStore();
  const T = TXT[lang];
  const [description, setDescription] = useState("");
  const [childName, setChildName] = useState("");
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [illustrations, setIllustrations] = useState<Record<number, string>>(
    {}
  );
  const [illustrating, setIllustrating] = useState<Set<number>>(new Set());

  const generate = async () => {
    if (description.trim().length < 5) return;
    setLoading(true);
    setError(null);
    setSchedule(null);
    setIllustrations({});
    try {
      const res = await fetch("/api/visual-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, childName }),
      });
      if (!res.ok) {
        setError(T.failed);
        return;
      }
      const data: Schedule = await res.json();
      setSchedule(data);
    } catch {
      setError(T.connection);
    } finally {
      setLoading(false);
    }
  };

  const illustrate = async (taskIndex: number, taskTitle: string) => {
    if (illustrations[taskIndex] || illustrating.has(taskIndex)) return;
    setIllustrating((s) => new Set(s).add(taskIndex));
    try {
      const res = await fetch("/api/visual-schedule/illustrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskTitle }),
      });
      if (!res.ok) throw new Error("failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setIllustrations((prev) => ({ ...prev, [taskIndex]: url }));
    } catch {
      // silent — emoji fallback already shown
    } finally {
      setIllustrating((s) => {
        const next = new Set(s);
        next.delete(taskIndex);
        return next;
      });
    }
  };

  const reset = () => {
    setSchedule(null);
    setDescription("");
    setChildName("");
    setIllustrations({});
    setError(null);
  };

  const illustrateAll = async () => {
    if (!schedule) return;
    for (let i = 0; i < schedule.tasks.length; i++) {
      const t = schedule.tasks[i];
      if (!illustrations[i]) {
        await illustrate(i, t.titleEn);
      }
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] text-white p-6 pt-24 pb-8 flex-shrink-0 print:hidden">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Grid3X3 size={22} className="text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-black">{T.title}</h2>
            <p className="text-xs text-white/70 mt-0.5">{T.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-background flex-1 pb-32 max-w-4xl mx-auto w-full">
        {!schedule && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl p-6 shadow-sm border border-border space-y-4"
          >
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">
                {T.childNameLabel}
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder={T.childNamePh}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-[#0BB4B0]"
                data-testid="input-child-name"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">
                {T.descLabel}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={T.descPh}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-[#0BB4B0] resize-none leading-relaxed"
                data-testid="input-description"
              />
              <div className="text-xs text-muted-foreground mt-1">
                {T.descHelp}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-muted-foreground mb-2">
                {T.examples}
              </div>
              <div className="grid gap-2">
                {SAMPLES[lang].map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setDescription(s)}
                    className={`${lang === "ar" ? "text-right" : "text-left"} text-xs px-3 py-2 rounded-xl bg-[#FFF7EE] border border-[#E0A858]/30 hover:border-[#E0A858] text-foreground transition-colors`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={generate}
              disabled={loading || description.trim().length < 5}
              className="w-full bg-[#0BB4B0] hover:bg-[#099894] text-white font-bold py-6"
              data-testid="button-generate-schedule"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="me-2 animate-spin" />
                  {T.designing}
                </>
              ) : (
                <>
                  <Sparkles size={18} className="me-2" />
                  {T.generate}
                </>
              )}
            </Button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-3 flex gap-2">
                <AlertCircle
                  size={18}
                  className="text-red-600 flex-shrink-0 mt-0.5"
                />
                <p className="text-xs text-red-900">{error}</p>
              </div>
            )}

            <div className="bg-[#0BB4B0]/10 border border-[#0BB4B0]/30 rounded-2xl p-3 flex gap-2">
              <Lightbulb
                size={18}
                className="text-[#0BB4B0] flex-shrink-0 mt-0.5"
              />
              <p className="text-xs text-foreground leading-relaxed">
                {T.pecsTip}
              </p>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {schedule && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-card rounded-3xl p-5 shadow-sm border border-border print:shadow-none print:border-0">
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <h3 className="text-xl font-black text-[#0D2137]">
                      {schedule.title}
                    </h3>
                    {childName && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {T.forPrefix}
                        <span className="font-bold text-[#0BB4B0]">
                          {childName}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 print:hidden">
                    <Button
                      onClick={illustrateAll}
                      variant="outline"
                      size="sm"
                      className="border-[#0BB4B0] text-[#0BB4B0] hover:bg-[#0BB4B0]/10"
                      data-testid="button-illustrate-all"
                    >
                      <ImageIcon size={14} className="me-1" />
                      {T.illustrateAll}
                    </Button>
                    <Button
                      onClick={() => window.print()}
                      variant="outline"
                      size="sm"
                      className="border-border"
                      data-testid="button-print-schedule"
                    >
                      <Printer size={14} className="me-1" />
                      {T.print}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 print:grid-cols-3">
                  {schedule.tasks.map((task, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white border-2 border-[#0BB4B0]/30 rounded-2xl p-3 flex flex-col items-center text-center print:break-inside-avoid"
                      data-testid={`schedule-card-${i}`}
                    >
                      <div className="text-[10px] font-bold bg-[#0D2137] text-white px-2 py-0.5 rounded-full mb-2">
                        {task.time}
                      </div>
                      <div className="aspect-square w-full max-w-[140px] bg-[#FFF7EE] rounded-xl flex items-center justify-center mb-2 overflow-hidden">
                        {illustrations[i] ? (
                          <img
                            src={illustrations[i]}
                            alt={task.titleEn}
                            className="w-full h-full object-cover"
                          />
                        ) : illustrating.has(i) ? (
                          <Loader2
                            size={24}
                            className="animate-spin text-[#0BB4B0]"
                          />
                        ) : (
                          <div className="text-5xl">{task.icon}</div>
                        )}
                      </div>
                      <div className="font-black text-sm text-[#0D2137] leading-tight mb-1">
                        {lang === "ar" ? task.titleAr : task.titleEn}
                      </div>
                      <div className="text-[10px] text-muted-foreground mb-1">
                        {task.duration} {T.minUnit}
                      </div>
                      {!illustrations[i] && !illustrating.has(i) && (
                        <button
                          onClick={() => illustrate(i, task.titleEn)}
                          className="print:hidden mt-1 text-[10px] text-[#0BB4B0] hover:text-[#099894] font-bold underline"
                          data-testid={`button-illustrate-${i}`}
                        >
                          {T.illustrate}
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-3xl p-5 shadow-sm border border-border print:hidden">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={18} className="text-[#E0A858]" />
                  <h3 className="font-black text-base text-foreground">
                    {T.parentTips}
                  </h3>
                </div>
                <div className="space-y-2">
                  {schedule.tasks.map((task, i) => (
                    <div
                      key={i}
                      className="bg-[#FFF7EE] rounded-xl p-3 border border-[#E0A858]/20"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{task.icon}</span>
                        <span className="font-bold text-sm text-[#0D2137]">
                          {lang === "ar" ? task.titleAr : task.titleEn}
                        </span>
                        <span className="text-[10px] text-muted-foreground ms-auto">
                          {task.time}
                        </span>
                      </div>
                      <p className="text-xs text-foreground leading-relaxed">
                        {task.tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 print:hidden">
                <Button
                  onClick={reset}
                  className="flex-1 bg-[#0D2137] hover:bg-[#0a1a2c] text-white font-bold"
                  data-testid="button-new-schedule"
                >
                  <RotateCcw size={16} className="me-2" />
                  {T.newSchedule}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
