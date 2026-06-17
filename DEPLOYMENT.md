# One Line - Deployment Guide

> Get your app live in 15 minutes. Free hosting included.

---

## Step 1: Push to GitHub (5 minutes)

```bash
cd one-line
git init
git add .
git commit -m "Initial commit - One Line MVP"
git branch -M main
git remote add origin https://github.com/your-username/one-line.git
git push -u origin main
```

---

## Step 2: Deploy to Vercel (3 minutes)

### Option A: One-Click Deploy
1. Go to https://vercel.com
2. Click "Import Project"
3. Select your GitHub repo
4. Click "Deploy"

### Option B: CLI Deploy
```bash
npm i -g vercel
vercel
# Follow prompts
```

### Option C: Auto-Deploy
- Connect GitHub to Vercel
- Every push to `main` auto-deploys
- Preview URLs for every PR

---

## Step 3: Setup Supabase (5 minutes)

### 1. Create Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Choose region (closest to your users)
4. Set database password (save it!)

### 2. Run Schema
1. Go to SQL Editor in Supabase
2. Copy the SQL from `lib/supabase.ts` (the commented block)
3. Paste and run

### 3. Get Credentials
1. Settings → API
2. Copy `URL` and `anon public` key
3. Add to Vercel environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

### 4. Redeploy
Vercel will auto-redeploy with new env vars.

---

## Step 4: Setup Telegram Mini App (Optional, 2 minutes)

### 1. Create Bot
1. Open Telegram, message @BotFather
2. Send `/newbot`
3. Follow prompts to create bot
4. Copy the **bot token**

### 2. Configure Mini App
1. Send `/newapp` to @BotFather
2. Select your bot
3. Set title: "One Line"
4. Set description
5. Set photo (use a 640x360 image)
6. Set **Web App URL** to your Vercel URL
7. Copy the **short_name**

### 3. Test
1. Open your bot in Telegram
2. Tap the menu button → your Mini App opens
3. Test all features (haptic, theme, etc.)

---

## Step 5: Setup Stripe (Optional, for paid plans)

### 1. Create Account
1. Go to https://stripe.com
2. Create account
3. Get API keys (test mode first)

### 2. Create Products
In Stripe Dashboard:
- Product 1: "Pro Monthly" - $4.99/month recurring
- Product 2: "Pro Yearly" - $39.99/year recurring
- Product 3: "Max Lifetime" - $99.99 one-time

### 3. Add Webhook
- Endpoint: `https://your-app.vercel.app/api/stripe-webhook`
- Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

### 4. Add to Vercel
```
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

---

## Step 6: Setup Monetization Ads (Optional)

### Google AdMob (for native apps)
1. Create account at https://admob.google.com
2. Create app + ad units
3. Integrate via react-native-google-mobile-ads

### Telegram Ads
- Use Telegram's official Ad Platform
- Available to bots with 1000+ users

### Custom Sponsors
- Contact edtech brands directly
- Negotiate CPM rates
- Implement via existing `components/ads.tsx`

---

## Post-Deployment Checklist

```
□ Landing page works
□ Dashboard loads
□ Timer counts down correctly
□ Tools page displays 12 tools
□ Stats page shows charts
□ Settings page navigates
□ Pricing page displays 3 tiers
□ Paywall page shows plans
□ Mobile responsive (test on phone)
□ Telegram Mini App loads (if configured)
□ Auth works (sign up + sign in)
□ Streak counter persists
□ Theme toggle works
```

---

## Monitoring

### Vercel Analytics
- Built-in, no setup needed
- Tracks: page views, performance, errors

### Supabase Logs
- Real-time query monitoring
- Auth events
- Database performance

### Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

## Custom Domain

### 1. Buy Domain
- Namecheap, Cloudflare, Google Domains

### 2. Add to Vercel
- Vercel Dashboard → Settings → Domains
- Add your domain
- Update DNS as instructed

### 3. SSL
- Automatic via Vercel
- Renews automatically

---

## Scaling

### When you hit limits:
- **Vercel:** Upgrade to Pro ($20/mo) for more bandwidth
- **Supabase:** Upgrade to Pro ($25/mo) for more storage
- **Stripe:** 2.9% + 30¢ per transaction
- **Database:** Add indexes, optimize queries

### Free Tier Limits:
- **Vercel:** 100GB bandwidth/month
- **Supabase:** 500MB DB, 1GB storage
- **Total free:** ~50k users/month

---

## Troubleshooting

### "Module not found"
```bash
rm -rf node_modules .next
npm install
```

### Build fails on Vercel
- Check Node version (should be 18+)
- Check environment variables are set
- Check `package.json` scripts

### Supabase not connecting
- Verify URL and anon key
- Check RLS policies
- Test in Supabase SQL editor

### Telegram not detecting
- Open in actual Telegram (not browser)
- Check HTTPS (required for Mini Apps)
- Verify URL in @BotFather

---

## Go Live Checklist

```
✅ Code on GitHub
✅ Deployed to Vercel
✅ Supabase configured
✅ Domain connected (optional)
✅ Telegram bot setup (optional)
✅ Stripe integrated (for paid plans)
✅ Analytics tracking
✅ Error monitoring
✅ Backup strategy
✅ Marketing plan ready
```

---

**You're live! 🎉**

Now share your app:
- Twitter/X with #buildinpublic
- Reddit r/SideProject
- Product Hunt (after 100 users)
- IndieHackers

First 100 users are the hardest. Then momentum builds.
