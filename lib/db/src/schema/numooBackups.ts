import { pgTable, text, jsonb, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// Cloud backups for the Numoo platform.
// Each row is the full local-state snapshot of one family,
// keyed by a short human-readable recovery code (e.g. "K7M2-9X3P").
export const numooBackupsTable = pgTable("numoo_backups", {
  code: text("code").primaryKey(),
  data: jsonb("data").notNull(),
  version: integer("version").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  lastSyncedAt: timestamp("last_synced_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertNumooBackupSchema = createInsertSchema(numooBackupsTable).omit({
  createdAt: true,
  updatedAt: true,
  lastSyncedAt: true,
});
export type InsertNumooBackup = z.infer<typeof insertNumooBackupSchema>;
export type NumooBackup = typeof numooBackupsTable.$inferSelect;
