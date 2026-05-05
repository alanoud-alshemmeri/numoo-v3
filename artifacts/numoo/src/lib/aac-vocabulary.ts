export type AACWord = {
  ar: string;
  en: string;
  emoji: string;
  speak?: string;
};

export type AACCategory = {
  id: string;
  ar: string;
  en: string;
  emoji: string;
  color: string;
  words: AACWord[];
};

export const AAC_CATEGORIES: AACCategory[] = [
  {
    id: "feelings",
    ar: "مشاعر",
    en: "Feelings",
    emoji: "💛",
    color: "#E0A858",
    words: [
      { ar: "مبسوط", en: "Happy", emoji: "😊" },
      { ar: "زعلان", en: "Sad", emoji: "😢" },
      { ar: "خايف", en: "Scared", emoji: "😨" },
      { ar: "متضايق", en: "Upset", emoji: "😣" },
      { ar: "تعبان", en: "Tired", emoji: "😴" },
      { ar: "أحبك", en: "I love you", emoji: "💕" },
      { ar: "أريد حضن", en: "I want a hug", emoji: "🤗" },
      { ar: "أريد ألعب", en: "I want to play", emoji: "🎈" },
    ],
  },
  {
    id: "needs",
    ar: "احتياجات",
    en: "Needs",
    emoji: "🆘",
    color: "#0BB4B0",
    words: [
      { ar: "جوعان", en: "Hungry", emoji: "🍽️" },
      { ar: "عطشان", en: "Thirsty", emoji: "🥤" },
      { ar: "أريد حمام", en: "Bathroom", emoji: "🚽" },
      { ar: "أريد أنام", en: "Sleep", emoji: "🛏️" },
      { ar: "حر", en: "Hot", emoji: "🥵" },
      { ar: "بارد", en: "Cold", emoji: "🥶" },
      { ar: "أريد مساعدة", en: "Help", emoji: "🙋" },
      { ar: "ألم", en: "Pain", emoji: "🤕" },
    ],
  },
  {
    id: "food",
    ar: "أكل",
    en: "Food",
    emoji: "🍎",
    color: "#dc2626",
    words: [
      { ar: "ماي", en: "Water", emoji: "💧", speak: "ماء" },
      { ar: "حليب", en: "Milk", emoji: "🥛" },
      { ar: "خبز", en: "Bread", emoji: "🍞" },
      { ar: "بيض", en: "Egg", emoji: "🥚" },
      { ar: "تفاح", en: "Apple", emoji: "🍎" },
      { ar: "موز", en: "Banana", emoji: "🍌" },
      { ar: "أرز", en: "Rice", emoji: "🍚" },
      { ar: "دجاج", en: "Chicken", emoji: "🍗" },
      { ar: "حلاوة", en: "Candy", emoji: "🍬", speak: "حلوى" },
      { ar: "آيس كريم", en: "Ice cream", emoji: "🍦" },
    ],
  },
  {
    id: "body",
    ar: "جسم",
    en: "Body",
    emoji: "🧒",
    color: "#9333ea",
    words: [
      { ar: "راس", en: "Head", emoji: "🧠", speak: "رأس" },
      { ar: "بطن", en: "Tummy", emoji: "🫃" },
      { ar: "يد", en: "Hand", emoji: "✋" },
      { ar: "رِجل", en: "Leg", emoji: "🦵" },
      { ar: "أذن", en: "Ear", emoji: "👂" },
      { ar: "عين", en: "Eye", emoji: "👁️" },
      { ar: "أسنان", en: "Teeth", emoji: "🦷" },
      { ar: "حلق", en: "Throat", emoji: "👅", speak: "حلقي" },
    ],
  },
  {
    id: "people",
    ar: "ناس",
    en: "People",
    emoji: "👨‍👩‍👧",
    color: "#0D2137",
    words: [
      { ar: "ماما", en: "Mom", emoji: "👩" },
      { ar: "بابا", en: "Dad", emoji: "👨" },
      { ar: "جدتي", en: "Grandma", emoji: "👵" },
      { ar: "جدي", en: "Grandpa", emoji: "👴" },
      { ar: "أخوي", en: "Brother", emoji: "👦" },
      { ar: "أختي", en: "Sister", emoji: "👧" },
      { ar: "صديقي", en: "Friend", emoji: "🧒" },
      { ar: "المعلمة", en: "Teacher", emoji: "👩‍🏫" },
      { ar: "الدكتور", en: "Doctor", emoji: "👨‍⚕️" },
    ],
  },
  {
    id: "places",
    ar: "أماكن",
    en: "Places",
    emoji: "🏠",
    color: "#2563eb",
    words: [
      { ar: "البيت", en: "Home", emoji: "🏠" },
      { ar: "المدرسة", en: "School", emoji: "🏫" },
      { ar: "الحديقة", en: "Park", emoji: "🌳" },
      { ar: "المستشفى", en: "Hospital", emoji: "🏥" },
      { ar: "الجمعية", en: "Co-op", emoji: "🛒" },
      { ar: "السيارة", en: "Car", emoji: "🚗" },
      { ar: "المطعم", en: "Restaurant", emoji: "🍽️" },
      { ar: "البحر", en: "Sea", emoji: "🌊" },
    ],
  },
  {
    id: "actions",
    ar: "أفعال",
    en: "Actions",
    emoji: "🏃",
    color: "#ea580c",
    words: [
      { ar: "نعم", en: "Yes", emoji: "✅" },
      { ar: "لا", en: "No", emoji: "❌" },
      { ar: "أريد", en: "I want", emoji: "👉" },
      { ar: "ما أريد", en: "I don't want", emoji: "🚫" },
      { ar: "خلصت", en: "Done", emoji: "✔️" },
      { ar: "بعدين", en: "Later", emoji: "⏰" },
      { ar: "افتح", en: "Open", emoji: "📂" },
      { ar: "سكّر", en: "Close", emoji: "🚪" },
      { ar: "أكثر", en: "More", emoji: "➕" },
      { ar: "وقّف", en: "Stop", emoji: "🛑" },
    ],
  },
];
