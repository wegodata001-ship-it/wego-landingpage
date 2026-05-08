# Wego Business SaaS

Next.js App Router + Prisma SaaS scaffold with multi-tenant landing pages, package assignments, subscriptions, and payment webhook flow.

## Features
- Multi-tenant models with `projectId` on all queries
- `PackageLanding` and `SubscriptionLanding` extension tables
- Client-scoped login + signup per project
- Dynamic landing page at `/lp/[slug]`
- Dashboard with active subscription status and renewal flow
- Webhook API at `/api/webhook/payment`
- Admin panel at `/admin` for users, packages, subscriptions, payments, and system link assignment

## Setup
1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` for your PostgreSQL/Supabase instance.
3. Run `npm install`.
4. Run `npx prisma generate`.
5. Run `npx prisma db push` to sync the schema.
6. Start the app with `npm run dev`.

## Important
- Do not modify existing tables in production.
- All queries are filtered by `projectId`.
- Landing page packages are filtered by `landingPageId`.
