"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingBag, Heart, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#products", label: "Products" },
    { href: "#story", label: "Our Story" },
    { href: "#ingredients", label: "Ingredients" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 rounded-2xl transition-all group-hover:scale-105 group-hover:border-primary/60">
              <Image
                src="/shafatain-logo.png"
                alt="Shafatain Atelier"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs uppercase tracking-wider text-primary/70">Shafatain</div>
              <div className="text-lg font-bold text-primary">Lip Atelier</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-rose-gold transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-foreground/80 hover:text-primary"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-foreground/80 hover:text-primary"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-burgundy text-cream text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-foreground/80 hover:text-primary"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-primary/20 premium-card animate-in slide-in-from-top">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="luxury-divider my-2" />
              <Link
                href="/account"
                className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                My Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
