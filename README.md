# Luxe Interiors — Catalog & Discovery Microfrontend

> **Group 5** · Furniture & Home Decor Store  
> **Role:** Catalog & Discovery (Home, Product Listing, Search/Filters, Product Detail)

---

## Overview

This microfrontend owns the **catalog experience** for the Luxe Interiors furniture store. It provides:
- **Home page**: Hero banner, curated categories, and trending products.
- **Room / Category listing pages**: Living Room, Bedroom, Kitchen, and Decor.
- **Search with filters**: Filter by category, material, and price.
- **Product detail page**: Dynamic layout by product ID.

It is built as a **standalone React app** that can be deployed independently and later integrated into the group shell via live URL composition.

---

## Tech Stack

| Layer | Choice |
| :--- | :--- |
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **UI Library** | **MUI (Material UI)** with a custom Material Design–aligned theme |
| **Data Fetching** | TanStack React Query + Axios |
| **Routing** | React Router DOM |
| **Mock Backend** | MockAPI.io (REST) |

---

## Features

- **Home Page**
    - Hero banner
    - Curated spaces (categories)
    - Trending products grid
- **Room Pages** (`/living-room`, `/bedroom`, `/kitchen`, `/decor`)
    - Filtered product grids by room categories
    - Sidebar filters: Category, material, price range
- **Search** (`/search?q=...`)
    - Full-text search on title, subtitle, category, material, and description
    - Filter sidebar with active filter chips
- **Product Detail** (`/product/:id`)
    - Dynamic product fetch by ID
    - Quantity selector, color / leg finish options (UI)
    - "Add to Cart" integration hook
- **Shared Navigation**
    - Sticky header with room links + search entry point

---

## Exposed Routes

| Route | Description |
| :--- | :--- |
| `/` | Home page |
| `/living-room` | Living Room catalog |
| `/bedroom` | Bedroom catalog |
| `/kitchen` | Kitchen & Dining catalog |
| `/decor` | Home Decor catalog |
| `/search` | Search results (optional `?q=` query) |
| `/product/:id` | Dynamic product detail page |

---

## Exposed Events & Integration Hooks

This app is designed for microfrontend integration. Current integration points:

| Event / Action | Status | Notes |
| :--- | :--- | :--- |
| **Navigate to Product Detail** | Ready | Any product card links to `/product/:id` |
| **Search Entry from Shell** | Ready | Open `/search` or `/search?q=term` |
| **Add to Cart** | Placeholder | Emits payload; ready for Cart Microfrontend consumption |


### Suggested Contract with Cart Microfrontend

```ts
// Example payload emitted on "Add to Cart"
{
  productId: string;
  quantity: number;
  color?: string;
  legFinish?: string;
}
```

---

## Project Structure

```text
src/
├── components/          # Header, Footer, cards, filters, sections
├── pages/               # Home, Room, Search, ProductDetail
├── hooks/               # React Query hooks
├── services/            # catalogService (API calls)
├── types/               # Product, Category interfaces
├── constants/           # Room → category mapping
├── theme.ts             # MUI theme (Material Design tokens)
├── ApiBase.ts           # Axios instance
└── App.tsx              # Routes + providers
```

---

## Getting Started

### Prerequisites

- **Node.js**: 18+
- **npm**: 9+

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://YOUR_MOCKAPI_URL/api/v1
```

### Local Development

```bash
npm run dev
```

### Build & Preview

```bash
npm run build
npm run preview
```

---

## API Contract (MockAPI)

**Base URL:** `https://6a720f12f687776c13f0f73b.mockapi.io/api/v1`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/categories` | List all categories |
| `GET` | `/products` | List all products |
| `GET` | `/products?isTrending=true` | Get trending products |
| `GET` | `/products/:id` | Get single product by ID |

**Product fields used:** `id`, `title`, `subtitle`, `price`, `category`, `material`, `imageUrl`, `isTrending`, `description`, `rating`, `reviewsCount`.

---

## Design System

- Uses **MUI (Material UI)** to align with group React standards.
- Custom theme aligned with a warm furniture palette (Primary: `#4A3728`, soft surface tones).
- **Typography:** Playfair Display (Headings) + System UI (Body).
- **Goal:** Visual consistency with sibling microfrontends (Vue/Vuetify, Lit/Material Web) after Shell integration.

---

## Deployment & Links

- **Live Demo:** 
- **Repository:**https://github.com/KarimTbaileh/microfrontend-group5-Catalog-discovery

---

## Author

- **Role:** Catalog & Discovery 
- **Group:** 5 — Furniture & Home Decor Store
- **Stack:** React + MUI + TypeScript