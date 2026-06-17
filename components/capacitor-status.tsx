"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Wifi, WifiOff, Bell, Vibrate, Share2, Check } from "lucide-react"
import { isNative, platform, haptic, hapticSuccess, hapticError, scheduleNotification, share, getAppInfo } from "@/lib/capacitor"

export function CapacitorStatus() {
  const [appInfo, setAppInfo] = useState<{ name: string; version: string; build: string } | null>(null)
  const [result, setResult] = useState<string>("")
  const [online, setOnline] = useState(true)

  useEffect(() => {
    if (isNative()) {
      getAppInfo().then((info) => setAppInfo(info as { name: string; version: string; build: string }))
    }
    setOnline(navigator.onLine)
    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)
    window.addEventListener("online", onOnline)
    window.addEventListener("offline", onOffline)
    return () => {
      window.removeEventListener("online", onOnline)
      window.removeEventListener("offline", onOffline)
    }
  }, [])

  const testHaptic = async (style: "light" | "medium" | "heavy") => {
    await haptic(style)
    setResult(`✅ Haptic ${style} triggered`)
    setTimeout(() => setResult(""), 2000)
  }

  const testNotification = async () => {
    await scheduleNotification({
      title: "🎉 Test Notification",
      body: "If you see this, notifications work!",
    })
    setResult("✅ Notification scheduled")
    setTimeout(() => setResult(""), 2000)
  }

  const testShare = async () => {
    await share({
      title: "One Line ✨",
      text: "Check out One Line - the best study app!",
      url: "https://oneline.app",
    })
    setResult("✅ Share opened")
    setTimeout(() => setResult(""), 2000)
  }

  const testSuccess = async () => {
    await hapticSuccess()
    setResult("✅ Success haptic")
    setTimeout(() => setResult(""), 2000)
  }

  const testError = async () => {
    await hapticError()
    setResult("✅ Error haptic")
    setTimeout(() => setResult(""), 2000)
  }

  return (
    <div className="mx-auto max-w-md space-y-4 p-4">
      <Card>
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold">
              <Smartphone className="h-5 w-5" />
              Native Status
            </h2>
            {isNative() ? (
              <Badge variant="success">
                <Check className="mr-1 h-3 w-3" />
                Native App
              </Badge>
            ) : (
              <Badge variant="outline">Web Browser</Badge>
            )}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Platform:</span>
              <span className="font-mono">{platform()}</span>
            </div>
            {appInfo && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-500">App Name:</span>
                  <span className="font-medium">{appInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Version:</span>
                  <span className="font-mono">{appInfo.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Build:</span>
                  <span className="font-mono">{appInfo.build}</span>
                </div>
              </>
            )}
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Network:</span>
              <span className="flex items-center gap-1">
                {online ? (
                  <>
                    <Wifi className="h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-600">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-4 w-4 text-red-500" />
                    <span className="text-red-600">Offline</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {isNative() && (
        <Card>
          <CardContent className="p-5">
            <h3 className="mb-3 font-semibold">Native Features Test</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <Button onClick={() => testHaptic("light")} size="sm" variant="outline">
                  <Vibrate className="mr-1 h-3 w-3" />
                  Light
                </Button>
                <Button onClick={() => testHaptic("medium")} size="sm" variant="outline">
                  Medium
                </Button>
                <Button onClick={() => testHaptic("heavy")} size="sm" variant="outline">
                  Heavy
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={testSuccess} size="sm" variant="outline" className="border-emerald-300 text-emerald-600">
                  ✓ Success
                </Button>
                <Button onClick={testError} size="sm" variant="outline" className="border-red-300 text-red-600">
                  ✗ Error
                </Button>
              </div>
              <Button onClick={testNotification} className="w-full" variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Test Notification
              </Button>
              <Button onClick={testShare} className="w-full" variant="gradient">
                <Share2 className="mr-2 h-4 w-4" />
                Test Share
              </Button>
              {result && (
                <div className="rounded-xl bg-emerald-50 p-2 text-center text-sm text-emerald-700">
                  {result}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {!isNative() && (
        <Card>
          <CardContent className="p-5">
            <h3 className="mb-2 font-semibold">🌐 Web Mode</h3>
            <p className="text-sm text-gray-600">
              You&apos;re running the web version. To test native features,
              build the APK with{" "}
              <code className="rounded bg-gray-100 px-1">npm run apk:debug</code>{" "}
              and install on an Android device.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
