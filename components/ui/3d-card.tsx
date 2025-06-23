"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface ThreeDCardProps {
  children: ReactNode
  className?: string
}

export function ThreeDCard({ children, className = "" }: ThreeDCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)

  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Get mouse position relative to card
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate rotation based on mouse position
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = (y - centerY) / 20
    const rotateYValue = (centerX - x) / 20

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseEnter = () => {
    setScale(1.05)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: scale,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <div className="w-full h-full" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  )
}
