"use client"

import { Leaf, Sparkles, Droplet, Heart } from "lucide-react"

export function IngredientsSection() {
  const ingredients = [
    {
      name: "Saffron Oil",
      icon: Sparkles,
      benefit: "24k Golden Glow",
      description:
        "Precious saffron threads infused in oil deliver natural radiance and antioxidant protection.",
      color: "from-primary to-gold-light",
    },
    {
      name: "Almond Butter",
      icon: Heart,
      benefit: "Deep Nourishment",
      description:
        "Rich in vitamins E and B, almond butter provides intensive moisture and healing properties.",
      color: "from-rose-gold to-neutral-warm",
    },
    {
      name: "Cardamom Extract",
      icon: Leaf,
      benefit: "Aromatic Bliss",
      description:
        "A signature Middle Eastern spice that soothes, refreshes, and imparts a subtle warmth.",
      color: "from-burgundy-light to-primary",
    },
    {
      name: "Shea Butter",
      icon: Droplet,
      benefit: "Long-Lasting Moisture",
      description:
        "Ultra-moisturizing African shea butter locks in hydration for soft, supple lips all day.",
      color: "from-cream-dark to-rose-gold",
    },
  ]

  return (
    <section id="ingredients" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 fade-in-up">
          <div className="flex items-center justify-center gap-2 text-primary/80">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="text-sm uppercase tracking-[0.3em] font-medium">Pure Ingredients</span>
            <div className="h-px w-12 bg-gradient-to-r from-primary via-primary to-transparent" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-foreground">Nature's Finest</span>
            <br />
            <span className="gradient-text">Botanicals</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each ingredient is carefully selected and cold-pressed to preserve its natural potency and
            luxurious benefits.
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {ingredients.map((ingredient, index) => {
            const Icon = ingredient.icon
            return (
              <div
                key={ingredient.name}
                className="premium-card p-8 rounded-2xl hover:-translate-y-2 transition-all duration-500 group scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${ingredient.color} flex items-center justify-center flex-shrink-0 glow-pulse`}
                  >
                    <Icon className="h-8 w-8 text-cream" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-1">{ingredient.name}</h3>
                      <p className="text-sm text-rose-gold font-medium">{ingredient.benefit}</p>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{ingredient.description}</p>

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
          <p className="text-xl font-semibold text-primary mb-2">100% Natural • Vegan • Cruelty-Free</p>
          <p className="text-muted-foreground">
            No parabens, sulfates, or synthetic fragrances. Just pure botanical luxury.
          </p>
        </div>
      </div>
    </section>
  )
}
