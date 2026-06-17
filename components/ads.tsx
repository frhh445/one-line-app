"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Play, Sparkles, Crown } from "lucide-react"

// 1. BANNER AD (inline)
export function BannerAd() {
  return (
    <Card className="overflow-hidden border">
      <CardContent className="p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wide text-gray-400">Ad</span>
          <span className="text-[10px] text-gray-400">oneline.ad</span>
        </div>
        <div className="flex gap-3">
          <div className="h-16 w-16 shrink-0 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500"></div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Boost your studying with Quizlet</div>
            <div className="text-xs text-gray-500">Flashcards for every subject</div>
          </div>
          <Button size="sm" variant="gradient" className="self-center">
            Install
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// 2. NATIVE FEED AD (looks like content)
export function NativeAd() {
  return (
    <Card className="border-2 border-dashed border-gray-200 bg-gray-50/50">
      <CardContent className="p-4">
        <div className="mb-2 text-[10px] uppercase tracking-wide text-gray-400">Sponsored</div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
            📝
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Notion - Notes & Docs</div>
            <div className="text-xs text-gray-500">All-in-one workspace for students</div>
          </div>
          <Button size="sm" variant="outline">
            Install
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// 3. INTERSTITIAL AD (full screen)
export function InterstitialAd({ onClose }: { onClose: () => void }) {
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    if (countdown === 0) return
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-sm overflow-hidden border-0 shadow-2xl">
        <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 p-3 text-white">
          <span className="text-xs">Sponsored</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={countdown > 0}
            className="h-7 text-xs text-white hover:bg-white/20 disabled:opacity-50"
          >
            {countdown > 0 ? `Skip in ${countdown}...` : "Skip ✕"}
          </Button>
        </div>
        <CardContent className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 text-5xl">
            👑
          </div>
          <h2 className="mb-2 text-2xl font-bold">Try Pro free for 14 days</h2>
          <p className="mb-6 text-sm text-gray-600">
            Unlock all 100+ AI tools, unlimited sessions, and advanced analytics.
          </p>
          <Button size="lg" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600">
            <Sparkles className="mr-2 h-4 w-4" />
            Start Free Trial
          </Button>
          <button
            onClick={onClose}
            className="mt-3 text-xs text-gray-500 hover:underline"
          >
            Maybe later
          </button>
        </CardContent>
      </Card>
    </div>
  )
}

// 4. REWARDED AD (opt-in)
export function RewardedAd({ onWatch }: { onWatch: () => void }) {
  return (
    <Card className="overflow-hidden border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 animate-pulse items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
            <Play className="h-5 w-5 fill-current" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Watch a short ad</div>
            <div className="text-xs text-gray-600">+5 AI prompts or +1 hour of Pro features</div>
          </div>
          <Button size="sm" variant="gradient" onClick={onWatch}>
            Watch & Earn
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// 5. UPGRADE BANNER (sticky bottom)
export function UpgradeBanner({ onClose, onUpgrade }: { onClose: () => void; onUpgrade: () => void }) {
  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 animate-slide-up px-4 md:bottom-4">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 p-3 text-white shadow-2xl">
        <Crown className="h-6 w-6 shrink-0" />
        <div className="flex-1">
          <div className="text-sm font-bold">Unlock unlimited tools</div>
          <div className="text-xs opacity-90">14-day free trial</div>
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={onUpgrade}
          className="bg-white text-orange-600 hover:bg-gray-100"
        >
          Upgrade
        </Button>
        <button onClick={onClose} className="text-white/80 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
