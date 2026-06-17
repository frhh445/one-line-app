"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BottomNav } from "@/components/bottom-nav"
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Settings,
  Coffee,
  Brain,
  Volume2,
  VolumeX,
  ArrowLeft,
  Check,
} from "lucide-react"
import { formatTime, cn } from "@/lib/utils"
import { hapticSuccess, hapticError, scheduleNotification } from "@/lib/capacitor"

type TimerMode = "focus" | "shortBreak" | "longBreak"

const TIMER_CONFIG = {
  focus: { duration: 53 * 60, label: "Focus Time", color: "from-indigo-500 to-purple-500", icon: Brain, sessions: 4 },
  shortBreak: { duration: 17 * 60, label: "Short Break", color: "from-emerald-500 to-teal-500", icon: Coffee, sessions: 0 },
  longBreak: { duration: 30 * 60, label: "Long Break", color: "from-blue-500 to-cyan-500", icon: Coffee, sessions: 0 },
}

export default function TimerPage() {
  const [mode, setMode] = useState<TimerMode>("focus")
  const [seconds, setSeconds] = useState(TIMER_CONFIG.focus.duration)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [totalSessions, setTotalSessions] = useState(4)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const config = TIMER_CONFIG[mode]
  const progress = ((config.duration - seconds) / config.duration) * 100

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          handleSessionComplete()
          return 0
        }
        return s - 1
      })
    }, 1000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning])

  useEffect(() => {
    setSeconds(TIMER_CONFIG[mode].duration)
    setIsRunning(false)
  }, [mode])

  const handleSessionComplete = async () => {
    setIsRunning(false)

    // Native haptic feedback (works on Android)
    await hapticSuccess()

    // Native local notification
    await scheduleNotification({
      title: `${mode === "focus" ? "🎉 Focus session complete!" : "⏰ Break over!"}`,
      body: mode === "focus"
        ? "Great work! Time for a break."
        : "Back to focus mode?",
    })

    // Web audio (fallback)
    if (soundEnabled) {
      playNotification()
    }

    if (mode === "focus") {
      const newCount = sessionsCompleted + 1
      setSessionsCompleted(newCount)
      if (newCount % 4 === 0) {
        setMode("longBreak")
      } else {
        setMode("shortBreak")
      }
    } else {
      setMode("focus")
    }
  }

  const playNotification = () => {
    if (typeof window !== "undefined") {
      try {
        const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gain = audioContext.createGain()
        oscillator.connect(gain)
        gain.connect(audioContext.destination)
        oscillator.frequency.value = 800
        oscillator.type = "sine"
        gain.gain.setValueAtTime(0.3, audioContext.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
      } catch (err) {
        console.error('Audio error:', err)
      }
    }
  }

  const requestNotificationPermission = () => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setSeconds(config.duration)
  }

  const handleSkip = () => {
    setIsRunning(false)
    if (mode === "focus") {
      const newCount = sessionsCompleted + 1
      setSessionsCompleted(newCount)
      if (newCount % 4 === 0) {
        setMode("longBreak")
      } else {
        setMode("shortBreak")
      }
    } else {
      setMode("focus")
    }
  }

  const circumference = 2 * Math.PI * 140
  const strokeDashoffset = circumference - (progress / 100) * circumference

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
          <h1 className="text-lg font-bold">Focus Timer</h1>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="mb-8 flex gap-2 rounded-2xl bg-white p-1 shadow-sm">
          {(["focus", "shortBreak", "longBreak"] as TimerMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-all",
                mode === m
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {TIMER_CONFIG[m].label}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-4">
            <svg className="h-80 w-80 -rotate-90 transform" viewBox="0 0 300 300">
              <circle
                cx="150"
                cy="150"
                r="140"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="150"
                cy="150"
                r="140"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Badge className={cn("mb-3 bg-gradient-to-r text-white", config.color)}>
                <config.icon className="mr-1 h-3 w-3" />
                {config.label}
              </Badge>
              <div className="text-6xl font-extrabold tabular-nums tracking-tight md:text-7xl">
                {formatTime(seconds)}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Session {Math.min(sessionsCompleted + 1, totalSessions)} of {totalSessions}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="h-14 w-14 rounded-2xl"
          >
            <RotateCcw className="h-6 w-6" />
          </Button>
          <Button
            size="xl"
            onClick={() => {
              requestNotificationPermission()
              setIsRunning(!isRunning)
            }}
            className={cn(
              "h-20 w-20 rounded-full bg-gradient-to-r shadow-xl",
              config.color,
              "hover:scale-105"
            )}
          >
            {isRunning ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 fill-current ml-1" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleSkip}
            className="h-14 w-14 rounded-2xl"
          >
            <SkipForward className="h-6 w-6" />
          </Button>
        </div>

        {/* Today's Progress */}
        <Card>
          <CardContent className="p-5">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Today&apos;s Sessions</h3>
              <span className="text-xs text-gray-500">
                {sessionsCompleted}/{totalSessions}
              </span>
            </div>
            <Progress value={(sessionsCompleted / totalSessions) * 100} className="h-2 mb-3" />
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>🔥 {Math.floor(sessionsCompleted * 53)} min focused</span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-emerald-500" />
                Goal: {totalSessions * 53} min
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
