// Capacitor integration - works on Web + Android + iOS
// This file provides native features when running in Capacitor,
// and falls back to web APIs when running in a regular browser.

import { Capacitor } from '@capacitor/core'
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'
import { LocalNotifications } from '@capacitor/local-notifications'
import { Preferences } from '@capacitor/preferences'
import { Share } from '@capacitor/share'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'
import { App } from '@capacitor/app'
import { Keyboard } from '@capacitor/keyboard'
import { Network } from '@capacitor/network'

// =====================
// Platform Detection
// =====================
export const isNative = () => Capacitor.isNativePlatform()
export const platform = () => Capacitor.getPlatform() // 'ios' | 'android' | 'web'
export const isAndroid = () => Capacitor.getPlatform() === 'android'
export const isIOS = () => Capacitor.getPlatform() === 'ios'
export const isWeb = () => Capacitor.getPlatform() === 'web'

// =====================
// Initialization
// =====================
export async function initCapacitor() {
  if (!isNative()) return

  try {
    // Configure status bar
    await StatusBar.setStyle({ style: Style.Dark })
    await StatusBar.setBackgroundColor({ color: '#6366f1' })

    // Hide splash screen after 1.5s
    setTimeout(async () => {
      await SplashScreen.hide()
    }, 1500)

    // Request notification permissions (Android 13+)
    if (isAndroid()) {
      const perms = await LocalNotifications.requestPermissions()
      console.log('Notification permission:', perms.display)
    }

    // Setup network listener
    Network.addListener('networkStatusChange', (status) => {
      console.log('Network status:', status)
      if (!status.connected) {
        showToast('You\'re offline. Some features may not work.')
      }
    })

    // Handle app state changes
    App.addListener('appStateChange', ({ isActive }) => {
      console.log('App state changed. Active:', isActive)
    })

    // Handle back button (Android)
    App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        App.exitApp()
      } else {
        window.history.back()
      }
    })

    console.log('✅ Capacitor initialized for', platform())
  } catch (err) {
    console.error('Capacitor init error:', err)
  }
}

// =====================
// Haptic Feedback
// =====================
export async function haptic(style: 'light' | 'medium' | 'heavy' = 'light') {
  if (!isNative()) {
    // Web fallback: vibrate
    if ('vibrate' in navigator) {
      const duration = style === 'light' ? 10 : style === 'medium' ? 20 : 30
      navigator.vibrate(duration)
    }
    return
  }

  try {
    const impactStyle =
      style === 'light' ? ImpactStyle.Light :
      style === 'medium' ? ImpactStyle.Medium :
      ImpactStyle.Heavy
    await Haptics.impact({ style: impactStyle })
  } catch (err) {
    console.error('Haptic error:', err)
  }
}

export async function hapticSuccess() {
  if (!isNative()) return
  try {
    await Haptics.notification({ type: NotificationType.Success })
  } catch (err) {
    console.error('Haptic notification error:', err)
  }
}

export async function hapticError() {
  if (!isNative()) return
  try {
    await Haptics.notification({ type: NotificationType.Error })
  } catch (err) {
    console.error('Haptic notification error:', err)
  }
}

export async function hapticWarning() {
  if (!isNative()) return
  try {
    await Haptics.notification({ type: NotificationType.Warning })
  } catch (err) {
    console.error('Haptic notification error:', err)
  }
}

// =====================
// Local Notifications
// =====================
export async function scheduleNotification(options: {
  title: string
  body: string
  scheduleAt?: Date
  id?: number
}) {
  if (!isNative()) {
    // Web fallback: browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(options.title, { body: options.body })
    }
    return
  }

  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: options.title,
          body: options.body,
          id: options.id ?? Math.floor(Math.random() * 100000),
          schedule: options.scheduleAt
            ? { at: options.scheduleAt }
            : undefined,
          sound: 'beep.wav',
          attachments: undefined,
          actionTypeId: '',
          extra: null,
        },
      ],
    })
  } catch (err) {
    console.error('Notification error:', err)
  }
}

// Schedule daily study reminder
export async function scheduleDailyReminder(hour: number = 19, minute: number = 0) {
  if (!isNative()) return

  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: '⏰ Time to study!',
          body: 'Your daily session awaits. Keep your streak going!',
          id: 100,
          schedule: {
            repeats: true,
            on: { hour, minute },
          },
          sound: 'beep.wav',
        },
      ],
    })
  } catch (err) {
    console.error('Reminder error:', err)
  }
}

// Cancel all notifications
export async function cancelAllNotifications() {
  if (!isNative()) return
  try {
    const pending = await LocalNotifications.getPending()
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel({
        notifications: pending.notifications,
      })
    }
  } catch (err) {
    console.error('Cancel notifications error:', err)
  }
}

// =====================
// Preferences (replaces localStorage on native)
// =====================
export async function setPref(key: string, value: string) {
  if (!isNative()) {
    localStorage.setItem(key, value)
    return
  }
  try {
    await Preferences.set({ key, value })
  } catch (err) {
    console.error('Set pref error:', err)
  }
}

export async function getPref(key: string): Promise<string | null> {
  if (!isNative()) {
    return localStorage.getItem(key)
  }
  try {
    const { value } = await Preferences.get({ key })
    return value
  } catch (err) {
    console.error('Get pref error:', err)
    return null
  }
}

export async function removePref(key: string) {
  if (!isNative()) {
    localStorage.removeItem(key)
    return
  }
  try {
    await Preferences.remove({ key })
  } catch (err) {
    console.error('Remove pref error:', err)
  }
}

// =====================
// Share
// =====================
export async function share(options: {
  title?: string
  text: string
  url?: string
  dialogTitle?: string
}) {
  if (!isNative()) {
    // Web fallback: copy to clipboard + open share dialog if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: options.title,
          text: options.text,
          url: options.url,
        })
      } catch {
        // User cancelled
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${options.text} ${options.url ?? ''}`)
      showToast('Copied to clipboard!')
    }
    return
  }

  try {
    await Share.share({
      title: options.title,
      text: options.text,
      url: options.url,
      dialogTitle: options.dialogTitle,
    })
  } catch (err) {
    console.error('Share error:', err)
  }
}

// =====================
// Keyboard (mobile)
// =====================
export async function hideKeyboard() {
  if (!isNative()) return
  try {
    await Keyboard.hide()
  } catch (err) {
    console.error('Keyboard hide error:', err)
  }
}

// =====================
// App Info
// =====================
export async function getAppInfo() {
  try {
    const info = await App.getInfo()
    return info
  } catch (err) {
    return { name: 'One Line', version: '1.0.0', build: '', id: 'web' }
  }
}

// =====================
// Toast (simple notification)
// =====================
export function showToast(message: string, duration: number = 3000) {
  if (typeof document === 'undefined') return

  // Remove existing toast
  const existing = document.getElementById('app-toast')
  if (existing) existing.remove()

  const toast = document.createElement('div')
  toast.id = 'app-toast'
  toast.textContent = message
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 14px;
    z-index: 9999;
    max-width: 80%;
    text-align: center;
    animation: slideUp 0.3s ease-out;
  `
  document.body.appendChild(toast)

  setTimeout(() => {
    toast.style.opacity = '0'
    toast.style.transition = 'opacity 0.3s'
    setTimeout(() => toast.remove(), 300)
  }, duration)
}
