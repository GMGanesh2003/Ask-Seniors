"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThreeDCard } from "@/components/ui/3d-card"
import { RequireAuth } from "@/components/require-auth"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import {
  GraduationCap,
  Search,
  Plus,
  MessageSquare,
  LogOut,
  TrendingUp,
  BookOpen,
  Award,
  Zap,
  Users,
  Star,
  Calendar,
} from "lucide-react"
import { motion } from "framer-motion"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { QuestionCard } from "@/components/question-card"
import { useQuestions } from "@/components/question-provider"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const { user, logout } = useAuth()
  const { toast } = useToast()

  const { getQuestionsByCategory, searchQuestions } = useQuestions()

  const [searchQuery, setSearchQuery] = useState("")

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  // Mock data
  const questions = [
    {
      id: 1,
      title: "How to prepare for Google interviews?",
      content: "I'm a 3rd year CSE student. Can someone share their experience about Google interview preparation?",
      author: "Rahul Kumar",
      authorYear: "3rd Year",
      authorBranch: "CSE",
      tags: ["Placement", "Google", "Interview"],
      likes: 24,
      replies: 8,
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      title: "Best resources for Data Structures?",
      content: "Looking for good resources to learn DSA. Any recommendations from seniors?",
      author: "Priya Sharma",
      authorYear: "2nd Year",
      authorBranch: "IT",
      tags: ["DSA", "Study", "Resources"],
      likes: 15,
      replies: 12,
      timeAgo: "4 hours ago",
    },
    {
      id: 3,
      title: "Internship at Microsoft - My Journey",
      content: "Just completed my internship at Microsoft. Happy to share my experience and tips!",
      author: "Arjun Patel",
      authorYear: "Alumni 2023",
      authorBranch: "CSE",
      tags: ["Internship", "Microsoft", "Experience"],
      likes: 45,
      replies: 23,
      timeAgo: "1 day ago",
    },
  ]

  const trendingQuestions = [
    {
      id: 4,
      title: "How to balance academics and competitive coding?",
      author: "Vikram Singh",
      authorYear: "4th Year",
      authorBranch: "CSE",
      tags: ["Academics", "Coding", "Balance"],
      likes: 87,
      replies: 34,
      timeAgo: "1 day ago",
    },
    {
      id: 5,
      title: "Tips for cracking FAANG interviews?",
      author: "Neha Gupta",
      authorYear: "Alumni 2022",
      authorBranch: "IT",
      tags: ["FAANG", "Interview", "Preparation"],
      likes: 112,
      replies: 56,
      timeAgo: "2 days ago",
    },
  ]

  const placementQuestions = [
    {
      id: 6,
      title: "Resume review for Amazon application",
      author: "Karan Mehta",
      authorYear: "3rd Year",
      authorBranch: "ECE",
      tags: ["Resume", "Amazon", "Review"],
      likes: 32,
      replies: 18,
      timeAgo: "5 hours ago",
    },
    {
      id: 7,
      title: "How to prepare for Goldman Sachs technical rounds?",
      author: "Ananya Reddy",
      authorYear: "4th Year",
      authorBranch: "CSE",
      tags: ["Goldman Sachs", "Technical", "Interview"],
      likes: 45,
      replies: 22,
      timeAgo: "1 day ago",
    },
  ]

  const academicQuestions = [
    {
      id: 8,
      title: "Which electives to choose in 6th semester?",
      author: "Rohan Sharma",
      authorYear: "3rd Year",
      authorBranch: "CSE",
      tags: ["Electives", "Academics", "Advice"],
      likes: 28,
      replies: 42,
      timeAgo: "3 hours ago",
    },
    {
      id: 9,
      title: "How to approach final year project?",
      author: "Meera Patel",
      authorYear: "4th Year",
      authorBranch: "ECE",
      tags: ["Project", "Final Year", "Research"],
      likes: 36,
      replies: 29,
      timeAgo: "2 days ago",
    },
  ]

  const quickLinks = [
    { name: "Ask Question", icon: Plus, href: "/ask-question", color: "from-blue-500 to-cyan-500" },
    { name: "Placement Stories", icon: TrendingUp, href: "/placement-stories", color: "from-green-500 to-emerald-500" },
    { name: "Study Resources", icon: BookOpen, href: "/resources", color: "from-purple-500 to-pink-500" },
    { name: "Events", icon: Calendar, href: "/events", color: "from-orange-500 to-red-500" },
  ]

  const achievements = [
    { name: "Question Asker", icon: MessageSquare, progress: 60, level: 2 },
    { name: "Helpful Senior", icon: Award, progress: 75, level: 3 },
    { name: "Knowledge Sharer", icon: Zap, progress: 40, level: 1 },
    { name: "Community Builder", icon: Users, progress: 25, level: 1 },
  ]

  const displayQuestions = searchQuery ? searchQuestions(searchQuery) : getQuestionsByCategory(activeTab)

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <motion.div
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </motion.div>
                <motion.h1
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  AskSeniors
                </motion.h1>
              </div>
              <div className="flex items-center space-x-4">
                <NotificationsDropdown />
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <ThreeDCard>
                  <Card className="border-0 shadow-none">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl">
                            {user?.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{user?.name || "User"}</h3>
                          <p className="text-sm text-gray-600">
                            {user?.year &&
                              `${user.year}${user.year === "1" ? "st" : user.year === "2" ? "nd" : user.year === "3" ? "rd" : "th"} Year`}{" "}
                            {user?.branch?.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">12</div>
                          <div className="text-xs text-gray-600">Questions</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">28</div>
                          <div className="text-xs text-gray-600">Answers</div>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover-lift"
                        asChild
                      >
                        <Link href="/ask-question">
                          <Plus className="h-4 w-4 mr-2" />
                          Ask Question
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </ThreeDCard>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Links</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-3">
                    {quickLinks.map((link, index) => (
                      <Button
                        key={link.name}
                        variant="outline"
                        className="flex flex-col items-center justify-center h-24 hover-lift"
                        asChild
                      >
                        <Link href={link.href}>
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-r ${link.color} flex items-center justify-center mb-2`}
                          >
                            <link.icon className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-sm font-medium">{link.name}</span>
                        </Link>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-500" />
                      Your Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <achievement.icon className="h-4 w-4 mr-2 text-blue-600" />
                            <span className="text-sm font-medium">{achievement.name}</span>
                          </div>
                          <Badge variant="outline">Level {achievement.level}</Badge>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main Content */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex justify-between items-center mb-6">
                  <TabsList className="bg-white p-1 shadow-md rounded-lg">
                    <TabsTrigger
                      value="feed"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    >
                      Feed
                    </TabsTrigger>
                    <TabsTrigger
                      value="trending"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    >
                      Trending
                    </TabsTrigger>
                    <TabsTrigger
                      value="placement"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    >
                      Placement
                    </TabsTrigger>
                    <TabsTrigger
                      value="academic"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    >
                      Academic
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search questions..."
                        className="pl-10 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <TabsContent value="feed" className="space-y-6">
                  {displayQuestions.length === 0 ? (
                    <Card className="p-8 text-center">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No questions found</h3>
                      <p className="text-gray-500 mb-4">
                        {searchQuery ? "Try adjusting your search terms" : "Be the first to ask a question!"}
                      </p>
                      <Button asChild>
                        <Link href="/ask-question">Ask a Question</Link>
                      </Button>
                    </Card>
                  ) : (
                    displayQuestions.map((question, index) => (
                      <QuestionCard key={question.id} question={question} index={index} />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="trending" className="space-y-6">
                  {displayQuestions.length === 0 ? (
                    <Card className="p-8 text-center">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No questions found</h3>
                      <p className="text-gray-500 mb-4">
                        {searchQuery ? "Try adjusting your search terms" : "Be the first to ask a question!"}
                      </p>
                      <Button asChild>
                        <Link href="/ask-question">Ask a Question</Link>
                      </Button>
                    </Card>
                  ) : (
                    displayQuestions.map((question, index) => (
                      <QuestionCard key={question.id} question={question} index={index} />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="placement" className="space-y-6">
                  {displayQuestions.length === 0 ? (
                    <Card className="p-8 text-center">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No questions found</h3>
                      <p className="text-gray-500 mb-4">
                        {searchQuery ? "Try adjusting your search terms" : "Be the first to ask a question!"}
                      </p>
                      <Button asChild>
                        <Link href="/ask-question">Ask a Question</Link>
                      </Button>
                    </Card>
                  ) : (
                    displayQuestions.map((question, index) => (
                      <QuestionCard key={question.id} question={question} index={index} />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="academic" className="space-y-6">
                  {displayQuestions.length === 0 ? (
                    <Card className="p-8 text-center">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No questions found</h3>
                      <p className="text-gray-500 mb-4">
                        {searchQuery ? "Try adjusting your search terms" : "Be the first to ask a question!"}
                      </p>
                      <Button asChild>
                        <Link href="/ask-question">Ask a Question</Link>
                      </Button>
                    </Card>
                  ) : (
                    displayQuestions.map((question, index) => (
                      <QuestionCard key={question.id} question={question} index={index} />
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </RequireAuth>
  )
}
