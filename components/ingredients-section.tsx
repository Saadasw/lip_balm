"use client"

import { Package, Shield, Star, Truck } from "lucide-react"

export function IngredientsSection() {
  const offerings = [
    {
      name: "Hydrating Lip Balms",
      icon: Package,
      benefit: "Daily Essential Care",
      description:
        "Premium moisturizing balms from top USA brands. Perfect for everyday hydration with long-lasting nourishment and protection.",
      color: "from-primary to-gold-light",
    },
    {
      name: "Tinted & Flavored",
      icon: Star,
      benefit: "Beauty Meets Care",
      description:
        "Luxurious tinted balms and flavored formulas from America's favorite brands. Add a pop of color while keeping lips soft and healthy.",
      color: "from-rose-gold to-neutral-warm",
    },
    {
      name: "SPF Protection",
      icon: Shield,
      benefit: "Sun Defense",
      description:
        "Dermatologist-recommended SPF lip care imported from USA. Protect your lips from harmful UV rays while staying moisturized.",
      color: "from-burgundy-light to-primary",
    },
    {
      name: "Specialty Treatments",
      icon: Truck,
      benefit: "Advanced Solutions",
      description:
        "Therapeutic and overnight repair balms from premium American brands. Intensive care for extremely dry or damaged lips.",
      color: "from-cream-dark to-rose-gold",
    },
  ]

  return (
    <section id="products-categories" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 fade-in-up">
          <div className="flex items-center justify-center gap-2 text-primary/80">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="text-sm uppercase tracking-[0.3em] font-medium">Product Range</span>
            <div className="h-px w-12 bg-gradient-to-r from-primary via-primary to-transparent" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-foreground">What We</span>
            <br />
            <span className="gradient-text">Import for You</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We carefully select and import premium lip care from America's most trusted brands, bringing you authentic quality and proven results.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {offerings.map((offering, index) => {
            const Icon = offering.icon
            return (
              <div
                key={offering.name}
                className="premium-card p-8 rounded-2xl hover:-translate-y-2 transition-all duration-500 group scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${offering.color} flex items-center justify-center flex-shrink-0 glow-pulse`}
                  >
                    <Icon className="h-8 w-8 text-cream" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-1">{offering.name}</h3>
                      <p className="text-sm text-rose-gold font-medium">{offering.benefit}</p>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{offering.description}</p>

                    {/* Decorative Element */}
                    <div className="h-px bg-gradient-to-r from-primary/50 to-transparent w-24" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 premium-card p-8 rounded-2xl max-w-3xl mx-auto border border-primary/30">
          <p className="text-xl font-semibold text-primary mb-2">Imported from Top USA Brands • 100% Authentic • Quality Guaranteed</p>
          <p className="text-muted-foreground">
            From household names to specialty brands, we bring you the best lip care America has to offer—verified, authentic, and delivered to your door in Dhaka.
          </p>
        </div>
      </div>
    </section>
  )
}
