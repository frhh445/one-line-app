"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Sparkles, BarChart3, User, Timer } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/timer", label: "Timer", icon: Timer },
  { href: "/tools", label: "AI", icon: Sparkles },
  { href: "/stats", label: "Stats", icon: BarChart3 },
  { href: "/settings", label: "Profile", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 backdrop-blur-md shadow-lg md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-xs transition-all",
                isActive
                  ? "text-indigo-600 scale-105"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-all",
                  isActive && "fill-indigo-100"
                )}
              />
              <span className={cn("font-medium", isActive && "font-bold")}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
