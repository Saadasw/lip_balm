import { createClient } from "@/lib/supabase/server"
import { AdminLogin } from "@/components/admin-login"

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching products:", error)
  }

  return <AdminLogin products={products || []} />
}
