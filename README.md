# GenPharma
- Status: Deployment Synced & Environment Variables Configured

**India's People-First Pharmacy** — Pre-sorted medicine packs delivered to your door with 50-80% savings on quality generics.

## Features

- 📋 **Prescription Upload** — Snap a photo or upload, pharmacists verify in minutes
- 📦 **Pre-Sorted Packs** — Medicines organized by day & time, barcode-verified
- 🔔 **Smart Reminders** — Push, SMS, and voice call reminders in 10+ languages
- 👨‍👩‍👧‍👦 **Family Accounts** — Manage medicines for your whole family
- 🛡️ **Zero Expired Drugs** — Strict batch tracking and expiry management
- 💊 **WHO-GMP Certified** — Only quality-certified generics

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (dev server & bundler)
- **Tailwind CSS** + **shadcn/ui** components
- **Framer Motion** for animations
- **React Router** for navigation

## Getting Started

```sh
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

The dev server runs at `http://localhost:8080`.

## Project Structure

```
src/
├── components/
│   ├── landing/         # Landing page sections
│   ├── pharmacist/      # Pharmacist portal layout
│   └── ui/              # shadcn/ui components
├── pages/
│   ├── Index.tsx         # Landing page
│   └── pharmacist/       # Pharmacist portal pages
├── hooks/                # Custom React hooks
└── assets/               # Images
```

## License

© 2026 GenPharma. All rights reserved.
