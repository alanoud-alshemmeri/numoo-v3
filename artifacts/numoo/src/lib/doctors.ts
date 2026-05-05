// Specialist doctors in Kuwait who accept special-needs children.
// Compiled from real mothers' shared experiences.
// IMPORTANT: This is parent-shared community knowledge, NOT a clinical recommendation.

export type DoctorSpecialty =
  | "dermatology"
  | "gastro"
  | "dental"
  | "eye"
  | "ent"
  | "neurology"
  | "psychiatry";

export interface Doctor {
  id: string;
  name: string;
  nameEn?: string;
  location?: string;
  locationEn?: string;
  note?: string;
  noteEn?: string;
}

export interface SpecialtyGroup {
  id: DoctorSpecialty;
  label: { ar: string; en: string };
  emoji: string;
  color: string; // hex
  intro: { ar: string; en: string };
  doctors: Doctor[];
}

export const DOCTOR_SPECIALTIES: SpecialtyGroup[] = [
  {
    id: "dermatology",
    label: { ar: "جلدية", en: "Dermatology" },
    emoji: "🧴",
    color: "#0BB4B0",
    intro: {
      ar: "أطباء جلدية يستقبلون أطفال الاحتياجات الخاصة بصبر وتفهّم.",
      en: "Dermatologists known for receiving special-needs children with patience.",
    },
    doctors: [
      { id: "derm-1", name: "د. الصياد", location: "مستشفى المواساة", locationEn: "Mowasat Hospital" },
      { id: "derm-2", name: "د. شمايل سنافي" },
      { id: "derm-3", name: "د. زينب مجيد" },
      { id: "derm-4", name: "د. هدى الصفار" },
      { id: "derm-5", name: "د. أيمن خفاجي", location: "دار الشفا", locationEn: "Dar Al-Shifa" },
      { id: "derm-6", name: "د. ديفا", location: "مستشفى السلام", locationEn: "Salam Hospital" },
      { id: "derm-7", name: "د. عبدالعزيز الراشد", location: "دار الشفا", locationEn: "Dar Al-Shifa" },
    ],
  },
  {
    id: "gastro",
    label: { ar: "هضمي", en: "Gastroenterology" },
    emoji: "🩺",
    color: "#089b98",
    intro: {
      ar: "أطباء جهاز هضمي يستقبلون أطفال التوحد والاحتياجات الخاصة.",
      en: "Gastroenterologists who receive autistic and special-needs children.",
    },
    doctors: [
      { id: "gi-1", name: "د. سالم الشمري" },
      { id: "gi-2", name: "د. سعد النصافي" },
      { id: "gi-3", name: "د. محمد الشمالي" },
      { id: "gi-4", name: "د. فؤاد العلي" },
      { id: "gi-5", name: "د. أحمد الحوطي" },
      { id: "gi-6", name: "د. فواز الرفاعي" },
      { id: "gi-7", name: "د. شعيب القلاف" },
      { id: "gi-8", name: "د. فهد الإبراهيم" },
      { id: "gi-9", name: "د. غانم الغانم" },
    ],
  },
  {
    id: "dental",
    label: { ar: "أسنان", en: "Dentistry" },
    emoji: "🦷",
    color: "#E0A858",
    intro: {
      ar: "أطباء أسنان متعودين على أطفال الاحتياجات الخاصة — خبرة بالتعامل والصبر.",
      en: "Dentists experienced with special-needs children — patient and accommodating.",
    },
    doctors: [
      { id: "dent-1", name: "د. روان الخويتيم", location: "عيادة A line", locationEn: "A Line Clinic" },
      { id: "dent-2", name: "أطباء الأميري", location: "مستشفى الأميري", locationEn: "Amiri Hospital", note: "ممتازون", noteEn: "Highly recommended" },
      { id: "dent-3", name: "د. وليد الديولي" },
      { id: "dent-4", name: "د. أحمد التميمي", location: "مستشفى السيف", locationEn: "Seif Hospital" },
      { id: "dent-5", name: "د. جراح الكندري", location: "مستشفى الكويت", locationEn: "Kuwait Hospital" },
      { id: "dent-6", name: "د. علي الصفار", location: "مستشفى الأميري", locationEn: "Amiri Hospital", note: "متخصص أطفال الاحتياجات الخاصة", noteEn: "Specialist for special-needs children" },
      { id: "dent-7", name: "د. محمد المحطي", location: "مركز سن", locationEn: "Sinn Center" },
      { id: "dent-8", name: "د. يوسف العوضي", location: "عيادة في حولي", locationEn: "Hawally clinic" },
      { id: "dent-9", name: "د. سعود الدوسري", location: "عيادة سن", locationEn: "Sinn Clinic" },
    ],
  },
  {
    id: "eye",
    label: { ar: "عيون", en: "Ophthalmology" },
    emoji: "👁️",
    color: "#2563eb",
    intro: {
      ar: "أطباء عيون يستقبلون أطفال الاحتياجات الخاصة من تجارب الأمهات.",
      en: "Ophthalmologists who receive special-needs children based on mothers' experiences.",
    },
    doctors: [
      { id: "eye-1", name: "مستشفى البحر", nameEn: "Bahar Hospital", note: "حكومي", noteEn: "Government" },
      { id: "eye-2", name: "د. سامي الربيعة" },
      { id: "eye-3", name: "د. منصور الشمري" },
      { id: "eye-4", name: "د. جمال علي الكندري" },
      { id: "eye-5", name: "د. خالد السبتي" },
      { id: "eye-6", name: "د. ميثم العلي" },
      { id: "eye-7", name: "د. محمد دفيليج" },
      { id: "eye-8", name: "د. فيصل جراق" },
      { id: "eye-9", name: "د. عهود خليفة" },
      { id: "eye-10", name: "د. فيصل الغضفان" },
      { id: "eye-11", name: "د. عبدالمطلب بهبهاني" },
      { id: "eye-12", name: "د. آلاء العلي" },
      { id: "eye-13", name: "د. مشاري دهراب" },
      { id: "eye-14", name: "د. هديل اليامي", location: "مستشفى البحر", locationEn: "Bahar Hospital" },
    ],
  },
  {
    id: "ent",
    label: { ar: "أنف وأذن وحنجرة", en: "ENT" },
    emoji: "👂",
    color: "#9333ea",
    intro: {
      ar: "أطباء أنف وأذن وحنجرة يستقبلون أطفال الاحتياجات الخاصة.",
      en: "ENT specialists who receive special-needs children.",
    },
    doctors: [
      { id: "ent-1", name: "د. عبدالله العلي" },
      { id: "ent-2", name: "د. سريرام", location: "مستشفى مترو", locationEn: "Metro Hospital" },
      { id: "ent-3", name: "د. كيران", location: "دار الشفا", locationEn: "Dar Al-Shifa" },
      { id: "ent-4", name: "د. حسن الشمري" },
      { id: "ent-5", name: "د. محمد العيسى", location: "مستشفى السلام", locationEn: "Salam Hospital" },
      { id: "ent-6", name: "د. خالد العبدالهادي" },
      { id: "ent-7", name: "د. عبدالله البدر" },
      { id: "ent-8", name: "د. محمد الهاجري" },
      { id: "ent-9", name: "د. عبدالمحسن التركي" },
      { id: "ent-10", name: "د. سونيل", location: "شفاء الجزيرة", locationEn: "Shifa Al-Jazira" },
      { id: "ent-11", name: "د. عبدالله العويد" },
      { id: "ent-12", name: "عيادة بوحيمد", nameEn: "Bouhaimed Clinic" },
      { id: "ent-13", name: "د. عبير العلي" },
    ],
  },
  {
    id: "neurology",
    label: { ar: "مخ وأعصاب", en: "Neurology" },
    emoji: "🧠",
    color: "#dc2626",
    intro: {
      ar: "أطباء مخ وأعصاب يستقبلون أطفال الاحتياجات الخاصة.",
      en: "Neurologists who receive special-needs children.",
    },
    doctors: [
      { id: "neuro-1", name: "د. يوسف حبيب" },
      { id: "neuro-2", name: "د. محمد الدغيم", location: "مستشفى وارة", locationEn: "Wara Hospital" },
      { id: "neuro-3", name: "د. فيصل الثويني", location: "مستشفى ابن سينا والأحمدي", locationEn: "Ibn Sina & Ahmadi Hospital" },
      { id: "neuro-4", name: "د. عيسى المشموم", location: "برج مزايا", locationEn: "Mazaya Tower" },
    ],
  },
  {
    id: "psychiatry",
    label: { ar: "طب نفسي", en: "Psychiatry" },
    emoji: "💚",
    color: "#16a34a",
    intro: {
      ar: "أطباء نفسيين يستقبلون أطفال الاحتياجات الخاصة من تجارب الأمهات.",
      en: "Child psychiatrists who receive special-needs children based on mothers' experiences.",
    },
    doctors: [
      { id: "psy-1", name: "د. سالم الوطيان" },
      { id: "psy-2", name: "د. عبدالله الحمادي" },
      { id: "psy-3", name: "د. رسل بورسلي" },
    ],
  },
];

export function getDoctorCount(): number {
  return DOCTOR_SPECIALTIES.reduce((sum, g) => sum + g.doctors.length, 0);
}
