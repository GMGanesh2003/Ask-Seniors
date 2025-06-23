"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "alumni" | "faculty"
  avatar?: string
  year?: string
  branch?: string
  batch?: string
  company?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("askseniors-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in a real app, this would be an API call
    if (email && password) {
      const mockUser: User = {
        id: "user-1",
        name: email
          .split("@")[0]
          .replace(".", " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        email,
        role: "student",
        avatar: "",
        year: "3",
        branch: "CSE",
      }

      setUser(mockUser)
      localStorage.setItem("askseniors-user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock registration - in a real app, this would be an API call
    if (userData.email && userData.password) {
      const mockUser: User = {
        id: "user-" + Math.floor(Math.random() * 1000),
        name: userData.name || "New User",
        email: userData.email,
        role: userData.role || "student",
        avatar: userData.avatar,
        year: userData.year,
        branch: userData.branch,
        batch: userData.batch,
        company: userData.company,
      }

      setUser(mockUser)
      localStorage.setItem("askseniors-user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("askseniors-user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
