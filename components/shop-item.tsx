"use client"

import { DirectionAwareHover } from "@/components/ui/direction-aware-hover"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface ShopItemProps {
  name: string
  brand: string
  price: number
  description: string
  imageUrl: string
  link: string
}

export function ShopItem({ name, brand, price, description, imageUrl, link }: ShopItemProps) {
  return (
    <div className="flex flex-col">
      <DirectionAwareHover
        imageUrl={imageUrl || "/placeholder.svg?height=300&width=300"}
        className="w-full h-60 md:h-72 rounded-lg mb-4"
      >
        <div>
          <p className="font-bold text-xl">{name}</p>
          <p className="font-normal text-sm">${price.toFixed(2)}</p>
        </div>
      </DirectionAwareHover>

      <div className="mt-2">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">{brand}</p>
        <p className="mt-2 text-sm">{description}</p>
        <Button className="w-full mt-4 dashboard-button" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Buy Now
          </a>
        </Button>
      </div>
    </div>
  )
}

