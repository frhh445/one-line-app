import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Tier = "free" | "pro" | "max"
export type Theme = "light" | "dark" | "auto"

interface AppState {
  // User
  isAuthenticated: boolean
  userName: string
  userEmail: string
  userAvatar: string
  tier: Tier

  // Timer settings
  focusDuration: number // minutes
  shortBreakDuration: number
  longBreakDuration: number
  sessionsBeforeLongBreak: number

  // Daily goal
  dailyGoalMinutes: number

  // Stats
  todayMinutes: number
  todaySessions: number
  currentStreak: number
  totalHours: number
  totalSessions: number
  longestStreak: number

  // UI
  theme: Theme
  language: "en" | "ar"
  soundEnabled: boolean
  notificationsEnabled: boolean

  // Ad state
  showUpgradeBanner: boolean
  lastInterstitialShown: number
  rewardedCredits: number

  // Actions
  setUser: (user: Partial<AppState>) => void
  signOut: () => void
  setTier: (tier: Tier) => void
  updateTimerSettings: (settings: Partial<Pick<AppState, "focusDuration" | "shortBreakDuration" | "longBreakDuration" | "sessionsBeforeLongBreak">>) => void
  setDailyGoal: (minutes: number) => void
  addSession: (minutes: number) => void
  setTheme: (theme: Theme) => void
  setLanguage: (lang: "en" | "ar") => void
  toggleSound: () => void
  toggleNotifications: () => void
  dismissUpgradeBanner: () => void
  addRewardedCredits: (amount: number) => void
  useRewardedCredit: () => boolean
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      userName: "Ahmed",
      userEmail: "ahmed@email.com",
      userAvatar: "",
      tier: "free",

      focusDuration: 53,
      shortBreakDuration: 17,
      longBreakDuration: 30,
      sessionsBeforeLongBreak: 4,

      dailyGoalMinutes: 120,

      todayMinutes: 135,
      todaySessions: 3,
      currentStreak: 12,
      totalHours: 87,
      totalSessions: 142,
      longestStreak: 21,

      theme: "light",
      language: "en",
      soundEnabled: true,
      notificationsEnabled: false,

      showUpgradeBanner: true,
      lastInterstitialShown: 0,
      rewardedCredits: 0,

      setUser: (user) => set((s) => ({ ...s, ...user, isAuthenticated: true })),
      signOut: () =>
        set({
          isAuthenticated: false,
          tier: "free",
          rewardedCredits: 0,
        }),
      setTier: (tier) => set({ tier, showUpgradeBanner: tier === "free" }),
      updateTimerSettings: (settings) => set((s) => ({ ...s, ...settings })),
      setDailyGoal: (minutes) => set({ dailyGoalMinutes: minutes }),
      addSession: (minutes) =>
        set((s) => ({
          todayMinutes: s.todayMinutes + minutes,
          todaySessions: s.todaySessions + 1,
          totalSessions: s.totalSessions + 1,
        })),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleNotifications: () =>
        set((s) => ({ notificationsEnabled: !s.notificationsEnabled })),
      dismissUpgradeBanner: () => set({ showUpgradeBanner: false }),
      addRewardedCredits: (amount) =>
        set((s) => ({ rewardedCredits: s.rewardedCredits + amount })),
      useRewardedCredit: () => {
        const credits = get().rewardedCredits
        if (credits > 0) {
          set((s) => ({ rewardedCredits: s.rewardedCredits - 1 }))
          return true
        }
        return false
      },
    }),
    {
      name: "one-line-storage",
    }
  )
)
