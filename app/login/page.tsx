"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { FloatingElements } from "@/components/ui/floating-elements"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { GraduationCap, ArrowLeft, LogIn, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const success = await login(email, password)

      if (success) {
        toast({
          title: "Success!",
          description: "You have been logged in successfully",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <FloatingElements />

      <div className="relative z-10 min-h-screen bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 hover-lift">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center space-x-3 mb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                <GraduationCap className="h-10 w-10 text-blue-600 animate-pulse-glow" />
              </motion.div>
              <motion.h1
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                AskSeniors
              </motion.h1>
            </div>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Welcome back to VIT community
            </motion.p>
          </motion.div>

          <AnimatedGradientBorder>
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Sign In</CardTitle>
                <CardDescription className="text-lg">
                  Enter your VIT email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">VIT Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.name@vitstudent.ac.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="py-3 text-lg border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="py-3 text-lg border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                      Forgot password?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover-lift py-3 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-5 w-5" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedGradientBorder>

          <motion.p
            className="text-center text-gray-600 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold hover-lift">
              Create one
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
