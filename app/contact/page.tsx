"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import {
  GraduationCap,
  ArrowLeft,
  Send,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Heart,
  Users,
  Shield,
  Loader2,
} from "lucide-react"

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      contact: "support@askseniors.vit.ac.in",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      contact: "+91 98765 43210",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "VIT Campus Location",
      contact: "VIT University, Vellore",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Office Hours",
      description: "We're available",
      contact: "Mon-Fri: 9AM-6PM",
      color: "from-orange-500 to-red-500",
    },
  ]

  const faqs = [
    {
      question: "How do I verify my VIT email?",
      answer: "After registration, you'll receive a verification email. Click the link to verify your account.",
    },
    {
      question: "Can I ask questions anonymously?",
      answer:
        "Yes! You can choose to ask questions anonymously when posting. Your identity will be hidden from other users.",
    },
    {
      question: "How do I connect with alumni?",
      answer:
        "Use our alumni directory to find graduates from your branch or company of interest. You can message them directly.",
    },
    {
      question: "Is AskSeniors free to use?",
      answer: "Yes, AskSeniors is completely free for all VIT students, alumni, and faculty members.",
    },
  ]

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.category ||
      !formData.subject ||
      !formData.message
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    })

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      category: "",
      subject: "",
      message: "",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-sm">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 hover-lift">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Home
                </Link>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-8 w-8 text-blue-600 animate-pulse-glow" />
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Contact & Support
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-bounce-in">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Get in{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  Touch
                </span>
              </h2>
            </div>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-slide-up">
              Have questions, feedback, or need help? We're here to support the VIT community. Reach out to us anytime!
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  className="text-center hover-lift glass-effect border-white/30 animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center shadow-lg`}
                    >
                      <method.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                    <p className="font-semibold text-blue-600">{method.contact}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & FAQ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="glass-effect border-white/30 shadow-2xl animate-bounce-in">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <Send className="h-6 w-6 mr-2 text-blue-600" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-base font-medium">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="py-3 text-lg border-2 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-base font-medium">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="py-3 text-lg border-2 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@vitstudent.ac.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="py-3 text-lg border-2 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-base font-medium">
                        Category *
                      </Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger className="py-3 text-lg border-2">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">🤔 General Inquiry</SelectItem>
                          <SelectItem value="technical">🔧 Technical Support</SelectItem>
                          <SelectItem value="feedback">💭 Feedback & Suggestions</SelectItem>
                          <SelectItem value="report">🚨 Report an Issue</SelectItem>
                          <SelectItem value="partnership">🤝 Partnership</SelectItem>
                          <SelectItem value="other">📝 Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-base font-medium">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your inquiry"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="py-3 text-lg border-2 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-base font-medium">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide detailed information about your inquiry..."
                        className="min-h-32 text-lg border-2 focus:border-blue-500 resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover-lift py-3 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <div className="space-y-6">
                <Card
                  className="glass-effect border-white/30 shadow-xl animate-bounce-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                      <Sparkles className="h-6 w-6 mr-2 text-yellow-500" />
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>Quick answers to common questions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-gray-700 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Community Stats */}
                <Card
                  className="glass-effect border-white/30 shadow-xl animate-bounce-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-600" />
                      Community Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Average Response Time</span>
                      </div>
                      <span className="font-bold text-blue-600">&lt; 2 hours</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Issues Resolved</span>
                      </div>
                      <span className="font-bold text-green-600">98.5%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Happy Users</span>
                      </div>
                      <span className="font-bold text-purple-600">2,847+</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 border-0 shadow-2xl hover-lift">
              <CardContent className="p-12">
                <MessageSquare className="h-16 w-16 text-white mx-auto mb-6 animate-bounce" />
                <h3 className="text-4xl font-bold text-white mb-4">Join Our Community Today!</h3>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Don't have an account yet? Join thousands of VIT students who are already connecting and learning
                  together.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl hover-lift px-8 py-4 text-lg font-semibold"
                  asChild
                >
                  <Link href="/register">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Join AskSeniors
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
