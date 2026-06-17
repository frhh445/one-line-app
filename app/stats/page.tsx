"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BottomNav } from "@/components/bottom-nav"
import {
  ArrowLeft,
  Flame,
  Trophy,
  Clock,
  Target,
  Award,
  Lock,
  TrendingUp,
  Sparkles,
  Share2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const weekData = [
  { day: "Mon", minutes: 95, intensity: 4 },
  { day: "Tue", minutes: 120, intensity: 5 },
  { day: "Wed", minutes: 60, intensity: 2 },
  { day: "Thu", minutes: 105, intensity: 4 },
  { day: "Fri", minutes: 135, intensity: 5 },
  { day: "Sat", minutes: 80, intensity: 3 },
  { day: "Sun", minutes: 135, intensity: 5 },
]

const badges = [
  { id: 1, name: "First Step", description: "Complete your first session", icon: "🎯", earned: true },
  { id: 2, name: "Hour Hero", description: "Study for 1 hour total", icon: "⏰", earned: true },
  { id: 3, name: "Week Warrior", description: "7 day streak", icon: "🔥", earned: true },
  { id: 4, name: "Century Club", description: "100 sessions", icon: "💯", earned: true },
  { id: 5, name: "Marathon", description: "5 hours in one day", icon: "🏃", earned: false },
  { id: 6, name: "Scholar", description: "50 hours total", icon: "📚", earned: false },
  { id: 7, name: "Night Owl", description: "Study past midnight", icon: "🦉", earned: false },
  { id: 8, name: "Early Bird", description: "Study before 7am", icon: "🐦", earned: false },
]

const intensityColors = [
  "bg-gray-200",
  "bg-indigo-200",
  "bg-indigo-300",
  "bg-indigo-400",
  "bg-indigo-500",
  "bg-indigo-600",
]

export default function StatsPage() {
  const weeklyTotal = weekData.reduce((sum, d) => sum + d.minutes, 0)
  const goal = 600
  const goalProgress = (weeklyTotal / goal) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 pb-24">
      <div className="mx-auto max-w-md px-4 pt-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-lg font-bold">Your Progress</h1>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Hero Stats Card */}
        <Card className="mb-4 overflow-hidden border-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm opacity-90">This Week</span>
            </div>
            <div className="mb-1 text-5xl font-extrabold">
              {Math.floor(weeklyTotal / 60)}h {weeklyTotal % 60}m
            </div>
            <div className="mb-4 text-sm opacity-90">
              {goalProgress >= 100 ? "🎉 Goal reached!" : `🎯 ${Math.round(goalProgress)}% to your weekly goal`}
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: `${Math.min(100, goalProgress)}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs opacity-90">
              <span>{weeklyTotal} min</span>
              <span>{goal} min goal</span>
            </div>
          </CardContent>
        </Card>

        {/* Streak Section */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <Flame className="mx-auto mb-1 h-7 w-7 text-orange-500" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-gray-500">Current Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="mx-auto mb-1 h-7 w-7 text-yellow-500" />
              <div className="text-2xl font-bold">21</div>
              <div className="text-xs text-gray-500">Longest Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Heatmap */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <h3 className="mb-3 font-semibold">Last 7 Days</h3>
            <div className="grid grid-cols-7 gap-2">
              {weekData.map((d, i) => (
                <div key={i} className="text-center">
                  <div className="mb-1 text-xs text-gray-500">{d.day}</div>
                  <div
                    className={cn(
                      "mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-xs font-semibold text-white",
                      intensityColors[d.intensity]
                    )}
                  >
                    {d.minutes}
                  </div>
                  <div className="mt-1 text-[10px] text-gray-400">min</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Total Stats */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <h3 className="mb-3 font-semibold">Lifetime Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Total Hours", value: "87h", icon: Clock, color: "text-indigo-600" },
                { label: "Sessions", value: "142", icon: Target, color: "text-emerald-600" },
                { label: "Avg/Day", value: "2.3h", icon: TrendingUp, color: "text-purple-600" },
                { label: "Subjects", value: "5", icon: Sparkles, color: "text-orange-600" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                  <s.icon className={cn("h-5 w-5", s.color)} />
                  <div>
                    <div className="text-lg font-bold">{s.value}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">Achievements</h3>
              <Badge variant="gold" className="text-xs">
                <Award className="mr-1 h-3 w-3" />
                4 / 8
              </Badge>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={cn(
                    "flex flex-col items-center text-center",
                    !badge.earned && "opacity-40"
                  )}
                  title={badge.description}
                >
                  <div
                    className={cn(
                      "mb-1 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl",
                      badge.earned
                        ? "bg-gradient-to-br from-yellow-100 to-orange-100"
                        : "bg-gray-100 grayscale"
                    )}
                  >
                    {badge.earned ? badge.icon : <Lock className="h-5 w-5 text-gray-400" />}
                  </div>
                  <div className="text-[10px] font-medium leading-tight">{badge.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
