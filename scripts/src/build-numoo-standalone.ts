import { readFileSync, writeFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import JSZip from "jszip";

const ROOT = resolve(import.meta.dirname, "..", "..");
const NUMOO_DIR = resolve(ROOT, "artifacts", "numoo");
const STANDALONE_DIR = resolve(NUMOO_DIR, "dist", "standalone");
const SRC_HTML = resolve(STANDALONE_DIR, "index.html");
const OUT_HTML = resolve(STANDALONE_DIR, "numoo.html");
const OUT_ZIP = resolve(NUMOO_DIR, "numoo.zip");

function fileToDataUri(path: string, mime: string): string {
  const buf = readFileSync(path);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

function fmtKb(n: number): string {
  return `${(n / 1024).toFixed(1)} KB`;
}

console.log("[build-numoo-standalone] Reading", SRC_HTML);
let html = readFileSync(SRC_HTML, "utf8");
const sizeBefore = Buffer.byteLength(html, "utf8");
console.log("  before inlining:", fmtKb(sizeBefore));

const PUBLIC_DIR = resolve(NUMOO_DIR, "public");
const faviconUri = fileToDataUri(resolve(PUBLIC_DIR, "favicon.svg"), "image/svg+xml");
const logoUri = fileToDataUri(resolve(PUBLIC_DIR, "numoo-logo.png"), "image/png");
const logoNavyUri = fileToDataUri(
  resolve(PUBLIC_DIR, "numoo-logo-navy.png"),
  "image/png",
);
const logoReversedUri = fileToDataUri(
  resolve(PUBLIC_DIR, "numoo-logo-reversed.png"),
  "image/png",
);
const ogUri = fileToDataUri(resolve(PUBLIC_DIR, "opengraph.jpg"), "image/jpeg");

console.log("  inlined assets:", {
  favicon: fmtKb(faviconUri.length),
  logo: fmtKb(logoUri.length),
  logoNavy: fmtKb(logoNavyUri.length),
  logoReversed: fmtKb(logoReversedUri.length),
  og: fmtKb(ogUri.length),
});

// Replace asset URLs with data URIs.
// Cover all common quoting/leading-slash variants.
const replacements: Array<[RegExp, string, string]> = [
  [/(["'(])\.?\/favicon\.svg/g, "$1" + faviconUri, "favicon.svg"],
  [/(["'(])\.?\/numoo-logo\.png/g, "$1" + logoUri, "numoo-logo.png"],
  [/(["'(])\.?\/numoo-logo-navy\.png/g, "$1" + logoNavyUri, "numoo-logo-navy.png"],
  [/(["'(])\.?\/numoo-logo-reversed\.png/g, "$1" + logoReversedUri, "numoo-logo-reversed.png"],
  [/(["'(])\.?\/opengraph\.jpg/g, "$1" + ogUri, "opengraph.jpg"],
];

for (const [re, rep, label] of replacements) {
  const matches = html.match(re);
  const count = matches ? matches.length : 0;
  html = html.replace(re, rep);
  console.log(`  replaced ${count}x: ${label}`);
}

// Strip PWA links that 404 in standalone (manifest + service worker registration).
html = html.replace(
  /\s*<link\s+rel=["']manifest["'][^>]*>/gi,
  "",
);
html = html.replace(
  /\s*<link\s+rel=["']apple-touch-icon["'][^>]*>/gi,
  `\n    <link rel="apple-touch-icon" href="${logoUri}" />`,
);

const sizeAfter = Buffer.byteLength(html, "utf8");
console.log("  after inlining:", fmtKb(sizeAfter));

writeFileSync(OUT_HTML, html, "utf8");
console.log("  wrote", OUT_HTML);

// Build ZIP with the single HTML file
const zip = new JSZip();
zip.file("numoo.html", html);

const readme = `نمو — Numoo (نسخة محلية)
==========================

افتحي الملف "numoo.html" بأي متصفح (Chrome, Safari, Firefox, Edge).
كل شي بداخله — ما يحتاج إنترنت بعد التحميل.

📌 ملاحظات:
- البيانات محفوظة بالمتصفح (localStorage). امسحي الكاش = يمسح التقدم.
- تشتغل على الجوال والتابلت والكمبيوتر.
- مفتوح المصدر، مجاني تماماً.

💚 صُنع لأمهات الكويت
نمو • numoo.site
`;

zip.file("README.txt", readme);

const buf = await zip.generateAsync({
  type: "nodebuffer",
  compression: "DEFLATE",
  compressionOptions: { level: 9 },
});

writeFileSync(OUT_ZIP, buf);
const zipSize = statSync(OUT_ZIP).size;
console.log(`✓ numoo.zip created: ${fmtKb(zipSize)} → ${OUT_ZIP}`);
