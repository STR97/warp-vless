"use client"

import { useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { WarpGenerator } from "@/components/warp-generator"
import { VlessGenerator } from "@/components/vless-generator"

export default function Home() {
  useEffect(() => {
    const canvas = document.getElementById("matrix-bg") as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()"
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = Array(Math.floor(columns)).fill(1)

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length))
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    const handleResize = () => {
      canvas.height = window.innerHeight
      canvas.width = window.innerWidth
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 w-full text-center overflow-hidden">
      {/* Анимированный фон в стиле Матрица */}
      <canvas id="matrix-bg" className="fixed inset-0 z-0" />
      {/* Основной контент */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <Alert className="alert mb-6 break-words" style={{ display: "none" }}>
          <AlertTitle>Telegram Bot для генерации конфигов WARP</AlertTitle>
          <AlertDescription className="break-words">
            Создал бота для генерации конфигов, если сайт вдруг перестанет работать:{" "}
            <a href="https://t.me/warp_generator_bot" className="font-medium">
              Warp Generator Bot
            </a>
          </AlertDescription>
        </Alert>
        <div className="flex flex-col items-center justify-center gap-6 w-[300px]">
          <h1 className="text-5xl font-bold animated-gradient pulsing-text">
            STR BYPASS
          </h1>
          <h2 className="text-2xl font-semibold animated-gradient">
            WARP ГЕНЕРАТОР
          </h2>
          <WarpGenerator />
          <div className="w-full text-left space-y-4">
            <h3 className="text-lg font-semibold">Как использовать WARP конфигурацию</h3>
            <p className="text-sm text-muted-foreground">
              Для использования сгенерированной WARP конфигурации установите приложение AmneziaWG и следуйте этим шагам:
            </p>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
              <li>Нажмите "Сгенерировать" и выберите настройки (сервисы, тип устройства).</li>
              <li>Скачайте файл конфигурации (.conf) или отсканируйте QR-код.</li>
              <li>Скачайте и установите AmneziaWG:</li>
              <ul className="list-disc list-inside ml-4">
                <li><a href="https://github.com/amnezia-vpn/amneziawg-android/releases" target="_blank" rel="noopener noreferrer" className="underline">AmneziaWG для Android</a></li>
                <li><a href="https://github.com/amnezia-vpn/amneziawg-windows-client/releases" target="_blank" rel="noopener noreferrer" className="underline">AmneziaWG для Windows</a></li>
              </ul>
              <li>Откройте AmneziaWG, нажмите "Добавить туннель" и выберите скачанный файл конфигурации или отсканируйте QR-код.</li>
              <li>Нажмите "Подключить" для активации VPN.</li>
            </ol>
            <p className="text-sm text-muted-foreground">
              Если возникают проблемы, обратитесь в <a href="https://t.me/STR_BYPASS" className="underline">Telegram канал</a> за помощью.
            </p>
          </div>
          <h2 className="text-2xl font-semibold animated-gradient">
            VLESS ГЕНЕРАТОР
          </h2>
          <VlessGenerator />
          <div className="w-full text-left space-y-4">
            <h3 className="text-lg font-semibold">Как использовать VLESS конфигурацию</h3>
            <p className="text-sm text-muted-foreground">
              Для использования сгенерированной VLESS конфигурации установите приложение v2rayNG (Android) или v2rayN (Windows) и следуйте этим шагам:
            </p>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
              <li>Нажмите "Сгенерировать" и выберите источник конфигурации.</li>
              <li>Скопируйте конфигурацию или отсканируйте QR-код.</li>
              <li>Скачайте и установите приложение:</li>
              <ul className="list-disc list-inside ml-4">
                <li><a href="https://github.com/2dust/v2rayNG/releases" target="_blank" rel="noopener noreferrer" className="underline">v2rayNG для Android</a></li>
                <li><a href="https://github.com/2dust/v2rayN/releases" target="_blank" rel="noopener noreferrer" className="underline">v2rayN для Windows</a></li>
              </ul>
              <li>Откройте v2rayNG/v2rayN, нажмите "+" или "Import Config from Clipboard" и вставьте скопированную конфигурацию, либо отсканируйте QR-код.</li>
              <li>Выберите конфигурацию и нажмите "Connect" для активации VPN.</li>
            </ol>
            <p className="text-sm text-muted-foreground">
              Для получения подписки на конфигурации посетите <a href="https://st-vless.vercel.app/" className="underline">сайт подписки</a>.
            </p>
          </div>
          <Button asChild className="w-full">
            <a href="https://t.me/STR_BYPASS">Telegram канал</a>
          </Button>
        </div>
        <footer className="footer mt-6">
          <p className="footer-text">Поддержать проект:</p>
          <div className="flex gap-2 justify-center">
            <a href="https://pay.cloudtips.ru/p/5d86d9ab" target="_blank" rel="noopener noreferrer" className="footer-link">
              через CloudTips
            </a>
            <span className="footer-divider">,</span>
            <a href="https://t.me/tribute/app?startapp=dpAE" target="_blank" rel="noopener noreferrer" className="footer-link">
              через Telegram
            </a>
          </div>
        </footer>
      </div>
    </main>
  )
}
