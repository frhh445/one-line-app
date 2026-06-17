"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  X,
  Check,
  Crown,
  Sparkles,
  Lock,
  Shield,
  ArrowLeft,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$4.99",
    period: "/month",
    sub: "Cancel anytime",
    badge: null,
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "$39.99",
    period: "/year",
    sub: "Just $3.33/month",
    badge: "SAVE 33%",
    badgeColor: "bg-emerald-500",
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "$99.99",
    period: "one-time",
    sub: "Pay once, own forever",
    badge: "LIMITED",
    badgeColor: "bg-yellow-500",
  },
]

const benefits = [
  { title: "Unlimited Pomodoro Sessions", desc: "Study as much as you want, no daily limits" },
  { title: "100+ AI Study Tools", desc: "Unlock the full library of smart prompts" },
  { title: "Advanced Analytics", desc: "Deep insights into your study patterns" },
  { title: "All Study Systems", desc: "Cornell, Feynman, Spaced Repetition" },
  { title: "No Ads, Ever", desc: "Clean, focused studying experience" },
]

export default function PaywallPage() {
  const [selectedPlan, setSelectedPlan] = useState("yearly")

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-indigo-50">
      <div className="mx-auto max-w-md px-4 pt-6">
        {/* Close button */}
        <div className="mb-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <X className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Hero */}
        <div className="mb-6 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 text-4xl shadow-lg">
            👑
          </div>
          <h1 className="mb-2 text-3xl font-extrabold">
            You&apos;ve used all 3 free sessions today
          </h1>
          <p className="text-base text-gray-600">
            Upgrade to Pro for unlimited studying and 100+ AI tools.
          </p>
        </div>

        {/* Benefits */}
        <Card className="mb-4">
          <CardContent className="p-5">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3 py-2">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{b.title}</div>
                  <div className="text-xs text-gray-500">{b.desc}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Plan Selector */}
        <div className="mb-4 space-y-2">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={cn(
                "relative w-full rounded-2xl border-2 bg-white p-4 text-left transition-all",
                selectedPlan === plan.id
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              {plan.badge && (
                <Badge
                  className={cn(
                    "absolute -top-2 right-4 text-xs",
                    plan.badgeColor
                  )}
                >
                  {plan.badge}
                </Badge>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border-2",
                      selectedPlan === plan.id
                        ? "border-indigo-500 bg-indigo-500"
                        : "border-gray-300"
                    )}
                  >
                    {selectedPlan === plan.id && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{plan.name}</div>
                    <div className="text-xs text-gray-500">{plan.sub}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{plan.price}</div>
                  <div className="text-xs text-gray-500">{plan.period}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="sticky bottom-0 -mx-4 mt-4 border-t bg-white px-4 pb-6 pt-4">
          <Button
            size="xl"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Continue with {plans.find((p) => p.id === selectedPlan)?.name}
          </Button>
          <div className="mt-3 flex flex-col items-center gap-1 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Secure payment via Stripe</span>
            </div>
            <span>14-day money-back guarantee</span>
          </div>
          <button className="mt-2 w-full text-center text-xs text-indigo-600 hover:underline">
            Restore Purchase
          </button>
        </div>
      </div>
    </div>
  )
}
