import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { QDB } from "@/lib/data";
import { useAssessmentStore } from "@/lib/store";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Screening() {
  const { t, lang } = useT();
  const [, setLocation] = useLocation();
  const { ageGroup, answers, setAnswer, calculateScore } = useAssessmentStore();
  const [currentQ, setCurrentQ] = useState(0);

  useEffect(() => {
    if (!ageGroup) {
      setLocation("/age");
    }
  }, [ageGroup, setLocation]);

  if (!ageGroup) return null;

  const questions = QDB[ageGroup];
  if (!questions) return null;

  const q = questions[currentQ];
  const total = questions.length;
  const progress = Math.round(((currentQ + 1) / total) * 100);

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(c => c + 1);
    } else {
      const questionIds = questions.map(q => q.id as string);
      calculateScore(questionIds);
      setLocation("/loading");
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(c => c - 1);
    } else {
      setLocation("/age");
    }
  };

  const isAnswered = answers[currentQ] !== undefined;

  return (
    <Layout hideNav hideFooter>
      <div className="flex flex-col min-h-screen bg-background">
        <div className="bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] text-white p-6 pt-24 pb-6 flex-shrink-0 relative z-10">
          <button
            onClick={handlePrev}
            className="bg-white/15 hover:bg-white/25 active:bg-white/30 text-white text-sm font-black flex items-center gap-2 mb-4 px-4 py-2.5 rounded-full transition-colors border border-white/20"
            data-testid="button-back-header"
          >
            {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{currentQ === 0 ? (lang === 'ar' ? 'تغيير الفئة العمرية' : 'Change age group') : (lang === 'ar' ? 'السؤال السابق' : 'Previous question')}</span>
          </button>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black">{t('screeningTitle')}</h2>
            <div className="text-sm font-bold text-white/80 bg-white/10 px-3 py-1 rounded-full">{currentQ + 1} / {total}</div>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <div className="flex-1 p-6 relative overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: lang === 'ar' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <div className="bg-card rounded-3xl p-6 shadow-sm border border-border mb-6">
                <div className="text-4xl mb-4">{q.icon}</div>
                <h3 className="text-xl font-black text-foreground mb-2 leading-tight">{q.title[lang]}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{q.text[lang]}</p>
                
                {q.source && (
                  <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-6">
                    {q.source}
                  </div>
                )}

                {q.type === 'text' || q.type === 'number' ? (
                  <div className="mt-2">
                    <Input 
                      type={q.type} 
                      placeholder={q.placeholder?.[lang]} 
                      value={answers[currentQ] || ''}
                      onChange={(e) => setAnswer(currentQ, e.target.value as any)}
                      className="h-14 rounded-2xl text-lg bg-secondary/5 border-secondary/10 focus-visible:ring-primary text-foreground"
                    />
                  </div>
                ) : (
                  <RadioGroup 
                    value={answers[currentQ]?.toString()} 
                    onValueChange={(val) => setAnswer(currentQ, parseInt(val))}
                    className="flex flex-col gap-3"
                  >
                    {q.options?.[lang].map((opt: string, idx: number) => {
                      const isSelected = answers[currentQ] === idx;
                      return (
                        <Label
                          key={idx}
                          className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer hover:scale-[1.01] ${
                            isSelected 
                              ? 'border-primary bg-primary/5 text-foreground' 
                              : 'border-transparent bg-secondary/5 text-muted-foreground hover:border-primary/50'
                          }`}
                        >
                          <RadioGroupItem value={idx.toString()} className="sr-only" />
                          <div className={`w-4 h-4 rounded-sm flex-shrink-0 transition-colors ${isSelected ? 'bg-primary' : 'bg-border'}`} />
                          <span className="text-base font-bold leading-relaxed">{opt}</span>
                        </Label>
                      );
                    })}
                  </RadioGroup>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto pt-4 flex gap-3">
            <Button
              variant="outline"
              className="h-14 rounded-2xl text-base font-bold border-2 border-border px-5"
              onClick={handlePrev}
              data-testid="button-back-footer"
              aria-label={lang === 'ar' ? 'السؤال السابق' : 'Previous question'}
            >
              {lang === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
            </Button>
            <Button
              className="flex-1 h-14 rounded-2xl text-base font-bold bg-gradient-to-r from-primary to-[#089b98] hover:from-primary hover:to-primary"
              disabled={!isAnswered && q.type !== 'text'}
              onClick={handleNext}
              data-testid="button-next"
            >
              {currentQ === total - 1 ? t('finishScreening') : t('nextBtn')}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
