"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminProductList } from "@/components/admin-product-list"
import { AddProductForm } from "@/components/add-product-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import type { Product } from "@/lib/types"

const ADMIN_PASSWORD = "asw527174999#"

interface AdminLoginProps {
  products: Product[]
}

export function AdminLogin({ products }: AdminLoginProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if already authenticated in session
    const auth = sessionStorage.getItem("admin_auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem("admin_auth", "true")
      setError("")
    } else {
      setError("Incorrect password")
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("admin_auth")
    setPassword("")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-12 h-12 bg-maroon/10 rounded-full flex items-center justify-center mb-2">
              <Lock className="w-6 h-6 text-maroon" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>Enter password to access admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full"
                  autoFocus
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full bg-maroon hover:bg-maroon/90">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-600">Manage your lip gel products</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={handleLogout} variant="outline" size="sm" className="text-sm bg-transparent">
                Logout
              </Button>
              <a href="/" className="text-sm text-pink-600 hover:text-pink-700 underline underline-offset-4">
                Back to Shop
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="lg:col-span-1">
            <AddProductForm />
          </div>

          {/* Product List */}
          <div className="lg:col-span-2">
            <AdminProductList products={products || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
