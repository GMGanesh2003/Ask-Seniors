"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Share2,
  Trophy,
  Building,
  Calendar,
  TrendingUp,
  Star,
  Sparkles,
  Target,
  Zap,
} from "lucide-react"

export default function PlacementStoriesPage() {
  const stories = [
    {
      id: 1,
      author: "Arjun Patel",
      company: "Google",
      role: "Software Engineer",
      package: "₹45 LPA",
      batch: "2023",
      branch: "CSE",
      avatar: "/placeholder-user.jpg",
      title: "My Journey to Google: From Zero to Hero",
      excerpt:
        "How I went from struggling with basic coding to landing my dream job at Google. Here's my complete preparation strategy...",
      content:
        "It all started in my 2nd year when I realized I was way behind my peers in competitive programming. I decided to take a structured approach...",
      tags: ["Google", "Software Engineer", "DSA", "System Design"],
      likes: 234,
      comments: 45,
      timeAgo: "2 days ago",
      readTime: "8 min read",
      featured: true,
    },
    {
      id: 2,
      author: "Priya Sharma",
      company: "Microsoft",
      role: "Product Manager",
      package: "₹38 LPA",
      batch: "2023",
      branch: "ECE",
      avatar: "/placeholder-user.jpg",
      title: "Breaking into Product Management from ECE",
      excerpt:
        "How I transitioned from Electronics to Product Management and landed at Microsoft. My unconventional journey...",
      content:
        "Coming from an ECE background, I never thought I'd end up in product management. But here's how I made the transition...",
      tags: ["Microsoft", "Product Manager", "Career Switch", "ECE"],
      likes: 189,
      comments: 32,
      timeAgo: "5 days ago",
      readTime: "6 min read",
      featured: false,
    },
    {
      id: 3,
      author: "Rahul Kumar",
      company: "Amazon",
      role: "SDE-1",
      package: "₹32 LPA",
      batch: "2024",
      branch: "IT",
      avatar: "/placeholder-user.jpg",
      title: "Amazon SDE Interview: Complete Preparation Guide",
      excerpt:
        "My detailed preparation strategy for Amazon SDE role. From data structures to behavioral rounds, everything covered...",
      content:
        "Amazon's interview process is quite comprehensive. Here's how I prepared for each round and what worked for me...",
      tags: ["Amazon", "SDE", "Interview Prep", "Data Structures"],
      likes: 156,
      comments: 28,
      timeAgo: "1 week ago",
      readTime: "10 min read",
      featured: false,
    },
    {
      id: 4,
      author: "Sneha Reddy",
      company: "Goldman Sachs",
      role: "Technology Analyst",
      package: "₹28 LPA",
      batch: "2023",
      branch: "CSE",
      avatar: "/placeholder-user.jpg",
      title: "Finance + Tech: My Goldman Sachs Journey",
      excerpt:
        "How I combined my interest in finance and technology to land a role at Goldman Sachs. Tips for finance tech roles...",
      content:
        "Goldman Sachs was always my dream company. Here's how I prepared for their unique blend of finance and technology questions...",
      tags: ["Goldman Sachs", "Finance", "Technology", "Analyst"],
      likes: 142,
      comments: 19,
      timeAgo: "2 weeks ago",
      readTime: "7 min read",
      featured: false,
    },
  ]

  const stats = [
    { number: 156, label: "Success Stories", icon: Trophy },
    { number: 89, label: "Companies", icon: Building },
    { number: 234, label: "Average Package (LPA)", icon: TrendingUp },
    { number: 95, label: "Placement Rate (%)", icon: Target },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-sm">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-700 hover-lift">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Dashboard
                </Link>
                <div className="flex items-center space-x-3">
                  <Trophy className="h-8 w-8 text-yellow-500 animate-pulse-glow" />
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                    Placement Stories
                  </h1>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover-lift">
                <Sparkles className="mr-2 h-4 w-4" />
                Share Your Story
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-bounce-in">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Success{" "}
                <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient">
                  Stories
                </span>
                <br />
                That{" "}
                <span className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
                  Inspire
                </span>
              </h2>
            </div>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-slide-up">
              Learn from the journeys of VIT alumni who landed their dream jobs. Get insights, tips, and motivation for
              your own placement preparation.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center hover-lift glass-effect border-white/30 animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <stat.icon className="h-8 w-8 mx-auto mb-3 text-yellow-600" />
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      <AnimatedCounter end={stat.number} />
                      {stat.label.includes("%") && "%"}
                      {stat.label.includes("LPA") && "₹"}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stories Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Featured Story */}
              <div className="lg:col-span-2">
                {stories
                  .filter((story) => story.featured)
                  .map((story) => (
                    <Card
                      key={story.id}
                      className="glass-effect border-white/30 shadow-2xl hover-lift animate-bounce-in"
                    >
                      <div className="relative">
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                                <AvatarImage src={story.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                                  {story.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{story.author}</h3>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <Building className="h-4 w-4" />
                                  <span className="font-semibold text-blue-600">{story.company}</span>
                                  <span>•</span>
                                  <span>{story.role}</span>
                                </div>
                                <div className="flex items-center space-x-4 mt-1">
                                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    {story.package}
                                  </Badge>
                                  <Badge variant="outline">
                                    {story.batch} • {story.branch}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <h2 className="text-2xl font-bold text-gray-900 mb-3">{story.title}</h2>
                          <p className="text-gray-700 text-lg leading-relaxed mb-4">{story.excerpt}</p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {story.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-800">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Heart className="h-4 w-4" />
                                <span>{story.likes}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <MessageSquare className="h-4 w-4" />
                                <span>{story.comments}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>{story.timeAgo}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {story.readTime}
                              </Badge>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="hover-lift">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover-lift">
                                Read Full Story
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card
                  className="glass-effect border-white/30 shadow-xl animate-bounce-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                      Top Companies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {["Google", "Microsoft", "Amazon", "Goldman Sachs", "Adobe"].map((company, index) => (
                      <div key={company} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{company}</span>
                        <Badge variant="secondary">{Math.floor(Math.random() * 20) + 5}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Stories */}
                <Card
                  className="glass-effect border-white/30 shadow-xl animate-bounce-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900">Recent Stories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stories
                      .filter((story) => !story.featured)
                      .slice(0, 3)
                      .map((story) => (
                        <div
                          key={story.id}
                          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                                {story.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900">{story.author}</p>
                              <p className="text-xs text-gray-600">
                                {story.company} • {story.role}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2">{story.title}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              {story.package}
                            </Badge>
                            <span className="text-xs text-gray-500">{story.timeAgo}</span>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* All Stories Grid */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">All Success Stories</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {stories
                  .filter((story) => !story.featured)
                  .map((story, index) => (
                    <Card
                      key={story.id}
                      className="glass-effect border-white/30 shadow-xl hover-lift animate-bounce-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
                            <AvatarImage src={story.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                              {story.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{story.author}</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Building className="h-3 w-3" />
                              <span className="font-semibold text-blue-600">{story.company}</span>
                              <span>•</span>
                              <span>{story.role}</span>
                            </div>
                          </div>
                          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                            {story.package}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{story.title}</h3>
                        <p className="text-gray-700 mb-4 line-clamp-3">{story.excerpt}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {story.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{story.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{story.comments}</span>
                            </div>
                            <span>{story.timeAgo}</span>
                          </div>
                          <Button variant="outline" size="sm" className="hover-lift">
                            Read More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 border-0 shadow-2xl hover-lift">
              <CardContent className="p-12">
                <Trophy className="h-16 w-16 text-white mx-auto mb-6 animate-bounce" />
                <h3 className="text-4xl font-bold text-white mb-4">Got Placed? Share Your Success Story!</h3>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Help your juniors by sharing your placement journey. Your story could be the inspiration someone
                  needs!
                </p>
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100 shadow-xl hover-lift px-8 py-4 text-lg font-semibold"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Share Your Story
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
