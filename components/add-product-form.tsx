"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function AddProductForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    try {
      const winterOfferPrice = formData.get("winter_offer_price") as string
      const { error } = await supabase.from("products").insert({
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: Number.parseFloat(formData.get("price") as string),
        winter_offer_price: winterOfferPrice ? Number.parseFloat(winterOfferPrice) : null,
        image_url: formData.get("image_url") as string,
        stock: Number.parseInt(formData.get("stock") as string),
      })

      if (error) throw error

      // Reset form
      e.currentTarget.reset()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add product")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" name="name" placeholder="Rose Lip Gel" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Moisturizing lip gel with natural ingredients..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (৳)</Label>
            <Input id="price" name="price" type="number" step="0.01" placeholder="350.00" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="winter_offer_price">Winter Offer Price (৳) - Optional</Label>
            <Input id="winter_offer_price" name="winter_offer_price" type="number" step="0.01" placeholder="299.00" />
            <p className="text-xs text-gray-500">Leave empty if no winter offer</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input id="stock" name="stock" type="number" placeholder="50" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input id="image_url" name="image_url" type="url" placeholder="/lip-balm.png" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
