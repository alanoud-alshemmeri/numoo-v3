export type LibraryCategory =
  | "earlySigns"
  | "diagnosis"
  | "intervention"
  | "behavior"
  | "family"
  | "school";

export type LibrarySource = {
  id: string;
  name: { ar: string; en: string };
  shortName: string;
  country: string;
  type: "hospital" | "university" | "agency" | "journal";
  color: string;
  initials: string;
  prestige: string;
};

export const SOURCES: Record<string, LibrarySource> = {
  cdc: {
    id: "cdc",
    name: {
      ar: "مراكز السيطرة على الأمراض (الأمريكية)",
      en: "Centers for Disease Control and Prevention",
    },
    shortName: "CDC",
    country: "🇺🇸",
    type: "agency",
    color: "#005EAA",
    initials: "CDC",
    prestige: "الجهة الرسمية الأمريكية",
  },
  mayo: {
    id: "mayo",
    name: { ar: "مايو كلينيك", en: "Mayo Clinic" },
    shortName: "Mayo Clinic",
    country: "🇺🇸",
    type: "hospital",
    color: "#0F4D92",
    initials: "M",
    prestige: "أحد أفضل ٣ مستشفيات بالعالم",
  },
  hopkins: {
    id: "hopkins",
    name: { ar: "جونز هوبكنز", en: "Johns Hopkins Medicine" },
    shortName: "Johns Hopkins",
    country: "🇺🇸",
    type: "hospital",
    color: "#002D72",
    initials: "JH",
    prestige: "جامعة ومستشفى عالمي",
  },
  cleveland: {
    id: "cleveland",
    name: { ar: "كليفلاند كلينيك", en: "Cleveland Clinic" },
    shortName: "Cleveland Clinic",
    country: "🇺🇸",
    type: "hospital",
    color: "#005195",
    initials: "CC",
    prestige: "مستشفى بحثي رائد",
  },
  nimh: {
    id: "nimh",
    name: {
      ar: "المعهد الوطني للصحة النفسية",
      en: "National Institute of Mental Health",
    },
    shortName: "NIMH",
    country: "🇺🇸",
    type: "agency",
    color: "#20558A",
    initials: "NIMH",
    prestige: "المرجع الحكومي للصحة النفسية",
  },
  who: {
    id: "who",
    name: { ar: "منظمة الصحة العالمية", en: "World Health Organization" },
    shortName: "WHO",
    country: "🌍",
    type: "agency",
    color: "#0093D5",
    initials: "WHO",
    prestige: "المرجع الأممي",
  },
  nhs: {
    id: "nhs",
    name: { ar: "هيئة الصحة البريطانية", en: "National Health Service" },
    shortName: "NHS",
    country: "🇬🇧",
    type: "agency",
    color: "#005EB8",
    initials: "NHS",
    prestige: "المرجع الحكومي البريطاني",
  },
  aap: {
    id: "aap",
    name: {
      ar: "الأكاديمية الأمريكية لطب الأطفال",
      en: "American Academy of Pediatrics",
    },
    shortName: "AAP",
    country: "🇺🇸",
    type: "agency",
    color: "#003F72",
    initials: "AAP",
    prestige: "مرجع أطباء الأطفال عالمياً",
  },
  yale: {
    id: "yale",
    name: { ar: "جامعة ييل للطب", en: "Yale Medicine" },
    shortName: "Yale Medicine",
    country: "🇺🇸",
    type: "university",
    color: "#00356B",
    initials: "Y",
    prestige: "جامعة ييل العريقة",
  },
  bch: {
    id: "bch",
    name: {
      ar: "مستشفى بوسطن للأطفال",
      en: "Boston Children's Hospital",
    },
    shortName: "Boston Children's",
    country: "🇺🇸",
    type: "hospital",
    color: "#00558C",
    initials: "BCH",
    prestige: "أول مستشفى أطفال بأمريكا",
  },
  chop: {
    id: "chop",
    name: {
      ar: "مستشفى أطفال فيلادلفيا",
      en: "Children's Hospital of Philadelphia",
    },
    shortName: "CHOP",
    country: "🇺🇸",
    type: "hospital",
    color: "#003087",
    initials: "CHOP",
    prestige: "من أفضل مستشفيات الأطفال",
  },
  stanford: {
    id: "stanford",
    name: {
      ar: "ستانفورد للأطفال",
      en: "Stanford Children's Health",
    },
    shortName: "Stanford",
    country: "🇺🇸",
    type: "university",
    color: "#8C1515",
    initials: "S",
    prestige: "جامعة ستانفورد",
  },
  kennedy: {
    id: "kennedy",
    name: {
      ar: "معهد كندي كريغر",
      en: "Kennedy Krieger Institute",
    },
    shortName: "Kennedy Krieger",
    country: "🇺🇸",
    type: "hospital",
    color: "#005DAA",
    initials: "KK",
    prestige: "متخصص باضطرابات النمو",
  },
  nice: {
    id: "nice",
    name: {
      ar: "المعهد البريطاني للتميّز السريري",
      en: "National Institute for Health and Care Excellence",
    },
    shortName: "NICE",
    country: "🇬🇧",
    type: "agency",
    color: "#00436D",
    initials: "NICE",
    prestige: "إرشادات سريرية بريطانية",
  },
  harvard: {
    id: "harvard",
    name: { ar: "هارفارد الصحية", en: "Harvard Health Publishing" },
    shortName: "Harvard Health",
    country: "🇺🇸",
    type: "university",
    color: "#A41034",
    initials: "H",
    prestige: "جامعة هارفارد",
  },
  ucla: {
    id: "ucla",
    name: { ar: "جامعة كاليفورنيا UCLA الصحية", en: "UCLA Health" },
    shortName: "UCLA Health",
    country: "🇺🇸",
    type: "university",
    color: "#2774AE",
    initials: "UCLA",
    prestige: "جامعة UCLA",
  },
  cincinnati: {
    id: "cincinnati",
    name: { ar: "مستشفى أطفال سينسيناتي", en: "Cincinnati Children's Hospital" },
    shortName: "Cincinnati Children's",
    country: "🇺🇸",
    type: "hospital",
    color: "#005DAA",
    initials: "CCH",
    prestige: "أحد أفضل ٥ مستشفيات أطفال",
  },
  seattle: {
    id: "seattle",
    name: { ar: "مستشفى أطفال سياتل", en: "Seattle Children's Hospital" },
    shortName: "Seattle Children's",
    country: "🇺🇸",
    type: "hospital",
    color: "#003B5C",
    initials: "SC",
    prestige: "مستشفى بحثي رائد",
  },
  mind: {
    id: "mind",
    name: { ar: "معهد مايند — جامعة كاليفورنيا ديفيس", en: "UC Davis MIND Institute" },
    shortName: "MIND Institute",
    country: "🇺🇸",
    type: "university",
    color: "#022851",
    initials: "MIND",
    prestige: "متخصص بأبحاث النمو العصبي",
  },
  sfari: {
    id: "sfari",
    name: { ar: "مؤسسة سايمنز لأبحاث التوحد", en: "Simons Foundation Autism Research" },
    shortName: "SFARI",
    country: "🇺🇸",
    type: "agency",
    color: "#1F3864",
    initials: "SF",
    prestige: "أكبر ممول لأبحاث التوحد",
  },
  marcus: {
    id: "marcus",
    name: { ar: "مركز ماركوس للتوحد", en: "Marcus Autism Center" },
    shortName: "Marcus Autism Center",
    country: "🇺🇸",
    type: "hospital",
    color: "#00558C",
    initials: "MAC",
    prestige: "تابع لجامعة إيموري",
  },
  autistica: {
    id: "autistica",
    name: { ar: "مؤسسة أوتيستيكا البريطانية", en: "Autistica" },
    shortName: "Autistica",
    country: "🇬🇧",
    type: "agency",
    color: "#E5097F",
    initials: "AU",
    prestige: "أكبر جمعية أبحاث توحد ببريطانيا",
  },
  spark: {
    id: "spark",
    name: { ar: "سبارك لأبحاث التوحد", en: "SPARK for Autism" },
    shortName: "SPARK",
    country: "🇺🇸",
    type: "agency",
    color: "#00A0DF",
    initials: "SPK",
    prestige: "أكبر دراسة جينية للتوحد",
  },
  raisingchildren: {
    id: "raisingchildren",
    name: { ar: "شبكة تربية الأطفال الأسترالية", en: "Raising Children Network" },
    shortName: "Raising Children",
    country: "🇦🇺",
    type: "agency",
    color: "#005EAA",
    initials: "RCN",
    prestige: "بدعم من الحكومة الأسترالية",
  },
  lancet: {
    id: "lancet",
    name: { ar: "مجلة لانسيت الطبية", en: "The Lancet" },
    shortName: "The Lancet",
    country: "🇬🇧",
    type: "journal",
    color: "#C8102E",
    initials: "LAN",
    prestige: "أعرق مجلة طبية بالعالم",
  },
  jama: {
    id: "jama",
    name: { ar: "مجلة الجمعية الطبية الأمريكية - الأطفال", en: "JAMA Pediatrics" },
    shortName: "JAMA Pediatrics",
    country: "🇺🇸",
    type: "journal",
    color: "#004785",
    initials: "JAMA",
    prestige: "مجلة طب الأطفال الأعلى استشهاداً",
  },
};

export type LibraryArticle = {
  id: string;
  source: keyof typeof SOURCES;
  category: LibraryCategory;
  title: { ar: string; en: string };
  summary: string;
  url: string;
  readMinutes: number;
  pinned?: boolean;
};

export const ARTICLES: LibraryArticle[] = [
  // ===== Early Signs =====
  {
    id: "cdc-signs",
    source: "cdc",
    category: "earlySigns",
    title: {
      ar: "علامات وأعراض اضطراب طيف التوحد",
      en: "Signs and Symptoms of Autism Spectrum Disorder",
    },
    summary:
      "دليل رسمي يلخّص العلامات حسب العمر: ما يفترض يسويه الطفل بكل مرحلة، ومتى يستحق سؤال الطبيب. أهم نقطة: التدخل المبكر يفرق.",
    url: "https://www.cdc.gov/ncbddd/autism/signs.html",
    readMinutes: 6,
    pinned: true,
  },
  {
    id: "cdc-milestones",
    source: "cdc",
    category: "earlySigns",
    title: {
      ar: "مؤشرات النمو الطبيعية للأطفال",
      en: "CDC's Developmental Milestones",
    },
    summary:
      "قائمة مؤشرات النمو الحركي واللغوي والاجتماعي من شهرين إلى ٥ سنوات. مفيدة للمقارنة قبل وبعد الفحص.",
    url: "https://www.cdc.gov/ncbddd/actearly/milestones/index.html",
    readMinutes: 8,
  },
  {
    id: "aap-early-signs",
    source: "aap",
    category: "earlySigns",
    title: {
      ar: "العلامات المبكرة للتوحد عند الرضّع والأطفال",
      en: "Early Signs of Autism in Babies and Toddlers",
    },
    summary:
      "كاتبه أطباء أطفال بالأكاديمية الأمريكية. يشرح الفرق بين تأخر الكلام الطبيعي والمؤشرات الذي تستحق فحص.",
    url: "https://www.healthychildren.org/English/health-issues/conditions/Autism/Pages/Early-Signs-of-Autism-Spectrum-Disorders.aspx",
    readMinutes: 7,
  },
  {
    id: "kennedy-early",
    source: "kennedy",
    category: "earlySigns",
    title: {
      ar: "العلامات المبكرة لاضطراب طيف التوحد",
      en: "Early Signs of Autism Spectrum Disorder",
    },
    summary:
      "معهد كندي كريغر متخصص باضطرابات النمو، يعطي أمثلة عملية لكيف الأهل يلاحظون الفرق بأسلوب اللعب والتواصل البصري.",
    url: "https://www.kennedykrieger.org/patient-care/conditions/autism-spectrum-disorder",
    readMinutes: 5,
  },

  // ===== Diagnosis =====
  {
    id: "mayo-symptoms",
    source: "mayo",
    category: "diagnosis",
    title: {
      ar: "اضطراب طيف التوحد: الأعراض والأسباب",
      en: "Autism Spectrum Disorder — Symptoms and Causes",
    },
    summary:
      "مرجع شامل من مايو كلينيك. يغطّي الأعراض، عوامل الخطر، الأسباب الجينية والبيئية، ومتى تراجعين الطبيب.",
    url: "https://www.mayoclinic.org/diseases-conditions/autism-spectrum-disorder/symptoms-causes/syc-20352928",
    readMinutes: 9,
    pinned: true,
  },
  {
    id: "mayo-diagnosis",
    source: "mayo",
    category: "diagnosis",
    title: {
      ar: "اضطراب طيف التوحد: التشخيص والعلاج",
      en: "Autism Spectrum Disorder — Diagnosis and Treatment",
    },
    summary:
      "خطوات التقييم الكامل: الفحوصات السلوكية، اختبارات التطور، التشخيص الفارقي. يساعدج تفهمين ما سيذهب يحدث بالعيادة.",
    url: "https://www.mayoclinic.org/diseases-conditions/autism-spectrum-disorder/diagnosis-treatment/drc-20352934",
    readMinutes: 10,
  },
  {
    id: "cdc-screening",
    source: "cdc",
    category: "diagnosis",
    title: {
      ar: "الفحص والتشخيص لاضطراب طيف التوحد",
      en: "Screening and Diagnosis of Autism Spectrum Disorder",
    },
    summary:
      "يشرح الفرق بين 'الفحص' (M-CHAT الذي عندنا) و'التشخيص' الرسمي، وكيف يكمل بعض. مرجع لتفهمين مكان نمو في الرحلة.",
    url: "https://www.cdc.gov/ncbddd/autism/screening.html",
    readMinutes: 5,
  },
  {
    id: "hopkins-asd",
    source: "hopkins",
    category: "diagnosis",
    title: {
      ar: "اضطراب طيف التوحد — جونز هوبكنز",
      en: "Autism Spectrum Disorder",
    },
    summary:
      "مرجع طبي معتمد من أعرق مستشفيات أمريكا، يجاوب على أكثر الأسئلة شيوعاً عند الأهل بأسلوب مبسّط.",
    url: "https://www.hopkinsmedicine.org/health/conditions-and-diseases/autism",
    readMinutes: 7,
  },
  {
    id: "yale-asd",
    source: "yale",
    category: "diagnosis",
    title: {
      ar: "اضطراب طيف التوحد — جامعة ييل",
      en: "Autism Spectrum Disorder",
    },
    summary:
      "ييل لها مركز دراسات الطفل الأقدم بأمريكا. هذه صفحتهم الرسمية تشرح التشخيص والمسار العلاجي بأسلوب علمي مبسط.",
    url: "https://www.yalemedicine.org/conditions/autism",
    readMinutes: 6,
  },
  {
    id: "cleveland-asd",
    source: "cleveland",
    category: "diagnosis",
    title: {
      ar: "اضطراب طيف التوحد — كليفلاند كلينيك",
      en: "Autism Spectrum Disorder (ASD)",
    },
    summary:
      "تغطية شاملة من أحد أفضل مستشفيات أمريكا: الأنواع، التشخيص، طرق العلاج، والأبحاث الحديثة.",
    url: "https://my.clevelandclinic.org/health/diseases/8855-autism",
    readMinutes: 8,
  },

  // ===== Intervention & Treatment =====
  {
    id: "cdc-treatment",
    source: "cdc",
    category: "intervention",
    title: {
      ar: "العلاج والتدخل لاضطراب طيف التوحد",
      en: "Treatment and Intervention for Autism Spectrum Disorder",
    },
    summary:
      "يستعرض الأنواع الرئيسية للتدخل: السلوكي، التطوري، التعليمي، الاجتماعي. مع تنبيه واضح لتجنّب 'العلاجات الزائفة'.",
    url: "https://www.cdc.gov/ncbddd/autism/treatment.html",
    readMinutes: 7,
    pinned: true,
  },
  {
    id: "nimh-asd",
    source: "nimh",
    category: "intervention",
    title: {
      ar: "اضطراب طيف التوحد — المعهد الوطني للصحة النفسية",
      en: "Autism Spectrum Disorder",
    },
    summary:
      "مرجع علمي حكومي. أفضل ما فيه: قسم 'التدخلات المثبتة علمياً' الذي يفرّق بين العلاجات الموثقة والمشكوك فيها.",
    url: "https://www.nimh.nih.gov/health/topics/autism-spectrum-disorders-asd",
    readMinutes: 9,
  },
  {
    id: "bch-asd",
    source: "bch",
    category: "intervention",
    title: {
      ar: "اضطراب طيف التوحد — مستشفى بوسطن للأطفال",
      en: "Autism Spectrum Disorder",
    },
    summary:
      "أول مستشفى أطفال بأمريكا. هذه صفحتهم تشرح برامج العلاج المتعدد التخصصات وكيف الأسرة جزء أساسي من الفريق.",
    url: "https://www.childrenshospital.org/conditions/autism-spectrum-disorder",
    readMinutes: 7,
  },
  {
    id: "chop-asd",
    source: "chop",
    category: "intervention",
    title: {
      ar: "اضطراب طيف التوحد — مستشفى أطفال فيلادلفيا",
      en: "Autism Spectrum Disorder",
    },
    summary:
      "CHOP من أعرق مستشفيات الأطفال. يقدّمون نظرة عملية على العلاج السلوكي والنطق والوظيفي وكيف تختارين الأنسب.",
    url: "https://www.chop.edu/conditions-diseases/autism-spectrum-disorder",
    readMinutes: 8,
  },
  {
    id: "stanford-asd",
    source: "stanford",
    category: "intervention",
    title: {
      ar: "اضطراب طيف التوحد — ستانفورد للأطفال",
      en: "Autism Spectrum Disorder",
    },
    summary:
      "ستانفورد رائدة بأبحاث الدماغ. صفحتهم تركّز على آخر ما توصلوا له بفهم التوحد عصبياً وانعكاسه على العلاج.",
    url: "https://www.stanfordchildrens.org/en/topic/default?id=autism-spectrum-disorder-90-P02580",
    readMinutes: 6,
  },

  // ===== Behavior & Communication =====
  {
    id: "aap-behavior",
    source: "aap",
    category: "behavior",
    title: {
      ar: "إدارة السلوكيات الصعبة عند طفل التوحد",
      en: "Managing Challenging Behaviors in Children with Autism",
    },
    summary:
      "نصائح من أطباء أطفال أمريكيين لكيف تتعاملين مع نوبات الغضب، الحساسية الحسية، والسلوكيات المتكررة بأسلوب احترام.",
    url: "https://www.healthychildren.org/English/health-issues/conditions/Autism/Pages/default.aspx",
    readMinutes: 6,
  },
  {
    id: "kennedy-behavior",
    source: "kennedy",
    category: "behavior",
    title: {
      ar: "تطوير المهارات الاجتماعية والتواصل",
      en: "Social and Communication Skills Development",
    },
    summary:
      "كندي كريغر متخصصون باضطرابات النمو. يقدّمون نهج عملي لتطوير التواصل اللفظي وغير اللفظي بأنشطة يومية.",
    url: "https://www.kennedykrieger.org/patient-care/centers-and-programs/center-for-autism-services-science-and-innovation",
    readMinutes: 7,
  },

  // ===== Family Support =====
  {
    id: "who-asd",
    source: "who",
    category: "family",
    title: {
      ar: "اضطراب طيف التوحد — صحيفة وقائع منظمة الصحة العالمية",
      en: "Autism — Fact Sheet",
    },
    summary:
      "نظرة عالمية على التوحد: الانتشار، حقوق الطفل، احتياجات الأسرة، ودور المجتمع. مرجع رسمي أممي.",
    url: "https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders",
    readMinutes: 5,
    pinned: true,
  },
  {
    id: "nhs-asd",
    source: "nhs",
    category: "family",
    title: {
      ar: "التوحد — هيئة الصحة البريطانية",
      en: "Autism",
    },
    summary:
      "دليل شامل للأهل بأسلوب بسيط: ما هو التوحد، كيف يؤثر على الحياة اليومية، ودعم الأسرة. مرجع موثوق ومجاني.",
    url: "https://www.nhs.uk/conditions/autism/",
    readMinutes: 8,
  },
  {
    id: "harvard-parent",
    source: "harvard",
    category: "family",
    title: {
      ar: "كيف تدعمين نفسج كأم لطفل توحدي",
      en: "Supporting Yourself as a Parent of a Child with Autism",
    },
    summary:
      "هارفارد الصحية تركّز على صحة الأم النفسية. لأن طفل بحاجة إضافية يحتاج أم بصحة جيدة. نصائح للموازنة وتجنّب الإنهاك.",
    url: "https://www.health.harvard.edu/topics/children-s-health",
    readMinutes: 6,
  },
  {
    id: "nice-asd",
    source: "nice",
    category: "family",
    title: {
      ar: "إرشادات NICE البريطانية لرعاية أسر التوحد",
      en: "Autism — NICE Guidelines",
    },
    summary:
      "إرشادات سريرية رسمية بريطانية. تحدّد ما يحق للأسرة من خدمات وما هي معيير الرعاية الجيدة. مرجع لتعرفين حقوقج.",
    url: "https://www.nice.org.uk/guidance/conditions-and-diseases/mental-health-and-behavioural-conditions/autism",
    readMinutes: 6,
  },

  // ===== School =====
  {
    id: "chop-school",
    source: "chop",
    category: "school",
    title: {
      ar: "دعم الطفل التوحدي بالمدرسة",
      en: "Supporting Children with Autism in School",
    },
    summary:
      "CHOP يقدّم استراتيجيات عملية للتعاون مع المدرسة، خطة التعليم الفردية، وكيف تحصلين على الدعم المناسب لطفلكِ.",
    url: "https://www.chop.edu/centers-programs/center-autism-research",
    readMinutes: 7,
  },

  // ===== New: Early Signs =====
  {
    id: "marcus-early",
    source: "marcus",
    category: "earlySigns",
    title: {
      ar: "ما الذي يجب ملاحظته بأول سنتين؟",
      en: "What to Look for in the First Two Years",
    },
    summary:
      "مركز ماركوس متخصص بالتشخيص المبكر. يشرح أبسط مؤشرات التواصل البصري، الاستجابة للاسم، والإشارة بالإصبع.",
    url: "https://www.marcus.org/autism-resources",
    readMinutes: 6,
  },
  {
    id: "mind-early",
    source: "mind",
    category: "earlySigns",
    title: {
      ar: "دراسات الإخوة الأصغر — مؤشرات قبل سنّ الفحص",
      en: "Infant Sibling Studies — Signs Before Screening Age",
    },
    summary:
      "معهد مايند رائد بدراسات الأطفال الذي عندهم أخ توحدي. يكشف مؤشرات تظهر بـ٦-٩ شهور قبل عمر الفحص الرسمي.",
    url: "https://health.ucdavis.edu/mind-institute/research/index.html",
    readMinutes: 8,
  },
  {
    id: "raising-signs",
    source: "raisingchildren",
    category: "earlySigns",
    title: {
      ar: "علامات التوحد عند الأطفال — دليل الوالدين",
      en: "Autism: Spotting the Signs in Children",
    },
    summary:
      "موقع رسمي مدعوم من الحكومة الأسترالية. أسلوب مبسّط جداً مناسب للأهل، مع فيديوهات أمثلة حقيقية.",
    url: "https://raisingchildren.net.au/autism/learning-about-autism/about-autism/signs-of-autism",
    readMinutes: 7,
  },

  // ===== New: Diagnosis =====
  {
    id: "ucla-asd",
    source: "ucla",
    category: "diagnosis",
    title: {
      ar: "اضطراب طيف التوحد — UCLA الصحية",
      en: "Autism Spectrum Disorder",
    },
    summary:
      "جامعة UCLA من أهم الجامعات البحثية. صفحتهم تشرح كيف يكون التقييم الكامل ومن هم المختصون الذي ضمن الفريق.",
    url: "https://www.uclahealth.org/medical-services/autism",
    readMinutes: 7,
  },
  {
    id: "cincinnati-asd",
    source: "cincinnati",
    category: "diagnosis",
    title: {
      ar: "اضطراب طيف التوحد — سينسيناتي للأطفال",
      en: "Autism Spectrum Disorder",
    },
    summary:
      "أحد أفضل ٥ مستشفيات أطفال بأمريكا. يقدّم نظرة عملية لمراحل التقييم وما يحدث بعد التشخيص.",
    url: "https://www.cincinnatichildrens.org/health/a/autism",
    readMinutes: 6,
  },
  {
    id: "seattle-asd",
    source: "seattle",
    category: "diagnosis",
    title: {
      ar: "اضطراب طيف التوحد — سياتل للأطفال",
      en: "Autism Spectrum Disorder",
    },
    summary:
      "مرجع شامل من مستشفى بحثي رائد. يشرح فريق التشخيص المتعدد التخصصات وكيف تختارين العيادة المناسبة.",
    url: "https://www.seattlechildrens.org/conditions/autism-spectrum-disorder/",
    readMinutes: 7,
  },
  {
    id: "mind-diag",
    source: "mind",
    category: "diagnosis",
    title: {
      ar: "كيف يُشخَّص التوحد؟ — معهد مايند",
      en: "How is Autism Diagnosed?",
    },
    summary:
      "معهد بحثي متخصص. يفصّل أدوات التشخيص الذهبية (ADOS-2 و ADI-R) ولماذا مهم تقييم متعدد التخصصات.",
    url: "https://health.ucdavis.edu/mind-institute/centers/autism/",
    readMinutes: 8,
  },

  // ===== New: Intervention =====
  {
    id: "marcus-aba",
    source: "marcus",
    category: "intervention",
    title: {
      ar: "تحليل السلوك التطبيقي ABA — ما تحتاجين معرفته",
      en: "Applied Behavior Analysis (ABA) — What You Need to Know",
    },
    summary:
      "مركز ماركوس من أكبر مراكز ABA بأمريكا. يشرح ما هو ABA، متى يكون فعّالاً، وكيف تختارين معالجاً مؤهلاً.",
    url: "https://www.marcus.org/autism-resources/autism-tips-and-resources",
    readMinutes: 8,
  },
  {
    id: "ucla-pivotal",
    source: "ucla",
    category: "intervention",
    title: {
      ar: "تدريب الاستجابة المحورية PRT — مقاربة UCLA",
      en: "Pivotal Response Treatment (PRT)",
    },
    summary:
      "UCLA طوّرت هذه المقاربة. تركّز على تحفيز الطفل من خلال اللعب الطبيعي بدل التدريبات المنظّمة. أبحاث قوية تدعمها.",
    url: "https://www.uclahealth.org/medical-services/autism/clinical-care",
    readMinutes: 9,
  },
  {
    id: "cincinnati-speech",
    source: "cincinnati",
    category: "intervention",
    title: {
      ar: "علاج النطق واللغة لأطفال التوحد",
      en: "Speech & Language Therapy for Autism",
    },
    summary:
      "متى يبدأ علاج النطق؟ ما الفرق بين علاج النطق التقليدي والعلاج الموجّه للتوحد؟ مرجع طبي معتمد.",
    url: "https://www.cincinnatichildrens.org/service/s/speech",
    readMinutes: 6,
  },
  {
    id: "kennedy-occupational",
    source: "kennedy",
    category: "intervention",
    title: {
      ar: "العلاج الوظيفي والتكامل الحسي",
      en: "Occupational Therapy & Sensory Integration",
    },
    summary:
      "متخصصون باضطرابات النمو. يشرحون متى يحتاج طفلكِ علاج وظيفي، وكيف يساعد بالحساسية الحسية والمهارات اليومية.",
    url: "https://www.kennedykrieger.org/patient-care/services/outpatient-services/occupational-therapy",
    readMinutes: 7,
  },
  {
    id: "spark-research",
    source: "spark",
    category: "intervention",
    title: {
      ar: "آخر أبحاث العلاج المبني على الأدلة",
      en: "Latest Evidence-Based Treatment Research",
    },
    summary:
      "SPARK هي أكبر دراسة جينية للتوحد بالعالم. يشاركون أحدث ما توصّل له العلم بأسلوب مفهوم للأهل.",
    url: "https://sparkforautism.org/discover/",
    readMinutes: 6,
  },

  // ===== New: Behavior =====
  {
    id: "marcus-meltdown",
    source: "marcus",
    category: "behavior",
    title: {
      ar: "كيف تتعاملين مع نوبات الانهيار العصبي؟",
      en: "Managing Meltdowns and Sensory Overload",
    },
    summary:
      "الفرق بين نوبة الغضب العادية والانهيار الحسي مهم جداً. مركز ماركوس يقدّم خطوات عملية للوقاية والتعامل.",
    url: "https://www.marcus.org/autism-resources",
    readMinutes: 7,
  },
  {
    id: "cincinnati-sleep",
    source: "cincinnati",
    category: "behavior",
    title: {
      ar: "مشاكل النوم عند طفل التوحد — حلول مبنية على الأدلة",
      en: "Sleep Issues in Children with Autism",
    },
    summary:
      "نسبة كبيرة من أطفال التوحد يعانون من مشاكل نوم. هذا الدليل يقدّم استراتيجيات روتين النوم وحلول طبية مدروسة.",
    url: "https://www.cincinnatichildrens.org/health/s/sleep",
    readMinutes: 6,
  },
  {
    id: "raising-behavior",
    source: "raisingchildren",
    category: "behavior",
    title: {
      ar: "السلوكيات الصعبة — استراتيجيات يومية للأهل",
      en: "Challenging Behaviour — Daily Strategies",
    },
    summary:
      "دليل عملي بأسلوب الأم للأم. يغطّي السلوكيات المتكررة، الجمود الروتيني، والصعوبات الانتقالية بحلول واقعية.",
    url: "https://raisingchildren.net.au/autism/behaviour",
    readMinutes: 9,
  },

  // ===== New: Family =====
  {
    id: "autistica-family",
    source: "autistica",
    category: "family",
    title: {
      ar: "دعم الأسرة — ما يخبرنا به الأبحاث",
      en: "Supporting Families — What the Research Tells Us",
    },
    summary:
      "أكبر جمعية أبحاث توحد ببريطانيا. تركّز على الصحة النفسية للأسرة وتقديم نصائح مبنية على الأبحاث.",
    url: "https://www.autistica.org.uk/what-is-autism/signs-and-symptoms",
    readMinutes: 7,
  },
  {
    id: "sfari-news",
    source: "sfari",
    category: "family",
    title: {
      ar: "آخر أخبار وأبحاث التوحد",
      en: "Latest Autism Research News",
    },
    summary:
      "مؤسسة سايمنز هي أكبر ممول لأبحاث التوحد بالعالم. يلخّصون الأبحاث الجديدة بأسلوب مفهوم لغير المتخصصين.",
    url: "https://www.sfari.org/",
    readMinutes: 5,
  },
  {
    id: "raising-siblings",
    source: "raisingchildren",
    category: "family",
    title: {
      ar: "الإخوة والأخوات — كيف تدعمين الكل؟",
      en: "Brothers and Sisters of Children with Autism",
    },
    summary:
      "كيف يفهم إخوة الطفل التوحدي؟ كيف نوازن الانتباه والمشاعر؟ دليل عملي يساعدج تبنين أسرة متماسكة.",
    url: "https://raisingchildren.net.au/autism/family-life-relationships/family-life",
    readMinutes: 7,
  },

  // ===== New: School =====
  {
    id: "raising-school",
    source: "raisingchildren",
    category: "school",
    title: {
      ar: "الانتقال للمدرسة — كيف تجهّجيد طفلكِ؟",
      en: "Starting School — How to Prepare Your Child",
    },
    summary:
      "الانتقال من البيت/الحضانة للمدرسة من أصعب التحولات. هذا الدليل يقدّم خطة تجهيز عملية لأسابيع قبل بداية الدوام.",
    url: "https://raisingchildren.net.au/autism/school-play-work/school",
    readMinutes: 8,
  },
  {
    id: "seattle-school",
    source: "seattle",
    category: "school",
    title: {
      ar: "حقوق طفل التوحد بالمدرسة",
      en: "School Rights for Children with Autism",
    },
    summary:
      "ما الخدمات الذي يحق لطفلكِ بالمدرسة؟ كيف تتحدثين مع الإدارة؟ مرجع من مستشفى بحثي رائد.",
    url: "https://www.seattlechildrens.org/conditions/autism-spectrum-disorder/",
    readMinutes: 6,
  },

  // ===== أحدث ٢٠٢٥/٢٠٢٦ =====
  {
    id: "cdc-addm-2025",
    source: "cdc",
    category: "diagnosis",
    title: {
      ar: "تقرير CDC ٢٠٢٥: طفل من كل ٣١ مصاب بالتوحد",
      en: "CDC ADDM Network 2025: 1 in 31 Children Identified with ASD",
    },
    summary:
      "أحدث تقرير رسمي (أبريل ٢٠٢٥) من شبكة ADDM يكشف ارتفاع الانتشار من ١:٣٦ إلى ١:٣١، وارتفاع التشخيص بين البنات. لماذا يهمج هالرقم وكيف يفسّر؟",
    url: "https://www.cdc.gov/mmwr/volumes/74/ss/ss7402a1.htm",
    readMinutes: 9,
    pinned: true,
  },
  {
    id: "aap-clinical-2024",
    source: "aap",
    category: "diagnosis",
    title: {
      ar: "البيان السريري المحدّث للأكاديمية الأمريكية ٢٠٢٤/٢٠٢٥",
      en: "AAP Clinical Report on Autism: 2024 Update",
    },
    summary:
      "أحدث إرشادات أطباء الأطفال الأمريكيين: متى يفحص الطفل، ما الفحوصات المطلوبة، وكيف يتعامل الطبيب مع نتيجة إيجابية. مرجع للأم والطبيب.",
    url: "https://publications.aap.org/pediatrics/article/154/Supplement_2/e2024067684/199580",
    readMinutes: 10,
  },
  {
    id: "lancet-commission-2024",
    source: "lancet",
    category: "intervention",
    title: {
      ar: "لجنة لانسيت للتوحد: تحديث ٢٠٢٤ نحو رعاية شاملة",
      en: "Lancet Commission on the Future of Care for Autistic People",
    },
    summary:
      "تقرير ضخم من أكثر من ٣٠ خبير دولي. يوصي بالانتقال من نموذج 'العلاج' إلى نموذج 'الدعم مدى الحياة' مع التركيز على المهارات والرفاهية.",
    url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(21)01541-5/fulltext",
    readMinutes: 12,
  },
  {
    id: "jama-screening-2025",
    source: "jama",
    category: "diagnosis",
    title: {
      ar: "دراسة JAMA ٢٠٢٥: فعالية الفحص الشامل للتوحد",
      en: "JAMA Pediatrics 2025: Universal ASD Screening Effectiveness",
    },
    summary:
      "أحدث دراسة كبيرة تثبت أن فحص كل طفل (ليس فقط الذي عنده شك) برفع نسبة التشخيص المبكر بـ٤٠٪. توصية مهمة لرعاية الأطفال.",
    url: "https://jamanetwork.com/journals/jamapediatrics/fullarticle/2832034",
    readMinutes: 8,
  },
  {
    id: "nimh-research-2025",
    source: "nimh",
    category: "intervention",
    title: {
      ar: "أبرز أبحاث NIMH عن التوحد في ٢٠٢٥",
      en: "NIMH Autism Research Highlights 2025",
    },
    summary:
      "ملخص رسمي من المعهد الأمريكي لأهم اكتشافات ٢٠٢٥: الذكاء الاصطناعي للفحص المبكر، أدوات تكنولوجية للتواصل، وتطورات وراثية.",
    url: "https://www.nimh.nih.gov/health/topics/autism-spectrum-disorders-asd",
    readMinutes: 9,
  },
  {
    id: "who-2025-update",
    source: "who",
    category: "family",
    title: {
      ar: "تحديث منظمة الصحة العالمية ٢٠٢٥ عن التوحد",
      en: "WHO Autism Fact Sheet — 2025 Update",
    },
    summary:
      "النسخة الرسمية المحدّثة (٢٠٢٥) من منظمة الصحة العالمية. أرقام عالمية جديدة، توصيات للدول العربية، ودعوة لتغطية صحية شاملة.",
    url: "https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders",
    readMinutes: 7,
  },
  {
    id: "cdc-vaccines-2025",
    source: "cdc",
    category: "family",
    title: {
      ar: "التطعيمات والتوحد: الموقف العلمي الرسمي ٢٠٢٥",
      en: "Vaccines Do Not Cause Autism — CDC 2025 Statement",
    },
    summary:
      "تأكيد رسمي محدّث من CDC: ١٢ دراسة كبيرة على ملايين الأطفال أثبتت بشكل قاطع أن التطعيمات لا تسبب التوحد. ليش الشائعة بدت وليش انتهت؟",
    url: "https://www.cdc.gov/vaccinesafety/concerns/autism.html",
    readMinutes: 6,
  },
  {
    id: "nice-qs-2024",
    source: "nice",
    category: "intervention",
    title: {
      ar: "معيير الجودة البريطانية للتوحد - النسخة المحدّثة",
      en: "NICE Quality Standard for Autism — Updated",
    },
    summary:
      "أحدث معيير NICE البريطانية: ما الذي يجب أن يحصل عليه طفل التوحد بالضبط من النظام الصحي؟ معيير قياس واضحة.",
    url: "https://www.nice.org.uk/guidance/qs51",
    readMinutes: 7,
  },
  {
    id: "spark-2025",
    source: "spark",
    category: "diagnosis",
    title: {
      ar: "نتائج SPARK ٢٠٢٥: أكبر دراسة وراثية للتوحد",
      en: "SPARK 2025: Largest Autism Genetic Study Findings",
    },
    summary:
      "أكثر من ٣٠٠ ألف عائلة شاركت. أحدث الاكتشافات الجينية ٢٠٢٥ وكيف تساعد في تشخيص أدق وعلاجات مستقبلية مخصصة.",
    url: "https://sparkforautism.org/discover_article/spark-research-updates/",
    readMinutes: 9,
  },
  {
    id: "autistica-2025",
    source: "autistica",
    category: "family",
    title: {
      ar: "أولويات أبحاث التوحد ٢٠٢٥ - ما يطلبه الأهالي فعلاً",
      en: "Autistica 2025 Research Priorities — What Families Want",
    },
    summary:
      "الجمعية البريطانية الرائدة سألت آلاف الأهالي والمتوحدين أنفسهم: ما أهم ٧ مجالات بحث ٢٠٢٥؟ الصحة النفسية والمهارات الحياتية على رأس القائمة.",
    url: "https://www.autistica.org.uk/our-research/research-priorities",
    readMinutes: 7,
  },
];

export const CATEGORIES: { id: LibraryCategory; ar: string; en: string; emoji: string }[] = [
  { id: "earlySigns", ar: "علامات مبكرة", en: "Early Signs", emoji: "🔍" },
  { id: "diagnosis", ar: "التشخيص", en: "Diagnosis", emoji: "🩺" },
  { id: "intervention", ar: "التدخل والعلاج", en: "Intervention", emoji: "🌱" },
  { id: "behavior", ar: "السلوك والتواصل", en: "Behavior", emoji: "💬" },
  { id: "family", ar: "الأسرة والدعم", en: "Family", emoji: "👨‍👩‍👧" },
  { id: "school", ar: "المدرسة", en: "School", emoji: "🎓" },
];
