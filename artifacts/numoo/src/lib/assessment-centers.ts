// Government-approved assessment & evaluation centers in Kuwait.
// All reports issued by these centers are officially recognized.

export type CenterAuthority = "pada" | "moe" | "moh";

export interface AssessmentCenter {
  id: string;
  number: number;
  authority: CenterAuthority;
  parentName: { ar: string; en: string };
  unit: { ar: string; en: string };
  phone?: string;
  details?: { ar: string; en: string };
}

export const ASSESSMENT_CENTERS: AssessmentCenter[] = [
  {
    id: "pada-tests",
    number: 1,
    authority: "pada",
    parentName: {
      ar: "الهيئة العامة لشؤون ذوي الإعاقة",
      en: "Public Authority for Disability Affairs (PADA)",
    },
    unit: {
      ar: "وحدة الاختبارات والمقاييس",
      en: "Tests & Measurements Unit",
    },
    phone: "1861111",
  },
  {
    id: "moe-psych",
    number: 2,
    authority: "moe",
    parentName: { ar: "وزارة التربية", en: "Ministry of Education" },
    unit: {
      ar: "إدارة الخدمات النفسية والاجتماعية",
      en: "Psychological & Social Services Department",
    },
    phone: "24814720",
  },
  {
    id: "moh-mental",
    number: 3,
    authority: "moh",
    parentName: { ar: "وزارة الصحة", en: "Ministry of Health" },
    unit: { ar: "مركز الصحة النفسية", en: "Mental Health Center" },
    phone: "24843900",
  },
  {
    id: "moh-developmental",
    number: 4,
    authority: "moh",
    parentName: { ar: "وزارة الصحة", en: "Ministry of Health" },
    unit: { ar: "وحدة الطب التطوري", en: "Developmental Medicine Unit" },
    phone: "23945619",
  },
  {
    id: "moh-genetics",
    number: 5,
    authority: "moh",
    parentName: { ar: "وزارة الصحة", en: "Ministry of Health" },
    unit: { ar: "مركز الأمراض الوراثية", en: "Genetic Diseases Center" },
    phone: "24814328",
  },
  {
    id: "moh-hospitals",
    number: 6,
    authority: "moh",
    parentName: { ar: "وزارة الصحة", en: "Ministry of Health" },
    unit: { ar: "جميع المستشفيات الحكومية", en: "All Government Hospitals" },
    details: {
      ar: "تقدر تطلب التحويل لقسم الطب النفسي/التطوري من أي مستشفى حكومي قريب من منطقتج.",
      en: "You can request a referral to the psychiatry/developmental department from any nearby government hospital.",
    },
  },
  {
    id: "moh-sabah",
    number: 7,
    authority: "moh",
    parentName: { ar: "وزارة الصحة", en: "Ministry of Health" },
    unit: {
      ar: "مستشفى الصباح — وحدة الطب التطوري",
      en: "Sabah Hospital — Developmental Medicine Unit",
    },
    phone: "24617345",
  },
];

export const AUTHORITY_META: Record<
  CenterAuthority,
  { label: { ar: string; en: string }; emoji: string; color: string }
> = {
  pada: {
    label: { ar: "هيئة شؤون ذوي الإعاقة", en: "Disability Affairs Authority" },
    emoji: "🏛️",
    color: "#0BB4B0",
  },
  moe: {
    label: { ar: "وزارة التربية", en: "Ministry of Education" },
    emoji: "🎒",
    color: "#E0A858",
  },
  moh: {
    label: { ar: "وزارة الصحة", en: "Ministry of Health" },
    emoji: "🏥",
    color: "#2563eb",
  },
};
