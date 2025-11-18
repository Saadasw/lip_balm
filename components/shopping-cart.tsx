"use client"

import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function ShoppingCart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart()

  const handleCheckout = () => {
    // Generate WhatsApp message with cart items
    const items = cart
      .map((item) => {
        const price = item.winter_offer_price || item.price
        return `${item.name} (x${item.quantity}) - BDT ${price * item.quantity}`
      })
      .join("\n")

    const message = encodeURIComponent(
      `Hi! I'd like to order the following items:\n\n${items}\n\nTotal: BDT ${cartTotal}\n\nPlease confirm availability and delivery details.`
    )
    const whatsappUrl = `https://wa.me/8801752304601?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg premium-card border-l border-primary/30">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold gradient-text flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <ShoppingBag className="h-20 w-20 text-primary/30 mb-4" />
            <p className="text-lg text-muted-foreground mb-2">Your cart is empty</p>
            <p className="text-sm text-muted-foreground/70">
              Add some luxurious lip care to your collection
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {cart.map((item) => {
                const price = item.winter_offer_price || item.price
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-lg glass-card border border-primary/20 hover:border-primary/40 transition-all"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-primary text-sm mb-1 truncate">{item.name}</h4>
                      {item.selectedVariant && (
                        <p className="text-xs text-muted-foreground mb-2">{item.selectedVariant}</p>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm font-bold text-primary">BDT {price * item.quantity}</p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive/80"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-primary/20 pt-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-foreground">Total:</span>
                <span className="gradient-text text-2xl">BDT {cartTotal}</span>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full h-12 bg-gradient-to-r from-primary to-rose-gold text-primary-foreground font-bold text-base luxury-button"
              >
                Checkout via WhatsApp
              </Button>

              <Button
                variant="outline"
                onClick={clearCart}
                className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
