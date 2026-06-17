"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"
import {
  ArrowLeft,
  ChevronRight,
  Crown,
  User,
  Lock,
  Bell,
  Palette,
  Globe,
  Target,
  Timer,
  HelpCircle,
  MessageSquare,
  Star,
  Info,
  LogOut,
  Trash2,
  Sparkles,
} from "lucide-react"

const sections = [
  {
    title: "ACCOUNT",
    items: [
      { icon: User, label: "Edit Profile", sublabel: "Name, avatar" },
      { icon: Lock, label: "Change Password", sublabel: "Last changed 30 days ago" },
      { icon: Bell, label: "Notifications", sublabel: "Daily reminders, alerts" },
    ],
  },
  {
    title: "STUDY",
    items: [
      { icon: Target, label: "Daily Goal", sublabel: "Currently 120 min" },
      { icon: Timer, label: "Timer Durations", sublabel: "Focus: 53m, Break: 17m" },
      { icon: Sparkles, label: "Study Systems", sublabel: "Pomodoro, Cornell, Feynman" },
    ],
  },
  {
    title: "APPEARANCE",
    items: [
      { icon: Palette, label: "Theme", sublabel: "Light" },
      { icon: Globe, label: "Language", sublabel: "English" },
    ],
  },
  {
    title: "SUPPORT",
    items: [
      { icon: HelpCircle, label: "Help Center", sublabel: "FAQs and guides" },
      { icon: MessageSquare, label: "Send Feedback", sublabel: "Help us improve" },
      { icon: Star, label: "Rate the App", sublabel: "Love One Line?" },
      { icon: Info, label: "About", sublabel: "Version 1.0.0" },
    ],
  },
]

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 pb-24">
      <div className="mx-auto max-w-md px-4 pt-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-lg font-bold">Profile & Settings</h1>
          <div className="w-10"></div>
        </div>

        {/* Profile Header */}
        <Card className="mb-4 overflow-hidden border-0 bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-indigo-600 shadow-md">
              A
            </div>
            <h2 className="text-xl font-bold">Ahmed Mohamed</h2>
            <p className="mb-3 text-sm opacity-90">ahmed@email.com</p>
            <Badge className="bg-white/20 text-white hover:bg-white/20">
              <Crown className="mr-1 h-3 w-3" />
              Free Plan
            </Badge>
          </CardContent>
        </Card>

        {/* Stats Row */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          {[
            { label: "Streak", value: "🔥 12" },
            { label: "Hours", value: "87h" },
            { label: "Sessions", value: "142" },
          ].map((s, i) => (
            <Card key={i}>
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upgrade Card */}
        <Card className="mb-4 overflow-hidden border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-600" />
              <span className="font-bold text-yellow-900">Upgrade to Pro</span>
            </div>
            <p className="mb-3 text-sm text-yellow-800">
              Unlock 100+ AI tools, unlimited sessions, advanced analytics, and no ads.
            </p>
            <Button size="sm" variant="gold" asChild className="w-full">
              <Link href="/paywall">Try Pro free for 14 days</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Menu Sections */}
        {sections.map((section, i) => (
          <div key={i} className="mb-4">
            <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {section.title}
            </h3>
            <Card>
              <CardContent className="divide-y p-0">
                {section.items.map((item, j) => (
                  <button
                    key={j}
                    className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
                        <item.icon className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.sublabel}</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Sign Out */}
        <Button variant="outline" className="mb-2 w-full text-red-600 hover:bg-red-50 hover:text-red-700">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
        <button className="mb-4 w-full text-center text-xs text-red-500 hover:underline">
          <Trash2 className="mr-1 inline h-3 w-3" />
          Delete Account
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
