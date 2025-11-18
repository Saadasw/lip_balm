"use client"

export function BrandStory() {
  return (
    <section id="story" className="py-20 md:py-32 relative overflow-hidden bengali-motif">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Section Header */}
          <div className="space-y-4 fade-in-up">
            <div className="flex items-center justify-center gap-2 text-primary/80">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <span className="text-sm uppercase tracking-[0.3em] font-medium">Our Story</span>
              <div className="h-px w-12 bg-gradient-to-r from-primary via-primary to-transparent" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="gradient-text">Heritage Meets</span>
              <br />
              <span className="text-foreground">Modern Elegance</span>
            </h2>
          </div>

          {/* Story Content */}
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed scale-in">
            <p>
              Born in the heart of Dhaka, <span className="text-primary font-semibold">Shafatain Atelier</span>{" "}
              (شفتين - meaning "lips" in Arabic) represents a beautiful fusion of Bengali warmth and Middle
              Eastern sophistication.
            </p>

            <p>
              Our journey began with a simple vision: to create lip care that honors the rich traditions of
              natural beauty while embracing contemporary luxury. Each formula is a love letter to the ancient
              beauty rituals passed down through generations, reimagined for the modern connoisseur.
            </p>

            <div className="luxury-divider my-8" />

            <p className="text-xl font-medium text-primary calligraphic-accent">
              "We don't just create lip care — we craft experiences that celebrate your unique beauty story."
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-12">
            {[
              {
                title: "Artisan Crafted",
                description: "Small-batch production ensures every jar receives meticulous attention",
                icon: "✦",
              },
              {
                title: "Heritage Inspired",
                description: "Time-honored ingredients from Bengali and Middle Eastern traditions",
                icon: "✧",
              },
              {
                title: "Sustainably Made",
                description: "Ethically sourced, vegan, and cruelty-free formulations",
                icon: "✦",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="premium-card p-6 rounded-2xl space-y-3 hover:-translate-y-1 transition-transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl gradient-text">{value.icon}</div>
                <h3 className="text-xl font-bold text-primary">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Bengali-Arabic Typography Feature */}
          <div className="pt-12 space-y-4">
            <p className="text-3xl md:text-4xl font-bold text-primary calligraphic-accent">شفتين</p>
            <p className="text-sm text-muted-foreground uppercase tracking-widest">
              Shafatain • Where Two Cultures Unite
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
