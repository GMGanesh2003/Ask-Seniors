"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuestions } from "./question-provider"
import { useAuth } from "./auth-provider"
import { Bell, Heart, MessageSquare, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const { notifications, markNotificationAsRead, getUnreadNotificationCount } = useQuestions()

  const userNotifications = notifications.filter((n) => n.userId === user?.id).slice(0, 10)
  const unreadCount = getUnreadNotificationCount()

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "reply":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
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
    <div className="relative">
      <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              className="absolute right-0 top-full mt-2 w-96 z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="shadow-2xl border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-96">
                    {userNotifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p>No notifications yet</p>
                        <p className="text-sm">You'll see notifications here when someone interacts with your posts</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {userNotifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                              !notification.isRead ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"
                            }`}
                            onClick={() => handleNotificationClick(notification.id)}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-start space-x-3">
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                                  {notification.fromUserName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  {getNotificationIcon(notification.type)}
                                  {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                                </div>
                                <p className="text-sm text-gray-900 leading-relaxed">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(notification.createdAt)}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
