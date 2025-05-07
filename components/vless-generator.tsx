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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateVlessConfig } from "@/utils/vless"

export function VlessGenerator() {
  const [source, setSource] = useState("")
  const [config, setConfig] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleGenerate = async () => {
    if (!source) return
    const generatedConfig = await generateVlessConfig(source)
    setConfig(generatedConfig)
    setIsDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-semibold text-foreground">VLESS Конфигурация</h2>
      <div className="flex flex-col gap-2">
        <Label htmlFor="source">Источник</Label>
        <Select onValueChange={setSource} value={source}>
          <SelectTrigger id="source">
            <SelectValue placeholder="Выберите источник" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="source1">Источник 1</SelectItem>
            <SelectItem value="source2">Источник 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleGenerate} disabled={!source} variant="default">
        Сгенерировать
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="config-dialog sm:max-w-[425px]">
          <DialogHeader className="dialog-header">
            <DialogTitle>Сгенерированная VLESS конфигурация</DialogTitle>
            <DialogDescription>
              Скопируйте конфигурацию или отсканируйте QR-код для использования.
            </DialogDescription>
          </DialogHeader>
          <div className="config-generated">{config}</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
