"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden islamic-pattern">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-burgundy/5" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-burgundy/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 fade-in-up">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary/80">
                <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
                <span className="text-sm uppercase tracking-[0.3em] font-medium">
                  Shafatain Atelier • شفتين
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-text">Premium USA</span>
                <br />
                <span className="text-foreground">
                  Lip Care
                  <br />
                  in Dhaka
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Shafatain curates and imports America's finest lip care products. Experience luxury
                formulations enriched with saffron oil, almond butter, and natural botanicals—bringing
                international quality to Bangladesh.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Imported from USA",
                "100% Authentic Products",
                "Premium Quality Guaranteed",
                "Vegan & Cruelty-Free",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-primary/80">
                  <Sparkles className="h-4 w-4 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={scrollToProducts}
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-primary to-rose-gold text-primary-foreground font-bold text-lg luxury-button group"
              >
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <a href="https://wa.me/8801752304601" target="_blank" rel="noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 border-primary/40 text-primary hover:bg-primary/10 font-semibold text-lg w-full sm:w-auto"
                >
                  Order on WhatsApp
                </Button>
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-6 text-sm">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-primary/30 to-burgundy/30 flex items-center justify-center text-xs font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-semibold text-primary">500+ Happy Customers</p>
                <p className="text-muted-foreground text-xs">Across Dhaka & Beyond</p>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative lg:order-last order-first">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-burgundy/10 to-transparent rounded-full blur-3xl" />
              <div className="absolute inset-0 moroccan-pattern opacity-20" />

              {/* Main Product Image */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden ornate-border float-animation">
                <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-transparent z-10" />
                <Image
                  src="/lip-balm.png"
                  alt="Shafatain Luxury Lip Balm"
                  fill
                  className="object-contain p-8 drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 premium-card p-4 rounded-2xl border border-primary/30 max-w-[200px] scale-in">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-rose-gold flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm">USA Import</p>
                    <p className="text-xs text-muted-foreground">Premium Authentic</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 border border-primary/20 rounded-full" />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 border border-burgundy/20 rounded-lg rotate-45" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
