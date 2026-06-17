"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"
import {
  BannerAd,
  NativeAd,
  InterstitialAd,
  RewardedAd,
  UpgradeBanner,
} from "@/components/ads"
import { Sparkles, Play } from "lucide-react"

export default function AdDemoPage() {
  const [showInterstitial, setShowInterstitial] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(true)
  const [credits, setCredits] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 pb-24">
      <div className="mx-auto max-w-md px-4 pt-6">
        <h1 className="mb-2 text-2xl font-bold">Ad Components Demo</h1>
        <p className="mb-6 text-sm text-gray-500">
          All 5 ad types ready for your app. Use the buttons to trigger them.
        </p>

        {/* Triggers */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <h2 className="mb-3 font-semibold">Triggers</h2>
            <div className="space-y-2">
              <Button
                onClick={() => setShowInterstitial(true)}
                className="w-full"
                variant="gradient"
              >
                <Play className="mr-2 h-4 w-4" />
                Show Interstitial Ad
              </Button>
              <Button
                onClick={() => setShowUpgrade((s) => !s)}
                className="w-full"
                variant="outline"
              >
                {showUpgrade ? "Hide" : "Show"} Upgrade Banner
              </Button>
            </div>
            {credits > 0 && (
              <Badge variant="success" className="mt-3 w-full justify-center py-2">
                <Sparkles className="mr-1 h-3 w-3" />
                You have {credits} rewarded credits!
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* 1. Banner */}
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-700">1. Banner Ad</h3>
          <BannerAd />
        </div>

        {/* 2. Native */}
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-700">2. Native Feed Ad</h3>
          <NativeAd />
        </div>

        {/* 4. Rewarded */}
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-700">3. Rewarded Ad</h3>
          <RewardedAd onWatch={() => setCredits((c) => c + 5)} />
        </div>
      </div>

      {showInterstitial && (
        <InterstitialAd onClose={() => setShowInterstitial(false)} />
      )}

      {showUpgrade && (
        <UpgradeBanner
          onClose={() => setShowUpgrade(false)}
          onUpgrade={() => alert("Open paywall")}
        />
      )}

      <BottomNav />
    </div>
  )
}
