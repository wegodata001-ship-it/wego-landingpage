-- Tenant scope for contact rows when this legacy table is used alongside shared backend.
ALTER TABLE "ContactSubmission" ADD COLUMN IF NOT EXISTS "project_key" TEXT;
