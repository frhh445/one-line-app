<<<<<<< HEAD
# One Line ✨

> Smarter studying, one session at a time.

A complete, production-ready study app combining AI tools, Pomodoro timer, and smart progress tracking.

## Features

- 🍅 **Smart Pomodoro Timer** - AI-optimized 53 min focus + 17 min break sessions
- 🤖 **AI Tools Library** - 12+ curated prompts for summarizing, quizzing, explaining
- 📊 **Progress Tracking** - Streaks, badges, weekly heatmaps, lifetime stats
- 💎 **3 Subscription Tiers** - Free, Pro ($4.99/mo), Max ($9.99/mo)
- 📱 **Mobile-First Design** - Built as Telegram Mini App + Web App
- 🎨 **Beautiful UI** - Glassmorphism, gradients, smooth animations
- 🌓 **Dark Mode Ready** - Full dark theme support
- 🔐 **Supabase Auth** - Secure email/password authentication
- 📈 **Analytics Ready** - Track user behavior and conversion

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **Backend:** Supabase (PostgreSQL + Auth)
- **Deployment:** Vercel (recommended)
- **Animations:** CSS + Framer Motion (optional)

## Quick Start

### 1. Install dependencies
```bash
cd one-line
npm install
```

### 2. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm start
```

## Project Structure

```
one-line/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Landing page
│   ├── dashboard/           # Main dashboard
│   ├── timer/               # Pomodoro timer
│   ├── tools/               # AI tools library
│   ├── stats/               # Progress stats
│   ├── settings/            # Profile & settings
│   ├── pricing/             # Pricing page
│   └── paywall/             # Subscription paywall
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── ads.tsx              # 5 ad components
│   └── bottom-nav.tsx       # Mobile navigation
├── lib/
│   ├── utils.ts             # Helper functions
│   └── supabase.ts          # Database client + types
├── public/                  # Static assets
└── package.json
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page (marketing) |
| `/dashboard` | Main app home |
| `/timer` | Pomodoro timer |
| `/tools` | AI tools library |
| `/stats` | Progress & achievements |
| `/settings` | Profile & preferences |
| `/pricing` | Pricing page |
| `/paywall` | Subscription paywall |

## Ad System

5 ad types built-in:
1. **Banner Ad** - Inline cards
2. **Native Feed Ad** - Looks like content
3. **Interstitial Ad** - Full-screen with countdown
4. **Rewarded Ad** - Opt-in for rewards
5. **Upgrade Banner** - Sticky bottom

## Subscription Tiers

| Feature | Free | Pro | Max |
|---------|------|-----|-----|
| Daily Pomodoro | 3 | Unlimited | Unlimited |
| AI Tools | 10 | 100+ | 100+ |
| History | 7 days | Unlimited | Unlimited |
| Study Systems | 1 | All | All |
| AI Summarizer | — | — | 50/day |
| Personal AI Tutor | — | — | ✓ |
| Price | $0 | $4.99/mo | $9.99/mo |

## Backend Setup (Supabase)

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `lib/supabase.ts` in the Supabase SQL editor
3. Add environment variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Deployment to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Roadmap

- [x] Landing page
- [x] Dashboard
- [x] Pomodoro Timer
- [x] AI Tools library
- [x] Stats & achievements
- [x] Settings
- [x] Pricing page
- [x] Paywall
- [x] Ad components
- [x] Supabase schema
- [ ] Real authentication flow
- [ ] Stripe payment integration
- [ ] Telegram Mini App deployment
- [ ] Push notifications
- [ ] Multi-language support

## Marketing Plan

The full 24-week roadmap is in `../study-ai-hub/ROADMAP.md`.

## License

MIT - Free to use, modify, and distribute.

---

Built with ✨ by a solo developer.
=======
# one-line-app
>>>>>>> 31ff23af810aef7ef8e9276846cbfa25348ddd6d
