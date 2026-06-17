// Supabase client configuration
// To use: replace the placeholders with your actual Supabase project credentials
// Get them from: https://supabase.com/dashboard

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type SubscriptionTier = "free" | "pro" | "max"
export type UserRole = "admin" | "deputy" | "teacher" | "student" | "guest"

export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  tier: SubscriptionTier
  role: UserRole
  daily_goal_minutes: number
  created_at: string
}

export interface StudySession {
  id: string
  user_id: string
  started_at: string
  ended_at: string
  duration_minutes: number
  type: "focus" | "short_break" | "long_break"
  subject?: string
  completed: boolean
}

export interface DailyStats {
  user_id: string
  date: string
  total_minutes: number
  sessions_completed: number
  goal_minutes: number
}

// Database schema (run this in Supabase SQL editor):
/*
-- Users table (extends auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'max')),
  role TEXT DEFAULT 'student' CHECK (role IN ('admin', 'deputy', 'teacher', 'student', 'guest')),
  daily_goal_minutes INTEGER DEFAULT 120,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Study sessions
CREATE TABLE public.study_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  duration_minutes INTEGER DEFAULT 0,
  type TEXT CHECK (type IN ('focus', 'short_break', 'long_break')),
  subject TEXT,
  completed BOOLEAN DEFAULT FALSE
);

-- Daily stats (materialized view for performance)
CREATE MATERIALIZED VIEW daily_stats AS
SELECT
  user_id,
  DATE(started_at) as date,
  SUM(duration_minutes) as total_minutes,
  COUNT(*) FILTER (WHERE completed) as sessions_completed
FROM study_sessions
WHERE type = 'focus'
GROUP BY user_id, DATE(started_at);

-- Indexes
CREATE INDEX idx_sessions_user_id ON study_sessions(user_id);
CREATE INDEX idx_sessions_started_at ON study_sessions(started_at DESC);
CREATE UNIQUE INDEX idx_daily_stats ON daily_stats(user_id, date);

-- Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own sessions" ON public.study_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions" ON public.study_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
*/

// Helper functions
export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  })
  return { data, error }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signOut() {
  return await supabase.auth.signOut()
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
