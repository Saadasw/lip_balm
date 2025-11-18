"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Gift, Sparkles } from "lucide-react"

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("shafatain-welcome-popup")

    if (!hasSeenPopup) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("shafatain-welcome-popup", "true")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission
    console.log("Email submitted:", email)
    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md premium-card border-primary/30 p-0 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 text-foreground/70 hover:text-primary transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Background Pattern */}
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 p-8 space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-rose-gold flex items-center justify-center glow-pulse">
              <Gift className="h-10 w-10 text-cream" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold gradient-text">Welcome to Shafatain!</h3>
            <p className="text-muted-foreground">
              Get <span className="text-primary font-bold">15% OFF</span> your first order when you join our
              exclusive beauty circle.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 glass-input border-primary/30 text-foreground placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-primary to-rose-gold text-primary-foreground font-bold luxury-button"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Claim Your Discount
            </Button>
          </form>

          {/* Footer */}
          <p className="text-xs text-center text-muted-foreground/70">
            By subscribing, you agree to receive emails from Shafatain Atelier. You can unsubscribe at any
            time.
          </p>

          <button
            onClick={handleClose}
            className="text-sm text-muted-foreground hover:text-primary transition-colors w-full text-center"
          >
            No thanks, I'll pay full price
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
