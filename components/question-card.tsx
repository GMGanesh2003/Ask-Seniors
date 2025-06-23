"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AnimatedGradientBorder } from "./ui/animated-gradient-border"
import { useQuestions, type Question } from "./question-provider"
import { useAuth } from "./auth-provider"
import { useToast } from "./ui/use-toast"
import { Heart, MessageSquare, MoreVertical, Trash2, Edit, Share2 } from "lucide-react"
import { motion } from "framer-motion"

interface QuestionCardProps {
  question: Question
  index?: number
}

export function QuestionCard({ question, index = 0 }: QuestionCardProps) {
  const { user } = useAuth()
  const { likeQuestion, deleteQuestion } = useQuestions()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const isLiked = user ? question.likedBy.includes(user.id) : false
  const isAuthor = user?.id === question.authorId

  const handleLike = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to like questions",
        variant: "destructive",
      })
      return
    }
    likeQuestion(question.id)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    const success = deleteQuestion(question.id)

    if (success) {
      toast({
        title: "Question deleted",
        description: "Your question has been deleted successfully",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to delete question",
        variant: "destructive",
      })
    }
    setIsDeleting(false)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: question.title,
        text: question.content,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Question link copied to clipboard",
      })
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <AnimatedGradientBorder containerClassName="hover-lift">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {question.isAnonymous
                      ? "A"
                      : question.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{question.isAnonymous ? "Anonymous" : question.author}</h4>
                  {!question.isAnonymous && (
                    <p className="text-sm text-gray-600">
                      {question.authorYear} • {question.authorBranch}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{formatTimeAgo(question.createdAt)}</span>
                {(isAuthor || user?.role === "faculty") && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {isAuthor && (
                        <>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Question
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Question
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Question</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this question? This action cannot be undone. All
                                  replies and likes will also be deleted.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDelete}
                                  disabled={isDeleting}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  {isDeleting ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}
                      <DropdownMenuItem onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Question
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">{question.content}</p>

            {question.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-800">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {question.targetAudience.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Looking for answers from:</p>
                <div className="flex flex-wrap gap-1">
                  {question.targetAudience.map((audience) => (
                    <Badge key={audience} variant="outline" className="text-xs">
                      {audience === "seniors"
                        ? "👥 Seniors"
                        : audience === "alumni"
                          ? "🎓 Alumni"
                          : audience === "faculty"
                            ? "👨‍🏫 Faculty"
                            : "🌍 Everyone"}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center space-x-1 ${isLiked ? "text-red-500" : ""}`}
                  onClick={handleLike}
                >
                  <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                  {question.likes}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {question.replies}
                </Button>
              </div>
              <Button variant="outline" size="sm" className="hover-lift">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </AnimatedGradientBorder>
    </motion.div>
  )
}
