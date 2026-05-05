import { useLangStore } from "./lang-store";

export const translations = {
  // Common / Layout
  appTitle: { ar: "نمو", en: "Numoo" },
  appTagline: { ar: "من لحظة القلق الأولى إلى الخطوة الصحيحة التالية.", en: "From the first moment of worry to the right next step." },
  footerAbout: { ar: "عن نمو", en: "About Numoo" },
  footerContact: { ar: "تواصل مع الدعم", en: "Contact Support" },
  platform: { ar: "المنصة", en: "Platform" },
  privacy: { ar: "الخصوصية", en: "Privacy" },
  resources: { ar: "الموارد", en: "Resources" },
  sources: { ar: "المصادر", en: "Sources" },
  navCenters: { ar: "المراكز", en: "Centers" },
  navHome: { ar: "الرئيسية", en: "Home" },
  navScreening: { ar: "التقييم", en: "Screening" },
  navAsk: { ar: "اسأل نمو", en: "Ask Numoo" },
  resDisclaimer: { ar: "تنبيه طبي: نمو أداة للفحص التوعوي المبكر وليس تشخيصاً طبياً. التشخيص يتطلب فريقاً متخصصاً.", en: "Medical Disclaimer: Numoo is an early awareness screening tool, not a medical diagnosis. A formal diagnosis requires a specialized clinical team." },
  copyright: { ar: "© 2026 نمو. جميع الحقوق محفوظة.", en: "© 2026 Numoo. All rights reserved." },
  backTxt: { ar: "← رجوع", en: "→ Back" },

  // Splash
  splashDesc: { ar: "منصة كويتية لدعم أسر أطفال التوحد", en: "A Kuwaiti platform supporting families of autistic children" },
  earlyScreening: { ar: "فحص مبكر", en: "Early Screening" },
  mchat: { ar: "M-CHAT-R/F", en: "M-CHAT-R/F" },
  weeklyPlan: { ar: "خطة أسبوعية", en: "Weekly Plan" },
  atHome: { ar: "للبيت", en: "At Home" },
  centersGuide: { ar: "دليل مراكز", en: "Centers Guide" },
  inKuwait: { ar: "في الكويت", en: "In Kuwait" },
  splashBtn: { ar: "ابدأ الفحص", en: "Start Screening" },
  splashBtn2: { ar: "مراكز متخصصة", en: "Specialized Centers" },
  pgTime: { ar: "مدة التقييم: 3-5 دقائق | للأطفال من 16 شهراً حتى 17 سنة", en: "Duration: 3-5 minutes | For ages 16 months to 17 years" },

  // Privacy
  pgShortPrivacy: { ar: "خطوة خصوصية قصيرة قبل بدء الفحص", en: "A short privacy step before starting" },
  pgTitle: { ar: "قبل البدء — إقرار الخصوصية", en: "Before You Start — Privacy Notice" },
  pgDesc: { ar: "تطبيق نمو أداة فحص توعوية مستوحاة من معيير M-CHAT-R/F ولا يستبدل التقييم الطبي.", en: "Numoo is an awareness screening tool inspired by M-CHAT-R/F criteria and does not replace clinical evaluation." },
  pgList1: { ar: "المعلومات الأساسية تُعالَج محلياً على جهازك", en: "Core screening information is processed locally on your device" },
  pgList2: { ar: "تُخزَّن بيانات المتابعة محلياً على جهازك فقط ولا تُرسل إلى خوادم خارجية", en: "Progress data is stored locally on your device only" },
  pgList3: { ar: "التقرير الشخصي يعمل محلياً داخل النموذج", en: "Personalized report runs locally in this prototype" },
  pgList4: { ar: "النتائج توجيهية وليست تشخيصاً طبياً", en: "Results are indicative, not a medical diagnosis" },
  pgConsent: { ar: "أقر بأنني اطلعت على سياسة الخصوصية وأوافق على الشروط، وأفهم أن نمو أداة للفحص المبكر وليس تشخيصاً طبياً.", en: "I understand that Numoo is an early screening and guidance tool, not a medical diagnosis." },
  pgBtn: { ar: "ابدأ التقييم →", en: "Start Assessment →" },

  // Age
  ageH: { ar: "اختر الفئة العمرية", en: "Select Age Group" },
  ageP: { ar: "الأسئلة تختلف حسب العمر — كل مرحلة لها معييرها العلمية", en: "Questions vary by age — each stage has its scientific criteria" },
  toddlerLabel: { ar: "16 — 30 شهراً", en: "16 — 30 months" },
  toddlerSub: { ar: "مستوحى من M-CHAT-R/F", en: "Inspired by M-CHAT-R/F" },
  preschoolLabel: { ar: "3 — 5 سنوات", en: "3 — 5 years" },
  preschoolSub: { ar: "ما قبل المدرسة", en: "Preschool" },
  schoolLabel: { ar: "6 — 12 سنة", en: "6 — 12 years" },
  schoolSub: { ar: "السن المدرسية", en: "School age" },
  teenLabel: { ar: "13 — 17 سنة", en: "13 — 17 years" },
  teenSub: { ar: "مرحلة المراهقة", en: "Teenage" },
  ageWhyMatter: { ar: "لماذا يهم العمر؟", en: "Why does age matter?" },
  ageWhyMatterDesc: { ar: "كل مرحلة لها معيير علمية مخصصة. طفل 18 شهراً يُقيَّم بـ M-CHAT-R/F، مراهق بمقياس AQ.", en: "Each stage has tailored scientific criteria. An 18-month-old is evaluated with M-CHAT-R/F, a teenager with AQ scale." },

  // Screening
  screeningTitle: { ar: "التقييم", en: "Screening" },
  finishScreening: { ar: "إنهاء التقييم", en: "Finish Screening" },
  nextBtn: { ar: "التالي", en: "Next" },

  // Loading
  loadTxt: { ar: "يُحلّل نمو إجاباتك...", en: "Numoo is analyzing your answers..." },
  loadSub: { ar: "نمو يرتّب المؤشرات محلياً", en: "Arranging indicators locally" },
  loadStep1: { ar: "مقارنة بمعيير فحص مبكر منشورة", en: "Comparing to published early screening criteria" },
  loadStep2: { ar: "تقييم التواصل اللغوي والبصري", en: "Evaluating linguistic and visual communication" },
  loadStep3: { ar: "تحليل الأنماط السلوكية", en: "Analyzing behavioral patterns" },
  loadStep4: { ar: "إعداد تقرير نمو الشخصي", en: "Preparing personalized Numoo report" },

  // Results
  assessmentSummary: { ar: "ملخص التقييم", en: "Assessment Summary" },
  resLow: { ar: "منخفض", en: "Low" },
  resMedium: { ar: "متوسط", en: "Medium" },
  resHigh: { ar: "مرتفع", en: "High" },
  resLowDesc: { ar: "معظم المؤشرات ضمن النطاق الطبيعي للتطور.", en: "Most indicators are within typical developmental range." },
  resMediumDesc: { ar: "هناك بعض المؤشرات التي تستحق المتابعة أو الاستشارة.", en: "There are some indicators worth monitoring or consulting." },
  resHighDesc: { ar: "ينصح بشدة حجز موعد مع مختص لإجراء تقييم شامل.", en: "Strongly recommended to book an appointment with a specialist for a comprehensive evaluation." },
  resNextSteps: { ar: "الخطوات التالية", en: "Next Steps" },
  consultPediatrician: { ar: "استشارة طبيب نمو وتطور", en: "Consult a developmental pediatrician" },
  consultPediatricianDesc: { ar: "لمناقشة هذه المؤشرات تفصيلياً", en: "To discuss these indicators in detail" },
  communicationActivities: { ar: "أنشطة تعزيز التواصل", en: "Communication activities" },
  communicationActivitiesDesc: { ar: "تمارين بسيطة لدعم التطور العام", en: "Simple exercises to support overall development" },
  joinCommunity: { ar: "انضمام لمجتمع نمو", en: "Join Numoo Community" },
  joinCommunityDesc: { ar: "تجارب لأهالي مروا بنفس المرحلة", en: "Experiences of parents who went through the same phase" },
  chatWithAssistant: { ar: "تحدث مع مساعد نمو", en: "Chat with Numoo Assistant" },
  chatWithAssistantDesc: { ar: "لأي استفسارات سريعة حول النتيجة", en: "For quick questions about the result" },

  // Centers
  centersTitle: { ar: "مراكز ووجهات مقترحة في الكويت", en: "Recommended Centers in Kuwait" },
  centersDesc: { ar: "جهات رسمية ومتخصصة لدعم الأهل", en: "Official and specialized entities to support parents" },
  padaName: { ar: "الهيئة العامة لشؤون ذوي الإعاقة", en: "Public Authority for Disability Affairs" },
  padaDesc: { ar: "حولي، شارع بيروت — الجهة الحكومية الرئيسية لإصدار شهادات الإعاقة والحقوق القانونية.", en: "Hawally, Beirut St — Main government entity for disability certificates and legal rights." },
  contactBtn: { ar: "تواصل", en: "Contact" },
  centersWarning: { ar: "تأكّدي من مواعيد العمل قبل الزيارة. هذه المعلومات للتوجيه فقط.", en: "Verify working hours before visiting. This info is for guidance only." },
  filterAll: { ar: "الكل", en: "All" },
  filterAllGov: { ar: "كل المحافظات", en: "All governorates" },
  searchPlaceholder: { ar: "ابحث باسم الجهة أو المنطقة…", en: "Search by name or area…" },
  resultsCount: { ar: "نتيجة", en: "results" },
  noResults: { ar: "لم نجد نتائج. جرّبي فلتراً آخر أو بحثاً مختلفاً.", en: "No results. Try a different filter or search term." },
  callBtn: { ar: "اتصال", en: "Call" },
  emailBtn: { ar: "بريد", en: "Email" },
  websiteBtn: { ar: "موقع", en: "Website" },
  mapBtn: { ar: "خرائط", en: "Map" },
  favoritesFilter: { ar: "المفضّلة", en: "Favorites" },
  noFavorites: {
    ar: "لا توجد جهات محفوظة بعد. اضغطي على النجمة لإضافة الجهات التي تهمّكِ.",
    en: "No favorites yet. Tap the star on any entry to save it here.",
  },
  addFavorite: { ar: "حفظ في المفضّلة", en: "Save to favorites" },
  removeFavorite: { ar: "إزالة من المفضّلة", en: "Remove from favorites" },
  copyCode: { ar: "نسخ الكود", en: "Copy code" },
  copiedCode: { ar: "تم النسخ", en: "Copied" },
  shareWhatsapp: { ar: "إرسال واتساب", en: "Send via WhatsApp" },
  shareReportTitle: { ar: "حفظ ومشاركة التقرير", en: "Save & share report" },
  whatsappMessage: {
    ar: "تقرير نمو\nرمز التقرير: {code}\nالتاريخ: {date}\nالنتيجة: {risk}\n\nيمكن استرجاع التقرير من numoo.site",
    en: "Numoo report\nReport code: {code}\nDate: {date}\nResult: {risk}\n\nView the report at numoo.site",
  },
  notesLabel: { ar: "الحالات المستقبلة", en: "Cases accepted" },
  directorySource: { ar: "المصدر: قائمة الجهات الرسمية لذوي الاحتياجات الخاصة في الكويت — تحديث 2024", en: "Source: Official Kuwait list of special-needs entities — updated 2024" },
  center1Name: { ar: "مركز الكويت للتوحد", en: "Kuwait Autism Center" },
  center1Loc: { ar: "مشرف الغربي — منطقة مبارك العبدالله", en: "West Mishref — Mubarak Al-Abdullah Area" },
  center1Badge1: { ar: "حكومي", en: "Government" },
  center1Badge2: { ar: "أول مركز بالشرق الأوسط 1994", en: "1st in Middle East 1994" },
  center1Badge3: { ar: "معتمد دولياً", en: "Internationally Accredited" },
  center2Name: { ar: "جمعية الكويت للتوحد", en: "Kuwait Autism Society" },
  center2Loc: { ar: "مشرف الغربي", en: "West Mishref" },
  center2Badge1: { ar: "دعم الأهالي", en: "Parent Support" },
  center2Badge2: { ar: "إرشاد", en: "Counseling" },
  center2Badge3: { ar: "تطوعية", en: "Volunteer" },

  // Chatbot
  chatTitle: { ar: "اسأل نمو", en: "Ask Numoo" },
  chatDesc: { ar: "مساعد ذكي مدرب على مصادر علمية للإجابة على استفساراتك", en: "Smart assistant trained on scientific sources to answer your queries" },
  chatInputPlaceholder: { ar: "اكتب سؤالك هنا...", en: "Type your question here..." },
  chatPrivacyNotice: { ar: "تنبيه خصوصية: لا تقم بمشاركة معلومات طبية حساسة في هذه المحادثة.", en: "Privacy notice: Do not share sensitive medical information in this chat." },
  chatbotGreeting: { ar: "أهلاً بك، أنا المساعد الرقمي لنمو. كيف يمكنني مساعدتك اليوم بخصوص تطور طفلك؟", en: "Hello, I am Numoo digital assistant. How can I help you today regarding your child's development?" },
  chatbotResponse: { ar: "هذه إجابة تجريبية من مساعد نمو. في النسخة النهائية سيتم ربط هذا بقاعدة بيانات طبية موثوقة للإجابة على استفسارك بشكل دقيق.", en: "This is a demo response from Numoo assistant. In the final version, this will be connected to a reliable medical database to answer your query accurately." },
  chip1: { ar: "متى يبدأ الكلام؟", en: "When does speech start?" },
  chip2: { ar: "كيف أتعامل مع الغضب؟", en: "How to handle tantrums?" },
  chip3: { ar: "ما هي مراكز التدخل المبكر؟", en: "What are early intervention centers?" },
  chip4: { ar: "هل التوحد وراثي؟", en: "Is autism genetic?" },
  chip5: { ar: "علامات التأخر في النمو", en: "Signs of developmental delay" },
  chip6: { ar: "كيف أُحسّن نوم طفلي؟", en: "How to improve my child's sleep?" },
  chatWelcomeTitle: { ar: "أهلاً بكِ", en: "Welcome" },
  chatWelcomeSubtitle: {
    ar: "اسألي عن أي شيء يخص نمو طفلكِ — الكلام، السلوك، الحركة، الدمج المدرسي.",
    en: "Ask about anything related to your child's development — speech, behavior, movement, school integration.",
  },
  chatSuggestedTitle: { ar: "أسئلة شائعة", en: "Common questions" },
  newChat: { ar: "محادثة جديدة", en: "New chat" },

  // About
  aboutTitle: { ar: "من نحن", en: "About Us" },
  aboutDesc: { ar: "نمو مشروع كويتي إنساني وتقني، صُمم من احتياج حقيقي سمعناه من الأمهات.", en: "Numoo is a Kuwaiti humanitarian and tech project, designed from real needs heard from mothers." },
  aboutWhyTitle: { ar: "لماذا نمو؟", en: "Why Numoo?" },
  aboutWhyDesc: { ar: "كثير من الأسر تبدأ الرحلة بتشتت: معلومات متناقضة، مواعيد طويلة، وخوف من الاستغلال. نمو يحول هذا القلق إلى خطوات واضحة.", en: "Many families start the journey distracted: conflicting info, long appointments, and fear of exploitation. Numoo turns this worry into clear steps." },
  aboutHowTitle: { ar: "كيف نساعد؟", en: "How we help?" },
  aboutHowDesc: { ar: "نبدأ بفحص مبكر توعوي، ثم نشرح النتيجة بلغة بسيطة، ونقترح خطة أسبوعية، ونربط الأسرة بجهات ومراكز يمكن التحقق منها.", en: "We start with an early awareness screening, explain the result simply, suggest a weekly plan, and connect the family with verifiable centers." },
  aboutDiffTitle: { ar: "لماذا نمو وليس اختباراً عاماً؟", en: "Why Numoo and not a general test?" },
  aboutDiffDesc: { ar: "نمو عربي أولاً، مخصص لسياق الكويت، يشرح النتيجة بلغة أهلية، ويجهز تقريراً مطبوعاً يساعد الأسرة في أول زيارة للطبيب بدلاً من نتيجة رقمية غامضة.", en: "Numoo is Arabic-first, tailored to Kuwait context, explains results in parent-friendly language, and prepares a report for the first doctor visit instead of a vague numeric score." },
  importantTransparency: { ar: "شفافية مهمة:", en: "Important Transparency:" },
  transparencyDesc: { ar: "نمو ليس جهة طبية ولا يقدم تشخيصاً. هو نموذج أولي يساعد الأسرة على تنظيم رحلتها قبل زيارة المختص.", en: "Numoo is not a medical entity and does not provide diagnosis. It is a prototype helping families organize their journey before visiting a specialist." },

  // Sources
  sourcesTitle: { ar: "المصادر العلمية", en: "Scientific Sources" },
  sourcesDesc: { ar: "مراجع مختصرة توضّح أن نمو أداة توعوية وليست تشخيصاً طبياً.", en: "Brief references clarifying that Numoo is an awareness tool, not a medical diagnosis." },
  source1Title: { ar: "CDC + AAP Screening Guidance", en: "CDC + AAP Screening Guidance" },
  source1Desc: { ar: "توصي AAP بفحص النمو عند 9 و18 و30 شهراً، وفحص التوحد تحديداً عند 18 و24 شهراً. المصدر: CDC Autism Screening.", en: "AAP recommends developmental screening at 9, 18, and 30 months, and autism-specific screening at 18 and 24 months. Source: CDC Autism Screening." },
  source2Title: { ar: "M-CHAT-R/F Official", en: "M-CHAT-R/F Official" },
  source2Desc: { ar: "أداة فرز بحثية للأطفال 16-30 شهراً، وليست تشخيصاً. يجب استخدام تعليمات التسجيل والمتابعة الأصلية عند التطبيق السريري.", en: "A research screening tool for toddlers 16-30 months, not a diagnosis. Original scoring and follow-up instructions must be used in clinical practice." },
  source3Title: { ar: "Robins et al., Pediatrics 2014", en: "Robins et al., Pediatrics 2014" },
  source3Desc: { ar: "دراسة تحقق منشورة عن M-CHAT-R/F، PMID: 24366990.", en: "Published validation study of M-CHAT-R/F, PMID: 24366990." },
  source4Title: { ar: "NICE / Specialist Evaluation", en: "NICE / Specialist Evaluation" },
  source4Desc: { ar: "التشخيص يحتاج تقييماً متخصصاً متعدد المصادر، ولا يعتمد على شات بوت أو نموذج رقمي منفرد.", en: "Diagnosis requires multi-source specialist evaluation, and does not rely on a chatbot or single digital model." },
  source5Title: { ar: "الهيئة العامة لشؤون ذوي الإعاقة - الكويت", en: "Public Authority for Disability Affairs - Kuwait" },
  source5Desc: { ar: "قانون رقم 8 لسنة 2010 وخدمات الهيئة هي المصدر الرسمي للمعلومات القانونية والخدمات داخل الكويت.", en: "Law No. 8 of 2010 and PADA services are the official source for legal information and services within Kuwait." },

  reportCodeLabel: { ar: "رمز التقرير", en: "Report code" },
  reportCodeHint: { ar: "اقرئي هذا الرمز للطبيب أو فريق الرعاية للتحقق من أصالة التقرير.", en: "Read this code to your doctor or care team to verify this report is genuine." },
  reportDateLabel: { ar: "تاريخ التقرير", en: "Report date" },
  downloadReport: { ar: "حمّل تقرير PDF", en: "Download PDF Report" },
  generatingReport: { ar: "جارٍ تجهيز التقرير...", en: "Preparing report..." },
  reportReady: { ar: "تم تحميل التقرير", en: "Report downloaded" },
  reportError: { ar: "تعذّر تجهيز التقرير، حاولي مرة أخرى", en: "Could not prepare the report, please try again" },

  // Doctors directory (specialists who accept special-needs children)
  doctorsTitle: { ar: "دكاترة يستقبلون أطفال الاحتياجات", en: "Doctors Who Receive Special-Needs Children" },
  doctorsDesc: {
    ar: "قائمة دكاترة من ٧ تخصصات — مجموعة من تجارب الأمهات في الكويت.",
    en: "Doctors across 7 specialties — compiled from Kuwaiti mothers' experiences.",
  },
  doctorsTrustTitle: { ar: "من قلب تجربة الأمهات", en: "From mothers' real experiences" },
  doctorsTrustDesc: {
    ar: "هذه القائمة جمعتها أمهات لأمهات. كل دكتور هنا معروف باستقباله أطفال الاحتياجات الخاصة بصبر وتفهّم. تأكدي من المواعيد والعنوان قبل الزيارة.",
    en: "This list was compiled by mothers for mothers. Each doctor here is known for receiving special-needs children with patience and understanding. Verify hours and location before visiting.",
  },
  doctorsSearchPlaceholder: {
    ar: "ابحثي باسم الدكتور أو المستشفى...",
    en: "Search by doctor or hospital name...",
  },
  doctorsCountSuffix: { ar: "دكتور", en: "doctors" },
  doctorsSearchOnline: { ar: "ابحثي", en: "Search" },
  doctorsWarningTitle: { ar: "تنبيه مهم", en: "Important note" },
  doctorsWarningDesc: {
    ar: "هذه معلومات يتم تبادلها بين الأمهات للتسهيل، وليست توصية طبية رسمية من نمو. اختاري الدكتور المناسب حسب حالة طفلكِ، وأكّدي العنوان والمواعيد بالاتصال المباشر.",
    en: "This information is shared between mothers for convenience, not an official medical recommendation from Numoo. Choose the right doctor for your child's case, and verify location and hours by calling directly.",
  },
  doctorsSource: {
    ar: "المصدر: تجارب أمهات في الكويت — المجتمع",
    en: "Source: Kuwaiti mothers' community experiences",
  },

  // Assessment centers (government-approved)
  assessmentTitle: { ar: "أماكن التقييم المعتمدة رسمياً", en: "Officially Approved Assessment Centers" },
  assessmentDesc: {
    ar: "الجهات الحكومية الكويتية التي تُصدر شهادات تقييم رسمية معتمدة لطفلكِ.",
    en: "Kuwaiti government entities that issue officially recognized assessment reports for your child.",
  },
  assessmentOfficialBadge: { ar: "معتمد حكومي", en: "Government-approved" },
  assessmentWhyTitle: { ar: "لماذا هذه الأماكن مهمة؟", en: "Why these centers matter" },
  assessmentWhyDesc: {
    ar: "أي تقييم تحصلين عليه من هذه الجهات معتمد رسمياً ويُعترف به في وزارة الصحة والتربية والهيئة العامة لشؤون ذوي الإعاقة والمدارس. هذه الأوراق هي التي تفتح لكِ باب الخدمات والمخصصات.",
    en: "Any evaluation you obtain from these centers is officially recognized by the Ministry of Health, Education, PADA, and schools. These documents unlock services and benefits.",
  },
  assessmentRecognized: { ar: "معترف به رسمياً", en: "Officially recognized" },
  assessmentFooterTitle: { ar: "نصيحة من نمو", en: "A tip from Numoo" },
  assessmentFooterDesc: {
    ar: "ابدئي بالاتصال على ١٨٦١١١١ (الهيئة العامة لشؤون ذوي الإعاقة) — هذه أول خطوة رسمية. وإن كانت قائمة الانتظار لديهم طويلة، فيمكنكِ التقديم بالتوازي عبر مستشفى الصباح أو مركز الصحة النفسية.",
    en: "Start by calling 1861111 (PADA) — that's the first official step. If their waitlist is long, you can submit in parallel through Sabah Hospital or the Mental Health Center.",
  },
  assessmentSource: {
    ar: "المصدر: قائمة رسمية للجهات المعتمدة في الكويت",
    en: "Source: Official list of approved entities in Kuwait",
  },

  // Splash discovery cards (new)
  splashDoctorsTitle: { ar: "دكاترة يستقبلون أطفالنا", en: "Doctors who welcome our kids" },
  splashDoctorsDesc: { ar: "٧ تخصصات · من تجارب الأمهات", en: "7 specialties · from mothers' experiences" },
  splashAssessmentTitle: { ar: "أماكن التقييم الرسمية", en: "Official assessment centers" },
  splashAssessmentDesc: { ar: "شهادات معتمدة حكومياً", en: "Government-recognized reports" }
};

export type TranslationKey = keyof typeof translations;

export function useT() {
  const { lang } = useLangStore();
  
  const t = (key: TranslationKey) => {
    return translations[key]?.[lang] || key;
  };

  return { t, lang };
}
