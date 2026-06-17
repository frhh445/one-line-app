import type { Metadata } from "next"
import Script from "next/script"
import { CapacitorInit } from "@/components/capacitor-init"
import "./globals.css"

export const metadata: Metadata = {
  title: "One Line ✨ - Smarter studying, one session at a time",
  description: "AI-powered study app with Pomodoro, smart tracking, and 100+ AI tools. Built for students who want to study smarter.",
  keywords: ["study app", "pomodoro", "AI tools", "student productivity", "focus timer"],
  authors: [{ name: "One Line" }],
  openGraph: {
    title: "One Line ✨",
    description: "Smarter studying, one session at a time",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        <CapacitorInit />
        {children}
      </body>
    </html>
  )
}
