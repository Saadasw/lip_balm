"use client"

import { Navigation } from "@/components/navigation"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  const handleCheckout = () => {
    const items = cart
      .map((item) => {
        const price = item.winter_offer_price || item.price
        return `${item.name} (x${item.quantity}) - BDT ${price * item.quantity}`
      })
      .join("\n")

    const message = encodeURIComponent(
      `Hi! I'd like to order the following items:\n\n${items}\n\nTotal: BDT ${cartTotal}\n\nPlease confirm availability and delivery details.`
    )
    window.open(`https://wa.me/8801752304601?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen luxury-background">
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-rose-gold transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 premium-card p-12 rounded-3xl max-w-2xl mx-auto">
            <ShoppingBag className="h-24 w-24 text-primary/30 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-primary mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Discover our luxury lip care collection and add some items to your cart.
            </p>
            <Link href="/#products">
              <Button size="lg" className="bg-gradient-to-r from-primary to-rose-gold text-primary-foreground luxury-button">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => {
                const price = item.winter_offer_price || item.price
                return (
                  <div key={item.id} className="premium-card p-6 rounded-2xl border border-primary/30">
                    <div className="flex gap-6">
                      {/* Image */}
                      <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image_url || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-xl text-primary mb-1">{item.name}</h3>
                            {item.selectedVariant && (
                              <p className="text-sm text-muted-foreground">{item.selectedVariant}</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity */}
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-9 w-9 rounded-lg"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-lg font-semibold w-12 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-9 w-9 rounded-lg"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-2xl font-bold gradient-text">BDT {price * item.quantity}</p>
                            {item.winter_offer_price && (
                              <p className="text-sm text-muted-foreground line-through">
                                BDT {item.price * item.quantity}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              <Button
                variant="outline"
                onClick={clearCart}
                className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="premium-card p-8 rounded-2xl border border-primary/30 sticky top-32">
                <h2 className="text-2xl font-bold gradient-text mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>BDT {cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="luxury-divider" />
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="gradient-text">BDT {cartTotal}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="w-full h-14 bg-gradient-to-r from-primary to-rose-gold text-primary-foreground font-bold text-lg luxury-button mb-4"
                >
                  Checkout via WhatsApp
                </Button>

                <Link href="/#products">
                  <Button variant="outline" size="lg" className="w-full border-primary/40">
                    Continue Shopping
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-primary/20 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Free delivery on orders over BDT 1000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Secure WhatsApp checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>100% Authentic products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
