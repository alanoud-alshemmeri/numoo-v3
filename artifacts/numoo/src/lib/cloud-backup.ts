import { create } from "zustand";
import { persist } from "zustand/middleware";

// Local-state snapshot we send up to the cloud backup endpoint.
export interface CloudSnapshot {
  // Schema version so we can evolve the shape gracefully.
  v: 1;
  assessment: unknown;
  bookmarks: unknown;
  favorites: unknown;
  lang: unknown;
  savedAt: string;
}

const KEYS = {
  assessment: "numoo-assessment-storage",
  bookmarks: "numoo-bookmarks",
  favorites: "numoo-favorites-storage",
  lang: "numoo-lang-storage",
} as const;

function readKey(key: string): unknown {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeKey(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    // Restore is a full replace: if the snapshot has no value for this key,
    // remove the local entry so stale data is not silently kept.
    if (value === null || value === undefined) {
      window.localStorage.removeItem(key);
      return;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

export function buildSnapshot(): CloudSnapshot {
  return {
    v: 1,
    assessment: readKey(KEYS.assessment),
    bookmarks: readKey(KEYS.bookmarks),
    favorites: readKey(KEYS.favorites),
    lang: readKey(KEYS.lang),
    savedAt: new Date().toISOString(),
  };
}

export function applySnapshot(snapshot: CloudSnapshot) {
  writeKey(KEYS.assessment, snapshot.assessment);
  writeKey(KEYS.bookmarks, snapshot.bookmarks);
  writeKey(KEYS.favorites, snapshot.favorites);
  writeKey(KEYS.lang, snapshot.lang);
}

// API base. In standalone build (file://), backup is unavailable.
function getApiBase(): string | null {
  if (typeof window === "undefined") return null;
  if (window.location.protocol === "file:") return null;
  // Use the same origin – the global proxy routes /api to the api server.
  return `${window.location.origin}/api`;
}

export function isCloudBackupAvailable(): boolean {
  return getApiBase() !== null;
}

interface BackupResponse {
  code: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

interface RestoreResponse extends BackupResponse {
  data: CloudSnapshot;
}

export async function createOrUpdateBackup(
  existingCode: string | null,
): Promise<BackupResponse> {
  const base = getApiBase();
  if (!base) throw new Error("offline_unavailable");
  const data = buildSnapshot();
  const res = await fetch(`${base}/backup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: existingCode ?? undefined,
      data,
      version: 1,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `http_${res.status}`);
  }
  return res.json();
}

export async function fetchBackup(code: string): Promise<RestoreResponse> {
  const base = getApiBase();
  if (!base) throw new Error("offline_unavailable");
  const cleaned = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const formatted = cleaned.length === 8
    ? `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
    : cleaned;
  const res = await fetch(
    `${base}/backup/${encodeURIComponent(formatted)}`,
  );
  if (res.status === 404) throw new Error("code_not_found");
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `http_${res.status}`);
  }
  return res.json();
}

interface BackupStoreState {
  code: string | null;
  lastSyncAt: string | null;
  acknowledgedSaved: boolean;
  setCode: (code: string | null) => void;
  setLastSync: (iso: string) => void;
  acknowledgeSaved: () => void;
  clear: () => void;
}

export const useBackupStore = create<BackupStoreState>()(
  persist(
    (set) => ({
      code: null,
      lastSyncAt: null,
      acknowledgedSaved: false,
      setCode: (code) => set({ code }),
      setLastSync: (iso) => set({ lastSyncAt: iso }),
      acknowledgeSaved: () => set({ acknowledgedSaved: true }),
      clear: () =>
        set({ code: null, lastSyncAt: null, acknowledgedSaved: false }),
    }),
    { name: "numoo-cloud-backup" },
  ),
);
