import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "wegostorage";

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Supabase URL and service role key must be configured in environment variables.");
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

export function getStoragePath(projectKey: string, filename: string) {
  return `project_${projectKey}/images/${filename}`;
}

export async function uploadProjectImage(projectKey: string, file: Blob, filename: string) {
  const path = getStoragePath(projectKey, filename);
  const { data, error } = await supabaseAdmin.storage
    .from(bucketName)
    .upload(path, file, { upsert: true });

  if (error) {
    throw error;
  }

  const { data: publicUrlData } = supabaseAdmin.storage.from(bucketName).getPublicUrl(path);
  return publicUrlData.publicUrl;
}
