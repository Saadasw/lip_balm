"use client"

import { Navigation } from "@/components/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, MessageCircle } from "lucide-react"

export default function FAQPage() {
  const faqs = [
    {
      category: "Product Information",
      questions: [
        {
          q: "What makes Shafatain lip care products unique?",
          a: "Our products blend Bengali heritage with Middle Eastern elegance, featuring premium ingredients like saffron oil, almond butter, and cardamom. Each product is handcrafted in small batches to ensure the highest quality and attention to detail.",
        },
        {
          q: "Are your products vegan and cruelty-free?",
          a: "Yes! All Shafatain products are 100% vegan and cruelty-free. We never test on animals and use only plant-based ingredients sourced ethically and sustainably.",
        },
        {
          q: "What ingredients do you use?",
          a: "Our signature ingredients include saffron oil for golden glow, almond butter for deep nourishment, cardamom extract for aromatic freshness, and shea butter for long-lasting moisture. All ingredients are cold-pressed to preserve their natural potency.",
        },
        {
          q: "How long do your products last?",
          a: "When stored properly in a cool, dry place, our lip balms have a shelf life of 12-18 months. We recommend using within 6 months of opening for optimal freshness and efficacy.",
        },
      ],
    },
    {
      category: "Ordering & Delivery",
      questions: [
        {
          q: "How do I place an order?",
          a: "You can order through our website by adding products to your cart and checking out via WhatsApp. Alternatively, you can directly message us on WhatsApp at +880 1752-304601 with your order details.",
        },
        {
          q: "What areas do you deliver to?",
          a: "We currently deliver throughout Dhaka and surrounding areas. For deliveries outside Dhaka, please contact us via WhatsApp to discuss shipping options and costs.",
        },
        {
          q: "How long does delivery take?",
          a: "Within Dhaka, delivery typically takes 1-3 business days. For areas outside Dhaka, delivery may take 3-7 business days depending on your location.",
        },
        {
          q: "What are the delivery charges?",
          a: "Delivery within Dhaka is BDT 60. Orders over BDT 1000 qualify for free delivery. Delivery charges for areas outside Dhaka vary based on location.",
        },
      ],
    },
    {
      category: "Payment & Returns",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept cash on delivery, bKash, Nagad, and bank transfers. Payment details will be shared when you confirm your order via WhatsApp.",
        },
        {
          q: "Can I return or exchange a product?",
          a: "Yes! If you're not satisfied with your purchase, you can return unopened products within 7 days of delivery for a full refund or exchange. Please contact us via WhatsApp to initiate a return.",
        },
        {
          q: "What if my product arrives damaged?",
          a: "We package all products carefully, but if your item arrives damaged, please contact us immediately with photos. We'll arrange a replacement or full refund at no extra cost to you.",
        },
      ],
    },
    {
      category: "Usage & Care",
      questions: [
        {
          q: "How do I use your lip balm?",
          a: "Apply a small amount to clean, dry lips. Reapply as needed throughout the day. For best results, use before bed to allow intensive overnight nourishment.",
        },
        {
          q: "Can I use it under lipstick?",
          a: "Absolutely! Our lip balm creates a perfect hydrating base for lipstick. Apply and let it absorb for 1-2 minutes before applying your favorite lip color.",
        },
        {
          q: "Is it safe for sensitive skin?",
          a: "Yes! Our products are formulated with natural, gentle ingredients suitable for all skin types, including sensitive skin. However, if you have specific allergies, please check the ingredient list or contact us.",
        },
        {
          q: "How should I store the product?",
          a: "Store in a cool, dry place away from direct sunlight. Avoid leaving in hot cars or exposing to extreme temperatures to maintain product quality.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen luxury-background">
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-rose-gold transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-foreground">Frequently Asked</span>
            <br />
            <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Shafatain Atelier products and services
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((category, idx) => (
            <div key={idx} className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold gradient-text">{category.category}</h2>

              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, qIdx) => (
                  <AccordionItem
                    key={qIdx}
                    value={`${idx}-${qIdx}`}
                    className="premium-card border border-primary/30 rounded-xl px-6"
                  >
                    <AccordionTrigger className="text-left text-primary hover:text-rose-gold transition-colors py-6">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center premium-card p-12 rounded-3xl border border-primary/30 max-w-3xl mx-auto">
          <MessageCircle className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold gradient-text mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-8">
            Our team is here to help! Reach out via WhatsApp for personalized assistance.
          </p>
          <a href="https://wa.me/8801752304601" target="_blank" rel="noreferrer">
            <Button size="lg" className="bg-gradient-to-r from-primary to-rose-gold text-primary-foreground luxury-button">
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Us on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
