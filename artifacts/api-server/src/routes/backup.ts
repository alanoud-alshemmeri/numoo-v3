import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { randomBytes } from "node:crypto";
import { db, numooBackupsTable } from "@workspace/db";
import { CreateBackupBody } from "@workspace/api-zod";

const router: IRouter = Router();

// 32-symbol unambiguous alphabet (no I/O/0/1).
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_LEN = 8;

function generateCode(): string {
  // Use crypto-secure RNG. CODE_ALPHABET is a power of two (32),
  // so masking the byte to 5 bits avoids modulo bias.
  const bytes = randomBytes(CODE_LEN);
  let raw = "";
  for (let i = 0; i < CODE_LEN; i++) {
    raw += CODE_ALPHABET[bytes[i] & 0x1f];
  }
  return `${raw.slice(0, 4)}-${raw.slice(4)}`;
}

function normalizeCode(code: string): string {
  const cleaned = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (cleaned.length !== CODE_LEN) return code.toUpperCase();
  return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
}

router.post("/backup", async (req, res) => {
  const parsed = CreateBackupBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "invalid_request",
      message: "Backup payload is invalid.",
    });
  }
  const { code, data, version } = parsed.data;
  const v = version ?? 1;

  if (code) {
    const normalized = normalizeCode(code);
    const existing = await db
      .select()
      .from(numooBackupsTable)
      .where(eq(numooBackupsTable.code, normalized))
      .limit(1);
    if (existing.length === 0) {
      return res.status(404).json({
        error: "code_not_found",
        message: "The recovery code does not exist.",
      });
    }
    const [updated] = await db
      .update(numooBackupsTable)
      .set({
        data: data as object,
        version: v,
        lastSyncedAt: new Date(),
      })
      .where(eq(numooBackupsTable.code, normalized))
      .returning();
    req.log.info({ code: normalized }, "backup updated");
    return res.json({
      code: updated.code,
      version: updated.version,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    });
  }

  // Generate a unique new code; retry on the rare race where two requests
  // pick the same code simultaneously by catching the unique-key violation.
  for (let attempt = 0; attempt < 6; attempt++) {
    const newCode = generateCode();
    try {
      const [created] = await db
        .insert(numooBackupsTable)
        .values({
          code: newCode,
          data: data as object,
          version: v,
        })
        .returning();
      req.log.info({ code: newCode }, "backup created");
      return res.json({
        code: created.code,
        version: created.version,
        createdAt: created.createdAt.toISOString(),
        updatedAt: created.updatedAt.toISOString(),
      });
    } catch (err: unknown) {
      const code = (err as { code?: string } | null)?.code;
      // Postgres unique violation
      if (code === "23505") {
        req.log.warn({ attempt }, "backup code collision, retrying");
        continue;
      }
      throw err;
    }
  }
  return res.status(503).json({
    error: "code_generation_failed",
    message: "Could not allocate a unique recovery code. Please try again.",
  });
});

router.get("/backup/:code", async (req, res) => {
  const normalized = normalizeCode(req.params.code);
  const found = await db
    .select()
    .from(numooBackupsTable)
    .where(eq(numooBackupsTable.code, normalized))
    .limit(1);
  if (found.length === 0) {
    return res.status(404).json({
      error: "code_not_found",
      message: "The recovery code does not exist.",
    });
  }
  const row = found[0];
  return res.json({
    code: row.code,
    version: row.version,
    data: row.data,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  });
});

export default router;
