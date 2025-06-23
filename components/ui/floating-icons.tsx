"use client"

import { GraduationCap, BookOpen, Lightbulb, Users, MessageCircle, Trophy } from "lucide-react"

export function FloatingIcons() {
  const icons = [
    { Icon: GraduationCap, delay: "0s", position: "top-20 left-20" },
    { Icon: BookOpen, delay: "0.5s", position: "top-40 right-32" },
    { Icon: Lightbulb, delay: "1s", position: "top-60 left-1/4" },
    { Icon: Users, delay: "1.5s", position: "top-80 right-1/4" },
    { Icon: MessageCircle, delay: "2s", position: "top-96 left-1/3" },
    { Icon: Trophy, delay: "2.5s", position: "top-32 right-20" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {icons.map(({ Icon, delay, position }, index) => (
        <div key={index} className={`absolute ${position} opacity-20`} style={{ animationDelay: delay }}>
          <Icon className="w-8 h-8 text-blue-500 animate-float" style={{ animationDelay: delay }} />
        </div>
      ))}
    </div>
  )
}
