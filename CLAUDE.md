# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QR Billboard is a Next.js-based product catalogue website designed to be accessed via QR codes on billboards. Users browse products and submit lead forms, which are stored in a Turso SQLite database. An admin dashboard allows viewing and exporting leads.

**Tech Stack:**
- Next.js 14 (App Router) with TypeScript
- Tailwind CSS v4 (using @tailwindcss/postcss)
- Turso (SQLite over HTTP) with Drizzle ORM
- Vercel Analytics
- Deployed on Vercel

## Development Commands

```bash
# Development
npm run dev                 # Start dev server on localhost:3000

# Building & Production
npm run build              # Build for production
npm run start              # Start production server

# Linting
npm run lint               # Run ESLint (using eslint v9 flat config)

# Database Operations
npm run db:push            # Push schema changes to Turso database
npm run db:studio          # Open Drizzle Studio at https://local.drizzle.studio

# QR Code Generation
npm run generate-qr <url>  # Generate QR code PNG (saves to public/qr-code.png)
```

## Architecture

### Application Structure

- **`app/`** - Next.js App Router pages and layouts
  - `page.tsx` - Product catalogue grid (homepage)
  - `products/[id]/page.tsx` - Product detail page (server component)
  - `products/[id]/LeadForm.tsx` - Lead submission form (client component)
  - `admin/page.tsx` - Admin dashboard (client component, requires auth)
  - `api/leads/route.ts` - Lead CRUD API (GET requires auth, POST is public)
  - `api/leads/export/route.ts` - CSV export endpoint (requires auth)
  - `layout.tsx` - Root layout with header/footer and Vercel Analytics

- **`lib/`** - Shared utilities and configuration
  - `db.ts` - Turso database client (drizzle + @libsql/client)
  - `schema.ts` - Drizzle schema definitions (leads table)
  - `products.ts` - Product data (in-memory array, not in database)

- **`scripts/`** - Utility scripts
  - `generate-qr.ts` - QR code generation using qrcode package

### Database Layer

**Database:** Turso (libSQL) accessed via `@libsql/client`
**ORM:** Drizzle ORM

The database initialization happens in `lib/db.ts`:
- Requires `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` environment variables
- Throws errors immediately if env vars are missing
- Exports a configured drizzle client instance

**Schema (`lib/schema.ts`):**
```typescript
leads table:
  - id: integer (auto-increment primary key)
  - name: text (required)
  - phone: text (required)
  - email: text (optional)
  - message: text (optional)
  - productId: text (required, references product.id but not enforced)
  - createdAt: timestamp (auto-generated)
```

**Products are NOT in the database** - they are defined as a static array in `lib/products.ts`. This is intentional for the MVP. When modifying products, edit the array directly.

### Data Flow

1. **Lead Submission:**
   - User fills form on `/products/[id]` page
   - LeadForm component (client) submits to `/api/leads` (POST)
   - API validates name (≥2 chars) and phone (≥6 chars)
   - Lead is inserted into Turso database via Drizzle ORM
   - Success response returns leadId

2. **Admin Access:**
   - Admin visits `/admin` page
   - Enters `ADMIN_KEY` (default: `demo-admin-key`)
   - Key stored in localStorage for auto-login
   - Fetches leads from `/api/leads` (GET) with Bearer token
   - Can export CSV via `/api/leads/export` (GET)

3. **Authentication:**
   - Simple Bearer token auth using `ADMIN_KEY` environment variable
   - Checked via: `Authorization: Bearer {ADMIN_KEY}`
   - No JWT, sessions, or user accounts - single admin key only

### Important Patterns

**Server vs Client Components:**
- Product pages are server components (can directly read from lib/products.ts)
- Forms and admin dashboard are client components ('use client' directive)
- API routes handle all database writes

**Error Handling:**
- LeadForm shows detailed errors to users including server-side validation messages
- Admin API returns 401 for unauthorized, 400 for validation, 500 for server errors
- Database connection errors are caught and logged

**Form Submission:**
- Uses native FormData API, not controlled inputs
- Form resets on successful submission
- Detailed error logging includes JSON parse errors for debugging

## Environment Variables

Required for development and production:

```bash
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-token-here
ADMIN_KEY=demo-admin-key  # Change in production!
```

See `.env.example` for template. Local development uses `.env.local`.

## Configuration Files

- **`drizzle.config.ts`** - Drizzle Kit configuration pointing to lib/schema.ts
- **`eslint.config.mjs`** - ESLint v9 flat config (not .eslintrc format)
- **`tailwind.config.ts`** - Tailwind v4 config (minimal, uses @tailwindcss/postcss)
- **`next.config.ts`** - Next.js config (TypeScript format)
- **`tsconfig.json`** - Strict TypeScript settings with path aliases (@/)

## Deployment Notes

- Deployed on Vercel (config in `.vercel/` directory)
- Environment variables must be set in Vercel dashboard
- Database migrations via `npm run db:push` (no migration files needed for Turso)
- QR code generated post-deployment and committed to repo

## Testing

There is a test page at `/test-form` (app/test-form/page.tsx) used for debugging form submissions, particularly for Firefox compatibility testing.

## Key Considerations

**When adding features:**
- New database fields: Update `lib/schema.ts` and run `npm run db:push`
- New products: Edit the array in `lib/products.ts` (no database changes needed)
- New API routes: Follow the auth pattern in `/api/leads/route.ts`
- New admin features: Extend `/admin/page.tsx` (client component)

**Security:**
- Admin authentication is intentionally simple (single key) - suitable for MVP
- Product IDs are not validated against actual products in the database
- Phone/email validation is minimal - accepts most formats
- ADMIN_KEY should be changed from default in production

**Database:**
- Turso is SQLite-compatible but accessed over HTTP (not a local file)
- Drizzle ORM uses push mode (no migrations folder), schema changes are pushed directly
- Use Drizzle Studio for local database inspection during development
