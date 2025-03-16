"use client"

import { ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const featuredProducts = [
  {
    name: "Vitamin D3 + K2",
    brand: "HealthEssentials",
    price: 24.99,
    rating: 4.8,
    reviews: 128,
    description: "Support bone health and immune function",
    image: "/placeholder.svg?height=100&width=100",
    link: "#",
    tag: "Bestseller",
  },
  {
    name: "Omega-3 Fish Oil",
    brand: "PureNutrition",
    price: 29.99,
    rating: 4.9,
    reviews: 256,
    description: "Premium EPA & DHA for heart and brain health",
    image: "/placeholder.svg?height=100&width=100",
    link: "#",
    tag: "Popular",
  },
]

export function FeaturedProducts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {featuredProducts.map((product) => (
        <Card key={product.name} className="dashboard-card relative overflow-hidden floating">
          <div className="shape-lines absolute inset-0 opacity-5" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-heading">{product.name}</CardTitle>
                <CardDescription>{product.brand}</CardDescription>
              </div>
              <div className="rounded-full bg-primary/10 px-3 py-1">
                <span className="text-small font-medium text-primary">{product.tag}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-24 w-24 rounded-lg object-cover"
              />
              <div className="space-y-2">
                <p className="text-small text-muted-foreground">{product.description}</p>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-small font-medium">{product.rating}</span>
                  <span className="text-small text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <p className="text-heading font-bold text-primary glow-text">${product.price}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full dashboard-button" asChild>
              <a href={product.link} target="_blank" rel="noopener noreferrer">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Buy Now
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

