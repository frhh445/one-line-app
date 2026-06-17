"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BottomNav } from "@/components/bottom-nav"
import {
  Timer,
  Brain,
  FileText,
  TrendingUp,
  Play,
  Bell,
  Sparkles,
  ArrowRight,
  Clock,
  Flame,
  Trophy,
  Target,
  BookOpen,
  Calculator,
  Languages,
  Lightbulb,
} from "lucide-react"

const quickTools = [
  { icon: BookOpen, name: "Summarize", color: "bg-blue-100 text-blue-600", count: "12 tools" },
  { icon: Calculator, name: "Quiz", color: "bg-orange-100 text-orange-600", count: "8 tools" },
  { icon: Lightbulb, name: "Explain", color: "bg-yellow-100 text-yellow-600", count: "15 tools" },
  { icon: Languages, name: "Translate", color: "bg-emerald-100 text-emerald-600", count: "10 tools" },
]

const recentSessions = [
  { subject: "Math - Calculus", time: "2h ago", duration: "53 min", icon: Calculator, color: "text-blue-600" },
  { subject: "Physics - Mechanics", time: "Yesterday", duration: "47 min", icon: FileText, color: "text-purple-600" },
  { subject: "English - Reading", time: "Yesterday", duration: "38 min", icon: BookOpen, color: "text-emerald-600" },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 pb-24">
      <div className="mx-auto max-w-md px-4 pt-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-lg font-bold text-white shadow-md">
              A
            </div>
            <div>
              <p className="text-sm text-gray-500">Good morning</p>
              <h1 className="text-lg font-bold">Ahmed 👋</h1>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
        </div>

        {/* Streak Banner */}
        <Card className="mb-4 overflow-hidden border-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-2xl font-bold">
                  <Flame className="h-7 w-7" />
                  12 day streak!
                </div>
                <p className="text-sm opacity-90">Keep it going! Don&apos;t break the chain</p>
              </div>
              <Trophy className="h-12 w-12 opacity-50" />
            </div>
          </CardContent>
        </Card>

        {/* Hero Start Card */}
        <Card className="mb-4 overflow-hidden border-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-xl animate-slide-up">
          <CardContent className="relative p-6">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-purple-300/20 blur-xl"></div>
            <div className="relative">
              <Badge className="mb-2 bg-white/20 text-white hover:bg-white/20">
                <Sparkles className="mr-1 h-3 w-3" />
                AI-optimized
              </Badge>
              <h2 className="mb-1 text-2xl font-bold">Ready to focus?</h2>
              <p className="mb-4 text-sm opacity-90">53 minutes of deep work await</p>
              <Button asChild size="lg" className="w-full bg-white text-indigo-600 hover:bg-gray-100">
                <Link href="/timer">
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Start Studying
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Progress */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">Today&apos;s Progress</h3>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Edit
              </Button>
            </div>
            <div className="mb-2 flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">2h 15min</div>
                <div className="text-sm text-gray-500">of 120 min goal</div>
              </div>
              <Badge variant="success">3 of 4 sessions</Badge>
            </div>
            <Progress value={75} className="h-2" />
            <div className="mt-3 text-xs text-gray-500">
              🔥 You&apos;re 15 minutes away from today&apos;s goal!
            </div>
          </CardContent>
        </Card>

        {/* Quick Tools */}
        <div className="mb-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Quick AI Tools</h3>
            <Link href="/tools" className="text-sm text-indigo-600 hover:underline">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickTools.map((tool, i) => (
              <Link key={i} href="/tools">
                <Card className="h-full transition-all hover:border-indigo-300 hover:shadow-md active:scale-95">
                  <CardContent className="p-4">
                    <div className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl ${tool.color}`}>
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <div className="font-semibold">{tool.name}</div>
                    <div className="text-xs text-gray-500">{tool.count}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Quick View */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          {[
            { label: "Total hours", value: "87h", icon: Clock, color: "text-indigo-600" },
            { label: "Sessions", value: "142", icon: Target, color: "text-emerald-600" },
            { label: "Best streak", value: "21", icon: Flame, color: "text-orange-600" },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-3 text-center">
                <stat.icon className={`mx-auto mb-1 h-5 w-5 ${stat.color}`} />
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Sessions */}
        <div className="mb-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Recent Sessions</h3>
            <Link href="/stats" className="text-sm text-indigo-600 hover:underline">
              See all
            </Link>
          </div>
          <Card>
            <CardContent className="divide-y p-0">
              {recentSessions.map((session, i) => (
                <div key={i} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg bg-gray-100 p-2 ${session.color}`}>
                      <session.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{session.subject}</div>
                      <div className="text-xs text-gray-500">{session.time}</div>
                    </div>
                  </div>
                  <Badge variant="outline">{session.duration}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Card */}
        <Card className="mb-4 overflow-hidden border-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
          <CardContent className="p-5">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span className="font-bold">Upgrade to Pro</span>
            </div>
            <p className="mb-3 text-sm opacity-90">
              Unlock 100+ AI tools, unlimited sessions, and no ads.
            </p>
            <Button asChild size="sm" className="w-full bg-white text-orange-600 hover:bg-gray-100">
              <Link href="/paywall">
                Try Pro free for 14 days <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
