import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { QuestionProvider } from "@/components/question-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "AskSeniors VIT",
  description: "Connect with seniors, alumni, and faculty at VIT",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QuestionProvider>
            {children}
            <Toaster />
          </QuestionProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
