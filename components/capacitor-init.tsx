"use client"

import { useEffect, useState } from "react"
import { initCapacitor, isNative, getAppInfo } from "@/lib/capacitor"

export function CapacitorInit() {
  const [appInfo, setAppInfo] = useState<{ name: string; version: string } | null>(null)

  useEffect(() => {
    initCapacitor()
    getAppInfo().then(setAppInfo)
  }, [])

  if (!isNative() || !appInfo) return null

  // Show app version in dev mode
  if (process.env.NODE_ENV === "development") {
    return (
      <div className="fixed bottom-20 left-2 z-50 rounded-lg bg-black/80 px-2 py-1 text-[10px] text-white md:bottom-2">
        📱 {appInfo.name} v{appInfo.version}
      </div>
    )
  }

  return null
}
