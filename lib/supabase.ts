import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isDbDisabled } from "@/lib/db-disabled";
import { sanitizeProjectKeyForPath } from "@/lib/project-isolation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "wegostorage";

function createSupabaseAdmin(): SupabaseClient {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase URL and service role key must be configured in environment variables.");
  }
  return createClient(supabaseUrl, serviceRoleKey);
}

/** No client at import time when DISABLE_DB=true (avoids build failures). */
export const supabaseAdmin: SupabaseClient = isDbDisabled()
  ? (new Proxy({} as SupabaseClient, {
      get() {
        throw new Error("[supabase] DISABLE_DB=true — storage uploads are disabled.");
      },
    }) as SupabaseClient)
  : createSupabaseAdmin();

export function getStoragePath(projectKey: string, filename: string) {
  const safe = sanitizeProjectKeyForPath(projectKey);
  const base = filename.replace(/^.*[/\\]/, "").replace(/[^a-zA-Z0-9._-]/g, "_");
  return `project_${safe}/images/${base}`;
}

export async function uploadProjectImage(projectKey: string, file: Blob, filename: string) {
  if (isDbDisabled()) {
    return "";
  }

  const path = getStoragePath(projectKey, filename);
  const { error } = await supabaseAdmin.storage.from(bucketName).upload(path, file, { upsert: true });

  if (error) {
    throw error;
  }

  const { data: publicUrlData } = supabaseAdmin.storage.from(bucketName).getPublicUrl(path);
  return publicUrlData.publicUrl;
}
