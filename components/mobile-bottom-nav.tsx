"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, Heart, User, Search } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function MobileBottomNav() {
  const pathname = usePathname()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const [searchOpen, setSearchOpen] = useState(false)

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/#products", icon: Search, label: "Search", onClick: () => setSearchOpen(true) },
    { href: "/cart", icon: ShoppingBag, label: "Cart", badge: cartCount },
    { href: "/wishlist", icon: Heart, label: "Wishlist", badge: wishlistCount },
    { href: "/account", icon: User, label: "Account" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href
  }

  return (
    <>
      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-xl border-t border-primary/20 safe-bottom">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            if (item.onClick) {
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="flex flex-col items-center justify-center gap-1 relative group"
                >
                  <div className={`relative ${active ? "text-primary" : "text-muted-foreground"} group-active:scale-90 transition-all`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                    {item.label}
                  </span>
                </button>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 relative group"
              >
                <div className={`relative ${active ? "text-primary" : "text-muted-foreground"} group-active:scale-90 transition-all`}>
                  <Icon className="h-6 w-6" />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
                {active && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-rose-gold rounded-full" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Search Modal */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="premium-card border-primary/30 top-[10%] translate-y-0">
          <DialogHeader>
            <DialogTitle className="gradient-text">Search Products</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/50" />
            <Input
              type="text"
              placeholder="Search for saffron, rose, almond..."
              className="pl-12 h-14 glass-input border-primary/30 text-lg"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // Implement search functionality
                  window.location.href = "/#products"
                  setSearchOpen(false)
                }
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Press Enter to search
          </p>
        </DialogContent>
      </Dialog>
    </>
  )
}
