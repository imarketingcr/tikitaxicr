# TikiTaxi CR — Project Status

**Last updated:** 2026-05-07  
**Dev:** David Romero / iMarketingCR  
**Client:** Luis Núñez (tikitaxicr.com)

---

## Infrastructure

| Service | Detail |
|---------|--------|
| **Repo** | github.com/imarketingcr/tikitaxicr (branch: main) |
| **Deploy** | tikitaxicr.vercel.app → Vercel team `luis-nunezs-projects-3bd3a571` |
| **Vercel CLI** | Linked via `.vercel/project.json` — run `vercel --prod` to deploy |
| **Supabase** | Project ID `dzmchqwpawbwlettazev` — active, tables created |
| **Cloudinary** | Cloud name `djgv9sagr` — hero image in cloud `dkpfptjvm` (different account, accessed via full URL) |
| **Resend** | Configured, API key in .env.local |
| **Twilio** | Installed but credentials empty — WhatsApp notifications disabled |

---

## Environment Variables (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://dzmchqwpawbwlettazev.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<see .env.local>
SUPABASE_SERVICE_ROLE_KEY=<see .env.local>
RESEND_API_KEY=<see .env.local>
TWILIO_ACCOUNT_SID=         ← empty, pending
TWILIO_AUTH_TOKEN=          ← empty, pending
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
ADMIN_WHATSAPP_NUMBER=      ← empty, pending
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=djgv9sagr
CLOUDINARY_API_KEY=<see .env.local>
CLOUDINARY_API_SECRET=<see .env.local>
NEXT_PUBLIC_APP_URL=http://localhost:3000   ← change to https://tikitaxicr.com for prod
ADMIN_EMAIL=info@tikitaxicr.com
```

**All these must also be set in Vercel** → Project Settings → Environment Variables.  
`NEXT_PUBLIC_APP_URL` should be `https://tikitaxicr.vercel.app` in Vercel until custom domain is live.

---

## Supabase Setup (already done)

- Tables: `clients`, `appointments`, `admin_users` — created and RLS enabled
- Admin user: `info@tikitaxicr.com` (UUID: `9b6af98a-36df-48b8-910b-6473af79b3aa`)
- Record in `admin_users` table: ✅ inserted
- **GRANTs applied** (required — not auto-applied for sb_secret_* format keys):
  ```sql
  GRANT ALL ON public.clients TO service_role;
  GRANT ALL ON public.appointments TO service_role;
  GRANT ALL ON public.admin_users TO service_role;
  GRANT INSERT ON public.clients TO anon;
  GRANT INSERT ON public.appointments TO anon;
  GRANT SELECT, UPDATE, DELETE ON public.clients TO authenticated;
  GRANT SELECT, UPDATE, DELETE ON public.appointments TO authenticated;
  GRANT SELECT ON public.admin_users TO authenticated;
  GRANT EXECUTE ON FUNCTION public.is_slot_available(timestamptz) TO anon, authenticated, service_role;
  ```

---

## Stack

- **Next.js 16.2.4** (App Router, Turbopack)
- Uses `proxy.ts` instead of `middleware.ts` — Next.js 16 breaking change
- Auth cookies via `@supabase/ssr` `createBrowserClient` (NOT plain `@supabase/supabase-js`)
- TypeScript, Tailwind CSS v4, react-hook-form + zod

---

## What's Complete ✅

### Landing Page (/)
- **Navbar** — fixed, scroll-aware, active section indicator via IntersectionObserver, smooth scroll with offset for fixed nav, EN/ES language switcher
- **HeroSection** — real photo background (full URL from dkpfptjvm cloud), dark gradient overlay, CTA scrolls to #booking
- **ServicesSection** — 3 service cards (Airport, Tours, Executive), bottom CTA strip
- **TestimonialsSection** — 4 Cloudinary videos (djgv9sagr cloud), 2-col tablet / 4-col desktop grid, poster thumbnails, star ratings, placeholder name/origin fields ready to fill
- **BookingSection** — BookingForm connected to /api/appointments, full validation, timezone-aware (CR GMT-6), slot availability check, EN/ES
- **Footer**

### Testimonial Videos (fill these in when client provides names)
```ts
// In components/sections/TestimonialsSection.tsx — VIDEOS array:
{ id: "testimonial-1_dharkf", version: "v1778124303", name: "— —", origin: "— —" },
{ id: "testimonial-2_kcllzk", version: "v1778124302", name: "— —", origin: "— —" },
{ id: "testimonial-3_m2ox69", version: "v1778124302", name: "— —", origin: "— —" },
{ id: "testimonial-4_lkbf7k", version: "v1778124301", name: "— —", origin: "— —" },
```

### Admin Dashboard (/admin)
- Protected by `proxy.ts` — session check via `getSession()` (cookie-based, no network call)
- Login at `/admin/login` → uses `window.location.href = "/admin"` after login (full navigation so cookies reach middleware)
- Dashboard: client list with search, appointments per client, status change, admin notes
- Skeleton loaders on stats cards and client list
- Sign out button

### API Routes
- `POST/GET /api/appointments` — create + list appointments
- `PATCH/DELETE /api/appointments/[id]` — update/cancel
- `GET/POST /api/clients` — list + create clients
- `GET/PATCH /api/clients/[id]` — get with appointments + update
- `POST /api/email` — Resend email notifications (bilingual HTML templates)
- `POST /api/whatsapp` — Twilio WhatsApp (disabled until credentials added)

### Security
- `proxy.ts` handles CORS for /api (allowed: tikitaxicr.com, www.tikitaxicr.com, tikitaxicr.vercel.app, localhost:3000) and auth for /admin
- CSP headers in `next.config.ts` (includes media-src for Cloudinary videos)
- HSTS, X-Frame-Options, Permissions-Policy, etc.

---

## Pending / Next Steps

### High priority
- [ ] **Testimonial names/origins** — get from client and fill VIDEOS array
- [ ] **Custom domain** — point tikitaxicr.com → Vercel, update `NEXT_PUBLIC_APP_URL`
- [ ] **Twilio credentials** — add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, ADMIN_WHATSAPP_NUMBER when ready
- [ ] **Test booking form end-to-end** — verify email notification fires after successful booking

### Polish remaining
- [ ] Mobile testing — check all sections on real devices
- [ ] Booking form success state — consider more visual celebration
- [ ] Image for hero from client's own Cloudinary account (currently using dkpfptjvm cloud URL)

### Optional / future
- [ ] Cal.com integration (CAL_COM_API_KEY is empty)
- [ ] "About" section / page
- [ ] SEO meta tags per page
- [ ] Google Analytics / tracking

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `proxy.ts` | CORS + admin auth middleware (Next.js 16) |
| `lib/supabase.ts` | Browser client (uses @supabase/ssr for cookie-based sessions) |
| `lib/supabase-server.ts` | Server client (for API routes) |
| `lib/i18n.ts` | EN/ES translations — add new keys here |
| `lib/utils.ts` | Costa Rica timezone utils, business hours logic |
| `components/sections/TestimonialsSection.tsx` | VIDEOS array → update name/origin per testimonial |
| `app/admin/page.tsx` | Admin dashboard (client component) |
| `app/admin/login/page.tsx` | Admin login |
| `supabase/migrations/001_initial_schema.sql` | DB schema reference |

---

## Deploy Workflow

```bash
# Make changes, then:
git add <files>
git commit -m "..."
git push origin main

# Deploy to production:
vercel --prod
# (must be logged into the client's Vercel account — run `vercel whoami` to check)
# Client Vercel account: luis-nunezs-projects-3bd3a571
```
