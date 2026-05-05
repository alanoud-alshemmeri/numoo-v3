import { Layout } from "@/components/layout";
import { useT, TranslationKey } from "@/lib/i18n";
import { useAssessmentStore, type AgeGroup } from "@/lib/store";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Baby, PersonStanding, GraduationCap, User, Lightbulb } from "lucide-react";

const ageGroups: { id: AgeGroup; labelKey: TranslationKey; subKey: TranslationKey; icon: React.ReactNode }[] = [
  { id: "toddler", labelKey: "toddlerLabel", subKey: "toddlerSub", icon: <Baby size={32} /> },
  { id: "preschool", labelKey: "preschoolLabel", subKey: "preschoolSub", icon: <PersonStanding size={32} /> },
  { id: "school", labelKey: "schoolLabel", subKey: "schoolSub", icon: <GraduationCap size={32} /> },
  { id: "teen", labelKey: "teenLabel", subKey: "teenSub", icon: <User size={32} /> }
];

export default function AgeSelection() {
  const { t } = useT();
  const [, setLocation] = useLocation();
  const { setAgeGroup } = useAssessmentStore();

  const handleSelect = (group: AgeGroup) => {
    setAgeGroup(group);
    setLocation("/screening");
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] text-white p-6 pt-24 pb-8 flex-shrink-0">
        <button onClick={() => setLocation("/privacy")} className="text-white/60 text-sm font-bold flex items-center gap-2 mb-4 hover:text-white transition-colors">
          {t('backTxt')}
        </button>
        <h2 className="text-2xl font-black mb-2">{t('ageH')}</h2>
        <p className="text-sm text-white/60">{t('ageP')}</p>
      </div>

      <div className="p-6 flex-1 bg-background">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {ageGroups.map((group, idx) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => handleSelect(group.id)}
              className="bg-card rounded-2xl p-5 shadow-sm border-2 border-transparent hover:border-primary hover:bg-primary/5 cursor-pointer text-center transition-all group"
            >
              <div className="text-primary mb-3 flex justify-center group-hover:scale-110 transition-transform">
                {group.icon}
              </div>
              <div className="text-foreground font-black text-sm mb-1">{t(group.labelKey)}</div>
              <div className="text-muted-foreground text-xs">{t(group.subKey)}</div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-primary/5 border border-primary/20 rounded-2xl p-5"
        >
          <h3 className="text-primary font-bold text-sm mb-2 flex items-center gap-2">
            <Lightbulb size={18} /> {t('ageWhyMatter')}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t('ageWhyMatterDesc')}
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
