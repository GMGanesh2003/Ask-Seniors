"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { AnimatedBackground } from "@/components/ui/animated-background"
import {
  GraduationCap,
  ArrowLeft,
  Send,
  Tag,
  Users,
  BookOpen,
  Lightbulb,
  Target,
  Sparkles,
  Plus,
  X,
} from "lucide-react"
import { useQuestions } from "@/components/question-provider"
import { ConfettiExplosion } from "@/components/ui/confetti-explosion"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

export default function AskQuestionPage() {
  const [question, setQuestion] = useState({
    title: "",
    content: "",
    category: "",
    tags: [] as string[],
    targetAudience: [] as string[],
    isAnonymous: false,
  })

  const [customTag, setCustomTag] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { addQuestion } = useQuestions()
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()

  const categories = [
    { id: "academic", label: "📚 Academic Help", color: "bg-blue-100 text-blue-800" },
    { id: "placement", label: "💼 Placement & Career", color: "bg-green-100 text-green-800" },
    { id: "internship", label: "🚀 Internships", color: "bg-purple-100 text-purple-800" },
    { id: "project", label: "💻 Projects & Tech", color: "bg-orange-100 text-orange-800" },
    { id: "life", label: "🌟 College Life", color: "bg-pink-100 text-pink-800" },
    { id: "general", label: "💬 General Discussion", color: "bg-gray-100 text-gray-800" },
  ]

  const popularTags = [
    "DSA",
    "Web Development",
    "Machine Learning",
    "Resume",
    "Interview Tips",
    "Coding",
    "Internship",
    "Placement",
    "Study Tips",
    "Project Ideas",
    "CGPA",
    "Competitive Programming",
    "Research",
    "Startup",
    "Networking",
  ]

  const targetAudiences = [
    { id: "seniors", label: "👥 Seniors (3rd & 4th Year)", icon: Users },
    { id: "alumni", label: "🎓 Alumni", icon: GraduationCap },
    { id: "faculty", label: "👨‍🏫 Faculty", icon: BookOpen },
    { id: "all", label: "🌍 Everyone", icon: Target },
  ]

  const addTag = (tag: string) => {
    if (tag && !question.tags.includes(tag)) {
      setQuestion({ ...question, tags: [...question.tags, tag] })
    }
  }

  const removeTag = (tagToRemove: string) => {
    setQuestion({ ...question, tags: question.tags.filter((tag) => tag !== tagToRemove) })
  }

  const addCustomTag = () => {
    if (customTag.trim()) {
      addTag(customTag.trim())
      setCustomTag("")
    }
  }

  const toggleTargetAudience = (audience: string) => {
    const newAudience = question.targetAudience.includes(audience)
      ? question.targetAudience.filter((a) => a !== audience)
      : [...question.targetAudience, audience]
    setQuestion({ ...question, targetAudience: newAudience })
  }

  const handleSubmit = async () => {
    if (!question.title || !question.content || !question.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to post a question",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Add the question using the context
      addQuestion({
        title: question.title,
        content: question.content,
        author: question.isAnonymous ? "Anonymous" : user.name || "User",
        authorId: user.id,
        authorYear: user.year
          ? `${user.year}${user.year === "1" ? "st" : user.year === "2" ? "nd" : user.year === "3" ? "rd" : "th"} Year`
          : undefined,
        authorBranch: user.branch?.toUpperCase(),
        authorRole: user.role || "student",
        tags: question.tags,
        category: question.category,
        targetAudience: question.targetAudience,
        isAnonymous: question.isAnonymous,
      })

      // Show success message
      toast({
        title: "Question posted!",
        description: "Your question has been posted successfully",
      })

      // Show confetti
      setShowConfetti(true)

      // Reset form
      setQuestion({
        title: "",
        content: "",
        category: "",
        tags: [],
        targetAudience: [],
        isAnonymous: false,
      })
      setCustomTag("")

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post question. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {showConfetti && <ConfettiExplosion force={0.8} duration={3000} particleCount={250} width={2800} />}
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
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Ask a Question
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="glass-effect border-white/30 shadow-2xl animate-bounce-in">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <Lightbulb className="h-6 w-6 mr-2 text-yellow-500" />
                    What's your question?
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Ask anything - from academics to career guidance. Our community is here to help!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Question Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-base font-semibold text-gray-900">
                      Question Title *
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., How to prepare for Google interviews?"
                      value={question.title}
                      onChange={(e) => setQuestion({ ...question, title: e.target.value })}
                      className="py-3 text-lg border-2 focus:border-blue-500"
                    />
                  </div>

                  {/* Question Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-base font-semibold text-gray-900">
                      Detailed Description *
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="Provide more details about your question. The more specific you are, the better answers you'll get!"
                      value={question.content}
                      onChange={(e) => setQuestion({ ...question, content: e.target.value })}
                      className="min-h-32 text-lg border-2 focus:border-blue-500 resize-none"
                    />
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-900">Category *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          onClick={() => setQuestion({ ...question, category: category.id })}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover-lift ${
                            question.category === category.id
                              ? "border-blue-500 bg-blue-50 shadow-lg"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="font-medium text-gray-900">{category.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-900 flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-blue-600" />
                      Tags (Help others find your question)
                    </Label>

                    {/* Selected Tags */}
                    {question.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {question.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="px-3 py-1 bg-blue-100 text-blue-800">
                            {tag}
                            <X
                              className="h-3 w-3 ml-2 cursor-pointer hover:text-red-600"
                              onClick={() => removeTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Popular Tags */}
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Popular tags:</div>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                            onClick={() => addTag(tag)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Custom Tag Input */}
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add custom tag"
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addCustomTag()}
                        className="flex-1"
                      />
                      <Button onClick={addCustomTag} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-900 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-blue-600" />
                      Who should answer this? (Optional)
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {targetAudiences.map((audience) => (
                        <div
                          key={audience.id}
                          onClick={() => toggleTargetAudience(audience.id)}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 hover-lift ${
                            question.targetAudience.includes(audience.id)
                              ? "border-purple-500 bg-purple-50 shadow-lg"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <audience.icon className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium">{audience.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Anonymous Option */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={question.isAnonymous}
                      onCheckedChange={(checked) => setQuestion({ ...question, isAnonymous: checked as boolean })}
                    />
                    <Label htmlFor="anonymous" className="text-base text-gray-700">
                      Ask anonymously (your name won't be shown)
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover-lift py-3 text-lg"
                    disabled={!question.title || !question.content || !question.category || isSubmitting}
                    onClick={handleSubmit}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting ? "Posting..." : "Post Question"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tips Card */}
              <Card
                className="glass-effect border-white/30 shadow-xl animate-bounce-in"
                style={{ animationDelay: "0.2s" }}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                    Tips for Great Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">Be specific and clear in your title</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">Provide context and background</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">Use relevant tags to reach the right audience</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">Be respectful and patient for answers</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Questions */}
              <Card
                className="glass-effect border-white/30 shadow-xl animate-bounce-in"
                style={{ animationDelay: "0.4s" }}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">Recent Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">How to crack Amazon interviews?</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        Placement
                      </Badge>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Best resources for DSA?</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        Academic
                      </Badge>
                      <span className="text-xs text-gray-500">4 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
