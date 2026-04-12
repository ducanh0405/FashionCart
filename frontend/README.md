# FashionCart Frontend

Web client for FashionCart — React + Vite app for browsing fashion, product detail, Virtual Try-On (VTON), and community feed.

---

## App entry & routing

- **Entry**: `src/main.tsx` → `App.tsx` → `RouterProvider` with `router` from `src/app/routes.tsx`.
- **Router**: React Router v7 (`createBrowserRouter`). All routes use a shared **Layout** (header + main content).

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Hero, recommended products, masonry product feed |
| `/product/:id` | **ProductDetail** | Single product view, size/variant, add to cart, “Try on” (VTON) entry |
| `/vton/:id` | **VtonStudio** | Virtual Try-On flow for a product |
| `/community` | **CommunityFeed** | Community / social-style feed |

---

## Layout & global UI

- **File**: `src/app/components/Layout.tsx`
- **Behavior**:
  - Sticky header with backdrop blur.
  - **Logo**: “FashionCart.” (purple + red accent).
  - **Nav**: Shop (→ `/`), Community (→ `/community`).
  - **Search bar** (center, desktop): placeholder “Search trends, brands, or styles…” + camera icon.
  - **Actions**: Messages, Cart (with badge), Profile avatar (desktop) / hamburger (mobile).
- **Main content**: `<Outlet />` inside a max-width container; page-specific content goes here.
- **Theme**: Light background `#F8F9FA`, primary purple `#6D28D9`, accent `#FF6B6B`, font Plus Jakarta Sans.

---

## Pages (screens)

| Page | File | Main UI/UX elements |
|------|------|----------------------|
| **Home** | `src/app/pages/Home.tsx` | Hero banner (“Trending in HCM City”), “Recommended for you” grid, masonry product feed (cards with optional “VTON Ready” badge). |
| **ProductDetail** | `src/app/pages/ProductDetail.tsx` | Product images, title, price, brand, size/variant selector, Add to cart, “Try on” (link to VTON). |
| **VtonStudio** | `src/app/pages/VtonStudio.tsx` | VTON flow: product context + try-on UI (e.g. upload/choose photo, view result). |
| **CommunityFeed** | `src/app/pages/CommunityFeed.tsx` | Community / feed-style layout (content defined in component). |

---

## Components

### App-specific

- **`Layout.tsx`** — Global shell (header + outlet). See “Layout & global UI” above.
- **`ProductCard.tsx`** — Product card: image, brand, name, price, optional “VTON Ready” badge, quick actions (e.g. wishlist, share, add to cart). Used on Home and anywhere we list products.
- **`figma/ImageWithFallback.tsx`** — Image component with fallback when load fails (e.g. placeholder or broken-image state).

### UI library (`src/app/components/ui/`)

Primitive/building-block components (button, input, card, dialog, tabs, etc.) used across the app. Typically shadcn/ui-style components; use these for consistency (forms, modals, layout, feedback).

---

## Styles

- **Entry**: `src/styles/index.css` imports:
  - `fonts.css` — Font face (e.g. Plus Jakarta Sans).
  - `tailwind.css` — Tailwind directives.
  - `theme.css` — CSS variables (colors, spacing, etc.) for the design system.
- **Usage**: Tailwind utility classes in components; theme variables for colors/spacing where needed. Global styles and variables are in `src/styles/`.

---

## Public assets

- **`public/`** — Static assets (favicon, images, etc.) served at root. Refer in code with paths like `/favicon.ico`.

---

## Summary: UI/UX structure

```
Layout (header + main)
├── Header: logo, nav (Shop, Community), search, cart, profile
└── Main
    ├── Home: hero → recommended grid → masonry feed (ProductCards)
    ├── ProductDetail: gallery, info, size, add to cart, “Try on” → VtonStudio
    ├── VtonStudio: VTON flow for product :id
    └── CommunityFeed: community feed
```

Shared building blocks: **ProductCard**, **ImageWithFallback**, and **ui/** primitives. Design tokens and typography live in **src/styles/** (theme + Tailwind).
