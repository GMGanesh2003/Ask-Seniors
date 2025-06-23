"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { FloatingIcons } from "@/components/ui/floating-icons"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import {
  GraduationCap,
  Users,
  MessageCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Star,
  Zap,
  Heart,
  BookOpen,
  Trophy,
  Target,
  Rocket,
  Globe,
  Shield,
} from "lucide-react"

export default function HomePage() {
  const typingTexts = [
    "Ask your doubts to seniors...",
    "Connect with alumni...",
    "Get placement guidance...",
    "Share your success story...",
    "Build your network...",
  ]

  const features = [
    {
      icon: MessageCircle,
      title: "Ask & Answer",
      description: "Get your doubts cleared instantly by seniors and alumni",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      title: "Connect & Network",
      description: "Build meaningful connections across batches and branches",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: TrendingUp,
      title: "Placement Prep",
      description: "Learn from successful alumni placement journeys",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      icon: BookOpen,
      title: "Study Together",
      description: "Form study groups and collaborate on projects",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: Trophy,
      title: "Achievements",
      description: "Celebrate success stories and get recognized",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Shield,
      title: "Verified Community",
      description: "Secure platform with college email verification",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
    },
  ]

  const stats = [
    { number: 2847, label: "Active Students", icon: Users },
    { number: 1234, label: "Alumni Network", icon: GraduationCap },
    { number: 5678, label: "Questions Answered", icon: MessageCircle },
    { number: 892, label: "Success Stories", icon: Star },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <FloatingIcons />

      {/* Header */}
      <header className="relative z-20 bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <GraduationCap className="h-10 w-10 text-blue-600 animate-pulse-glow" />
                <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AskSeniors
                </h1>
                <span className="text-xs text-gray-500 bg-gradient-to-r from-orange-400 to-red-500 px-2 py-1 rounded-full text-white font-medium">
                  VIT Community
                </span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" className="hover-glow" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover-lift"
                asChild
              >
                <Link href="/register">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-bounce-in">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Connect with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                Seniors
              </span>
              <br />
              Learn from{" "}
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Alumni
              </span>
            </h2>
          </div>

          <div className="text-2xl text-gray-600 mb-8 h-16 flex items-center justify-center">
            <TypingAnimation texts={typingTexts} className="font-medium" />
          </div>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-slide-up">
            Join the most vibrant VIT community where students connect, learn, and grow together. Get your doubts
            cleared, share experiences, and build lasting connections.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover-lift px-8 py-4 text-lg"
              asChild
            >
              <Link href="/register">
                <Rocket className="mr-2 h-5 w-5" />
                Join Community
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-300 hover:bg-purple-50 hover-lift px-8 py-4 text-lg"
              asChild
            >
              <Link href="/explore">
                <Globe className="mr-2 h-5 w-5" />
                Explore Questions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center hover-lift glass-effect border-white/30 animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    <AnimatedCounter end={stat.number} />
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AskSeniors?
              </span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing features designed to enhance your college experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`hover-lift hover-glow transition-all duration-300 border-0 shadow-xl ${feature.bgColor} animate-bounce-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 border-0 shadow-2xl hover-lift">
            <CardContent className="p-12">
              <div className="flex justify-center mb-6">
                <div className="flex space-x-2">
                  <Heart className="h-8 w-8 text-white animate-bounce" />
                  <Zap className="h-8 w-8 text-white animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <Target className="h-8 w-8 text-white animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">Ready to Transform Your VIT Experience?</h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of VIT students who are already connecting, learning, and growing together
              </p>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl hover-lift px-8 py-4 text-lg font-semibold"
                asChild
              >
                <Link href="/register">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AskSeniors VIT
              </span>
            </div>
            <p className="text-gray-400 text-lg mb-8">
              Connecting VIT students with seniors, alumni, and faculty for a brighter future
            </p>
            <div className="flex justify-center space-x-6">
              <Badge variant="secondary" className="bg-blue-600 text-white px-4 py-2">
                Made with ❤️ for VIT
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
