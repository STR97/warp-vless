import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeProviderWithYM from "@/components/ThemeProviderWithYM"
import type React from "react"
import Script from "next/script"

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
        <Script id="yandex-metrika">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(98811523, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProviderWithYM>
          {children}
        </ThemeProviderWithYM>
      </body>
    </html>
  )
}
