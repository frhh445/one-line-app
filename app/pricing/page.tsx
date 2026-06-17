import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  X,
  Crown,
  Star,
  Sparkles,
  Shield,
  ArrowLeft,
} from "lucide-react"

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect to get started",
    cta: "Get started",
    href: "/dashboard",
    variant: "outline" as const,
    highlight: false,
    badge: null,
    features: [
      { text: "3 Pomodoro sessions/day", included: true },
      { text: "10 AI tools access", included: true },
      { text: "Basic progress tracking", included: true },
      { text: "7-day history", included: true },
      { text: "Ads supported", included: "warning" },
      { text: "Advanced analytics", included: false },
      { text: "All study systems", included: false },
    ],
  },
  {
    name: "Pro",
    icon: Star,
    price: "$4.99",
    period: "/month",
    crossedPrice: "$9.99",
    description: "For serious students",
    cta: "Start Pro trial",
    href: "/paywall",
    variant: "gradient" as const,
    highlight: true,
    badge: "MOST POPULAR",
    features: [
      { text: "Unlimited sessions", included: true },
      { text: "100+ AI tools", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Unlimited history", included: true },
      { text: "All study systems", included: true },
      { text: "Custom themes", included: true },
      { text: "No ads", included: true },
    ],
  },
  {
    name: "Max",
    icon: Crown,
    price: "$9.99",
    period: "/month",
    description: "Maximum power",
    cta: "Go Max",
    href: "/paywall",
    variant: "gold" as const,
    highlight: false,
    badge: "👑",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "AI Summarizer (50/day)", included: true },
      { text: "AI Quiz Generator (20/day)", included: true },
      { text: "Personal AI tutor", included: true },
      { text: "Export reports (PDF)", included: true },
      { text: "Priority support", included: true },
      { text: "Early access to features", included: true },
    ],
  },
]

const comparisonFeatures = [
  { name: "Daily Pomodoro sessions", free: "3", pro: "Unlimited", max: "Unlimited" },
  { name: "AI tools library", free: "10", pro: "100+", max: "100+" },
  { name: "History retention", free: "7 days", pro: "Unlimited", max: "Unlimited" },
  { name: "Study systems", free: "Pomodoro", pro: "All 4", max: "All 4" },
  { name: "Ads", free: "Yes", pro: "No", max: "No" },
  { name: "AI Summarizer", free: "—", pro: "—", max: "50/day" },
  { name: "AI Quiz Generator", free: "—", pro: "—", max: "20/day" },
  { name: "Personal AI tutor", free: "—", pro: "—", max: "✓" },
  { name: "Export reports", free: "—", pro: "—", max: "PDF" },
  { name: "Priority support", free: "—", pro: "—", max: "✓" },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to app
              </Link>
            </Button>
            <Badge className="mb-4" variant="outline">
              <Sparkles className="mr-1 h-3 w-3" />
              Pricing
            </Badge>
            <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
              Choose your{" "}
              <span className="gradient-text">plan</span>
            </h1>
            <p className="text-lg text-gray-600">
              Start free, upgrade anytime. 14-day money-back guarantee.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mb-12 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative ${
                  tier.highlight
                    ? "border-2 border-indigo-500 shadow-2xl scale-105"
                    : tier.variant === "gold"
                    ? "border-2 border-yellow-400"
                    : "border-2"
                }`}
              >
                {tier.badge && (
                  <Badge
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                    variant={tier.highlight ? "gold" : "premium"}
                  >
                    {tier.badge}
                  </Badge>
                )}
                <CardContent className="p-6">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    {tier.icon && <tier.icon className="h-5 w-5 text-yellow-500" />}
                  </div>
                  <div className="my-4 flex items-baseline gap-2">
                    {tier.crossedPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        {tier.crossedPrice}
                      </span>
                    )}
                    <span className="text-4xl font-extrabold">{tier.price}</span>
                    <span className="text-gray-500">{tier.period}</span>
                  </div>
                  <p className="mb-6 text-sm text-gray-600">{tier.description}</p>
                  <ul className="mb-6 space-y-3">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        {f.included === true ? (
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        ) : f.included === "warning" ? (
                          <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-yellow-100 flex items-center justify-center">
                            <span className="text-[10px]">📢</span>
                          </div>
                        ) : (
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-gray-300" />
                        )}
                        <span className={f.included === false ? "text-gray-400 line-through" : ""}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="lg"
                    variant={tier.variant}
                    className="w-full"
                    asChild
                  >
                    <Link href={tier.href}>{tier.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Row */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>Secure payment via Stripe</span>
            </div>
            <span>•</span>
            <span>Cancel anytime</span>
            <span>•</span>
            <span>14-day money-back guarantee</span>
          </div>

          {/* Comparison Table */}
          <Card className="mb-12">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="p-4 text-left text-sm font-semibold">Feature</th>
                      <th className="p-4 text-center text-sm font-semibold">Free</th>
                      <th className="p-4 text-center text-sm font-semibold text-indigo-600">Pro</th>
                      <th className="p-4 text-center text-sm font-semibold text-yellow-600">Max</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {comparisonFeatures.map((f, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-4 text-sm">{f.name}</td>
                        <td className="p-4 text-center text-sm text-gray-600">{f.free}</td>
                        <td className="p-4 text-center text-sm font-medium text-indigo-600">{f.pro}</td>
                        <td className="p-4 text-center text-sm font-medium text-yellow-600">{f.max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-6 text-center text-2xl font-bold">Frequently asked questions</h2>
            <div className="space-y-3">
              {[
                {
                  q: "Can I cancel anytime?",
                  a: "Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
                },
                {
                  q: "What happens after my free trial?",
                  a: "After 14 days, you'll be charged the regular price. You can cancel anytime before the trial ends and won't be charged.",
                },
                {
                  q: "Is there a refund policy?",
                  a: "Yes! We offer a 14-day money-back guarantee. If you're not satisfied, contact us for a full refund.",
                },
                {
                  q: "Can I switch plans?",
                  a: "Absolutely! You can upgrade or downgrade your plan anytime from Settings → Subscription.",
                },
              ].map((faq, i) => (
                <Card key={i}>
                  <CardContent className="p-5">
                    <h3 className="mb-2 font-semibold">{faq.q}</h3>
                    <p className="text-sm text-gray-600">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
