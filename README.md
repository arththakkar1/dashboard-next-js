# Spice Kitchen -- Restaurant Management Dashboard

A modern, responsive restaurant management dashboard built for Indian restaurant operations. The application provides real-time insights into orders, revenue, reservations, and staff activity through an intuitive interface with full dark and light mode support.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [Theme System](#theme-system)
- [Pages](#pages)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

Spice Kitchen is a single-page dashboard application designed to manage the day-to-day operations of an Indian restaurant. It features a collapsible frosted-glass sidebar, interactive charts, order management with filtering and pagination, and a fully responsive layout that adapts seamlessly from desktop to mobile viewports.

---

## Features

- **Responsive Layout** -- Fully adaptive design from mobile (320px) to large desktop displays. Sidebar collapses into an overlay drawer on mobile with a hamburger toggle.
- **Dark / Light Mode** -- System-aware theme toggle with persistence via localStorage. All components use CSS custom property tokens for seamless switching.
- **Frosted-Glass Sidebar** -- Translucent sidebar with `backdrop-blur` and smooth collapse/expand animation. Active route highlighting with Next.js `usePathname`.
- **Interactive Charts** -- Revenue and traffic charts built with Recharts, featuring dropdown period selectors (Today, This Week, This Month) with dynamic data updates.
- **Order Management** -- Dedicated Orders page with stat cards, filter tabs (All, Dine-in, Delivery, Takeaway), search, paginated table, and mobile-optimized card view.
- **Dashboard Widgets** -- Stats cards, recent orders, activity feed, top-selling products, and table reservation overview.
- **Smooth Animations** -- Fade-in and stagger animations on page load for a polished user experience.

---

## Tech Stack

| Layer     | Technology                        |
| --------- | --------------------------------- |
| Framework | Next.js 16 (App Router)           |
| Language  | TypeScript 5                      |
| Styling   | Tailwind CSS 4                    |
| Charts    | Recharts 3                        |
| Icons     | Lucide React                      |
| Fonts     | Inter, JetBrains Mono (next/font) |
| Runtime   | React 19                          |

---

## Project Structure

```
src/
  app/
    globals.css             # CSS tokens, theme variables, animations
    layout.tsx              # Root layout with font loading and ThemeProvider
    page.tsx                # Dashboard route (/)
    orders/
      page.tsx              # Orders route (/orders)
  components/
    AppShell.tsx            # Shared layout shell (sidebar + header + main)
    Sidebar.tsx             # Collapsible frosted-glass navigation sidebar
    Header.tsx              # Top header with search, theme toggle, user profile
    ThemeProvider.tsx        # Dark/light mode context with localStorage persistence
    DashboardPage.tsx       # Dashboard page composition
    StatsCards.tsx           # Revenue, orders, guests, reservations stat cards
    RevenueChart.tsx         # Interactive revenue area chart
    TrafficChart.tsx         # Interactive traffic bar chart
    RecentOrders.tsx         # Recent orders summary table
    ActivityFeed.tsx         # Live activity feed timeline
    TopProducts.tsx          # Top-selling menu items list
    TableReservations.tsx    # Table reservation status grid
    orders/
      OrdersPage.tsx        # Orders page composition
      OrdersStats.tsx       # Order-specific stat cards
      OrderFilters.tsx      # Filter tabs and search bar
      OrdersTable.tsx       # Paginated orders table with mobile card view
```

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/your-username/dashboard-next-js.git
cd dashboard-next-js
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application supports hot module replacement and will reflect changes immediately.

---

## Available Scripts

| Command         | Description                                       |
| --------------- | ------------------------------------------------- |
| `npm run dev`   | Start the development server on port 3000         |
| `npm run build` | Create an optimized production build              |
| `npm run start` | Start the production server from the build output |

---

## Architecture

The application follows a component-based architecture with a shared layout shell pattern:

- **AppShell** wraps every page and manages sidebar state (collapsed/expanded on desktop, overlay drawer on mobile), header rendering, and main content area.
- **ThemeProvider** uses React Context to provide `theme` and `toggleTheme` across all components. Theme preference is stored in `localStorage` and applied as a `.dark` class on the `<html>` element.
- **CSS Custom Properties** defined in `globals.css` power all color tokens. Components reference semantic token names (`--foreground`, `--card`, `--primary`, etc.) through Tailwind's `@theme inline` directive, ensuring a single source of truth for both light and dark palettes.
- **Page Composition** -- Each route page (Dashboard, Orders) is a thin wrapper that renders the AppShell with the appropriate title and child content component.

---

## Theme System

All colors are defined as CSS custom properties in `globals.css` under `:root` (light) and `html.dark` (dark) selectors. These are mapped to Tailwind color utilities via the `@theme inline` block:

```
Primary:    Blue (#2563eb / #3b82f6)
Background: Slate (#f8fafc / #0b0f1a)
Cards:      White / Dark Gray (#ffffff / #111827)
Borders:    Light Slate / Dark Slate (#e2e8f0 / #1e293b)
```

Toggling between themes is instant with smooth CSS transitions on background and text colors.

---

## Pages

### Dashboard (`/`)

The main overview page displaying:

- Four stat cards (Total Revenue, Total Orders, Active Guests, Reservations)
- Revenue trend chart with period selector
- Order traffic chart with period selector
- Recent orders table
- Table reservation status grid
- Live activity feed
- Top-selling products list

### Orders (`/orders`)

A dedicated order management page featuring:

- Four order stat cards (Total, Pending, Completed, Cancelled)
- Filter tabs for order type (All, Dine-in, Delivery, Takeaway)
- Full-text search across order ID, customer name, and items
- Paginated data table on desktop with hover actions (View, Print, More)
- Mobile-optimized card layout with inline action buttons
- Responsive pagination controls

---

## Deployment

The recommended deployment target is [Vercel](https://vercel.com):

```bash
npm run build
```

Alternatively, deploy to any platform that supports Node.js. Refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for platform-specific guides.

---

## License

This project is private and not licensed for public distribution.
