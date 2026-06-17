"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Check, X } from "lucide-react"

interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
    }
  }
  version: string
  platform: string
  colorScheme: "light" | "dark"
  themeParams: Record<string, string>
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  ready: () => void
  expand: () => void
  close: () => void
  HapticFeedback: {
    impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void
    notificationOccurred: (type: "error" | "success" | "warning") => void
  }
  MainButton: {
    text: string
    show: () => void
    hide: () => void
    onClick: (cb: () => void) => void
  }
  BackButton: {
    show: () => void
    hide: () => void
    onClick: (cb: () => void) => void
  }
  setHeaderColor: (color: string) => void
  setBackgroundColor: (color: string) => void
  openLink: (url: string) => void
  showAlert: (message: string, cb?: () => void) => void
  showConfirm: (message: string, cb: (confirmed: boolean) => void) => void
  enableClosingConfirmation: () => void
  disableClosingConfirmation: () => void
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

export default function TelegramTestPage() {
  const [isTelegram, setIsTelegram] = useState(false)
  const [user, setUser] = useState<TelegramWebApp["initDataUnsafe"]["user"] | null>(null)
  const [hapticResult, setHapticResult] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()
      tg.expand()
      setIsTelegram(true)
      setUser(tg.initDataUnsafe.user || null)
    }
  }, [])

  const testHaptic = (style: "light" | "medium" | "heavy") => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred(style)
      setHapticResult(`Haptic ${style} triggered!`)
      setTimeout(() => setHapticResult(""), 2000)
    }
  }

  const testNotification = (type: "success" | "warning" | "error") => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred(type)
      setHapticResult(`Notification ${type}!`)
      setTimeout(() => setHapticResult(""), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 p-4">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-bold">Telegram Mini App Test</h1>
        </div>

        <Card className="mb-4">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">Environment</h2>
              {isTelegram ? (
                <Badge variant="success" className="gap-1">
                  <Check className="h-3 w-3" /> Telegram Detected
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <X className="h-3 w-3" /> Not in Telegram
                </Badge>
              )}
            </div>

            {user && (
              <div className="rounded-xl bg-gray-50 p-3 text-sm">
                <div>
                  <span className="text-gray-500">User:</span>{" "}
                  <span className="font-medium">
                    {user.first_name} {user.last_name}
                  </span>
                </div>
                {user.username && (
                  <div>
                    <span className="text-gray-500">Username:</span>{" "}
                    <span className="font-medium">@{user.username}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-500">ID:</span>{" "}
                  <span className="font-mono text-xs">{user.id}</span>
                </div>
              </div>
            )}

            {!isTelegram && (
              <div className="mt-3 rounded-xl bg-yellow-50 p-3 text-sm text-yellow-800">
                ⚠️ Open this page inside Telegram to test Mini App features.
              </div>
            )}
          </CardContent>
        </Card>

        {isTelegram && (
          <>
            <Card className="mb-4">
              <CardContent className="p-5">
                <h2 className="mb-3 font-semibold">Haptic Feedback</h2>
                <div className="grid grid-cols-3 gap-2">
                  <Button onClick={() => testHaptic("light")} variant="outline" size="sm">
                    Light
                  </Button>
                  <Button onClick={() => testHaptic("medium")} variant="outline" size="sm">
                    Medium
                  </Button>
                  <Button onClick={() => testHaptic("heavy")} variant="outline" size="sm">
                    Heavy
                  </Button>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <Button onClick={() => testNotification("success")} size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                    Success
                  </Button>
                  <Button onClick={() => testNotification("warning")} size="sm" className="bg-yellow-500 hover:bg-yellow-600">
                    Warning
                  </Button>
                  <Button onClick={() => testNotification("error")} size="sm" className="bg-red-500 hover:bg-red-600">
                    Error
                  </Button>
                </div>
                {hapticResult && (
                  <div className="mt-3 rounded-xl bg-emerald-50 p-2 text-center text-sm text-emerald-700">
                    {hapticResult}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardContent className="p-5">
                <h2 className="mb-3 font-semibold">Telegram Features Used in One Line</h2>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    Auto-detect user & set avatar
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    Haptic feedback on timer complete
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    Theme sync (light/dark)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    Native back button
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    CloudStorage for settings
                  </li>
                </ul>
              </CardContent>
            </Card>
          </>
        )}

        <div className="text-center text-xs text-gray-500">
          Open this URL inside a Telegram bot to test the Mini App
        </div>
      </div>
    </div>
  )
}
