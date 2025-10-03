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
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-blue-900 to-teal-900 tech-pattern relative overflow-hidden">
      {/* Animated Tech Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Abstract floating shapes */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-40 right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-40 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "6s" }}
        />
        
        {/* Circuit board lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        
        {/* Vertical circuit lines */}
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-teal-500/20 to-transparent" />
        <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <header className="glass-card-strong border-b border-blue-500/20 sticky top-0 z-10 relative">
        <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
          <div className="flex items-center justify-center flex-col gap-2 sm:gap-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-noto-sans-bengali)] text-center">
              লিপ জেল শপ
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-blue-200 font-medium text-center px-4">Natural Lip Care for Dhaka Winter</p>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-full"></div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16 text-center relative z-10">
        <div className="glass-card rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-500/20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-balance font-[family-name:var(--font-noto-sans-bengali)]">
            শীতের জন্য প্রিমিয়াম লিপ জেল
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-3xl mx-auto text-pretty leading-relaxed px-2">
            Handcrafted with natural ingredients. Perfect for Dhaka's winter season. Order via WhatsApp for fast delivery.
          </p>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-blue-300">
            <span className="flex items-center justify-center gap-1">🌿 100% Natural</span>
            <span className="flex items-center justify-center gap-1">❄️ Winter Special</span>
            <span className="flex items-center justify-center gap-1">🚚 Fast Delivery</span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-6 sm:pb-8 relative z-10">
        <div className="glass-card-strong rounded-2xl border border-blue-500/20 p-4 sm:p-6 md:p-8 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Search */}
            <div className="space-y-2 sm:space-y-3 sm:col-span-2 lg:col-span-1">
              <Label htmlFor="search" className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                <Search className="h-3 w-3 sm:h-4 sm:w-4" />
                Search Products
              </Label>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by name or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input pl-8 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base text-white placeholder:text-blue-300"
                />
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-blue-300" />
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="price-range" className="text-xs sm:text-sm font-semibold text-white">
                Price Range: ৳{priceRange[0]} - ৳{priceRange[1]}
              </Label>
              <div className="glass-input rounded-lg p-3 sm:p-4 border border-blue-500/20">
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
              <Label htmlFor="sort" className="text-xs sm:text-sm font-semibold text-white">
                Sort By
              </Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort" className="glass-input h-10 sm:h-12 text-sm sm:text-base text-white border-blue-500/20">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent className="glass-card-strong border border-blue-500/20">
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
            <p className="text-blue-300 text-sm sm:text-base">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-blue-300 text-sm sm:text-base px-4">
              {searchQuery || priceRange[0] > 0 || priceRange[1] < maxPrice
                ? "No products match your filters. Try adjusting your search."
                : "No products available yet. Check back soon!"}
            </p>
          </div>
        )}
      </section>

      <footer className="glass-card-strong border-t border-blue-500/20 mt-8 sm:mt-12 md:mt-16 relative z-10">
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 text-center sm:text-left">
            <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 font-[family-name:var(--font-noto-sans-bengali)]">
                লিপ জেল শপ
              </h3>
              <p className="text-sm sm:text-base text-blue-200 leading-relaxed px-4 sm:px-0">
                Premium lip care products made with natural ingredients for Dhaka's winter season.
              </p>
              <div className="flex gap-2 justify-center sm:justify-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-bold text-white text-base sm:text-lg mb-3 sm:mb-4">Contact Us</h4>
              <div className="space-y-2">
                <p className="text-sm sm:text-base text-blue-200 flex items-center gap-2 justify-center sm:justify-start">
                  📱 WhatsApp: +880 1234-567890
                </p>
                <p className="text-sm sm:text-base text-blue-200 flex items-center gap-2 justify-center sm:justify-start">
                  📍 Dhaka, Bangladesh
                </p>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-bold text-white text-base sm:text-lg mb-3 sm:mb-4">Winter Special</h4>
              <div className="space-y-2 text-sm sm:text-base text-blue-200">
                <p className="flex items-center gap-2 justify-center sm:justify-start">
                  ☕ Perfect for cold Dhaka mornings
                </p>
                <p className="flex items-center gap-2 justify-center sm:justify-start">
                  🧣 Keeps your lips soft & moisturized
                </p>
                <p className="flex items-center gap-2 justify-center sm:justify-start">
                  🌿 100% natural ingredients
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-500/20 mt-6 sm:mt-8 md:mt-12 pt-4 sm:pt-6 md:pt-8 text-center">
            <p className="text-xs sm:text-sm text-blue-300">
              © 2025 LipGel Shop. Made with ❤️ in Dhaka, Bangladesh.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
