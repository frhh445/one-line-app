"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"
import {
  Search,
  Lock,
  Sparkles,
  ArrowLeft,
  Copy,
  ExternalLink,
  X,
  BookOpen,
  Calculator,
  Lightbulb,
  Languages,
  FileText,
  Brain,
  Quote,
  Map,
  Mic,
  Star,
  PenTool,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Tool = {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  category: string
  tier: "free" | "pro" | "max"
  prompt: string
}

const tools: Tool[] = [
  // FREE TOOLS
  {
    id: "1",
    name: "Quick Summary",
    description: "Summarize text in 30 seconds",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
    category: "summarize",
    tier: "free",
    prompt: "Please summarize the following text in 3-5 bullet points:\n\n{text}",
  },
  {
    id: "2",
    name: "Simple Explainer",
    description: "Explain complex topics simply",
    icon: Lightbulb,
    color: "bg-yellow-100 text-yellow-600",
    category: "explain",
    tier: "free",
    prompt: "Explain {topic} like I'm 5 years old, using simple language and examples.",
  },
  {
    id: "3",
    name: "Definition Finder",
    description: "Get clear definitions",
    icon: Quote,
    color: "bg-teal-100 text-teal-600",
    category: "explain",
    tier: "free",
    prompt: "Define {term} with 3 examples and a memorable analogy.",
  },
  {
    id: "4",
    name: "Study Notes",
    description: "Convert text to organized notes",
    icon: FileText,
    color: "bg-emerald-100 text-emerald-600",
    category: "notes",
    tier: "free",
    prompt: "Convert this text into organized study notes with headers and bullet points:\n\n{text}",
  },
  // PRO TOOLS
  {
    id: "5",
    name: "Deep Analysis",
    description: "In-depth topic analysis",
    icon: Brain,
    color: "bg-purple-100 text-purple-600",
    category: "explain",
    tier: "pro",
    prompt: "Provide a deep analysis of {topic}, covering history, key concepts, applications, and recent developments.",
  },
  {
    id: "6",
    name: "Quiz Generator",
    description: "Create custom quizzes",
    icon: Calculator,
    color: "bg-orange-100 text-orange-600",
    category: "quiz",
    tier: "pro",
    prompt: "Create a 10-question quiz about {topic} with multiple choice, true/false, and short answer questions. Include answer key.",
  },
  {
    id: "7",
    name: "Translation Pro",
    description: "Multi-language translation",
    icon: Languages,
    color: "bg-indigo-100 text-indigo-600",
    category: "translate",
    tier: "pro",
    prompt: "Translate the following to {language}, maintaining academic tone:\n\n{text}",
  },
  {
    id: "8",
    name: "Essay Outline",
    description: "Structure your essays",
    icon: PenTool,
    color: "bg-pink-100 text-pink-600",
    category: "notes",
    tier: "pro",
    prompt: "Create a detailed essay outline for: {topic}. Include intro, 3-5 body sections, and conclusion.",
  },
  {
    id: "9",
    name: "Mind Map Maker",
    description: "Visualize concepts",
    icon: Map,
    color: "bg-cyan-100 text-cyan-600",
    category: "explain",
    tier: "pro",
    prompt: "Create a mind map structure for {topic} with main branches and sub-topics.",
  },
  // MAX TOOLS
  {
    id: "10",
    name: "AI Tutor Chat",
    description: "Personal AI study assistant",
    icon: Sparkles,
    color: "bg-gradient-to-br from-indigo-500 to-purple-500 text-white",
    category: "explain",
    tier: "max",
    prompt: "You are my personal AI tutor. Teach me about {topic} step by step, ask me questions, and verify my understanding.",
  },
  {
    id: "11",
    name: "Voice Notes",
    description: "Transcribe lectures to notes",
    icon: Mic,
    color: "bg-red-100 text-red-600",
    category: "notes",
    tier: "max",
    prompt: "Convert this lecture transcript into organized study notes with key concepts highlighted:\n\n{text}",
  },
  {
    id: "12",
    name: "Essay Grader",
    description: "AI-powered essay feedback",
    icon: Star,
    color: "bg-gradient-to-br from-yellow-400 to-orange-500 text-white",
    category: "notes",
    tier: "max",
    prompt: "Grade the following essay and provide detailed feedback on structure, arguments, style, and grammar:\n\n{text}",
  },
]

const categories = [
  { id: "all", label: "All" },
  { id: "free", label: "Free", icon: CheckCircle2, color: "text-emerald-500" },
  { id: "pro", label: "Pro 👑", color: "text-yellow-500" },
  { id: "max", label: "Max 💎", color: "text-purple-500" },
  { id: "summarize", label: "Summarize" },
  { id: "quiz", label: "Quiz" },
  { id: "explain", label: "Explain" },
  { id: "translate", label: "Translate" },
  { id: "notes", label: "Notes" },
]

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)

  const filteredTools = tools.filter((tool) => {
    if (activeCategory === "all") return true
    if (activeCategory === "free" || activeCategory === "pro" || activeCategory === "max") {
      return tool.tier === activeCategory
    }
    return tool.category === activeCategory
  }).filter((tool) => {
    if (!searchQuery) return true
    return tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const copyPrompt = (prompt: string) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(prompt)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 pb-24">
      <div className="mx-auto max-w-md px-4 pt-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-lg font-bold">AI Tools</h1>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search 100+ tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border-2 border-gray-200 bg-white py-3 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Usage Banner */}
        <Card className="mb-4 border-2 border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardContent className="p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                <span className="font-semibold text-indigo-600">23</span> / 100 tools used today
              </span>
              <Badge variant="free" className="text-xs">
                Free
              </Badge>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-[23%] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="mb-4 -mx-4 overflow-x-auto px-4 no-scrollbar">
          <div className="flex gap-2 pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredTools.map((tool) => {
            const Icon = tool.icon
            const isLocked = tool.tier !== "free"
            return (
              <Card
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className={cn(
                  "cursor-pointer transition-all active:scale-95",
                  isLocked && "opacity-75"
                )}
              >
                <CardContent className="relative p-4">
                  {isLocked && (
                    <div className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-sm">
                      <Lock className="h-3 w-3 text-gray-400" />
                    </div>
                  )}
                  <div className={cn("mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl", tool.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-semibold">{tool.name}</div>
                  <div className="text-xs text-gray-500">{tool.description}</div>
                  <div className="mt-2">
                    {tool.tier === "free" && <Badge variant="free" className="text-xs">Free</Badge>}
                    {tool.tier === "pro" && <Badge variant="gold" className="text-xs">Pro 👑</Badge>}
                    {tool.tier === "max" && <Badge variant="premium" className="text-xs">Max 💎</Badge>}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="mt-12 text-center">
            <div className="mb-2 text-4xl">🔍</div>
            <p className="text-sm text-gray-500">No tools found</p>
          </div>
        )}
      </div>

      {/* Tool Detail Modal */}
      {selectedTool && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedTool(null)}
        >
          <div
            className="w-full max-w-md animate-slide-up rounded-t-3xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-2xl", selectedTool.color)}>
                <selectedTool.icon className="h-6 w-6" />
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedTool(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <h2 className="mb-1 text-xl font-bold">{selectedTool.name}</h2>
            <p className="mb-4 text-sm text-gray-500">{selectedTool.description}</p>
            <div className="mb-4 rounded-xl bg-gray-50 p-3">
              <div className="text-xs text-gray-500">Prompt template:</div>
              <div className="mt-1 font-mono text-sm">{selectedTool.prompt}</div>
            </div>
            {selectedTool.tier === "free" ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => copyPrompt(selectedTool.prompt)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600"
                  onClick={() => {
                    const url = `https://chat.openai.com/?q=${encodeURIComponent(selectedTool.prompt)}`
                    window.open(url, "_blank")
                  }}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in ChatGPT
                </Button>
              </div>
            ) : (
              <Button
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600"
                asChild
              >
                <Link href="/paywall">
                  <Lock className="mr-2 h-4 w-4" />
                  Upgrade to {selectedTool.tier === "pro" ? "Pro" : "Max"}
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
