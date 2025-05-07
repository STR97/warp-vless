"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { generateWarpConfig } from "@/utils/warp"

export function WarpGenerator() {
  const [services, setServices] = useState("")
  const [deviceType, setDeviceType] = useState("")
  const [config, setConfig] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleGenerate = async () => {
    if (!services || !deviceType) return
    const generatedConfig = await generateWarpConfig(services, deviceType)
    setConfig(generatedConfig)
    setIsDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2">
        <Label htmlFor="services">Сервисы</Label>
        <Select onValueChange={setServices} value={services}>
          <SelectTrigger id="services">
            <SelectValue placeholder="Выберите сервисы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="service1">Сервис 1</SelectItem>
            <SelectItem value="service2">Сервис 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="deviceType">Тип устройства</Label>
        <Select onValueChange={setDeviceType} value={deviceType}>
          <SelectTrigger id="deviceType">
            <SelectValue placeholder="Выберите тип устройства" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="android">Android</SelectItem>
            <SelectItem value="windows">Windows</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleGenerate} disabled={!services || !deviceType} variant="default">
        Сгенерировать
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="config-dialog sm:max-w-[425px]">
          <DialogHeader className="dialog-header">
            <DialogTitle>Сгенерированная WARP конфигурация</DialogTitle>
            <DialogDescription>
              Сохраните файл конфигурации или отсканируйте QR-код.
            </DialogDescription>
          </DialogHeader>
          <div className="config-generated">{config}</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
