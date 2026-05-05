const SITE = "https://numoo.site";

function siteUrl(path: string): string {
  if (!path || path === "/") return SITE;
  return SITE + (path.startsWith("/") ? path : "/" + path);
}

export function buildWhatsAppUrl(text: string): string {
  return "https://wa.me/?text=" + encodeURIComponent(text);
}

export function openWhatsApp(text: string): void {
  if (typeof window === "undefined") return;
  window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
}

export function shareResults(opts: {
  riskLabel: string;
  ageGroupLabel: string;
  lang: "ar" | "en";
}): string {
  const url = siteUrl("/");
  if (opts.lang === "en") {
    return [
      "I just used Numoo to do an early autism screening for my child 🌱",
      `Result: ${opts.riskLabel} (${opts.ageGroupLabel})`,
      "It's free, in Arabic, and made for Kuwaiti families. You can try it too:",
      url,
    ].join("\n");
  }
  return [
    "فعلت اختبار توحد لطفلي على نمو 🌱",
    `النتيجة: ${opts.riskLabel} (${opts.ageGroupLabel})`,
    "الاختبار مجاني، بالعربي، ومصمم لأهل الكويت. جربيه:",
    url,
  ].join("\n");
}

export function shareArticle(opts: {
  id: string;
  title: string;
  summary?: string;
  lang: "ar" | "en";
}): string {
  const url = siteUrl(`/library/${opts.id}`);
  if (opts.lang === "en") {
    const lines = [
      `📖 ${opts.title}`,
      opts.summary ?? "",
      "",
      "Read it on Numoo (free articles for autism families):",
      url,
    ].filter(Boolean);
    return lines.join("\n");
  }
  const lines = [
    `📖 ${opts.title}`,
    opts.summary ?? "",
    "",
    "اقريه على نمو (مقالات مجانية لأهل أطفال التوحد):",
    url,
  ].filter(Boolean);
  return lines.join("\n");
}

export function shareDoctor(opts: {
  name: string;
  specialty: string;
  location?: string;
  note?: string;
  lang: "ar" | "en";
}): string {
  const url = siteUrl("/doctors");
  if (opts.lang === "en") {
    const lines = [
      "🩺 Doctor recommended for special-needs kids:",
      `${opts.name} — ${opts.specialty}`,
      opts.location ? `📍 ${opts.location}` : "",
      opts.note ? `💬 ${opts.note}` : "",
      "",
      "Full list on Numoo:",
      url,
    ].filter(Boolean);
    return lines.join("\n");
  }
  const lines = [
    "🩺 دكتور موصى فيه لأطفال الاحتياجات:",
    `${opts.name} — ${opts.specialty}`,
    opts.location ? `📍 ${opts.location}` : "",
    opts.note ? `💬 ${opts.note}` : "",
    "",
    "القائمة الكاملة على نمو:",
    url,
  ].filter(Boolean);
  return lines.join("\n");
}

export function shareCenter(opts: {
  name: string;
  type?: string;
  phone?: string;
  lang: "ar" | "en";
}): string {
  const url = siteUrl("/assessment-centers");
  if (opts.lang === "en") {
    const lines = [
      "Official autism assessment center in Kuwait:",
      opts.name,
      opts.type ? `Type: ${opts.type}` : "",
      opts.phone ? `Phone: ${opts.phone}` : "",
      "",
      "Full directory on Numoo:",
      url,
    ].filter(Boolean);
    return lines.join("\n");
  }
  const lines = [
    "مركز تقييم توحد معتمد بالكويت:",
    opts.name,
    opts.type ? `النوع: ${opts.type}` : "",
    opts.phone ? `Phone: ${opts.phone}` : "",
    "",
    "الدليل الكامل على نمو:",
    url,
  ].filter(Boolean);
  return lines.join("\n");
}

export function shareGovResource(opts: {
  name: string;
  shortDesc?: string;
  phone?: string;
  website?: string;
  lang: "ar" | "en";
}): string {
  const url = siteUrl("/gov-support");
  if (opts.lang === "en") {
    const lines = [
      "Government / community support in Kuwait:",
      opts.name,
      opts.shortDesc ?? "",
      opts.phone ? `Phone: ${opts.phone}` : "",
      opts.website ? `Web: ${opts.website}` : "",
      "",
      "Full guide on Numoo:",
      url,
    ].filter(Boolean);
    return lines.join("\n");
  }
  const lines = [
    "دعم حكومي / جمعيات بالكويت:",
    opts.name,
    opts.shortDesc ?? "",
    opts.phone ? `Phone: ${opts.phone}` : "",
    opts.website ? `Web: ${opts.website}` : "",
    "",
    "الدليل الكامل على نمو:",
    url,
  ].filter(Boolean);
  return lines.join("\n");
}

export function shareApp(lang: "ar" | "en"): string {
  if (lang === "en") {
    return [
      "🌱 Numoo — a free Kuwaiti platform for autism families:",
      "• Quick screening in Arabic",
      "• Trusted doctors and centers",
      "• Articles and a 30-day plan",
      "",
      siteUrl("/"),
    ].join("\n");
  }
  return [
    "🌱 نمو — منصة كويتية مجانية لأهل أطفال التوحد:",
    "• اختبار سريع بالعربي",
    "• دكاترة ومراكز موثوقة",
    "• مقالات وخطة ٣٠ يوم",
    "",
    siteUrl("/"),
  ].join("\n");
}
