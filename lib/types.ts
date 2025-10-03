export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  winter_offer_price: number | null
  image_url: string | null
  stock: number
  created_at: string
}
