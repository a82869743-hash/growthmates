# MegaTrans 2026 Event Page + Site Cleanup

Four changes, all front-end/presentation.

## 1. New MegaTrans event landing page (`/megatrans`)

A standalone, shareable page (great for a QR code at the booth) that welcomes organic visitors to come meet you at the expo.

Content:
- **Hero**: "Come meet us at MegaTrans 2026" headline, short intro framing your AI product for logistics & supply chain, primary CTA **Book a meeting** (existing Calendly popup) + secondary **Explore the platform** linking home.
- **Event details card**: 16-17 September 2026, 10am-5pm daily, Melbourne Convention & Exhibition Centre (1 Convention Centre Pl, South Wharf VIC). Startup POD location shown as "Visit our Startup POD" (placeholder label until you give a booth number).
- **Why visit us**: 3 short value points tailored to transport/retail supply chain (decision-engine AI, fleet & freight optimisation, retail demand/inventory).
- **CTA banner**: reuse the Calendly book-a-session action.
- Navbar + Footer reused. SEO: title/meta via the existing `useDocumentMeta` hook.

A **"MegaTrans 2026"** link will be added to the navbar so it's reachable, and the route registered in `App.tsx`.

## 2. Focus industries on Transportation & Retail only

Remove Agriculture and Education everywhere they surface:
- `AIWorkflowsSection.tsx`: drop the `agriculture` and `education` industry pills and their use-case lists (keep Transportation + Retail). Clean up now-unused icon imports.
- `Footer.tsx`: remove Agriculture and Education from the Industries list.
- `roadmap/types.ts`: narrow `IndustryTag` to `'transportation' | 'retail'` and update `INDUSTRY_LABELS` accordingly.

## 3. Update Login URL

Replace `https://portal.dev.growthmates.ai/login` with `https://portal.growthmates.ai/login` in:
- `Navbar.tsx` (`LOGIN_URL`)
- `HeroSection.tsx` ("Login to Portal" link)

## 4. Remove the Agentic AI popup

Remove the continuously-popping `HeroPromoCard` from `Index.tsx` (delete the import and its usage). The component file can stay unused or be deleted.

## Technical notes
- New file: `src/pages/MegaTrans.tsx`. Edit: `App.tsx`, `Navbar.tsx`, `HeroSection.tsx`, `Index.tsx`, `AIWorkflowsSection.tsx`, `Footer.tsx`, `roadmap/types.ts`.
- No backend/database changes.
- Calendly URL reused: `https://calendly.com/d-bstsolutions/book-your-free-consultation`.
