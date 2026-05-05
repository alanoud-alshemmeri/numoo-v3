export type Governorate =
  | "الفروانية"
  | "الجهراء"
  | "حولي"
  | "مبارك الكبير"
  | "الأحمدي"
  | "العاصمة";

export type DirectoryCategory =
  | "nurseries"
  | "arabicSchools"
  | "foreignSchools"
  | "rehab"
  | "evening";

export interface DirectoryEntry {
  id: string;
  name: string;
  category: DirectoryCategory;
  governorate: Governorate;
  address: string;
  phones: string[];
  email?: string;
  website?: string;
  notes?: string;
}

export const CATEGORY_LABELS: Record<
  DirectoryCategory,
  { ar: string; en: string }
> = {
  nurseries: { ar: "حضانات خاصة", en: "Special-Needs Nurseries" },
  arabicSchools: { ar: "مدارس عربية", en: "Arabic Schools" },
  foreignSchools: { ar: "مدارس أجنبية", en: "International Schools" },
  rehab: { ar: "مراكز تأهيلية", en: "Rehabilitation Centers" },
  evening: { ar: "برامج مسائية", en: "Evening Programs" },
};

export const GOVERNORATE_LABELS: Record<
  Governorate,
  { ar: string; en: string }
> = {
  "الفروانية": { ar: "الفروانية", en: "Farwaniya" },
  "الجهراء": { ar: "الجهراء", en: "Jahra" },
  "حولي": { ar: "حولي", en: "Hawalli" },
  "مبارك الكبير": { ar: "مبارك الكبير", en: "Mubarak Al-Kabeer" },
  "الأحمدي": { ar: "الأحمدي", en: "Ahmadi" },
  "العاصمة": { ar: "العاصمة", en: "Capital" },
};

export const DIRECTORY: DirectoryEntry[] = [
  // ===== ARABIC SCHOOLS =====
  { id: "as1a", category: "arabicSchools", name: "مدرسة الكويت الأهلية الحديثة (بنين)", governorate: "الفروانية", address: "الفروانية – قطعة 6 – قسيمة 190 – خلف فندق كراون بلازا", phones: ["22087999"], notes: "دمج ابتدائي ومتوسط وثانوي – فصول احتياجات خاصة" },
  { id: "as1b", category: "arabicSchools", name: "مدرسة الكويت الأهلية الحديثة (مختلط/بنات)", governorate: "الفروانية", address: "الفروانية – قطعة 6 – قسيمة 190 – خلف فندق كراون بلازا", phones: ["22087999"], notes: "دمج ابتدائي مختلط، متوسط وثانوي – فصول احتياجات خاصة" },
  { id: "as2", category: "arabicSchools", name: "مدرسة النبراس النموذجية لذوي الاحتياجات الخاصة", governorate: "الفروانية", address: "جليب الشيوخ – قطعة 4 – شارع 200", phones: ["24376888", "24376868"], notes: "فصول احتياجات خاصة" },
  { id: "as3", category: "arabicSchools", name: "مدرسة أم هاني لذوي الاحتياجات الخاصة", governorate: "الفروانية", address: "الفروانية – قطعة 1 – شارع الأردن – خلف نادي التضامن", phones: ["24767135", "24767136"], notes: "دمج ابتدائي ومتوسط وثانوي (بنات) – فصول احتياجات خاصة" },
  { id: "as4", category: "arabicSchools", name: "مدرسة الجابر الأهلية", governorate: "الفروانية", address: "جليب الشيوخ – قطعة 4 – قسيمة 2404 – شارع المدارس", phones: ["24340113", "24340118"], notes: "دمج ابتدائي مختلط، متوسط وثانوي – فصول احتياجات خاصة" },
  { id: "as5", category: "arabicSchools", name: "مدرسة النخبة النموذجية", governorate: "الفروانية", address: "جليب الشيوخ – ق 4 – ش 15 – قسيمة 25", phones: ["97181883"], notes: "فصول دمج متوسط وثانوي (بنين)" },
  { id: "as6", category: "arabicSchools", name: "مدرسة الهدى للاحتياجات الخاصة", governorate: "الجهراء", address: "شمال غرب الجهراء – قطعة 1 – شارع دعيل الخزاعي – قرب بيت التمويل", phones: ["24589600", "24589400"], email: "Alhoda2021.school@gmail.com", notes: "فصول احتياجات خاصة" },
  { id: "as7", category: "arabicSchools", name: "مدرسة أجيال المستقبل الأهلية", governorate: "الجهراء", address: "شمال غرب الجهراء – قسيمة 3 – شارع دعيل الخزاعي – مقابل بيت التمويل", phones: ["24574610", "22402858", "99026217"], notes: "دمج ابتدائي ومتوسط وثانوي (بنين)" },
  { id: "as8", category: "arabicSchools", name: "مدرسة الصفوة النموذجية", governorate: "الجهراء", address: "الجهراء – قطعة 92 – قسيمة 112 – قسائم العثمان – قرب سنترال الجهراء", phones: ["24570473"], notes: "دمج ابتدائي ومتوسط (بنين) – فصول احتياجات خاصة" },
  { id: "as9a", category: "arabicSchools", name: "مدرسة أكاديمية الكويت التعليمية (بنين)", governorate: "حولي", address: "السالمية – قطعة 10 – شارع يوسف البدر", phones: ["25648955", "25648944", "25648966"], notes: "دمج متوسط وثانوي – فصول احتياجات خاصة" },
  { id: "as9b", category: "arabicSchools", name: "مدرسة أكاديمية الكويت التعليمية (بنات)", governorate: "حولي", address: "السالمية – قطعة 10 – شارع يوسف البدر", phones: ["25648955", "25648944", "25648966"], notes: "دمج ابتدائي – فصول احتياجات خاصة" },
  { id: "as10a", category: "arabicSchools", name: "مدرسة الريادة النموذجية (بنين)", governorate: "مبارك الكبير", address: "صباح السالم – قطعة 1 – شارع جاسم الخرافي – الدائري السادس – قسيمة 452", phones: ["22070111", "22261411"], notes: "دمج متوسط وثانوي – فصول احتياجات خاصة" },
  { id: "as10b", category: "arabicSchools", name: "مدرسة الريادة النموذجية (بنات)", governorate: "مبارك الكبير", address: "صباح السالم – قطعة 1 – شارع جاسم الخرافي – الدائري السادس – قسيمة 452", phones: ["22070111", "22261411"], notes: "دمج ابتدائي مختلط، متوسط وثانوي – فصول احتياجات خاصة" },
  { id: "as11", category: "arabicSchools", name: "مدرسة أم القرى النموذجية", governorate: "الأحمدي", address: "بوحليفة – قطعة 2 – شارع 1 – رقم 41", phones: ["22277280", "22277292"], notes: "ابتدائي مختلط، متوسط وثانوي – فصول احتياجات خاصة" },
  { id: "as12a", category: "arabicSchools", name: "مدرسة المعرفة النموذجية (بنين)", governorate: "الأحمدي", address: "المنقف – قطعة 4 – شارع 21", phones: ["23746758", "23741289", "99942901"], notes: "دمج متوسط وثانوي – فصول احتياجات خاصة" },
  { id: "as12b", category: "arabicSchools", name: "مدرسة المعرفة النموذجية (بنات)", governorate: "الأحمدي", address: "المنقف – قطعة 4 – شارع 21", phones: ["23746758", "23741289", "99942901"], notes: "دمج ابتدائي مختلط، متوسط وثانوي – فصول احتياجات خاصة" },
  { id: "as13", category: "arabicSchools", name: "مركز تقويم وتعليم الطفل", governorate: "العاصمة", address: "السرة – قطعة 4 – شارع 14 – ص.ب 5453 – الصفاة 13055 الكويت", phones: ["1832000"], notes: "إعاقة تعليمية – فصول دمج" },

  // ===== FOREIGN / INTERNATIONAL SCHOOLS =====
  { id: "fs1", category: "foreignSchools", name: "مدرسة التعليم الإرشادي لذوي الاحتياجات الخاصة", governorate: "الفروانية", address: "الفروانية – قطعة 1 – شارع الأردن – بجانب نادي التضامن", phones: ["24731580", "24767129", "97900405"], notes: "فصول احتياجات خاصة" },
  { id: "fs2", category: "foreignSchools", name: "مدرسة النبراس الدولية ثنائية اللغة", governorate: "الفروانية", address: "جليب الشيوخ – قطعة 4 – شارع 200", phones: ["24376800", "24376888"], notes: "دمج جميع المراحل الدراسية" },
  { id: "fs3", category: "foreignSchools", name: "مدرسة أكاديمية الجهراء ثنائية اللغة", governorate: "الجهراء", address: "شمال غرب الجهراء – مقابل بيت التمويل – قسيمة 3", phones: ["24589600", "24589400"], notes: "دمج ابتدائي ومتوسط" },
  { id: "fs4", category: "foreignSchools", name: "مدرسة الخليج الأمريكية ثنائية اللغة", governorate: "الجهراء", address: "الجهراء طريق السليريد – ق 1 – خلف مركز سلطان – مقابل مجمع المحاكم الجديد", phones: ["22083081", "22083082"], email: "Agbs@agbs.tech", notes: "دمج جميع المراحل الدراسية" },
  { id: "fs5", category: "foreignSchools", name: "مدرسة الخليج ثنائية اللغة", governorate: "الجهراء", address: "الجهراء طريق السليريد – خلف مركز سلطان – مقابل مجمع المحاكم الجديد", phones: ["22083101", "22083102"], email: "Gbs@gbskw.tech", notes: "فصول احتياجات خاصة" },
  { id: "fs6", category: "foreignSchools", name: "مدرسة الكويت الإنجليزية الخاصة", governorate: "حولي", address: "سلوى – قطعة 11 – شارع 9 منزل 383", phones: ["22390100"], email: "Kes.edu.kw@keschool", website: "www.kes.edu.kw", notes: "دمج جميع المراحل الدراسية – فصول احتياجات خاصة" },
  { id: "fs7", category: "foreignSchools", name: "أكاديمية الحضارات العالمية ثنائية اللغة", governorate: "حولي", address: "حولي – النقرة – ق 1 – شارع قتيبة – خلف مجمع النقرة الشمالي", phones: ["22639681", "22630394"], notes: "دمج جميع المراحل الدراسية – فصول احتياجات خاصة" },
  { id: "fs8", category: "foreignSchools", name: "مدرسة الكويت الوطنية الإنجليزية", governorate: "حولي", address: "النقرة – ق 2 – شارع موسى بن النصير – دوار الفارابي", phones: ["22656905", "22656904"], notes: "دمج جميع المراحل الدراسية – فصول احتياجات خاصة" },
  { id: "fs9", category: "foreignSchools", name: "مدرسة البيان الدولية الخاصة", governorate: "حولي", address: "حولي – شارع بيروت – ق 9 – خلف مستشفى دار الشفا", phones: ["22052855", "22052800", "22052822"], notes: "دمج جميع المراحل الدراسية – فصول احتياجات خاصة للمتوسط والثانوي" },
  { id: "fs10", category: "foreignSchools", name: "مدرسة منارات", governorate: "حولي", address: "السالمية – قطعة 2 – شارع يوسف بن حمود – جادة 2", phones: ["25750792", "25750782", "25722083"], notes: "فصول دمج جميع المراحل – فصول احتياجات خاصة" },
  { id: "fs11", category: "foreignSchools", name: "مدرسة الأطفال المبدعين", governorate: "حولي", address: "حولي – قطعة 4 – شارع الراشد – بناية 13 – خلف شارع تونس", phones: ["22625729", "22623074"], notes: "دمج الصف الأول والثاني ابتدائي – فصول احتياجات خاصة" },
  { id: "fs12", category: "foreignSchools", name: "مدرسة خليفة للاحتياجات الخاصة", governorate: "حولي", address: "السالمية – خلف مجمع الفنار – بجانب مدرسة الخليج والإنترناشيونال كلينيك", phones: ["25744104", "25744105", "25744106"], notes: "فصول احتياجات خاصة" },
  { id: "fs13", category: "foreignSchools", name: "مدرسة الرسالة ثنائية اللغة", governorate: "الأحمدي", address: "المهبولة – ق 12 – قسيمة 236 – طريق الفحيحيل السريع", phones: ["23732015"], notes: "دمج جميع المراحل الدراسية – فصول احتياجات خاصة" },
  { id: "fs14", category: "foreignSchools", name: "مدرسة النور ثنائية اللغة", governorate: "الأحمدي", address: "المهبولة – قطعة 1 – شارع 114", phones: ["95535730", "95535731", "95535732"], notes: "دمج جميع المراحل الدراسية" },
  { id: "fs15a", category: "foreignSchools", name: "المستقبل ثنائية اللغة الخاصة", governorate: "الأحمدي", address: "فحيحيل – شارع مكة – ق 9 – بجانب منطقة الأحمدي التعليمية", phones: ["23921917", "23934248", "23921918"], notes: "دمج جميع المراحل الدراسية – فصول احتياجات خاصة" },
  { id: "fs15b", category: "foreignSchools", name: "المستقبل ثنائية اللغة (بنات)", governorate: "الأحمدي", address: "فحيحيل – شارع مكة – ق 9 – بجانب منطقة الأحمدي التعليمية", phones: ["23921917", "23934248", "23921918"], notes: "دمج جميع المراحل الدراسية" },
  { id: "fs16", category: "foreignSchools", name: "مدرسة كويت هلز ثنائية اللغة للاحتياجات الخاصة", governorate: "الأحمدي", address: "المنقف – قطعة 3 – شارع 1 – مقابل مسجد عقبة بن عامر – بوابة 1", phones: ["22286811", "22286812", "22286813", "22286814"], notes: "فصول احتياجات خاصة" },
  { id: "fs17", category: "foreignSchools", name: "مدرسة التربية النموذجية", governorate: "العاصمة", address: "شرق – قطعة 8 – شارع الهلالي", phones: ["22403668", "22403669", "22463774"], notes: "فصول احتياجات خاصة" },
  { id: "fs18", category: "foreignSchools", name: "مدرسة هوب للاحتياجات الخاصة", governorate: "العاصمة", address: "شرق – قطعة 1 – شارع الشهداء – بجوار برج الحمراء", phones: ["22496600"], notes: "فصول احتياجات خاصة" },
  { id: "fs19a", category: "foreignSchools", name: "مدرسة دسمان ثنائية اللغة (1)", governorate: "العاصمة", address: "شرق – دسمان – ق 3 – شارع بن مسباح", phones: ["22277377"], website: "www.dbs.edu.kw", notes: "دمج مرحلة ابتدائي – فصول احتياجات خاصة" },
  { id: "fs19b", category: "foreignSchools", name: "مدرسة دسمان ثنائية اللغة (2)", governorate: "العاصمة", address: "شرق – دسمان – ق 3 – شارع بن مسباح", phones: ["22277377"], website: "www.dbs.edu.kw", notes: "دمج مرحلة المتوسط والثانوي – فصول احتياجات خاصة" },
  { id: "fs20", category: "foreignSchools", name: "مدرسة الشرق الأوسط الأمريكية ثنائية اللغة", governorate: "العاصمة", address: "الدوحة – قطعة 4 – شارع جمال عبدالناصر – خلف ثانوية شهاب الدين", phones: ["24866850", "24866950"], email: "amebs@amebs.tech", notes: "دمج جميع المراحل الدراسية" },

  // ===== REHABILITATION CENTERS =====
  { id: "rc1", category: "rehab", name: "مؤسسة التأهيل الإرشادي", governorate: "الفروانية", address: "الفروانية – قطعة 1 – شارع الأردن – خلف نادي التضامن", phones: ["24731546", "24731539", "24731574"], notes: "الإعاقة الذهنية الشديدة والمتوسطة (من 6–35 سنة)" },
  { id: "rc2", category: "rehab", name: "مركز 21", governorate: "حولي", address: "الزهراء – قطعة 1 – شارع 112 – قسيمة 612", phones: ["25212028", "50993750", "99340669"], email: "h.omarkaz21@gmail.com", notes: "الإعاقات الذهنية المتوسطة والشديدة (من 21–45 سنة)" },
  { id: "rc3", category: "rehab", name: "مؤسسة الإخلاص التأهيلية", governorate: "حولي", address: "سلوى – قطعة 11 – قسيمة 387 – شارع محمد وسمي الوسمي", phones: ["69910452", "25621655"], email: "specialneeds@ekhlas.edu.kw", notes: "جميع الإعاقات الشديدة والذهنية البسيطة والمتوسطة" },
  { id: "rc4", category: "rehab", name: "مؤسسة مركز الكويت للتوحد", governorate: "حولي", address: "ضاحية مبارك العبدالله الجابر (غرب مشرف) – قطعة 6 – شارع 3", phones: ["25309300", "25375017"], email: "Kwautism@gmail.com", notes: "جميع الإعاقات الشديدة والذهنية البسيطة والمتوسطة (من 6–45 سنة) – داخلي 1100/1101" },
  { id: "rc5", category: "rehab", name: "مؤسسة الإعداد النموذجي", governorate: "حولي", address: "حولي – ق 93 – شارع شرحبيل – قسيمة 4", phones: ["22612221"], notes: "جميع الإعاقات الشديدة" },
  { id: "rc6", category: "rehab", name: "مركز أم القرى", governorate: "الأحمدي", address: "بوحليفة – شارع عبدالملك بن مروان – ق 2 – قسيمة 69", phones: ["98012335", "98857752"], email: "Omalqura.21@om-alqura.com", notes: "جميع الإعاقات الشديدة والذهنية البسيطة والمتوسطة (فوق 21 سنة)" },
  { id: "rc7", category: "rehab", name: "مؤسسة الرعاية المتكاملة لذوي الإعاقة 2", governorate: "الأحمدي", address: "المهبولة – ق 4 – سالم صباح السالم الصباح – قسيمة 973 – الرقم الآلي 91187973", phones: ["63330705", "65142000"], notes: "جميع الإعاقات الشديدة والمتوسطة والبسيطة (من 6 فما فوق)" },
  { id: "rc8", category: "rehab", name: "مؤسسة الرعاية المتكاملة لذوي الإعاقة", governorate: "العاصمة", address: "غرناطة – قطعة 1 – مقابل جسر الجهراء – مبنى 319", phones: ["22206056", "22206055", "22206054", "99193134", "65949355", "66852254"], email: "info@icankuwait.com", notes: "جميع الإعاقات الشديدة والذهنية البسيطة والمتوسطة (من 6–45 سنة)" },
  { id: "rc9", category: "rehab", name: "جمعية رعاية المعاقين – مركز الرعاية النهارية", governorate: "الجهراء", address: "الجهراء – قطعة 2 – شارع نصر بن يسار – بجانب روضة القصر الأحمر / الصباحية – شارع مجمع المحاكم / حولي – شارع القاهرة – خلف كلية الدراسات التجارية بنين", phones: ["24586733", "23624768", "23624748", "22631277", "22632343"], email: "b.aljenae@ksh.kw.org", notes: "جميع الإعاقات الشديدة والإعاقات الذهنية البسيطة والمتوسطة" },

  // ===== EVENING PROGRAMS =====
  { id: "ev1", category: "evening", name: "مركز تقويم وتعليم الطفل (مسائي)", governorate: "العاصمة", address: "السرة – قطعة 4 – شارع 14 – ص.ب 5453 – الصفاة 13055 الكويت", phones: ["1832000"], notes: "إعاقة تعليمية – فصول دمج" },
  { id: "ev2", category: "evening", name: "مركز الكويت للدسلكسيا", governorate: "الفروانية", address: "العمرية – قطعة 4 – شارع العمرية – مبنى 4", phones: ["24757986", "24758514", "94731056"], email: "info@q8da.com", notes: "فصول دمج – إعاقة تعليمية" },

  // ===== PRIVATE NURSERIES (HADANAT) =====
  { id: "n1", category: "nurseries", name: "حضانة الهبة", governorate: "الفروانية", address: "عبدالله المبارك – قطعة 6 – شارع 601 – منزل 3", phones: ["97446577", "97446477"], notes: "جميع الإعاقات" },
  { id: "n2", category: "nurseries", name: "حضانة الهبة 2 للاحتياجات الخاصة", governorate: "الفروانية", address: "الأندلس – قطعة 4 – شارع 5 – قسيمة 173", phones: ["51142276"], email: "Alheba2nursery@gmail.com", notes: "جميع الإعاقات" },
  { id: "n3", category: "nurseries", name: "حضانة كويت بلو سكاي للاحتياجات الخاصة", governorate: "الفروانية", address: "عبدالله المبارك – قطعة 9 – شارع 91 – قسيمة 144", phones: ["24360960", "97267261"], notes: "جميع الإعاقات" },
  { id: "n4", category: "nurseries", name: "حضانة الشمس المشرقة", governorate: "الفروانية", address: "إشبيلية – قطعة 4 – شارع 401 – قسيمة 782", phones: ["24385524", "24385523", "60669545", "60788391"], notes: "جميع الإعاقات" },
  { id: "n5", category: "nurseries", name: "حضانة النوير للاحتياجات الخاصة", governorate: "الفروانية", address: "الرحاب – قطعة 2 – شارع 6 – منزل 387", phones: ["55544069"], notes: "جميع الإعاقات" },
  { id: "n6", category: "nurseries", name: "حضانة بيت ناصر (3)", governorate: "الفروانية", address: "غرب عبدالله المبارك – ق 4 – ش 441 – فيلا 428", phones: ["22259590", "60050735"], email: "info@bnkuw.com", notes: "جميع الإعاقات" },
  { id: "n7", category: "nurseries", name: "حضانة سبيشل سمارت أكاديمي", governorate: "الفروانية", address: "خيطان – ق 5 – شارع 41 – منزل 345", phones: ["95002006", "94002004"], email: "Special.smart.academy.kw@gmail.com", notes: "جميع الإعاقات" },
  { id: "n8", category: "nurseries", name: "حضانة ديما", governorate: "الجهراء", address: "سعد العبدالله – قطعة 2 – شارع 221 – منزل 71 – مقابل مدرسة الصامتة متوسطة بنات", phones: ["55507189", "24534954", "24534955"], notes: "جميع الإعاقات" },
  { id: "n9", category: "nurseries", name: "حضانة ليتل فينجرز للاحتياجات الخاصة", governorate: "الجهراء", address: "الجهراء القديمة – قطعة 1 – شارع 3 متفرع من شارع عبدالله بن جدعان – منزل 37", phones: ["51678168", "55996615", "24554130"], email: "Little.fingers_88@icloud.com", notes: "جميع الإعاقات" },
  { id: "n10", category: "nurseries", name: "حضانة سمية النموذجية", governorate: "الجهراء", address: "الجهراء – القصر – قطعة 2 – شارع مرشد الشمري – منزل 10 – الرقم الآلي 17629462", phones: ["66677126", "55299862", "24563356", "24563358"], notes: "جميع الإعاقات" },
  { id: "n11", category: "nurseries", name: "حضانة بيت ناصر لذوي الاحتياجات الخاصة", governorate: "الجهراء", address: "النسيم – ق 93 – ش 9 – فيلا 324 – مقابل الكلية الكندية", phones: ["62220012", "60050735", "55916205", "64445953", "22259590"], email: "info@bnkuw.com", notes: "جميع الإعاقات" },
  { id: "n12", category: "nurseries", name: "حضانة البسمة", governorate: "حولي", address: "جنوب السرة – السلام – قطعة 5 شارع 507 – فيلا 8", phones: ["99734267", "25240970", "25240960"], email: "f-alkazimi@hotmail.com", notes: "جميع الإعاقات" },
  { id: "n13", category: "nurseries", name: "حضانة الغد المشرق لذوي الاحتياجات الخاصة", governorate: "حولي", address: "جنوب السرة – الزهراء – قطعة 2 – شارع 218 – منزل 498", phones: ["25242460"], email: "Alghadalmushriq112@gmail.com", notes: "جميع الإعاقات" },
  { id: "n14", category: "nurseries", name: "حضانة مايلستون للاحتياجات الخاصة", governorate: "حولي", address: "الصديق – قطعة 5 – قسيمة 502 – مبنى 283/282", phones: ["69006591"], email: "info@milestone-kw.com", notes: "جميع الإعاقات" },
  { id: "n15", category: "nurseries", name: "الحضانة الملكية البريطانية", governorate: "حولي", address: "الصديق – قطعة 4 – شارع 401 – فيلا 233/234", phones: ["98009696", "25239696"], email: "hello@rb.edu.kw", notes: "جميع الإعاقات" },
  { id: "n16", category: "nurseries", name: "حضانة مهارات للاحتياجات الخاصة", governorate: "حولي", address: "الزهراء – قطعة 8 – شارع 806 – فيلا 220", phones: ["99680656", "25244894", "60901962"], email: "Maharatnursery@yahoo.com", notes: "جميع الإعاقات" },
  { id: "n17", category: "nurseries", name: "حضانة بيت الأطفال للاحتياجات الخاصة", governorate: "حولي", address: "الجابرية – قطعة 8 – شارع 101 منزل 5 – بجوار مستشفى هادي", phones: ["25350358", "25350359", "97223077"], email: "Info@specialneedsnurserykw.com", notes: "جميع الإعاقات" },
  { id: "n18", category: "nurseries", name: "حضانة المها", governorate: "مبارك الكبير", address: "فنيطيس – ق 4 – شارع 407 – منزل 354-355", phones: ["50999405", "66569293"], notes: "جميع الإعاقات" },
  { id: "n19", category: "nurseries", name: "حضانة جاك آند جل", governorate: "مبارك الكبير", address: "أبوفطيرة – قطعة 3 – شارع 225 – قسيمة 239", phones: ["97712272", "69018209"], notes: "جميع الإعاقات" },
  { id: "n20", category: "nurseries", name: "حضانة بست دريم لذوي الاحتياجات الخاصة", governorate: "مبارك الكبير", address: "أبوفطيرة – ق 6 – شارع 179 – قسيمة 155", phones: ["99220249", "55704473"], notes: "جميع الإعاقات" },
  { id: "n21", category: "nurseries", name: "حضانة الأمل", governorate: "مبارك الكبير", address: "الفنيطيس – قطعة 3 – شارع 306 – فيلا 233", phones: ["99107631", "99108345"], email: "hopeNursery@hopekw.com", notes: "جميع الإعاقات" },
  { id: "n22", category: "nurseries", name: "حضانة المها 2 للاحتياجات الخاصة", governorate: "مبارك الكبير", address: "فنيطيس – ق 8 – شارع 815 – قسيمة 114", phones: ["60484449"], email: "almaha2nursery@gmail.com", notes: "جميع الإعاقات" },
  { id: "n23", category: "nurseries", name: "حضانة مركز إنسان", governorate: "الأحمدي", address: "الفنطاس الزراعية – قطعة 4 – شارع 2 – منزل 291", phones: ["23908080", "52226632", "99721356"], notes: "جميع الإعاقات" },
  { id: "n24", category: "nurseries", name: "حضانة غالي للاحتياجات الخاصة", governorate: "الأحمدي", address: "المنقف – قطعة 1 – شارع 121 – فيلا 5", phones: ["23746758", "23741289", "99942901"], notes: "جميع الإعاقات" },
  { id: "n25", category: "nurseries", name: "حضانة إنرجي إفكت كيدز", governorate: "الأحمدي", address: "صباح الأحمد – شارع 127 – قسيمة 134 – قطاع E1", phones: ["55992218", "50031300"], email: "eekkuwaitsn@gmail.com", notes: "جميع الإعاقات" },
  { id: "n26", category: "nurseries", name: "حضانة ينمو النموذجية", governorate: "الأحمدي", address: "العقيلة – قطعة 4 – شارع 420 – مبنى 131", phones: ["41111577", "41111588"], notes: "جميع الإعاقات" },
  { id: "n27", category: "nurseries", name: "حضانة بريق الأمل", governorate: "الأحمدي", address: "صباح الأحمد – قطعة C4 – شارع 430 – منزل 349", phones: ["55719956", "55719569"], email: "bareqalamal2022@gmail.com", notes: "جميع الإعاقات" },
  { id: "n28", category: "nurseries", name: "حضانة كويت دريم سنتر", governorate: "العاصمة", address: "الخالدية – قطعة 4", phones: ["24827123", "55290612"], email: "thekuwaitdreamcenter@gmail.com", notes: "جميع الإعاقات – فاكس 24828123" },
  { id: "n29", category: "nurseries", name: "حضانة الندى للاحتياجات الخاصة", governorate: "العاصمة", address: "المنصورية – قطعة 1 – جادة 10 – منزل 29 – خلف حديقة المنصورية", phones: ["50311309", "22547016"], email: "Samiramorgan2023@gmail.com", notes: "جميع الإعاقات" },
  { id: "n30", category: "nurseries", name: "حضانة بيت ناصر 2", governorate: "العاصمة", address: "جابر الأحمد – ق 5 – شارع 528 – فيلا 24 – مقابل مدرسة تميم الداري", phones: ["62220012", "60050735", "55916205", "22259590"], email: "info@bnkuw.com", notes: "جميع الإعاقات" },
  { id: "n31", category: "nurseries", name: "حضانة البستان لضعاف السمع والنطق", governorate: "العاصمة", address: "الخالدية – قطعة 1 – شارع 28 – قسيمة 2", phones: ["24822086"], email: "info@kwtwcss.org", notes: "ضعف سمع (مستخدمي السماعة) – تأخر لغوي – زراعة قوقعة" },
];
