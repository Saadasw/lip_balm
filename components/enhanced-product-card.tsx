"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { Sparkles, Heart, ShoppingCart, Eye, Minus, Plus } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

interface EnhancedProductCardProps {
  product: Product
}

export function EnhancedProductCard({ product }: EnhancedProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const displayPrice = product.winter_offer_price || product.price
  const hasDiscount = !!product.winter_offer_price

  const handleAddToCart = () => {
    addToCart(product, quantity)
    // You could add a toast notification here
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi! I'd like to order:\n\n${product.name}\nQuantity: ${quantity}\nPrice: BDT ${displayPrice * quantity}\n\nPlease confirm availability and delivery details.`
    )
    const whatsappUrl = `https://wa.me/8801752304601?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      <Card className="ornate-panel premium-card overflow-hidden transition-all duration-500 border border-primary/20 hover:border-primary/40 hover:-translate-y-2 group">
        <div className="relative aspect-square bg-gradient-to-br from-muted via-background to-background overflow-hidden">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badges */}
          {hasDiscount && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-burgundy to-burgundy-light text-cream font-semibold flex items-center gap-1 text-xs px-3 py-1 shadow-lg">
              <Sparkles className="h-3 w-3" />
              Special Offer
            </Badge>
          )}
          {product.stock > 0 ? (
            <Badge className="absolute top-3 right-3 glass-card border-primary/40 text-primary font-semibold text-xs px-3 py-1">
              In Stock
            </Badge>
          ) : (
            <Badge className="absolute top-3 right-3 glass-card border-destructive/30 text-destructive font-semibold text-xs px-3 py-1">
              Sold Out
            </Badge>
          )}

          {/* Quick Actions - Visible on Hover */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <Button
              size="sm"
              variant="secondary"
              className="flex-1 backdrop-blur-xl bg-background/90 hover:bg-background"
              onClick={() => setQuickViewOpen(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Quick View
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className={`backdrop-blur-xl ${
                inWishlist
                  ? "bg-burgundy hover:bg-burgundy-light text-cream"
                  : "bg-background/90 hover:bg-background"
              }`}
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        <CardContent className="p-4 md:p-6">
          <h3 className="font-bold text-base md:text-lg text-primary mb-2 line-clamp-2 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {hasDiscount ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <p className="text-2xl md:text-3xl font-bold gradient-text">BDT {displayPrice}</p>
                <p className="text-sm md:text-base text-muted-foreground line-through">
                  BDT {product.price}
                </p>
              </div>
              <Badge className="glass-card border-primary/35 text-primary font-semibold px-2 py-1 text-xs">
                Save BDT {(product.price - displayPrice).toFixed(0)}
              </Badge>
            </div>
          ) : (
            <p className="text-2xl md:text-3xl font-bold gradient-text">BDT {displayPrice}</p>
          )}
        </CardContent>

        <CardFooter className="p-4 md:p-6 pt-0 flex gap-2">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 h-11 bg-gradient-to-r from-primary to-rose-gold text-primary-foreground font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-40 luxury-button"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>

      {/* Quick View Modal */}
      <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <DialogContent className="max-w-4xl premium-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text">{product.name}</DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Price */}
              <div>
                {hasDiscount ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <p className="text-3xl font-bold gradient-text">BDT {displayPrice}</p>
                      <p className="text-lg text-muted-foreground line-through">BDT {product.price}</p>
                    </div>
                    <Badge className="glass-card border-primary/35 text-primary font-semibold">
                      Save BDT {(product.price - displayPrice).toFixed(0)}
                    </Badge>
                  </div>
                ) : (
                  <p className="text-3xl font-bold gradient-text">BDT {displayPrice}</p>
                )}
              </div>

              {/* Stock Status */}
              <div>
                {product.stock > 0 ? (
                  <Badge className="glass-card border-primary/40 text-primary">
                    ✓ In Stock ({product.stock} available)
                  </Badge>
                ) : (
                  <Badge className="glass-card border-destructive/30 text-destructive">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Quantity</label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-bold w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    handleAddToCart()
                    setQuickViewOpen(false)
                  }}
                  disabled={product.stock === 0}
                  className="w-full h-12 bg-gradient-to-r from-primary to-rose-gold text-primary-foreground font-bold luxury-button"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>

                <Button
                  onClick={handleWhatsAppOrder}
                  disabled={product.stock === 0}
                  variant="outline"
                  className="w-full h-12 border-primary/40"
                >
                  Order on WhatsApp
                </Button>

                <Button
                  onClick={handleWishlistToggle}
                  variant="ghost"
                  className="w-full"
                >
                  <Heart className={`h-5 w-5 mr-2 ${inWishlist ? "fill-current" : ""}`} />
                  {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
