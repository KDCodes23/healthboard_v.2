"use client"

import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const medications = [
  {
    name: "Lisinopril",
    brand: "Zestril",
    price: 29.99,
    description: "ACE inhibitor for blood pressure management",
    image: "/placeholder.svg?height=100&width=100",
    link: "#",
  },
  {
    name: "Metformin",
    brand: "Glucophage",
    price: 24.99,
    description: "Oral diabetes medicine to control blood sugar",
    image: "/placeholder.svg?height=100&width=100",
    link: "#",
  },
  {
    name: "Atorvastatin",
    brand: "Lipitor",
    price: 34.99,
    description: "Statin medication to lower cholesterol",
    image: "/placeholder.svg?height=100&width=100",
    link: "#",
  },
  {
    name: "Levothyroxine",
    brand: "Synthroid",
    price: 27.99,
    description: "Thyroid hormone replacement therapy",
    image: "/placeholder.svg?height=100&width=100",
    link: "#",
  },
]

export function MedicationShop() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {medications.map((medication) => (
        <Card key={medication.name} className="dashboard-card floating">
          <CardHeader>
            <img
              src={medication.image || "/placeholder.svg"}
              alt={medication.name}
              className="mx-auto h-24 w-24 object-contain"
            />
            <CardTitle className="text-center text-subtitle">{medication.name}</CardTitle>
            <CardDescription className="text-center">{medication.brand}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-small text-muted-foreground">{medication.description}</p>
            <p className="mt-2 text-center text-2xl font-bold">${medication.price}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full dashboard-button" asChild>
              <a href={medication.link} target="_blank" rel="noopener noreferrer">
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

