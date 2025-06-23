"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { FloatingElements } from "@/components/ui/floating-elements"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { ConfettiExplosion } from "@/components/ui/confetti-explosion"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { GraduationCap, ArrowLeft, ArrowRight, User, Mail, BookOpen, Building, Sparkles, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    regNumber: "",
    branch: "",
    year: "",
    batch: "",
    linkedIn: "",
    company: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { register } = useAuth()

  const progress = (step / 3) * 100

  const handleNext = () => {
    if (step === 1) {
      if (!userType) {
        toast({
          title: "Error",
          description: "Please select your role",
          variant: "destructive",
        })
        return
      }
    } else if (step === 2) {
      if (!formData.name || !formData.email || !formData.password) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        })
        return
      }

      if (userType === "student" && (!formData.regNumber || !formData.year)) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }
    }

    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (!formData.branch) {
      toast({
        title: "Error",
        description: "Please select your branch/department",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: userType as any,
        year: formData.year,
        branch: formData.branch,
        batch: formData.batch,
        company: formData.company,
      })

      if (success) {
        setShowConfetti(true)
        toast({
          title: "Registration successful!",
          description: "Your account has been created successfully",
        })

        // Redirect after a short delay to show confetti
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        toast({
          title: "Registration failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const userTypes = [
    {
      id: "student",
      title: "Current Student",
      description: "Currently studying at VIT",
      icon: User,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      id: "alumni",
      title: "Alumni",
      description: "Graduated from VIT",
      icon: GraduationCap,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      id: "faculty",
      title: "Faculty",
      description: "Teaching staff at VIT",
      icon: BookOpen,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <FloatingElements />
      {showConfetti && <ConfettiExplosion />}

      <div className="relative z-10 min-h-screen bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 hover-lift">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                <GraduationCap className="h-10 w-10 text-blue-600 animate-pulse-glow" />
              </motion.div>
              <motion.h1
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                AskSeniors
              </motion.h1>
            </div>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Join the VIT community
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {step} of 3</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>

          <AnimatedGradientBorder>
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
                <CardDescription className="text-lg">
                  {step === 1 ? "Choose your role" : step === 2 ? "Basic information" : "Additional details"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: User Type Selection */}
                {step === 1 && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Label className="text-lg font-semibold text-gray-900">I am a...</Label>
                    <RadioGroup value={userType} onValueChange={setUserType} className="space-y-4">
                      {userTypes.map((type, index) => (
                        <motion.div
                          key={type.id}
                          className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${userType === type.id ? "border-blue-500 shadow-lg" : "border-gray-200 hover:border-gray-300"}`}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${type.color} opacity-5`}></div>
                          <div className="relative flex items-center space-x-4 p-6">
                            <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                            <div
                              className={`w-12 h-12 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center shadow-lg`}
                            >
                              <type.icon className="h-6 w-6 text-white" />
                            </div>
                            <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                              <div className="font-semibold text-lg text-gray-900">{type.title}</div>
                              <div className="text-gray-600">{type.description}</div>
                            </Label>
                          </div>
                        </motion.div>
                      ))}
                    </RadioGroup>
                    <Button
                      onClick={handleNext}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover-lift py-3 text-lg"
                      disabled={!userType}
                    >
                      Continue <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Basic Information */}
                {step === 2 && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-medium flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-600" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="py-3 text-lg border-2 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-blue-600" />
                        VIT Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.name@vitstudent.ac.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="py-3 text-lg border-2 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-base font-medium">
                        Password *
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="py-3 text-lg border-2 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-base font-medium">
                        Confirm Password *
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="py-3 text-lg border-2 focus:border-blue-500"
                      />
                    </div>
                    {userType === "student" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="regNumber" className="text-base font-medium">
                            Registration Number *
                          </Label>
                          <Input
                            id="regNumber"
                            placeholder="21BCE1234"
                            value={formData.regNumber}
                            onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                            className="py-3 text-lg border-2 focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="year" className="text-base font-medium">
                            Current Year *
                          </Label>
                          <Select
                            value={formData.year}
                            onValueChange={(value) => setFormData({ ...formData, year: value })}
                          >
                            <SelectTrigger className="py-3 text-lg border-2">
                              <SelectValue placeholder="Select your year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1st Year (Fresher) 🌱</SelectItem>
                              <SelectItem value="2">2nd Year (Sophomore) 📚</SelectItem>
                              <SelectItem value="3">3rd Year (Junior) 💼</SelectItem>
                              <SelectItem value="4">4th Year (Senior) 🎓</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    <div className="flex space-x-3">
                      <Button variant="outline" onClick={handleBack} className="flex-1 py-3 text-lg hover-lift">
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover-lift py-3 text-lg"
                      >
                        Continue <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Additional Details */}
                {step === 3 && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="branch" className="text-base font-medium flex items-center">
                        <Building className="h-4 w-4 mr-2 text-blue-600" />
                        Branch/Department *
                      </Label>
                      <Select
                        value={formData.branch}
                        onValueChange={(value) => setFormData({ ...formData, branch: value })}
                      >
                        <SelectTrigger className="py-3 text-lg border-2">
                          <SelectValue placeholder="Select your branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cse">💻 Computer Science Engineering</SelectItem>
                          <SelectItem value="ece">📡 Electronics & Communication</SelectItem>
                          <SelectItem value="eee">⚡ Electrical & Electronics</SelectItem>
                          <SelectItem value="mech">⚙️ Mechanical Engineering</SelectItem>
                          <SelectItem value="civil">🏗️ Civil Engineering</SelectItem>
                          <SelectItem value="it">🌐 Information Technology</SelectItem>
                          <SelectItem value="btech">🧬 Biotechnology</SelectItem>
                          <SelectItem value="chem">🧪 Chemical Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {userType === "alumni" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="batch" className="text-base font-medium">
                            Graduation Year *
                          </Label>
                          <Input
                            id="batch"
                            placeholder="2023"
                            value={formData.batch}
                            onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                            className="py-3 text-lg border-2 focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-base font-medium">
                            Current Company (Optional)
                          </Label>
                          <Input
                            id="company"
                            placeholder="Google, Microsoft, etc."
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="py-3 text-lg border-2 focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedIn" className="text-base font-medium">
                            LinkedIn Profile (Optional)
                          </Label>
                          <Input
                            id="linkedIn"
                            placeholder="https://linkedin.com/in/yourprofile"
                            value={formData.linkedIn}
                            onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                            className="py-3 text-lg border-2 focus:border-blue-500"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex space-x-3">
                      <Button variant="outline" onClick={handleBack} className="flex-1 py-3 text-lg hover-lift">
                        Back
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover-lift py-3 text-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Create Account
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </AnimatedGradientBorder>

          <motion.p
            className="text-center text-gray-600 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold hover-lift">
              Sign in
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
