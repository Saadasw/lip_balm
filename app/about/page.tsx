"use client"

import { Navigation } from "@/components/navigation"
import { NewsletterSection } from "@/components/newsletter-section"
import Image from "next/image"
import { Heart, Leaf, Sparkles, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen luxury-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden islamic-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="text-foreground">About</span>
              <br />
              <span className="gradient-text">Shafatain Atelier</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Bringing America's finest lip care to Bangladesh with Bengali warmth and Middle Eastern elegance.
            </p>
            <div className="calligraphic-accent text-4xl text-primary">شفتين</div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold gradient-text">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2020 in the vibrant heart of Dhaka, Shafatain Atelier was born from a simple yet
                  profound vision: to bring America's finest lip care products to Bangladesh, making premium
                  quality accessible to beauty enthusiasts across the country.
                </p>
                <p>
                  Our name, "Shafatain" (شفتين), meaning "lips" in Arabic, reflects our commitment to
                  celebrating the beautiful fusion of Bengali warmth and Middle Eastern sophistication. We
                  carefully curate and import each product, ensuring authentic quality and proven excellence
                  from trusted USA brands.
                </p>
                <p>
                  We believe that luxury should be accessible, authentic, and rooted in trust. Every product we
                  import tells a story of careful selection, rigorous quality checks, and our dedication to
                  bringing you the very best in lip care.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden ornate-border">
                <Image
                  src="/lip-balm.png"
                  alt="Shafatain Products"
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-transparent to-burgundy/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Our Values</h2>
            <p className="text-muted-foreground text-lg">What drives us every day</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "Authentic Quality",
                description: "100% authentic products imported directly from USA brands",
                color: "from-primary to-gold-light",
              },
              {
                icon: Heart,
                title: "Carefully Curated",
                description: "Every product hand-selected for quality, safety, and luxury",
                color: "from-rose-gold to-neutral-warm",
              },
              {
                icon: Leaf,
                title: "Trusted Brands",
                description: "Partnering with America's most respected lip care manufacturers",
                color: "from-burgundy-light to-primary",
              },
              {
                icon: Users,
                title: "Customer First",
                description: "Building trust through authenticity and exceptional service",
                color: "from-cream-dark to-rose-gold",
              },
            ].map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="premium-card p-8 rounded-2xl text-center space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto glow-pulse`}>
                    <Icon className="h-8 w-8 text-cream" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto premium-card p-12 rounded-3xl border border-primary/30 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">Our Commitment to You</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Every product at Shafatain Atelier is carefully selected from premium USA brands known for their
                commitment to quality and natural ingredients. We verify authenticity at every step and ensure
                proper storage and handling to maintain product integrity.
              </p>
              <p>
                Our commitment extends beyond importing products—we're dedicated to educating our customers about
                quality lip care, building a trusted community of beauty enthusiasts, and making international
                luxury accessible right here in Bangladesh.
              </p>
            </div>
            <div className="luxury-divider" />
            <p className="text-xl font-semibold text-primary italic">
              "Bringing the world's best to Bangladesh—where authenticity meets elegance."
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  )
}
