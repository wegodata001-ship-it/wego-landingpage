/**
 * Back-compat re-exports — tenant resolution lives in `lib/project-isolation.ts`.
 * Priority: NEXT_PUBLIC_PROJECT_KEY → NEXT_PUBLIC_WEGOBIZ_USER_ID → DEFAULT_PROJECT_KEY → demo.
 */
export {
  getActiveProjectKey,
  getWegoBizDefaultUserId,
  sanitizeProjectKeyForPath,
  isWebhookProjectKeyAllowed,
  withProjectAnalyticsScope,
} from "@/lib/project-isolation";
