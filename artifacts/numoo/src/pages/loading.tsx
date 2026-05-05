import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useT } from "@/lib/i18n";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";

export default function Loading() {
  const { t, lang } = useT();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);

  const steps = [
    t('loadStep1'),
    t('loadStep2'),
    t('loadStep3'),
    t('loadStep4')
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setStep(current);
      if (current >= steps.length) {
        clearInterval(interval);
        setTimeout(() => setLocation("/results"), 800);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [setLocation, steps.length]);

  return (
    <Layout hideNav hideFooter>
      <div className="min-h-screen bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        
        <div className="absolute top-[-20%] right-[-20%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8 border border-primary/30"
          >
            <Brain size={48} className="text-primary" />
          </motion.div>

          <h2 className="text-2xl font-black mb-2 text-center">{t('loadTxt')}</h2>
          <p className="text-sm text-white/50 mb-12 text-center">{t('loadSub')}</p>

          <div className="w-full space-y-3">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: step >= i ? 1 : 0.3, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-4 transition-all ${step === i ? 'bg-white/10 border-primary/30' : ''}`}
              >
                <div className={`w-3 h-3 rounded-full flex-shrink-0 transition-colors ${step >= i ? 'bg-primary shadow-[0_0_10px_rgba(10,191,188,0.8)]' : 'bg-white/20'}`} />
                <span className="text-sm font-bold text-white/90 leading-relaxed">{s}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}
