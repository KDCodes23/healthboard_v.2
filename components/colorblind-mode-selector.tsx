"use client"
import { Check } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface ColorblindModeProps {
  value: string
  onChange: (value: string) => void
}

export function ColorblindModeSelector({ value, onChange }: ColorblindModeProps) {
  const colorblindModes = [
    {
      id: "normal",
      name: "Normal Vision",
      description: "Default color scheme",
      colors: ["#4dff7c", "#a7e8d0", "#2d4f5c"],
    },
    {
      id: "protanopia",
      name: "Protanopia",
      description: "Red-blind",
      colors: ["#CCD600", "#F2F2B6", "#2D4F5C"],
    },
    {
      id: "deuteranopia",
      name: "Deuteranopia",
      description: "Green-blind",
      colors: ["#FF9D00", "#FFD6A5", "#2D4F5C"],
    },
    {
      id: "tritanopia",
      name: "Tritanopia",
      description: "Blue-blind",
      colors: ["#FF6B6B", "#FFC2C2", "#4A4A4A"],
    },
    {
      id: "achromatopsia",
      name: "Achromatopsia",
      description: "Complete color blindness",
      colors: ["#FFFFFF", "#CCCCCC", "#666666"],
    },
  ]

  return (
    <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {colorblindModes.map((mode) => (
        <div key={mode.id}>
          <RadioGroupItem value={mode.id} id={mode.id} className="peer sr-only" />
          <Label
            htmlFor={mode.id}
            className={cn(
              "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer",
              value === mode.id && "border-primary",
            )}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium leading-none">{mode.name}</span>
                <span className="text-xs text-muted-foreground">{mode.description}</span>
              </div>
              {value === mode.id && <Check className="h-4 w-4 text-primary" />}
            </div>
            <div className="mt-4 flex w-full justify-between">
              {mode.colors.map((color, index) => (
                <div key={index} className="h-8 w-8 rounded-full" style={{ backgroundColor: color }} />
              ))}
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

