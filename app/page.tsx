"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search } from "lucide-react"
import type { Product } from "@/lib/types"
import Image from "next/image"

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
    <div className="min-h-screen luxury-background royal-pattern relative overflow-hidden">
      <div className="ornate-overlay" />
      <div className="golden-ornament floating-gold" style={{ top: "18%", right: "8%" }} />
      <div className="golden-ornament floating-gold" style={{ bottom: "12%", left: "5%", width: 160, height: 160 }} />

      <header className="sticky top-0 z-30 bg-black/70 backdrop-blur-2xl border-b border-primary/15">
        <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-28 h-28 flex items-center justify-center bg-black/40 border border-primary/30 rounded-3xl shadow-[0_0_45px_rgba(245,211,140,0.45)]">
                <Image
                  src="/shafatain-logo.png"
                  alt="Shafatain logo"
                  width={140}
                  height={140}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <p className="golden-text text-xs sm:text-sm uppercase tracking-[0.45em]">Shafatain Atelier</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary leading-tight">
                  Shafatain Lip Atelier
                </h1>
                <p className="calligraphic-accent text-lg text-primary/90">شفتين</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              Golden-crafted lip nourishment inspired by contemporary Bengali heritage and Middle Eastern elegance.
            </p>
            <div className="gold-divider max-w-md" />
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16 text-center relative z-10">
        <div className="ornate-panel glass-card-strong golden-glow p-4 sm:p-8 border border-primary/15">
          <p className="golden-text text-xs sm:text-sm uppercase tracking-[0.35em]">Heritage Blend • Since 2020</p>
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-primary mt-3 mb-4 sm:mb-6">
            Shafatain Signature Lip Gel
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A luxurious lip ritual infused with saffron oil, almond butter, and aromatic cardamom. Designed for Dhaka’s winter with a velvet finish and subtle golden sheen.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 text-xs sm:text-sm text-primary/80">
            <span className="flex items-center justify-center gap-2">◈ 24k-inspired Glow</span>
            <span className="flex items-center justify-center gap-2">◈ Cold-Pressed Botanicals</span>
            <span className="flex items-center justify-center gap-2">◈ Artisan Small Batches</span>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/8801752304601"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-[#d9a446] to-[#f5d38c] text-black font-semibold tracking-wide shadow-lg hover:opacity-90 transition"
            >
              Order on WhatsApp
            </a>
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-full glass-card text-primary font-semibold tracking-wide border border-primary/30">
              Explore Collections
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-6 sm:pb-8 relative z-10">
        <div className="ornate-panel glass-card-strong border border-primary/20 p-4 sm:p-6 md:p-8 shadow-2xl">
          <p className="golden-text text-xs uppercase tracking-[0.35em] mb-4 sm:mb-6">Curate Your Selection</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Search */}
            <div className="space-y-2 sm:space-y-3 sm:col-span-2 lg:col-span-1">
              <Label htmlFor="search" className="text-xs sm:text-sm font-semibold text-primary flex items-center gap-2">
                <Search className="h-3 w-3 sm:h-4 sm:w-4" />
                Search Products
              </Label>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder="Saffron, rose, almond..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input pl-9 sm:pl-11 h-10 sm:h-12 text-sm sm:text-base text-foreground placeholder:text-primary/40"
                />
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-primary/50" />
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="price-range" className="text-xs sm:text-sm font-semibold text-primary">
                Price Range: BDT {priceRange[0]} - BDT {priceRange[1]}
              </Label>
              <div className="glass-input rounded-lg p-3 sm:p-4 border border-primary/25">
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
            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="sort" className="text-xs sm:text-sm font-semibold text-primary">
                Sort By
              </Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort" className="glass-input h-10 sm:h-12 text-sm sm:text-base text-foreground border-primary/30">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent className="glass-card-strong border border-primary/20">
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-asc">Price: Low → High</SelectItem>
                  <SelectItem value="price-desc">Price: High → Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-12 sm:pb-16 relative z-10">
        {loading ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-primary/70 text-sm sm:text-base">Curating your essentials...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-primary/70 text-sm sm:text-base px-4">
              {searchQuery || priceRange[0] > 0 || priceRange[1] < maxPrice
                ? "No creations match your filters. Adjust and explore again."
                : "No collections available at the moment. Return soon for fresh blends."}
            </p>
          </div>
        )}
      </section>

      <footer className="mt-8 sm:mt-12 md:mt-16 relative z-10">
        <div className="container mx-auto px-4 pb-10">
          <div className="ornate-panel glass-card-strong border border-primary/20 p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center lg:text-left">
              <div className="space-y-4">
                <p className="golden-text text-xs uppercase tracking-[0.45em]">Shafatain</p>
                <h3 className="text-2xl font-bold text-primary">Shafatain Lip Atelier</h3>
                <p className="text-sm text-muted-foreground">
                  Premium lip care atelier crafting bespoke blends for Dhaka’s winter evenings.
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="text-xs uppercase tracking-[0.25em] text-primary/70">Scan &amp; Connect</div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-24 h-24 bg-black/40 border border-primary/25 rounded-lg flex items-center justify-center p-2">
                      <Image
                        src="/Shafatain_Website_QR.png"
                        alt="QR code linking to the Shafatain website"
                        width={96}
                        height={96}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Website</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-24 h-24 bg-black/40 border border-primary/25 rounded-lg flex items-center justify-center p-2">
                      <Image
                        src="/Shafatain_Facebook_QR.png"
                        alt="QR code linking to the Shafatain Facebook page"
                        width={96}
                        height={96}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Facebook</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">Visit our website • Follow us on Facebook</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-primary">Contact</h4>
                <p className="text-sm text-primary flex items-center justify-center lg:justify-start gap-2">
                  📱 +880 1752-304601
                </p>
                <p className="text-sm text-muted-foreground flex items-center justify-center lg:justify-start gap-2">
                  📍 Dhaka, Bangladesh
                </p>
                <p className="text-sm text-muted-foreground flex items-center justify-center lg:justify-start gap-2">
                  ✉️ atelier@lipgel.shop
                </p>
              </div>
            </div>
            <div className="gold-divider my-8" />
            <p className="text-center text-xs text-muted-foreground tracking-[0.3em] uppercase">
              © 2025 Shafatain Lip Atelier • Crafted with devotion in Dhaka
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
