"use client"

import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ayesha Rahman",
      location: "Gulshan, Dhaka",
      rating: 5,
      text: "The saffron lip balm is absolutely divine! My lips have never felt so nourished. The subtle golden sheen is perfect for both day and night. Worth every taka!",
      image: "AR",
    },
    {
      name: "Fatima Khan",
      location: "Dhanmondi, Dhaka",
      rating: 5,
      text: "I love how Shafatain combines our Bengali heritage with Middle Eastern luxury. The cardamom scent is so unique and calming. This is now my daily essential!",
      image: "FK",
    },
    {
      name: "Nadia Sultana",
      location: "Banani, Dhaka",
      rating: 5,
      text: "Finally, a luxury lip care brand made in Bangladesh! The quality rivals international brands. My lips stay moisturized all day, even in our harsh winter.",
      image: "NS",
    },
    {
      name: "Zara Chowdhury",
      location: "Uttara, Dhaka",
      rating: 5,
      text: "The packaging is gorgeous and the product itself is exceptional. I've tried many lip balms, but this one truly stands out. A perfect gift for loved ones!",
      image: "ZC",
    },
  ]

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-background to-burgundy/5">
      <div className="absolute inset-0 moroccan-pattern opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 fade-in-up">
          <div className="flex items-center justify-center gap-2 text-primary/80">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="text-sm uppercase tracking-[0.3em] font-medium">Testimonials</span>
            <div className="h-px w-12 bg-gradient-to-r from-primary via-primary to-transparent" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-foreground">Loved by</span>
            <br />
            <span className="gradient-text">Beauty Enthusiasts</span>
          </h2>

          <div className="flex items-center justify-center gap-2 text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-current" />
            ))}
            <span className="ml-2 text-muted-foreground">4.9/5 from 500+ reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="premium-card p-6 rounded-2xl space-y-4 hover:-translate-y-2 transition-all duration-500 scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary/30" />

              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm text-muted-foreground leading-relaxed">{testimonial.text}</p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-primary/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-burgundy flex items-center justify-center text-cream font-bold flex-shrink-0">
                  {testimonial.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-primary text-sm truncate">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Social Proof */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-lg text-primary font-semibold">Join Our Community</p>
          <div className="flex items-center justify-center gap-8 text-muted-foreground text-sm">
            <div>
              <span className="text-3xl font-bold gradient-text block">500+</span>
              Happy Customers
            </div>
            <div className="h-12 w-px bg-primary/20" />
            <div>
              <span className="text-3xl font-bold gradient-text block">4.9</span>
              Average Rating
            </div>
            <div className="h-12 w-px bg-primary/20" />
            <div>
              <span className="text-3xl font-bold gradient-text block">98%</span>
              Would Recommend
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
