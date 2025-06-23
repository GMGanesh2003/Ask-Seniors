"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { useAuth } from "./auth-provider"

export interface Question {
  id: string
  title: string
  content: string
  author: string
  authorId: string
  authorYear?: string
  authorBranch?: string
  authorRole: "student" | "alumni" | "faculty"
  tags: string[]
  category: string
  targetAudience: string[]
  isAnonymous: boolean
  likes: number
  replies: number
  likedBy: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Reply {
  id: string
  questionId: string
  content: string
  author: string
  authorId: string
  authorRole: "student" | "alumni" | "faculty"
  likes: number
  likedBy: string[]
  createdAt: Date
}

export interface Notification {
  id: string
  userId: string
  type: "like" | "reply" | "mention"
  message: string
  questionId?: string
  replyId?: string
  fromUserId: string
  fromUserName: string
  isRead: boolean
  createdAt: Date
}

interface QuestionContextType {
  questions: Question[]
  replies: Reply[]
  notifications: Notification[]
  addQuestion: (question: Omit<Question, "id" | "likes" | "replies" | "likedBy" | "createdAt" | "updatedAt">) => void
  deleteQuestion: (questionId: string) => boolean
  likeQuestion: (questionId: string) => void
  addReply: (reply: Omit<Reply, "id" | "likes" | "likedBy" | "createdAt">) => void
  deleteReply: (replyId: string) => boolean
  likeReply: (replyId: string) => void
  markNotificationAsRead: (notificationId: string) => void
  getUnreadNotificationCount: () => number
  getQuestionsByCategory: (category: string) => Question[]
  searchQuestions: (query: string) => Question[]
}

const QuestionContext = createContext<QuestionContextType | undefined>(undefined)

export function QuestionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [questions, setQuestions] = useState<Question[]>([])
  const [replies, setReplies] = useState<Reply[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedQuestions = localStorage.getItem("askseniors-questions")
    const savedReplies = localStorage.getItem("askseniors-replies")
    const savedNotifications = localStorage.getItem("askseniors-notifications")

    if (savedQuestions) {
      const parsedQuestions = JSON.parse(savedQuestions).map((q: any) => ({
        ...q,
        createdAt: new Date(q.createdAt),
        updatedAt: new Date(q.updatedAt),
      }))
      setQuestions(parsedQuestions)
    } else {
      // Initialize with mock data
      const mockQuestions: Question[] = [
        {
          id: "1",
          title: "How to prepare for Google interviews?",
          content: "I'm a 3rd year CSE student. Can someone share their experience about Google interview preparation?",
          author: "Rahul Kumar",
          authorId: "user-1",
          authorYear: "3rd Year",
          authorBranch: "CSE",
          authorRole: "student",
          tags: ["Placement", "Google", "Interview"],
          category: "placement",
          targetAudience: ["seniors", "alumni"],
          isAnonymous: false,
          likes: 24,
          replies: 8,
          likedBy: [],
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: "2",
          title: "Best resources for Data Structures?",
          content: "Looking for good resources to learn DSA. Any recommendations from seniors?",
          author: "Priya Sharma",
          authorId: "user-2",
          authorYear: "2nd Year",
          authorBranch: "IT",
          authorRole: "student",
          tags: ["DSA", "Study", "Resources"],
          category: "academic",
          targetAudience: ["seniors"],
          isAnonymous: false,
          likes: 15,
          replies: 12,
          likedBy: [],
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        },
      ]
      setQuestions(mockQuestions)
    }

    if (savedReplies) {
      const parsedReplies = JSON.parse(savedReplies).map((r: any) => ({
        ...r,
        createdAt: new Date(r.createdAt),
      }))
      setReplies(parsedReplies)
    }

    if (savedNotifications) {
      const parsedNotifications = JSON.parse(savedNotifications).map((n: any) => ({
        ...n,
        createdAt: new Date(n.createdAt),
      }))
      setNotifications(parsedNotifications)
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("askseniors-questions", JSON.stringify(questions))
  }, [questions])

  useEffect(() => {
    localStorage.setItem("askseniors-replies", JSON.stringify(replies))
  }, [replies])

  useEffect(() => {
    localStorage.setItem("askseniors-notifications", JSON.stringify(notifications))
  }, [notifications])

  const addQuestion = (
    questionData: Omit<Question, "id" | "likes" | "replies" | "likedBy" | "createdAt" | "updatedAt">,
  ) => {
    const newQuestion: Question = {
      ...questionData,
      id: `question-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      likes: 0,
      replies: 0,
      likedBy: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setQuestions((prev) => [newQuestion, ...prev])
  }

  const deleteQuestion = (questionId: string): boolean => {
    const question = questions.find((q) => q.id === questionId)
    if (!question || !user) return false

    // Only allow deletion by the author
    if (question.authorId !== user.id) return false

    setQuestions((prev) => prev.filter((q) => q.id !== questionId))
    setReplies((prev) => prev.filter((r) => r.questionId !== questionId))
    setNotifications((prev) => prev.filter((n) => n.questionId !== questionId))

    return true
  }

  const likeQuestion = (questionId: string) => {
    if (!user) return

    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id === questionId) {
          const isLiked = question.likedBy.includes(user.id)
          const newLikedBy = isLiked ? question.likedBy.filter((id) => id !== user.id) : [...question.likedBy, user.id]

          // Create notification for like (only if not self-like and not already liked)
          if (!isLiked && question.authorId !== user.id) {
            const notification: Notification = {
              id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              userId: question.authorId,
              type: "like",
              message: `${user.name} liked your question: "${question.title}"`,
              questionId: questionId,
              fromUserId: user.id,
              fromUserName: user.name || "Someone",
              isRead: false,
              createdAt: new Date(),
            }
            setNotifications((prev) => [notification, ...prev])
          }

          return {
            ...question,
            likes: newLikedBy.length,
            likedBy: newLikedBy,
            updatedAt: new Date(),
          }
        }
        return question
      }),
    )
  }

  const addReply = (replyData: Omit<Reply, "id" | "likes" | "likedBy" | "createdAt">) => {
    const newReply: Reply = {
      ...replyData,
      id: `reply-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      likes: 0,
      likedBy: [],
      createdAt: new Date(),
    }

    setReplies((prev) => [newReply, ...prev])

    // Update question reply count
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id === replyData.questionId) {
          // Create notification for reply (only if not self-reply)
          if (question.authorId !== replyData.authorId && user) {
            const notification: Notification = {
              id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              userId: question.authorId,
              type: "reply",
              message: `${replyData.author} replied to your question: "${question.title}"`,
              questionId: replyData.questionId,
              replyId: newReply.id,
              fromUserId: replyData.authorId,
              fromUserName: replyData.author,
              isRead: false,
              createdAt: new Date(),
            }
            setNotifications((prev) => [notification, ...prev])
          }

          return {
            ...question,
            replies: question.replies + 1,
            updatedAt: new Date(),
          }
        }
        return question
      }),
    )
  }

  const deleteReply = (replyId: string): boolean => {
    const reply = replies.find((r) => r.id === replyId)
    if (!reply || !user) return false

    // Only allow deletion by the author
    if (reply.authorId !== user.id) return false

    setReplies((prev) => prev.filter((r) => r.id !== replyId))

    // Update question reply count
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id === reply.questionId) {
          return {
            ...question,
            replies: Math.max(0, question.replies - 1),
            updatedAt: new Date(),
          }
        }
        return question
      }),
    )

    // Remove related notifications
    setNotifications((prev) => prev.filter((n) => n.replyId !== replyId))

    return true
  }

  const likeReply = (replyId: string) => {
    if (!user) return

    setReplies((prev) =>
      prev.map((reply) => {
        if (reply.id === replyId) {
          const isLiked = reply.likedBy.includes(user.id)
          const newLikedBy = isLiked ? reply.likedBy.filter((id) => id !== user.id) : [...reply.likedBy, user.id]

          // Create notification for reply like (only if not self-like and not already liked)
          if (!isLiked && reply.authorId !== user.id) {
            const question = questions.find((q) => q.id === reply.questionId)
            const notification: Notification = {
              id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              userId: reply.authorId,
              type: "like",
              message: `${user.name} liked your reply${question ? ` on "${question.title}"` : ""}`,
              questionId: reply.questionId,
              replyId: replyId,
              fromUserId: user.id,
              fromUserName: user.name || "Someone",
              isRead: false,
              createdAt: new Date(),
            }
            setNotifications((prev) => [notification, ...prev])
          }

          return {
            ...reply,
            likes: newLikedBy.length,
            likedBy: newLikedBy,
          }
        }
        return reply
      }),
    )
  }

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    )
  }

  const getUnreadNotificationCount = (): number => {
    if (!user) return 0
    return notifications.filter((n) => n.userId === user.id && !n.isRead).length
  }

  const getQuestionsByCategory = (category: string): Question[] => {
    if (category === "feed") return questions
    return questions.filter((q) => q.category === category)
  }

  const searchQuestions = (query: string): Question[] => {
    if (!query.trim()) return questions

    const lowercaseQuery = query.toLowerCase()
    return questions.filter(
      (q) =>
        q.title.toLowerCase().includes(lowercaseQuery) ||
        q.content.toLowerCase().includes(lowercaseQuery) ||
        q.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
        q.author.toLowerCase().includes(lowercaseQuery),
    )
  }

  return (
    <QuestionContext.Provider
      value={{
        questions,
        replies,
        notifications,
        addQuestion,
        deleteQuestion,
        likeQuestion,
        addReply,
        deleteReply,
        likeReply,
        markNotificationAsRead,
        getUnreadNotificationCount,
        getQuestionsByCategory,
        searchQuestions,
      }}
    >
      {children}
    </QuestionContext.Provider>
  )
}

export function useQuestions() {
  const context = useContext(QuestionContext)
  if (context === undefined) {
    throw new Error("useQuestions must be used within a QuestionProvider")
  }
  return context
}
