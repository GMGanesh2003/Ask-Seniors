"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

interface ConfettiExplosionProps {
  duration?: number
  particleCount?: number
  spread?: number
  colors?: string[]
}

export function ConfettiExplosion({
  duration = 3000,
  particleCount = 100,
  spread = 70,
  colors = ["#1e40af", "#8b5cf6", "#ec4899", "#f97316", "#10b981"],
}: ConfettiExplosionProps) {
  const [isExploding, setIsExploding] = useState(true)

  useEffect(() => {
    if (isExploding) {
      const end = Date.now() + duration

      const interval = setInterval(() => {
        if (Date.now() > end) {
          setIsExploding(false)
          return clearInterval(interval)
        }

        confetti({
          particleCount: particleCount / 10,
          spread: spread,
          origin: { x: Math.random(), y: Math.random() * 0.5 },
          colors: colors,
          disableForReducedMotion: true,
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [isExploding, duration, particleCount, spread, colors])

  return null
}
