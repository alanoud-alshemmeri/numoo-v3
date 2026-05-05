import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RW } from "@/lib/data";

export type AgeGroup = "toddler" | "preschool" | "school" | "teen" | null;
export type RiskLevel = "low" | "medium" | "high";
export type TextSize = "normal" | "large" | "xlarge";

export interface AssessmentResult {
  reportCode: string;
  reportDate: string;
  ageGroup: NonNullable<AgeGroup>;
  score: number;
  riskLevel: RiskLevel;
  childLabel?: string;
}

export interface ChildProfile {
  name: string;
  ageBand: NonNullable<AgeGroup> | "";
  concerns: string[];
  completedAt: string;
}

interface AssessmentState {
  ageGroup: AgeGroup;
  answers: Record<number, number>;
  score: number;
  riskLevel: RiskLevel | null;
  reportCode: string | null;
  reportDate: string | null;
  history: AssessmentResult[];
  textSize: TextSize;
  childProfile: ChildProfile | null;
  setAgeGroup: (group: AgeGroup) => void;
  setAnswer: (questionIndex: number, value: number) => void;
  calculateScore: (questionIds: string[]) => void;
  resetAssessment: () => void;
  setTextSize: (size: TextSize) => void;
  clearHistory: () => void;
  setChildProfile: (profile: ChildProfile | null) => void;
}

function generateReportCode(): string {
  // 6-char code, uppercase, no confusable characters (no 0/O, 1/I/L)
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let code = "";
  const cryptoObj =
    typeof crypto !== "undefined" && "getRandomValues" in crypto
      ? crypto
      : null;
  if (cryptoObj) {
    const buf = new Uint32Array(6);
    cryptoObj.getRandomValues(buf);
    for (let i = 0; i < 6; i++) {
      code += alphabet[buf[i] % alphabet.length];
    }
  } else {
    for (let i = 0; i < 6; i++) {
      code += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  }
  return code.slice(0, 3) + "-" + code.slice(3);
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      ageGroup: null,
      answers: {},
      score: 0,
      riskLevel: null,
      reportCode: null,
      reportDate: null,
      history: [],
      textSize: "normal",
      childProfile: null,
      setChildProfile: (profile) => set({ childProfile: profile }),
      setAgeGroup: (group) =>
        set({
          ageGroup: group,
          answers: {},
          score: 0,
          riskLevel: null,
          reportCode: null,
          reportDate: null,
        }),
      setAnswer: (index, value) =>
        set((state) => ({ answers: { ...state.answers, [index]: value } })),
      calculateScore: (questionIds) => {
        const state = get();
        let totalScore = 0;
        let maxPossible = 0;
        questionIds.forEach((qId, idx) => {
          const optionWeights = (RW as Record<string, number[]>)[qId];
          if (!optionWeights || optionWeights.length === 0) return;
          const answerIdx = state.answers[idx];
          if (answerIdx !== undefined && optionWeights[answerIdx] !== undefined) {
            totalScore += optionWeights[answerIdx];
          }
          maxPossible += Math.max(...optionWeights);
        });

        const pct = maxPossible > 0 ? totalScore / maxPossible : 0;
        let risk: RiskLevel = "low";
        if (pct > 0.5) risk = "high";
        else if (pct > 0.25) risk = "medium";

        const reportCode = generateReportCode();
        const reportDate = new Date().toISOString();
        const ageGroup = state.ageGroup;

        // Append to history (cap at 24 entries to avoid unbounded growth)
        const historyEntry: AssessmentResult | null = ageGroup
          ? {
              reportCode,
              reportDate,
              ageGroup,
              score: totalScore,
              riskLevel: risk,
            }
          : null;

        set({
          score: totalScore,
          riskLevel: risk,
          reportCode,
          reportDate,
          history: historyEntry
            ? [...state.history, historyEntry].slice(-24)
            : state.history,
        });
      },
      resetAssessment: () =>
        set({
          ageGroup: null,
          answers: {},
          score: 0,
          riskLevel: null,
          reportCode: null,
          reportDate: null,
        }),
      setTextSize: (size) => set({ textSize: size }),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "numoo-assessment-storage",
      partialize: (state) => ({
        ageGroup: state.ageGroup,
        answers: state.answers,
        score: state.score,
        riskLevel: state.riskLevel,
        reportCode: state.reportCode,
        reportDate: state.reportDate,
        history: state.history,
        textSize: state.textSize,
        childProfile: state.childProfile,
      }),
    },
  ),
);
