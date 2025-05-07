"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Settings } from "lucide-react"
import Image from "next/image"

export function VlessGenerator() {
  const [configs, setConfigs] = useState<string[]>([])
  const [currentConfig, setCurrentConfig] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [source, setSource] = useState<"str_bypass" | "vless" | "mix" | "proxy">("str_bypass")
  const [isConfigGenerated, setIsConfigGenerated] = useState(false)
  const [isSourceDialogOpen, setIsSourceDialogOpen] = useState(false)

  const configSources = {
    'str_bypass': 'https://raw.githubusercontent.com/STR97/STRUGOV/main/STR.BYPASS',
    'vless': 'https://raw.githubusercontent.com/STR97/STRUGOV/main/Vless',
    'mix': 'https://raw.githubusercontent.com/STR97/STRUGOV/main/STR',
    'proxy': 'https://raw.githubusercontent.com/STR97/STRUGOV/main/BYPASS',
  }

  const localConfigs = [
    "vless://c5293efa-28f8-4a0f-8f34-541078970cee@45.131.4.131:80?path=%2FTelegram%F0%9F%87%A8%F0%9F%87%B3%40WangCai2&security=none&encryption=none&host=gozargah.validbv7996.ir&type=ws&sni=gozargah.validbv7996.ir#%EF%B8%8F%EF%B8%8F%F0%9F%91%BESTR%20BYPASS%F0%9F%91%BE%20%F0%9F%87%A8%F0%9F%87%A6",
    "vless://c5293efa-28f8-4a0f-8f34-541078970cee@45.131.4.228:80?path=%2FTelegram%F0%9F%87%A8%F0%9F%87%B3%40WangCai2&security=none&encryption=none&host=gozargah.validbv7996.ir&type=ws#%EF%B8%8F%EF%B8%8F%F0%9F%91%BESTR%20BYPASS%F0%9F%91%BE%20%F0%9F%87%A8%F0%9F%87%A6",
    "vless://c5293efa-28f8-4a0f-8f34-541078970cee@45.131.4.214:80?path=%2FTelegram%F0%9F%87%A8%F0%9F%87%B3%40WangCai2&security=none&encryption=none&host=gozargah.validbv7996.ir&type=ws&sni=gozargah.validbv7996.ir#%EF%B8%8F%EF%B8%8F%F0%9F%91%BESTR%20BYPASS%F0%9F%91%BE%20%F0%9F%87%A8%F0%9F%87%A6",
  ]

  const fetchConfigs = async (sourceType: typeof source) => {
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch(configSources[sourceType])
      if (!response.ok) {
        throw new Error(`Не удалось загрузить конфигурации из ${sourceType}`)
      }
      const text = await response.text()
      const loadedConfigs = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
      if (loadedConfigs.length === 0) {
        throw new Error(`Файл конфигураций ${sourceType} пуст`)
      }
      setConfigs(loadedConfigs)
      return loadedConfigs
    } catch (err) {
      setError(`Ошибка загрузки конфигураций для ${sourceType}. Используются локальные конфигурации.`)
      setConfigs(localConfigs)
      return localConfigs
    } finally {
      setIsLoading(false)
    }
  }

  const selectRandomConfig = async () => {
    setIsLoading(true)
    let availableConfigs = configs
    if (!isConfigGenerated || configs.length === 0) {
      availableConfigs = await fetchConfigs(source)
    }
    if (availableConfigs.length === 0) {
      setCurrentConfig("")
      setError("Нет доступных конфигураций.")
      setIsConfigGenerated(false)
    } else {
      const randomConfig = availableConfigs[Math.floor(Math.random() * availableConfigs.length)]
      setCurrentConfig(randomConfig)
      setError("")
      setIsConfigGenerated(true)
    }
    setIsLoading(false)
  }

  const copyConfig = async () => {
    if (!currentConfig) {
      alert("Нет выбранного конфига для копирования!")
      return
    }
    try {
      await navigator.clipboard.writeText(currentConfig)
      alert("Конфиг скопирован в буфер!")
    } catch (err) {
      alert("Ошибка при копировании конфига.")
    }
  }

  const handleSourceChange = async (value: "str_bypass" | "vless" | "mix" | "proxy") => {
    setSource(value)
    setIsConfigGenerated(false)
    setCurrentConfig("")
    setIsSourceDialogOpen(false)
    const loadedConfigs = await fetchConfigs(value)
    setConfigs(loadedConfigs)
  }

  useEffect(() => {
    // Не загружаем конфигурации автоматически, ждём нажатия "Сгенерировать"
  }, [])

  return (
    <Card className="w-full max-w-[800px] mt-6 border border-opacity-30">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-white">
          VLESS Конфигурация
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button onClick={selectRandomConfig} disabled={isLoading} className="flex-grow">
            {isLoading ? "Загрузка..." : "Сгенерировать"}
          </Button>
          <Dialog open={isSourceDialogOpen} onOpenChange={setIsSourceDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="config-dialog sm:max-w-[425px]">
              <DialogHeader className="dialog-header">
                <DialogTitle>Выбор источника конфигураций</DialogTitle>
                <DialogDescription>Выберите источник для загрузки VLESS конфигураций.</DialogDescription>
              </DialogHeader>
              <Select value={source} onValueChange={handleSourceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите источник" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="str_bypass">STR BYPASS</SelectItem>
                  <SelectItem value="vless">VLESS</SelectItem>
                  <SelectItem value="mix">MIX</SelectItem>
                  <SelectItem value="proxy">PROXY</SelectItem>
                </SelectContent>
              </Select>
            </DialogContent>
          </Dialog>
        </div>
        <Button asChild className="w-full">
          <a href="https://st-vless.vercel.app/" target="_blank" rel="noopener noreferrer">
            Подписка на конфигурации
          </a>
        </Button>
        {(isLoading || error || isConfigGenerated) && (
          <div className={isConfigGenerated ? "config-generated" : "config-display"}>
            {isLoading ? (
              <span className="loading animate-spin inline-block w-5 h-5 border-2 border-t-primary border-gray-300 rounded-full"></span>
            ) : error ? (
              <span className="text-destructive">{error}</span>
            ) : isConfigGenerated ? (
              <span>{currentConfig}</span>
            ) : null}
          </div>
        )}
        {isConfigGenerated && (
          <div className="flex gap-2 justify-center flex-wrap">
            <Button onClick={copyConfig} className="flex-1">
              Копировать конфиг
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  QR код
                </Button>
              </DialogTrigger>
              <DialogContent className="config-dialog sm:max-w-[425px]">
                <DialogHeader className="dialog-header">
                  <DialogTitle>QR код конфигурации</DialogTitle>
                  <DialogDescription>Отсканируйте этот QR код для импорта конфигурации</DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center">
                  <Image
                    src={
                      currentConfig
                        ? `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(currentConfig)}&size=250x250`
                        : "/placeholder.svg"
                    }
                    alt="QR Code"
                    width={250}
                    height={250}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
