"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Sparkles } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend/newsletter service
    console.log("Subscribing email:", email)
    setSubscribed(true)
    setEmail("")

    // Reset after 3 seconds
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="premium-card p-8 md:p-12 rounded-3xl border border-primary/30 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 islamic-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-burgundy/10 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10 space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-rose-gold glow-pulse mb-4">
                  <Mail className="h-8 w-8 text-cream" />
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  <span className="text-foreground">Join Our Exclusive</span>
                  <br />
                  <span className="gradient-text">Beauty Circle</span>
                </h2>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Subscribe to receive early access to new collections, special offers, and beauty tips
                  inspired by heritage traditions.
                </p>
              </div>

              {/* Subscription Form */}
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/50" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-12 h-14 glass-input border-primary/30 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 px-8 bg-gradient-to-r from-primary to-rose-gold text-primary-foreground font-bold luxury-button"
                    disabled={subscribed}
                  >
                    {subscribed ? "Subscribed! ✓" : "Subscribe"}
                  </Button>
                </div>
              </form>

              {/* Benefits */}
              <div className="grid sm:grid-cols-3 gap-6 pt-8">
                {[
                  { icon: "🎁", text: "Exclusive Offers" },
                  { icon: "✨", text: "Beauty Tips" },
                  { icon: "🌟", text: "Early Access" },
                ].map((benefit) => (
                  <div
                    key={benefit.text}
                    className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-2xl">{benefit.icon}</span>
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-center text-muted-foreground/70">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
