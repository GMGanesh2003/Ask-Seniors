import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { GraduationCap, ArrowLeft, Heart, MessageSquare } from "lucide-react"

export default function ExplorePage() {
  const publicQuestions = [
    {
      id: 1,
      title: "How to prepare for campus placements?",
      content: "Looking for guidance on how to prepare for upcoming placement season. Any tips from seniors?",
      author: "Anonymous Student",
      tags: ["Placement", "Career", "Tips"],
      likes: 34,
      replies: 15,
      timeAgo: "3 hours ago",
    },
    {
      id: 2,
      title: "Best coding platforms for practice?",
      content: "Which platforms do you recommend for competitive programming practice?",
      author: "CS Student",
      tags: ["Coding", "Practice", "CP"],
      likes: 28,
      replies: 22,
      timeAgo: "5 hours ago",
    },
    {
      id: 3,
      title: "Internship experience at startup vs MNC?",
      content: "Should I choose a startup internship or wait for MNC opportunities?",
      author: "3rd Year Student",
      tags: ["Internship", "Career", "Advice"],
      likes: 19,
      replies: 8,
      timeAgo: "1 day ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Explore Questions</h1>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Join Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Questions</h2>
          <p className="text-gray-600">See what the VIT community is discussing</p>
        </div>

        <div className="space-y-6">
          {publicQuestions.map((question) => (
            <Card key={question.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {question.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{question.author}</h4>
                      <p className="text-sm text-gray-600">VIT Student</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{question.timeAgo}</span>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
                <p className="text-gray-700 mb-4">{question.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-600">
                      <Heart className="h-4 w-4 mr-1" />
                      {question.likes}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {question.replies}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/register">Join to Reply</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="p-8">
            <CardHeader>
              <CardTitle>Want to ask your own question?</CardTitle>
              <CardDescription>
                Join the AskSeniors community to connect with seniors, alumni, and faculty
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" asChild>
                <Link href="/register">Join AskSeniors</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
