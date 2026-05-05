import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  Circle,
  Clock,
  Trophy,
  Sparkles,
  RotateCcw,
  CalendarPlus,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useAssessmentStore } from "@/lib/store";
import { PLAN_WEEKS } from "@/lib/result-resources";
import { buildPlan30DayIcs, downloadIcs } from "@/lib/ics";
import { useLangStore } from "@/lib/lang-store";

const STORAGE_KEY = "numoo:plan30:checked";

const UI_TXT = {
  ar: {
    backToResults: "النتائج",
    pageTitle: "خطتي لـ ٣٠ يوم",
    pageSubtitle: "خطوة واحدة كل يوم — لتشعري بأنّكِ تتحرّكين",
    daysOf: (done: number, total: number) => `${done} من ${total} يوم`,
    finishedTitle: "ممتاز! خلصتي ٣٠ يوم — أنتِ بطلة",
    addToCalendarTitle: "أضيفي للتقويم على جوّالكِ",
    addToCalendarDesc: "٣٠ تذكير يومي الساعة ٩ الصبح — يفتح بـ Apple, Google, و Outlook",
    weekTab: (n: number) => `أسبوع ${n}`,
    weekHeader: (n: number) => `الأسبوع ${n}`,
    goalPrefix: "الهدف:",
    dayBadge: (d: number) => `يوم ${d}`,
    minutesShort: "د",
    dayAria: (d: number, t: string) => `يوم ${d}: ${t}`,
    confirmReset: "هل أنتِ متأكدة من البدء من جديد؟ سيُمحى كل التقدّم.",
    icsError: "أصبح خطأ بإنشاء ملف التقويم. حاولي مرة ثانية.",
    resetBtn: "إعادة تعيين الخطة",
    autosaveNote: "تقدّمكِ يُحفظ تلقائياً على هذا الجهاز. إذا فتحتِ نمو من جهاز آخر، يبدأ من الصفر.",
  },
  en: {
    backToResults: "Results",
    pageTitle: "My 30-Day Plan",
    pageSubtitle: "One small step a day — so you feel \"I'm moving forward.\"",
    daysOf: (done: number, total: number) => `${done} of ${total} days`,
    finishedTitle: "Wonderful — you finished 30 days. You're a champion.",
    addToCalendarTitle: "Add it to your phone calendar",
    addToCalendarDesc: "30 daily reminders at 9 a.m. — opens in Apple, Google, and Outlook.",
    weekTab: (n: number) => `Week ${n}`,
    weekHeader: (n: number) => `Week ${n}`,
    goalPrefix: "Goal:",
    dayBadge: (d: number) => `Day ${d}`,
    minutesShort: "min",
    dayAria: (d: number, t: string) => `Day ${d}: ${t}`,
    confirmReset: "Are you sure you want to start over? All progress will be erased.",
    icsError: "Something went wrong creating the calendar file. Please try again.",
    resetBtn: "Reset the plan",
    autosaveNote: "Your progress is saved automatically on this device. Opening Numoo on another phone will start fresh.",
  },
};

const WEEK_TXT: Record<number, { ar: { theme: string; goal: string }; en: { theme: string; goal: string } }> = {
  1: {
    ar: { theme: "التحضير والاستعداد", goal: "تجمعين معلومات + تحجزين موعد + تكلمين زوجكِ" },
    en: { theme: "Preparation & Getting Ready", goal: "Gather info, book the appointment, and talk with your husband." },
  },
  2: {
    ar: { theme: "التقييم والمعرفة", goal: "زيارة الطبيب + بحث جاد + بناء شبكة دعم" },
    en: { theme: "Assessment & Awareness", goal: "Visit the doctor, do real research, and build a support circle." },
  },
  3: {
    ar: { theme: "التدخل المبكر", goal: "تبدأين فعلاً تشغلين على تطوير طفلكِ يومياً" },
    en: { theme: "Early Intervention", goal: "Start working on your child's development every single day." },
  },
  4: {
    ar: { theme: "المتابعة والتقييم", goal: "تقيّمين شهر كامل + تخططين للشهر القادم" },
    en: { theme: "Review & Planning", goal: "Reflect on the full month and plan the next one." },
  },
};

const DAY_EN: Record<number, { title: string; task: string; why: string }> = {
  1: {
    title: "Book the pediatrician appointment",
    task: "Call a trusted pediatrician and book a visit within 7–10 days. Use the Numoo Centers list if you need a recommendation.",
    why: "The most important step. Don't postpone — even if the slot is a week away, book it today.",
  },
  2: {
    title: "Download the Numoo report and the doctor questions",
    task: "Save the M-CHAT-R/F PDF report plus the \"Ready Questions for the Doctor\" sheet from Numoo. Print them and slip them into a folder.",
    why: "The doctor takes a written report more seriously, and the questions make sure nothing slips your mind.",
  },
  3: {
    title: "Observe your child for 30 minutes",
    task: "Sit and watch your child play without intervening. Note: eye contact? response to name? pretend play? repetitive movements?",
    why: "Your written observations are the strongest evidence you can hand to the doctor.",
  },
  4: {
    title: "Talk it over with your husband (important!)",
    task: "Choose a calm moment. Show him the report and use Numoo's \"How to talk to my husband\" script. Ask for his support.",
    why: "Without your partner, the journey is ten times harder. Start from today.",
  },
  5: {
    title: "Read a CDC or AAP article",
    task: "Open the Numoo library and read \"Signs and symptoms of autism spectrum disorder\" from the CDC.",
    why: "Trusted information eases fear, and awareness shields you from misguided advice.",
  },
  6: {
    title: "Prepare a complete medical folder",
    task: "Collect: birth certificate, vaccination record, previous developmental reports, and 2–3 short videos of your child playing.",
    why: "The doctor needs the full picture. Real video clips reveal far more than words can.",
  },
  7: {
    title: "Rest and reflect",
    task: "Today is for you. A walk, prayer, dua, or a quiet coffee on your own. Don't think about anything heavy.",
    why: "A long fight needs energy. You can't help your child while you're running on empty.",
  },
  8: {
    title: "The pediatrician visit",
    task: "Go to the appointment, take your husband with you. Ask every question on the \"Ready Questions\" sheet. Request a referral to a specialist.",
    why: "The most important day of the week. Don't leave without: a referral, the next appointment, and a tests plan.",
  },
  9: {
    title: "Search for a speech therapy center",
    task: "Open the Numoo Centers Guide and pick 3 centers near you. Call and ask about: pricing, waitlist, and age specialty.",
    why: "Every week of delay is a missed development window. Start even before a diagnosis is confirmed.",
  },
  10: {
    title: "Read about M-CHAT-R/F",
    task: "Read about the screening tool itself in the Numoo library. Understand why these specific questions are asked.",
    why: "Understanding the tool helps you understand the result and explain it to the rest of the family.",
  },
  11: {
    title: "Connect with another mother (support)",
    task: "Look for a WhatsApp support group for Kuwaiti mothers of autistic children. Join with no pressure.",
    why: "Only a mother truly understands a mother. Emotional support is a necessity, not a luxury.",
  },
  12: {
    title: "Talk to grandma / mother-in-law",
    task: "Speak with your mother or mother-in-law. Use Numoo's \"How to talk to my mom / mother-in-law\" script. Speak with love.",
    why: "Grandma's support matters — emotionally and practically — and it heads off gossip before it starts.",
  },
  13: {
    title: "Track your child's sleep and eating",
    task: "Note for 3 days: how many hours of sleep? how does he eat? does he prefer only certain foods? does he wake often?",
    why: "Sleep and feeding issues are common with autistic children and deserve follow-up.",
  },
  14: {
    title: "15 minutes of interactive play",
    task: "Sit facing your child, mirror his movements, wait for him to respond. Ask for nothing — just share the moment.",
    why: "This is the simplest connection-building technique (drawn from DIR Floortime).",
  },
  15: {
    title: "Begin the first speech therapy session",
    task: "If your budget allows, book a weekly speech therapy session. If not, look for a charity that offers support.",
    why: "One session a week is better than zero. Start with anything you can.",
  },
  16: {
    title: "A daily eye-contact game",
    task: "Take a toy he loves, hold it near your eyes, wait for him to look 2–3 seconds, then give it. Repeat 10 times.",
    why: "Eye contact is the foundation of all communication. Train it through play.",
  },
  17: {
    title: "A visual routine for the day",
    task: "Print images: \"eat,\" \"sleep,\" \"play,\" \"bath.\" Hang them in order. Point to the picture before each activity.",
    why: "Children on the spectrum understand pictures more easily than words. It lowers anxiety.",
  },
  18: {
    title: "An Arabic bedtime story",
    task: "Read a short story (5 minutes) before bed. Point to pictures, mimic sounds, ask \"where's the cat?\"",
    why: "Daily exposure to Arabic builds vocabulary even before he speaks.",
  },
  19: {
    title: "A sensory activity (sand, clay, water)",
    task: "Set up a sand, clay, or water tray. Let him touch and explore for 15 minutes. Don't direct him.",
    why: "Sensory play soothes the nervous system and develops the senses.",
  },
  20: {
    title: "Reduce screen time",
    task: "Set a clear screen-time limit (one hour max). No screens for two hours before sleep.",
    why: "Excess screen time delays communication and language. Cutting it back makes a visible difference.",
  },
  21: {
    title: "A play session with dad",
    task: "Ask the father to spend 20 minutes of phone-free play with his child, just the two of them.",
    why: "A father–child bond matters emotionally and developmentally — and you finally get a break.",
  },
  22: {
    title: "Re-take the Numoo screening",
    task: "Open Numoo and run the M-CHAT-R/F screening again. Compare the score with the first one.",
    why: "You'll see in numbers: improvement? steady? regression? It guides the next step.",
  },
  23: {
    title: "Doctor visit or follow-up",
    task: "Go to the follow-up appointment (if you booked one on Day 8). Share your observations from the past month.",
    why: "The doctor evaluates progress and adjusts the plan based on real life.",
  },
  24: {
    title: "Set goals for the next month",
    task: "Write 3 goals for next month (e.g. \"says one new word,\" \"makes eye contact for 5 seconds\").",
    why: "Small, specific goals are achievable. Vague goals get lost.",
  },
  25: {
    title: "Reward yourself",
    task: "Go out alone. Spa, shopping, a coffee — anything that brings you joy. You deserve it.",
    why: "You finished a month of work. No one will reward you but you. Reward yourself.",
  },
  26: {
    title: "Document progress with photos and video",
    task: "Film your child doing something he's grown into. Save it in a \"[child's name] journey\" album.",
    why: "A year from now, watching this clip will fill you with pride. Document the small moments.",
  },
  27: {
    title: "Choose one main center for follow-up",
    task: "Based on this month's experience, pick one steady center to stick with. Constant switching wastes progress.",
    why: "Continuity with the same team brings far better results than jumping around.",
  },
  28: {
    title: "Plan next month",
    task: "Write the plan for next month: sessions, appointments, activities, budget.",
    why: "Planning the month brings calm and prevents chaos and forgotten dates.",
  },
  29: {
    title: "A talk with your older child (if any)",
    task: "Sit with your child's siblings, thank them for their patience, give them dedicated time.",
    why: "Siblings carry a lot. Don't lose them in the rush.",
  },
  30: {
    title: "Honor the moment",
    task: "Write yourself a note: \"I finished a month. I am strong. I love my child. I will keep going.\"",
    why: "You won't be able to continue this journey without reminding yourself of your strength.",
  },
};

function loadChecked(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    const valid = parsed.filter(
      (n): n is number =>
        typeof n === "number" && Number.isInteger(n) && n >= 1 && n <= 30,
    );
    return new Set(valid);
  } catch {
    return new Set();
  }
}

function saveChecked(s: Set<number>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(s)));
  } catch {
    // ignore
  }
}

export default function Results30DayPlan() {
  const [, setLocation] = useLocation();
  const { ageGroup } = useAssessmentStore();
  const { lang } = useLangStore();
  const T = UI_TXT[lang];
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [activeWeek, setActiveWeek] = useState(1);

  useEffect(() => {
    if (!ageGroup) {
      setLocation("/");
      return;
    }
    setChecked(loadChecked());
  }, [ageGroup, setLocation]);

  if (!ageGroup) return null;

  const toggle = (day: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      saveChecked(next);
      return next;
    });
  };

  const reset = () => {
    if (confirm(T.confirmReset)) {
      setChecked(new Set());
      saveChecked(new Set());
    }
  };

  const handleAddToCalendar = () => {
    try {
      const ics = buildPlan30DayIcs({ reminderHour: 9 });
      downloadIcs("numoo-plan-30-day.ics", ics);
    } catch (e) {
      console.error("ICS generation failed", e);
      alert(T.icsError);
    }
  };

  const totalDays = PLAN_WEEKS.reduce((s, w) => s + w.days.length, 0);
  const completedCount = checked.size;
  const progress = Math.round((completedCount / totalDays) * 100);

  const week = PLAN_WEEKS.find((w) => w.week === activeWeek) ?? PLAN_WEEKS[0]!;
  const weekDone = week.days.filter((d) => checked.has(d.day)).length;
  const weekProgress = Math.round((weekDone / week.days.length) * 100);

  const weekText = WEEK_TXT[week.week]?.[lang] ?? { theme: week.theme, goal: week.goal };

  return (
    <Layout>
      <div className="pb-32 bg-[#f4fafa] min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-white px-5 pt-6 pb-8 relative overflow-hidden">
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
              <CalendarCheck2 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold leading-tight">
                {T.pageTitle}
              </h1>
              <p className="text-sm text-white/85 mt-1">
                {T.pageSubtitle}
              </p>
            </div>
          </div>

          {/* Overall progress */}
          <div className="relative z-10 mt-5 bg-white/15 backdrop-blur-sm rounded-2xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold">
                {T.daysOf(completedCount, totalDays)}
              </span>
              <span className="text-[12px] font-extrabold">{progress}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            {progress === 100 && (
              <div className="flex items-center gap-1.5 mt-2 text-[12px] font-bold">
                <Trophy size={14} />
                {T.finishedTitle}
              </div>
            )}
          </div>
        </div>

        {/* Calendar CTA */}
        <div className="px-5 pt-5">
          <motion.button
            onClick={handleAddToCalendar}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white rounded-3xl border-2 border-dashed border-amber-400 p-4 text-right hover:bg-amber-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center">
                <CalendarPlus size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-extrabold text-foreground mb-0.5">
                  {T.addToCalendarTitle}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {T.addToCalendarDesc}
                </p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Week tabs */}
        <div className="px-5 pt-4">
          <div className="grid grid-cols-4 gap-2 mb-5">
            {PLAN_WEEKS.map((w) => {
              const done = w.days.filter((d) => checked.has(d.day)).length;
              const total = w.days.length;
              const isActive = activeWeek === w.week;
              return (
                <button
                  key={w.week}
                  onClick={() => setActiveWeek(w.week)}
                  className={`rounded-2xl p-2.5 border-2 transition-all ${
                    isActive
                      ? "border-foreground bg-card shadow-md"
                      : "border-border bg-card/60 hover:border-primary/40"
                  }`}
                >
                  <div className="text-xl mb-0.5">{w.emoji}</div>
                  <div className="text-[11px] font-extrabold text-foreground leading-tight">
                    {T.weekTab(w.week)}
                  </div>
                  <div className="text-[9px] text-muted-foreground mt-0.5 font-bold">
                    {done}/{total}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Week header */}
          <motion.div
            key={week.week}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl p-4 mb-4 text-white relative overflow-hidden"
            style={{ backgroundColor: week.color }}
          >
            <div className="absolute top-0 right-0 text-7xl opacity-15 leading-none -mt-2 -mr-2">
              {week.emoji}
            </div>
            <div className="relative z-10">
              <div className="text-[11px] font-bold opacity-90 mb-1">
                {T.weekHeader(week.week)}
              </div>
              <h2 className="text-xl font-extrabold mb-1.5">{weekText.theme}</h2>
              <p className="text-[12px] opacity-90 leading-relaxed">
                {T.goalPrefix} {weekText.goal}
              </p>
              <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${weekProgress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Days */}
          <div className="space-y-2.5">
            {week.days.map((day, i) => {
              const isChecked = checked.has(day.day);
              const dayText = lang === "en"
                ? (DAY_EN[day.day] ?? { title: day.title, task: day.task, why: day.why })
                : { title: day.title, task: day.task, why: day.why };
              return (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  role="checkbox"
                  aria-checked={isChecked}
                  aria-label={T.dayAria(day.day, dayText.title)}
                  tabIndex={0}
                  onClick={() => toggle(day.day)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      toggle(day.day);
                    }
                  }}
                  className={`rounded-2xl p-3.5 border-2 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                    isChecked
                      ? "bg-emerald-50 border-emerald-300"
                      : "bg-white border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {isChecked ? (
                        <CheckCircle2 size={22} className="text-emerald-600" />
                      ) : (
                        <Circle size={22} className="text-muted-foreground/40" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className="text-[10px] font-extrabold text-white px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: week.color }}
                        >
                          {T.dayBadge(day.day)}
                        </span>
                        {day.estMinutes && (
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
                            <Clock size={10} />
                            {day.estMinutes} {T.minutesShort}
                          </span>
                        )}
                      </div>
                      <h3
                        className={`text-sm font-extrabold leading-tight mb-1 ${
                          isChecked ? "line-through text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {dayText.title}
                      </h3>
                      <p className="text-[12px] text-foreground/80 leading-relaxed">
                        {dayText.task}
                      </p>
                      <div className="mt-2 pr-3 border-r-2 border-amber-300 bg-amber-50/50 rounded p-2">
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          <Sparkles
                            size={11}
                            className="inline ml-1 text-amber-600"
                          />
                          {dayText.why}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Reset button */}
          {completedCount > 0 && (
            <div className="mt-6">
              <Button
                onClick={reset}
                variant="outline"
                className="w-full rounded-2xl gap-2 text-muted-foreground"
              >
                <RotateCcw size={15} />
                {T.resetBtn}
              </Button>
            </div>
          )}

          <div className="mt-4 text-[10px] text-muted-foreground text-center px-4 leading-relaxed">
            {T.autosaveNote}
          </div>
        </div>
      </div>
    </Layout>
  );
}
