// Re-export Zod runtime schemas under a namespace to avoid colliding with
// the generated TypeScript types (e.g. RestoreBackupResponse).
export * as ApiSchemas from "./generated/api";
// Also re-export by name for backward compatibility (HealthCheckResponse, etc.)
export {
  HealthCheckResponse,
  CreateBackupBody,
  CreateBackupResponse,
  RestoreBackupParams,
  RestoreBackupResponse as RestoreBackupResponseSchema,
} from "./generated/api";
export * from "./generated/types";
