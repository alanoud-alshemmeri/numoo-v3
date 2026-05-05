// RFC 5545 minimal ICS generator for the Numoo 30-day plan reminders.

import { PLAN_WEEKS, type PlanDay } from "./result-resources";

function pad(n: number): string {
  return n < 10 ? "0" + n : String(n);
}

function formatLocalDate(d: Date): string {
  // YYYYMMDDTHHMMSS — local floating time (no Z), so the user's calendar
  // app keeps the reminder at 9 AM local in their timezone.
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    "T" +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  );
}

function formatUtcDate(d: Date): string {
  // RFC 5545 form: YYYYMMDDTHHMMSSZ in UTC. Required for DTSTAMP and any
  // absolute timestamp that must be unambiguous across calendar apps.
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

function escapeIcsText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function foldLine(line: string): string {
  // RFC 5545: content lines MUST NOT exceed 75 octets (bytes), excluding the
  // CRLF. Continuation lines start with a single SPACE. Split must respect
  // UTF-8 boundaries — Arabic chars are 2 bytes each, so character-based
  // slicing breaks both byte limits and multi-byte sequences.
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const bytes = enc.encode(line);
  if (bytes.length <= 75) return line;

  const out: string[] = [];
  let offset = 0;
  let isFirst = true;
  while (offset < bytes.length) {
    const limit = isFirst ? 75 : 74; // 1 byte reserved for leading SPACE
    let end = Math.min(offset + limit, bytes.length);
    // Walk back to a UTF-8 character boundary (continuation bytes start 10xxxxxx)
    while (end > offset && end < bytes.length && (bytes[end] & 0xc0) === 0x80) {
      end--;
    }
    const chunk = dec.decode(bytes.subarray(offset, end));
    out.push(isFirst ? chunk : " " + chunk);
    offset = end;
    isFirst = false;
  }
  return out.join("\r\n");
}

export interface BuildPlanIcsOptions {
  startDate?: Date;
  /** Hour of day (24h) for the reminder. Default 9 AM. */
  reminderHour?: number;
  /** Minutes before event for VALARM. Default 0 (at start). */
  alarmMinutesBefore?: number;
  childLabel?: string;
}

/**
 * Build an ICS file containing one VEVENT per day of the 30-day plan,
 * starting `startDate` (default: tomorrow 9 AM local time).
 */
export function buildPlan30DayIcs(opts: BuildPlanIcsOptions = {}): string {
  const start = opts.startDate ? new Date(opts.startDate) : new Date();
  // If no startDate provided, schedule first reminder for tomorrow morning
  if (!opts.startDate) {
    start.setDate(start.getDate() + 1);
  }
  const reminderHour = opts.reminderHour ?? 9;
  start.setHours(reminderHour, 0, 0, 0);

  const alarmBefore = opts.alarmMinutesBefore ?? 0;
  const childLabel = opts.childLabel ? ` — ${opts.childLabel}` : "";

  const allDays: { day: PlanDay; weekTheme: string }[] = [];
  for (const week of PLAN_WEEKS) {
    for (const day of week.days) {
      allDays.push({ day, weekTheme: week.theme });
    }
  }

  const dtStamp = formatUtcDate(new Date());

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Numoo//Plan30Day//AR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeIcsText("نمو — خطة ٣٠ يوم" + childLabel)}`,
    "X-WR-CALDESC:خطة الـ٣٠ يوم من نمو لدعم أسرة طفل التوحد",
    "X-WR-TIMEZONE:Asia/Kuwait",
  ];

  for (const { day, weekTheme } of allDays) {
    const eventDate = new Date(start);
    eventDate.setDate(start.getDate() + (day.day - 1));
    const startStr = formatLocalDate(eventDate);
    const endDate = new Date(eventDate);
    const durationMin = day.estMinutes ?? 30;
    endDate.setMinutes(eventDate.getMinutes() + durationMin);
    const endStr = formatLocalDate(endDate);

    const uid = `numoo-plan30-day${day.day}-${dtStamp}@numoo.site`;
    const summary = `يوم ${day.day}: ${day.title}`;
    const description = `${day.task}\n\n💡 ${day.why}\n\nالأسبوع: ${weekTheme}\n\nمن منصة نمو — numoo.site`;

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${dtStamp}`);
    lines.push(`DTSTART:${startStr}`);
    lines.push(`DTEND:${endStr}`);
    lines.push(foldLine(`SUMMARY:${escapeIcsText(summary)}`));
    lines.push(foldLine(`DESCRIPTION:${escapeIcsText(description)}`));
    lines.push("CATEGORIES:نمو,توحد,خطة-30-يوم");
    lines.push("STATUS:CONFIRMED");
    lines.push("TRANSP:OPAQUE");

    if (alarmBefore >= 0) {
      lines.push("BEGIN:VALARM");
      lines.push("ACTION:DISPLAY");
      lines.push(foldLine(`DESCRIPTION:${escapeIcsText(summary)}`));
      lines.push(`TRIGGER:-PT${alarmBefore}M`);
      lines.push("END:VALARM");
    }

    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

/**
 * Trigger a download of the built ICS in the browser.
 */
export function downloadIcs(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
