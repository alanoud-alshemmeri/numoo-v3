import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function Privacy() {
  const { t } = useT();
  const [, setLocation] = useLocation();
  const [agreed, setAgreed] = useState(false);

  return (
    <Layout hideNav hideFooter>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-card rounded-3xl p-8 shadow-[0_3px_18px_rgba(0,0,0,0.07)]"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-primary rounded-2xl mb-4 overflow-hidden shadow-lg shadow-primary/20 p-2">
              <img src="/numoo-logo.png" alt="Numoo Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl font-black text-foreground">{t('appTitle')}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t('pgShortPrivacy')}</p>
          </div>

          <h2 className="text-xl font-bold text-foreground mb-3">{t('pgTitle')}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {t('pgDesc')}
          </p>

          <ul className="space-y-3 mb-8">
            {[t('pgList1'), t('pgList2'), t('pgList3'), t('pgList4')].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-[#f0fdfd] dark:bg-primary/10 rounded-2xl p-4 flex items-start gap-3 mb-6">
            <Checkbox 
              id="consent" 
              checked={agreed}
              onCheckedChange={(c) => setAgreed(!!c)}
              className="mt-0.5 border-primary data-[state=checked]:bg-primary"
            />
            <label htmlFor="consent" className="text-sm font-medium leading-relaxed cursor-pointer">
              {t('pgConsent')}
            </label>
          </div>

          <Button
            className="w-full h-14 rounded-2xl text-base font-bold bg-gradient-to-r from-primary to-[#089b98] hover:from-primary hover:to-primary"
            disabled={!agreed}
            onClick={() => setLocation("/age")}
          >
            {t('pgBtn')}
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-6">
            {t('pgTime')}
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
