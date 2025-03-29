"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ShoppingCart, Heart, Info, Check } from "lucide-react"
import { useCart } from "@/components/cart-context"

interface ShopItemProps {
  id: string
  name: string
  brand: string
  price: number
  description: string
  imageUrl: string
  category: string
  inStock: boolean
  prescription?: boolean
}

export function ShopItem({
  id,
  name,
  brand,
  price,
  description,
  imageUrl,
  category,
  inStock,
  prescription = false,
}: ShopItemProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart, isInCart } = useCart()
  const alreadyInCart = isInCart(id)

  const handleAddToCart = () => {
    if (!alreadyInCart && inStock) {
      addToCart({
        id,
        name,
        brand,
        price,
        imageUrl,
        quantity: 1,
        prescription,
      })
    }
  }

  return (
    <div className="relative rounded-xl border bg-card text-card-foreground shadow transition-all hover:shadow-md group overflow-hidden">
      {/* Top action buttons */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className={`h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm ${
            isFavorite ? "text-red-500 border-red-200" : "text-muted-foreground"
          }`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500" : ""}`} />
          <span className="sr-only">Add to wishlist</span>
        </Button>

        {prescription && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm text-amber-500 border-amber-200"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Prescription required</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Category badge */}
      <Badge className="absolute top-2 left-2 z-10 bg-background/80 backdrop-blur-sm" variant="secondary">
        {category}
      </Badge>

      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted/30">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="text-sm text-muted-foreground">{brand}</p>
        <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
        <p className="text-xl font-bold">${price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>

      {/* Button */}
      <div className="p-4 pt-0">
        <Button
          className="w-full gap-2"
          variant={alreadyInCart ? "secondary" : "default"}
          disabled={!inStock || (prescription && alreadyInCart)}
          onClick={handleAddToCart}
        >
          {!inStock ? (
            "Out of Stock"
          ) : alreadyInCart ? (
            <>
              <Check className="h-4 w-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              {prescription ? "Request with Prescription" : "Add to Cart"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
