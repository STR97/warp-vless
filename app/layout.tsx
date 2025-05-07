import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeProviderWithYM from "@/components/ThemeProviderWithYM"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Генерация конфигурации WARP и VLESS",
  description: "Генератор конфигураций для WARP и VLESS"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark">
      <head>
        <link rel="icon" href="/cloud.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <ThemeProviderWithYM>
          {children}
        </ThemeProviderWithYM>
      </body>
    </html>
  )
}
