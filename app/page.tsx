"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { BrandStory } from "@/components/brand-story"
import { IngredientsSection } from "@/components/ingredients-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { WelcomePopup } from "@/components/welcome-popup"
import { EnhancedProductCard } from "@/components/enhanced-product-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, SlidersHorizontal } from "lucide-react"
import type { Product } from "@/lib/types"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [maxPrice, setMaxPrice] = useState(1000)
  const [sortBy, setSortBy] = useState("default")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient()
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Error fetching products:", error)
      } else if (data) {
        setProducts(data)
        setFilteredProducts(data)
        // Calculate max price for slider
        const max = Math.max(...data.map((p: Product) => p.price), 1000)
        setMaxPrice(max)
        setPriceRange([0, max])
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let result = [...products]

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Price filter
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(result)
  }, [searchQuery, priceRange, sortBy, products])

  return (
    <div className="min-h-screen luxury-background relative overflow-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Brand Story */}
      <BrandStory />

      {/* Ingredients */}
      <IngredientsSection />

      {/* Products Section */}
      <section id="products" className="py-20 md:py-32 relative overflow-hidden royal-pattern">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-12 fade-in-up">
            <div className="flex items-center justify-center gap-2 text-primary/80">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <span className="text-sm uppercase tracking-[0.3em] font-medium">Our Collection</span>
              <div className="h-px w-12 bg-gradient-to-r from-primary via-primary to-transparent" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="gradient-text">Discover</span>
              <br />
              <span className="text-foreground">Luxury Lip Care</span>
            </h2>
          </div>

          {/* Filters */}
          <div className="premium-card p-6 md:p-8 rounded-2xl mb-12 border border-primary/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div className="space-y-3">
                <Label htmlFor="search" className="text-sm font-semibold text-primary flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search Products
                </Label>
                <div className="relative">
                  <Input
                    id="search"
                    type="text"
                    placeholder="Saffron, rose, almond..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="glass-input pl-11 h-12 text-foreground placeholder:text-primary/40 border-primary/30"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50" />
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-3">
                <Label htmlFor="price-range" className="text-sm font-semibold text-primary flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Price: BDT {priceRange[0]} - {priceRange[1]}
                </Label>
                <div className="glass-input rounded-lg p-4 border border-primary/25">
                  <Slider
                    id="price-range"
                    min={0}
                    max={maxPrice}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="space-y-3">
                <Label htmlFor="sort" className="text-sm font-semibold text-primary">
                  Sort By
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort" className="glass-input h-12 text-foreground border-primary/30">
                    <SelectValue placeholder="Default" />
                  </SelectTrigger>
                  <SelectContent className="premium-card border border-primary/20">
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="loading-shimmer w-32 h-32 rounded-full mx-auto mb-4" />
              <p className="text-primary/70">Curating your collection...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product: Product) => (
                <EnhancedProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 premium-card p-8 rounded-2xl">
              <p className="text-primary/70 text-lg">
                {searchQuery || priceRange[0] > 0 || priceRange[1] < maxPrice
                  ? "No products match your filters. Try adjusting your search."
                  : "No products available at the moment. Check back soon!"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Footer */}
      <footer className="py-16 relative z-10 border-t border-primary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 rounded-2xl">
                  <Image
                    src="/shafatain-logo.png"
                    alt="Shafatain logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-primary/70">Shafatain</p>
                  <p className="font-bold text-primary">Lip Atelier</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Premium lip care blending Bengali heritage with Middle Eastern elegance.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-primary">Quick Links</h4>
              <div className="flex flex-col gap-2 text-sm">
                <a href="#products" className="text-muted-foreground hover:text-primary transition-colors">
                  Products
                </a>
                <a href="#story" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Story
                </a>
                <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
                <a href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </a>
              </div>
            </div>

            {/* Customer Care */}
            <div className="space-y-4">
              <h4 className="font-semibold text-primary">Customer Care</h4>
              <div className="flex flex-col gap-2 text-sm">
                <a href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
                <a href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping & Returns
                </a>
                <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold text-primary">Contact</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="tel:+8801752304601" className="hover:text-primary transition-colors">
                  +880 1752-304601
                </a>
                <a href="mailto:atelier@lipgel.shop" className="hover:text-primary transition-colors">
                  atelier@lipgel.shop
                </a>
                <p>Dhaka, Bangladesh</p>
              </div>

              {/* Social QR Codes */}
              <div className="flex gap-3 pt-2">
                <div className="w-16 h-16 bg-background/60 border border-primary/25 rounded-lg flex items-center justify-center p-1">
                  <Image
                    src="/Shafatain_Website_QR.png"
                    alt="Website QR"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div className="w-16 h-16 bg-background/60 border border-primary/25 rounded-lg flex items-center justify-center p-1">
                  <Image
                    src="/Shafatain_Facebook_QR.png"
                    alt="Facebook QR"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="luxury-divider mb-8" />

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              © 2025 Shafatain Lip Atelier. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Crafted with ❤️ in Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </footer>

      {/* Welcome Popup */}
      <WelcomePopup />
    </div>
  )
}
