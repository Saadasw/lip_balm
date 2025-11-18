"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "./types"

export interface CartItem extends Product {
  quantity: number
  selectedVariant?: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number, variant?: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedCart = localStorage.getItem("shafatain-cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("shafatain-cart", JSON.stringify(cart))
    }
  }, [cart, mounted])

  const addToCart = (product: Product, quantity: number = 1, variant?: string) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(
        (item) => item.id === product.id && item.selectedVariant === variant
      )

      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        const newCart = [...currentCart]
        newCart[existingItemIndex].quantity += quantity
        return newCart
      }

      // Add new item
      return [...currentCart, { ...product, quantity, selectedVariant: variant }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((currentCart) =>
      currentCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const cartTotal = cart.reduce((total, item) => {
    const price = item.winter_offer_price || item.price
    return total + price * item.quantity
  }, 0)

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
