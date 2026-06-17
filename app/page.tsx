import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Timer,
  Sparkles,
  TrendingUp,
  Check,
  ArrowRight,
  Star,
  Zap,
  Brain,
  Target,
  Trophy,
  Users,
  Quote,
  Crown,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">One Line</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Reviews
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/dashboard">Sign in</Link>
            </Button>
            <Button size="sm" asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="premium" className="mb-6 animate-fade-in">
            <Sparkles className="mr-1 h-3 w-3" />
            10,000+ students studying smarter
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl animate-slide-up">
            Study smarter,{" "}
            <span className="gradient-text">not harder.</span>
          </h1>
          <p className="mb-8 text-lg text-gray-600 md:text-xl animate-fade-in">
            One Line combines AI-powered study tools, smart Pomodoro sessions,
            and progress tracking in one beautiful app. Built for students who
            want to actually <em>get</em> things done.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row animate-slide-up">
            <Button size="xl" asChild className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl">
              <Link href="/dashboard">
                Start studying free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="#features">
                <Zap className="mr-2 h-5 w-5" />
                See how it works
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required • Free forever • Cancel anytime
          </p>
        </div>

        {/* Hero Visual */}
        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl"></div>
            <Card className="relative overflow-hidden border-2 shadow-2xl">
              <CardContent className="p-8">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-400">oneline.app</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
                    <div>
                      <div className="text-xs opacity-90">Focus Session</div>
                      <div className="text-2xl font-bold">52:34</div>
                    </div>
                    <Timer className="h-8 w-8" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-emerald-50 p-3 text-center">
                      <div className="text-xs text-gray-600">Today</div>
                      <div className="font-bold text-emerald-600">2h 15m</div>
                    </div>
                    <div className="rounded-lg bg-orange-50 p-3 text-center">
                      <div className="text-xs text-gray-600">Streak</div>
                      <div className="font-bold text-orange-600">🔥 12</div>
                    </div>
                    <div className="rounded-lg bg-indigo-50 p-3 text-center">
                      <div className="text-xs text-gray-600">Sessions</div>
                      <div className="font-bold text-indigo-600">3/4</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-white/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: "10K+", label: "Active students" },
              { number: "500K+", label: "Sessions completed" },
              { number: "100+", label: "AI study tools" },
              { number: "4.9★", label: "App rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-extrabold gradient-text md:text-4xl">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge className="mb-4" variant="outline">
            Features
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Everything you need to{" "}
            <span className="gradient-text">study better</span>
          </h2>
          <p className="text-lg text-gray-600">
            Built by students, for students. No fluff, no distractions, just
            tools that work.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Timer,
              title: "Smart Pomodoro",
              description: "AI-optimized study sessions that adapt to your focus level. 53 min focus + 17 min break.",
              color: "from-indigo-500 to-purple-500",
            },
            {
              icon: Brain,
              title: "AI Tools Library",
              description: "100+ curated prompts for summarizing, quizzing, explaining, and planning. Just tap and go.",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: TrendingUp,
              title: "Progress Tracking",
              description: "Build streaks, earn badges, see your growth. Data-driven motivation that actually works.",
              color: "from-emerald-500 to-teal-500",
            },
            {
              icon: Target,
              title: "Study Systems",
              description: "Cornell, Feynman, Spaced Repetition - all the proven methods in one place.",
              color: "from-orange-500 to-red-500",
            },
            {
              icon: Trophy,
              title: "Achievements",
              description: "Unlock badges as you study. First session, week warrior, century club - gamified growth.",
              color: "from-yellow-500 to-orange-500",
            },
            {
              icon: Sparkles,
              title: "Beautiful Design",
              description: "Dark mode, mobile-first, fast. Looks great and feels even better to use.",
              color: "from-pink-500 to-rose-500",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="group border-2 transition-all hover:border-indigo-200 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-md`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gradient-to-b from-white to-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge className="mb-4" variant="outline">
              Reviews
            </Badge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Loved by{" "}
              <span className="gradient-text">students worldwide</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Sarah M.",
                role: "Med student, Cairo",
                text: "I went from struggling to study 2 hours to 6+ hours a day. The streak system is addictive!",
                rating: 5,
              },
              {
                name: "Ahmed K.",
                role: "High school senior",
                text: "The AI tools saved me hours of work. Summarizing chapters used to take 30 min, now it's 2.",
                rating: 5,
              },
              {
                name: "Maya L.",
                role: "University, Paris",
                text: "Clean, beautiful, and actually works. The Pomodoro timer + tracking is a perfect combo.",
                rating: 5,
              },
            ].map((t, i) => (
              <Card key={i} className="border-2">
                <CardContent className="p-6">
                  <Quote className="mb-3 h-6 w-6 text-indigo-400" />
                  <p className="mb-4 text-sm text-gray-700">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge className="mb-4" variant="outline">
            Pricing
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Simple,{" "}
            <span className="gradient-text">honest pricing</span>
          </h2>
          <p className="text-lg text-gray-600">
            Start free. Upgrade when you&apos;re ready.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Free */}
          <Card className="border-2">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold">Free</h3>
              <div className="my-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">$0</span>
                <span className="text-gray-500">/forever</span>
              </div>
              <p className="mb-6 text-sm text-gray-600">Perfect to get started</p>
              <ul className="space-y-3">
                {[
                  "3 Pomodoro sessions/day",
                  "10 AI tools access",
                  "Basic progress tracking",
                  "7-day history",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="mt-6 w-full" asChild>
                <Link href="/dashboard">Get started</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Pro - Featured */}
          <Card className="relative border-2 border-indigo-500 shadow-xl scale-105">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="gold">
              <Crown className="mr-1 h-3 w-3" />
              Most popular
            </Badge>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold">Pro ⭐</h3>
              <div className="my-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">$4.99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="mb-6 text-sm text-gray-600">For serious students</p>
              <ul className="space-y-3">
                {[
                  "Unlimited sessions",
                  "100+ AI tools",
                  "Advanced analytics",
                  "Unlimited history",
                  "All study systems",
                  "No ads",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" asChild>
                <Link href="/paywall">Start Pro trial</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Max */}
          <Card className="border-2 border-yellow-400">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold">Max 👑</h3>
              <div className="my-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">$9.99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="mb-6 text-sm text-gray-600">Maximum power</p>
              <ul className="space-y-3">
                {[
                  "Everything in Pro",
                  "AI summarizer (50/day)",
                  "Personal AI tutor",
                  "Export reports",
                  "Priority support",
                  "Early access features",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant="gold" className="mt-6 w-full" asChild>
                <Link href="/paywall">Go Max</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20">
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl">
          <CardContent className="p-12 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 opacity-90" />
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Join 10,000+ students studying smarter
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Start your first study session in less than 30 seconds.
            </p>
            <Button size="xl" variant="secondary" asChild className="bg-white text-indigo-600 hover:bg-gray-100">
              <Link href="/dashboard">
                Get started free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">One Line</span>
              </Link>
              <p className="text-sm text-gray-600">
                Smarter studying, one session at a time.
              </p>
            </div>
            <div>
              <h4 className="mb-3 font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#features" className="hover:text-gray-900">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-gray-900">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-gray-900">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">About</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Blog</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">Privacy</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Terms</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
            © 2026 One Line. Made with ✨ for students everywhere.
          </div>
        </div>
      </footer>
    </div>
  )
}
