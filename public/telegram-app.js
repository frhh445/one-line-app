// Telegram Mini App integration script
// Add this to your layout.tsx to enable Telegram features

// In app/layout.tsx, add:
// <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />

// Helper to safely access Telegram WebApp
export function getTelegramWebApp() {
  if (typeof window !== "undefined" && window.Telegram?.WebApp) {
    return window.Telegram.WebApp
  }
  return null
}

// Initialize Telegram Mini App
export function initTelegram() {
  const tg = getTelegramWebApp()
  if (!tg) return null

  tg.ready()
  tg.expand()

  // Apply theme colors
  if (tg.colorScheme === "dark") {
    document.documentElement.classList.add("dark")
  }

  // Set header color
  tg.setHeaderColor("#6366f1")
  tg.setBackgroundColor("#f5f3ff")

  return tg
}

// Trigger haptic feedback
export function hapticImpact(style: "light" | "medium" | "heavy" = "light") {
  const tg = getTelegramWebApp()
  tg?.HapticFeedback.impactOccurred(style)
}

export function hapticNotification(type: "success" | "warning" | "error") {
  const tg = getTelegramWebApp()
  tg?.HapticFeedback.notificationOccurred(type)
}

// Show alert
export function showAlert(message: string) {
  const tg = getTelegramWebApp()
  if (tg) {
    tg.showAlert(message)
  } else {
    alert(message)
  }
}

// Show confirm
export function showConfirm(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    const tg = getTelegramWebApp()
    if (tg) {
      tg.showConfirm(message, resolve)
    } else {
      resolve(confirm(message))
    }
  })
}

// Open external link
export function openLink(url: string) {
  const tg = getTelegramWebApp()
  if (tg) {
    tg.openLink(url)
  } else {
    window.open(url, "_blank")
  }
}

// Close Mini App
export function closeApp() {
  const tg = getTelegramWebApp()
  tg?.close()
}

// Get user info
export function getTelegramUser() {
  const tg = getTelegramWebApp()
  return tg?.initDataUnsafe.user || null
}

// CloudStorage helpers (for saving data on Telegram's servers)
export function setCloudStorage(key: string, value: string): Promise<boolean> {
  return new Promise((resolve) => {
    const tg = getTelegramWebApp()
    if (tg && "CloudStorage" in tg) {
      ;(tg as unknown as {
        CloudStorage: {
          setItem: (k: string, v: string, cb: (err: Error | null, ok: boolean) => void) => void
        }
      }).CloudStorage.setItem(key, value, (err, ok) => {
        resolve(!err && ok)
      })
    } else {
      // Fallback to localStorage
      localStorage.setItem(key, value)
      resolve(true)
    }
  })
}

export function getCloudStorage(key: string): Promise<string | null> {
  return new Promise((resolve) => {
    const tg = getTelegramWebApp()
    if (tg && "CloudStorage" in tg) {
      ;(tg as unknown as {
        CloudStorage: {
          getItem: (k: string, cb: (err: Error | null, val: string) => void) => void
        }
      }).CloudStorage.getItem(key, (err, val) => {
        resolve(err ? null : val)
      })
    } else {
      resolve(localStorage.getItem(key))
    }
  })
}

// TypeScript declarations
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
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
        CloudStorage?: {
          setItem: (key: string, value: string, callback: (error: Error | null, stored: boolean) => void) => void
          getItem: (key: string, callback: (error: Error | null, value: string) => void) => void
          removeItem: (key: string, callback: (error: Error | null, removed: boolean) => void) => void
          getKeys: (callback: (error: Error | null, keys: string[]) => void) => void
        }
      }
    }
  }
}
