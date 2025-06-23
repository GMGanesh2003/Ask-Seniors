"use client"

import type { ReactNode } from "react"

interface AnimatedGradientBorderProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  borderWidth?: number
  duration?: number
  colors?: string[]
}

export function AnimatedGradientBorder({
  children,
  className = "",
  containerClassName = "",
  borderWidth = 2,
  duration = 3,
  colors = ["#1e40af", "#8b5cf6", "#ec4899", "#f97316", "#10b981"],
}: AnimatedGradientBorderProps) {
  const gradientColors = colors.join(", ")

  return (
    <div
      className={`relative rounded-xl ${containerClassName}`}
      style={{
        padding: borderWidth,
        background: `linear-gradient(90deg, ${gradientColors})`,
        backgroundSize: "300% 300%",
        animation: `gradient-shift ${duration}s ease infinite`,
      }}
    >
      <div className={`bg-white dark:bg-gray-900 rounded-lg h-full ${className}`}>{children}</div>
    </div>
  )
}
