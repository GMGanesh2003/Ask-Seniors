"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap, BookOpen, Lightbulb, Users, MessageCircle, Trophy, Code, Briefcase, Star } from "lucide-react"

export function FloatingElements() {
  const [elements, setElements] = useState<
    Array<{
      id: number
      Icon: any
      x: number
      y: number
      size: number
      color: string
      delay: number
    }>
  >([])

  useEffect(() => {
    const icons = [GraduationCap, BookOpen, Lightbulb, Users, MessageCircle, Trophy, Code, Briefcase, Star]
    const colors = ["#1e40af", "#8b5cf6", "#ec4899", "#f97316", "#10b981", "#0ea5e9", "#6366f1", "#d946ef", "#f43f5e"]

    const newElements = Array.from({ length: 15 }, (_, i) => {
      const Icon = icons[Math.floor(Math.random() * icons.length)]
      const color = colors[Math.floor(Math.random() * colors.length)]
      const size = Math.random() * 20 + 20

      return {
        id: i,
        Icon,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        color,
        delay: Math.random() * 5,
      }
    })

    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.2,
            scale: 1,
            x: [0, 20, -20, 10, -10, 0],
            y: [0, -30, -15, -40, -25, 0],
            rotate: [0, 10, -10, 5, -5, 0],
          }}
          transition={{
            duration: 20,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <element.Icon style={{ width: element.size, height: element.size, color: element.color }} />
        </motion.div>
      ))}
    </div>
  )
}
