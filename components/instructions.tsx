"use client"

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface InstructionsDialogProps {
  type: "warp" | "vless"
}

export function InstructionsDialog({ type }: InstructionsDialogProps) {
  return (
    <>
      <DialogHeader className="dialog-header">
        <DialogTitle>
          {type === "warp" ? "Инструкции для WARP" : "Инструкции для VLESS"}
        </DialogTitle>
        <DialogDescription>
          Как использовать сгенерированные конфигурации
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        {type === "warp" ? (
          <>
            <p>
              Для использования WARP конфигураций установите приложение AmneziaWG на ваше устройство. Это современная версия протокола WireGuard с улучшенной обфускацией, чтобы обойти блокировки.
            </p>
            <h3 className="font-semibold">Скачивание AmneziaWG</h3>
            <ul className="list-disc pl-5">
              <li>
                <strong>Android</strong>:{" "}
                <a
                  href="https://github.com/amnezia-vpn/amneziawg-android/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Скачать AmneziaWG для Android
                </a>
              </li>
              <li>
                <strong>Windows</strong>:{" "}
                <a
                  href="https://github.com/amnezia-vpn/amneziawg-windows-client/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Скачать AmneziaWG для Windows
                </a>
              </li>
            </ul>
            <h3 className="font-semibold">Как использовать конфигурацию</h3>
            <ol className="list-decimal pl-5">
              <li>Сгенерируйте конфигурацию, нажав "Сгенерировать" и выбрав нужные параметры.</li>
              <li>Скачайте файл конфигурации (.conf), нажав "Скачать конфиг", или отсканируйте QR-код.</li>
              <li>Установите AmneziaWG по ссылке выше.</li>
              <li>Откройте AmneziaWG и импортируйте конфигурацию:
                <ul className="list-disc pl-5">
                  <li>Для файла: выберите "Импорт из файла" и найдите скачанный .conf файл.</li>
                  <li>Для QR-кода: используйте функцию сканирования QR-кода в приложении.</li>
                </ul>
              </li>
              <li>Подключитесь к VPN, нажав "Connect" в AmneziaWG.</li>
            </ol>
            <p>
              Если возникли проблемы, проверьте настройки или обратитесь в{" "}
              <a href="https://t.me/STR_BYPASS" className="text-primary underline">
                Telegram канал
              </a>.
            </p>
          </>
        ) : (
          <>
            <p>
              Для использования VLESS конфигураций установите приложение v2rayNG (Android) или v2rayN (Windows). Эти клиенты поддерживают протокол VLESS для обхода блокировок с высокой скоростью.
            </p>
            <h3 className="font-semibold">Скачивание v2rayNG/v2rayN</h3>
            <ul className="list-disc pl-5">
              <li>
                <strong>Android</strong>:{" "}
                <a
                  href="https://github.com/2dust/v2rayNG/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Скачать v2rayNG для Android
                </a>
              </li>
              <li>
                <strong>Windows</strong>:{" "}
                <a
                  href="https://github.com/2dust/v2rayN/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Скачать v2rayN для Windows
                </a>
              </li>
            </ul>
            <h3 className="font-semibold">Как использовать конфигурацию</h3>
            <ol className="list-decimal pl-5">
              <li>Сгенерируйте конфигурацию, нажав "Сгенерировать" и выбрав источник.</li>
              <li>Скопируйте конфигурацию (строку vless://) или отсканируйте QR-код.</li>
              <li>Установите v2rayNG или v2rayN по ссылке выше.</li>
              <li>Откройте приложение и импортируйте конфигурацию:
                <ul className="list-disc pl-5">
                  <li>Для строки: вставьте vless:// строку в поле импорта (обычно "Import URL" или "Add Config") или выберите "Импорт из буфера обмена" после копирования строки.</li>
                  <li>Для QR-кода: используйте функцию сканирования QR-кода в приложении.</li>
                </ul>
              </li>
              <li>Подключитесь к VPN, выбрав конфигурацию и нажав "Connect".</li>
            </ol>
            <p>
              Если возникли проблемы, проверьте настройки или обратитесь в{" "}
              <a href="https://t.me/STR_BYPASS" className="text-primary underline">
                Telegram канал
              </a>.
            </p>
          </>
        )}
      </div>
    </>
  )
}
