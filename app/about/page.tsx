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
              Where Bengali heritage meets Middle Eastern elegance in every luxurious drop of lip care.
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
                  profound vision: to create lip care that honors tradition while embracing modern luxury.
                </p>
                <p>
                  Our name, "Shafatain" (شفتين), meaning "lips" in Arabic, reflects our commitment to
                  celebrating the beautiful fusion of Bengali warmth and Middle Eastern sophistication. Each
                  product is a testament to the ancient beauty rituals passed down through generations,
                  reimagined for today's discerning customer.
                </p>
                <p>
                  We believe that luxury should be accessible, sustainable, and deeply rooted in cultural
                  heritage. Every jar we craft tells a story of artisanal dedication, natural ingredients, and
                  the timeless pursuit of beauty.
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
                title: "Quality First",
                description: "Only the finest natural ingredients make it into our products",
                color: "from-primary to-gold-light",
              },
              {
                icon: Heart,
                title: "Ethical & Vegan",
                description: "Cruelty-free, vegan formulations that respect all life",
                color: "from-rose-gold to-neutral-warm",
              },
              {
                icon: Leaf,
                title: "Sustainability",
                description: "Eco-conscious practices from sourcing to packaging",
                color: "from-burgundy-light to-primary",
              },
              {
                icon: Users,
                title: "Community",
                description: "Building relationships and celebrating shared beauty traditions",
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
                Every product from Shafatain Atelier is handcrafted in small batches to ensure unparalleled
                quality and attention to detail. We source our ingredients ethically, prioritizing fair trade
                and sustainable practices.
              </p>
              <p>
                Our commitment extends beyond creating beautiful products—we're dedicated to celebrating and
                preserving the rich beauty traditions of Bengali and Middle Eastern cultures while making them
                accessible to modern beauty enthusiasts.
              </p>
            </div>
            <div className="luxury-divider" />
            <p className="text-xl font-semibold text-primary italic">
              "Beauty is a bridge between cultures, a celebration of heritage, and a journey of self-love."
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  )
}
