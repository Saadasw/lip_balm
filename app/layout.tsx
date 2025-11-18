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
  title: "Shafatain Lip Atelier - Premium USA Lip Care Imports | Dhaka, Bangladesh",
  description: "Authentic premium lip care products imported from USA. Shafatain brings international quality to Bangladesh - saffron oil, almond butter, natural botanicals. 100% authentic, vegan, cruelty-free.",
  keywords: ["USA lip balm", "imported lip care", "authentic beauty products", "Dhaka cosmetics", "American lip balm Bangladesh", "premium lip care", "vegan lip balm"],
  authors: [{ name: "Shafatain Atelier" }],
  creator: "Shafatain Atelier",
  publisher: "Shafatain Atelier",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://www.shafatain.com",
    siteName: "Shafatain Lip Atelier",
    title: "Shafatain - Premium USA Lip Care Imports in Dhaka",
    description: "100% authentic premium lip care products imported from USA. Bringing international quality to Bangladesh.",
    images: [
      {
        url: "/shafatain-logo.png",
        width: 1200,
        height: 630,
        alt: "Shafatain Lip Atelier - USA Imports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shafatain - Premium USA Lip Care in Dhaka",
    description: "100% authentic premium lip care products imported from USA to Bangladesh.",
    images: ["/shafatain-logo.png"],
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#d4a574",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Shafatain" />
        <link rel="apple-touch-icon" href="/shafatain-logo.png" />
      </head>
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
