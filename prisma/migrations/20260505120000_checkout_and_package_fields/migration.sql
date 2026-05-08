-- Package: marketing fields (nullable — safe on existing rows)
ALTER TABLE "packages" ADD COLUMN IF NOT EXISTS "description" TEXT;
ALTER TABLE "packages" ADD COLUMN IF NOT EXISTS "features" JSONB;

-- Checkout sessions (pre-payment; no user FK until payment completes)
CREATE TABLE IF NOT EXISTS "checkout_sessions" (
    "id" TEXT NOT NULL,
    "project_key" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "email" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "subscriptionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "checkout_sessions_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "checkout_sessions_project_key_status_idx" ON "checkout_sessions"("project_key", "status");

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'checkout_sessions_packageId_fkey'
    ) THEN
        ALTER TABLE "checkout_sessions"
            ADD CONSTRAINT "checkout_sessions_packageId_fkey"
            FOREIGN KEY ("packageId") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;
