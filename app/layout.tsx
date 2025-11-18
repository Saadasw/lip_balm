import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Noto_Sans_Bengali } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import "./globals.css"

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-sans-bengali",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Shafatain Lip Atelier - Luxury Lip Care | Dhaka, Bangladesh",
  description: "Premium lip care blending Bengali heritage with Middle Eastern elegance. Handcrafted with saffron oil, almond butter, and cardamom. Vegan, cruelty-free luxury.",
  keywords: ["lip balm", "luxury lip care", "saffron oil", "Dhaka", "Bengali beauty", "halal cosmetics", "vegan lip care"],
  authors: [{ name: "Shafatain Atelier" }],
  creator: "Shafatain Atelier",
  publisher: "Shafatain Atelier",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://www.shafatain.com",
    siteName: "Shafatain Lip Atelier",
    title: "Shafatain Lip Atelier - Luxury Lip Care",
    description: "Premium lip care blending Bengali heritage with Middle Eastern elegance.",
    images: [
      {
        url: "/shafatain-logo.png",
        width: 1200,
        height: 630,
        alt: "Shafatain Lip Atelier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shafatain Lip Atelier - Luxury Lip Care",
    description: "Premium lip care blending Bengali heritage with Middle Eastern elegance.",
    images: ["/shafatain-logo.png"],
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${notoSansBengali.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CartProvider>
            <WishlistProvider>
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              <Analytics />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
