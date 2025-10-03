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
import type { Product } from "@/lib/types"
import { Pencil, Trash2, X } from "lucide-react"

interface AdminProductListProps {
  products: Product[]
}

export function AdminProductList({ products }: AdminProductListProps) {
  const router = useRouter()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("products").delete().eq("id", id)
      if (error) throw error
      router.refresh()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete product")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    try {
      const winterOfferPrice = formData.get("winter_offer_price") as string
      const { error } = await supabase
        .from("products")
        .update({
          name: formData.get("name") as string,
          description: formData.get("description") as string,
          price: Number.parseFloat(formData.get("price") as string),
          winter_offer_price: winterOfferPrice ? Number.parseFloat(winterOfferPrice) : null,
          image_url: formData.get("image_url") as string,
          stock: Number.parseInt(formData.get("stock") as string),
        })
        .eq("id", id)

      if (error) throw error

      setEditingId(null)
      router.refresh()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update product")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No products yet. Add your first product to get started.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 hover:border-pink-200 transition-colors">
                {editingId === product.id ? (
                  <form onSubmit={(e) => handleUpdate(e, product.id)} className="space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm text-gray-700">Edit Product</h3>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setEditingId(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor={`edit-name-${product.id}`} className="text-xs">
                          Name
                        </Label>
                        <Input id={`edit-name-${product.id}`} name="name" defaultValue={product.name} required />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor={`edit-price-${product.id}`} className="text-xs">
                          Price (৳)
                        </Label>
                        <Input
                          id={`edit-price-${product.id}`}
                          name="price"
                          type="number"
                          step="0.01"
                          defaultValue={product.price}
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor={`edit-stock-${product.id}`} className="text-xs">
                          Stock
                        </Label>
                        <Input
                          id={`edit-stock-${product.id}`}
                          name="stock"
                          type="number"
                          defaultValue={product.stock}
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor={`edit-image-${product.id}`} className="text-xs">
                          Image URL
                        </Label>
                        <Input
                          id={`edit-image-${product.id}`}
                          name="image_url"
                          defaultValue={product.image_url || ""}
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor={`edit-winter-${product.id}`} className="text-xs">
                          Winter Offer (৳)
                        </Label>
                        <Input
                          id={`edit-winter-${product.id}`}
                          name="winter_offer_price"
                          type="number"
                          step="0.01"
                          defaultValue={product.winter_offer_price || ""}
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor={`edit-description-${product.id}`} className="text-xs">
                        Description
                      </Label>
                      <Textarea
                        id={`edit-description-${product.id}`}
                        name="description"
                        defaultValue={product.description || ""}
                        rows={2}
                      />
                    </div>

                    <Button type="submit" size="sm" className="w-full" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        {product.stock > 0 ? (
                          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">
                            In Stock
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        {product.winter_offer_price ? (
                          <>
                            <span className="font-semibold text-red-600">৳{product.winter_offer_price}</span>
                            <span className="text-gray-400 line-through">৳{product.price}</span>
                            <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded">Winter Offer</span>
                          </>
                        ) : (
                          <span className="font-semibold text-pink-600">৳{product.price}</span>
                        )}
                        <span className="text-gray-500">Stock: {product.stock}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingId(product.id)} disabled={isLoading}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)} disabled={isLoading}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
