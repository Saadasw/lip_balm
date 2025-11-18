"use client"

import { Navigation } from "@/components/navigation"
import { useWishlist } from "@/lib/wishlist-context"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, X, ArrowLeft } from "lucide-react"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product: any) => {
    addToCart(product, 1)
  }

  return (
    <div className="min-h-screen luxury-background">
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-rose-gold transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 premium-card p-12 rounded-3xl max-w-2xl mx-auto">
            <Heart className="h-24 w-24 text-primary/30 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-primary mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">
              Save your favorite products to your wishlist and never lose track of what you love.
            </p>
            <Link href="/#products">
              <Button size="lg" className="bg-gradient-to-r from-primary to-rose-gold text-primary-foreground luxury-button">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => {
              const displayPrice = product.winter_offer_price || product.price
              const hasDiscount = !!product.winter_offer_price

              return (
                <div key={product.id} className="premium-card rounded-2xl border border-primary/30 overflow-hidden group">
                  {/* Image */}
                  <div className="relative aspect-square">
                    <Image
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-destructive/20 text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    {hasDiscount && (
                      <div className="absolute top-3 left-3 bg-burgundy text-cream text-xs font-semibold px-3 py-1 rounded-full">
                        Sale
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-primary mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    </div>

                    <div>
                      {hasDiscount ? (
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold gradient-text">BDT {displayPrice}</p>
                          <p className="text-sm text-muted-foreground line-through">BDT {product.price}</p>
                        </div>
                      ) : (
                        <p className="text-2xl font-bold gradient-text">BDT {displayPrice}</p>
                      )}
                    </div>

                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full bg-gradient-to-r from-primary to-rose-gold text-primary-foreground luxury-button"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
