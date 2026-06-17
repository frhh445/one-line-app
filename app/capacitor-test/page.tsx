import { CapacitorStatus } from "@/components/capacitor-status"
import { CapacitorInit } from "@/components/capacitor-init"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CapacitorTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto max-w-md px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-lg font-bold">Native Test</h1>
          <div className="w-10" />
        </div>
        <CapacitorStatus />
      </div>
      <CapacitorInit />
    </div>
  )
}
