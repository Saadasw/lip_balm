"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { Sparkles } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const handleWhatsAppOrder = () => {
    const displayPrice = product.winter_offer_price || product.price
    const message = encodeURIComponent(
      `Hi! I'd like to order:\n\n${product.name}\nPrice: BDT ${displayPrice}\n\nPlease confirm availability and delivery details.`,
    )
    const whatsappUrl = `https://wa.me/8801752304601?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Card className="ornate-panel glass-card overflow-hidden transition-all duration-500 border border-primary/20 hover:border-primary/40 hover:-translate-y-1 group">
      <div className="relative aspect-square bg-gradient-to-br from-[#1a1208] via-[#120c07] to-[#050505] overflow-hidden">
        <Image 
          src={product.image_url || "/placeholder.svg"} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {product.winter_offer_price && (
          <Badge className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-gradient-to-r from-[#d9a446] to-[#f5d38c] text-black font-semibold flex items-center gap-1 text-xs sm:text-sm px-2 py-1 shadow-lg">
            <Sparkles className="h-3 w-3" />
            <span className="hidden sm:inline">Signature Offer</span>
            <span className="sm:hidden">Offer</span>
          </Badge>
        )}
        {product.stock > 0 ? (
          <Badge className="absolute top-2 right-2 sm:top-4 sm:right-4 glass-card border-primary/40 text-primary font-semibold text-xs sm:text-sm px-2 py-1">
            <span className="hidden sm:inline">In Stock</span>
            <span className="sm:hidden">✓</span>
          </Badge>
        ) : (
          <Badge className="absolute top-2 right-2 sm:top-4 sm:right-4 glass-card border-red-500/30 text-red-400 font-semibold text-xs sm:text-sm px-2 py-1">
            <span className="hidden sm:inline">Out of Stock</span>
            <span className="sm:hidden">✗</span>
          </Badge>
        )}
      </div>
      
      <CardContent className="p-3 sm:p-4 md:p-6">
        <h3 className="font-bold text-base sm:text-lg md:text-xl text-primary mb-2 sm:mb-3 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {product.winter_offer_price ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">BDT {product.winter_offer_price}</p>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground line-through">BDT {product.price}</p>
            </div>
            <Badge className="glass-card border-primary/35 text-primary font-semibold px-2 py-1 text-xs">
              Save BDT {(product.price - product.winter_offer_price).toFixed(0)}
            </Badge>
          </div>
        ) : (
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">BDT {product.price}</p>
        )}
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 md:p-6 pt-0">
        <Button
          onClick={handleWhatsAppOrder}
          disabled={product.stock === 0}
          className="w-full h-10 sm:h-12 rounded-full bg-gradient-to-r from-[#d9a446] to-[#f5d38c] text-black font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-40 text-sm sm:text-base"
        >
          {product.stock === 0 ? "Out of Stock" : "Order on WhatsApp"}
        </Button>
      </CardFooter>
    </Card>
  )
}
