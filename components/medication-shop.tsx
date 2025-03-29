"use client"

import { ShopItem } from "@/components/shop-item"

const medications = [
  {
    name: "Lisinopril",
    brand: "Zestril",
    price: 29.99,
    description: "ACE inhibitor for blood pressure management",
    imageUrl: "/placeholder.svg?height=300&width=300",
    link: "#",
  },
  {
    name: "Metformin",
    brand: "Glucophage",
    price: 24.99,
    description: "Oral diabetes medicine to control blood sugar",
    imageUrl: "/placeholder.svg?height=300&width=300",
    link: "#",
  },
  {
    name: "Atorvastatin",
    brand: "Lipitor",
    price: 34.99,
    description: "Statin medication to lower cholesterol",
    imageUrl: "/placeholder.svg?height=300&width=300",
    link: "#",
  },
  {
    name: "Levothyroxine",
    brand: "Synthroid",
    price: 27.99,
    description: "Thyroid hormone replacement therapy",
    imageUrl: "/placeholder.svg?height=300&width=300",
    link: "#",
  },
]

export function MedicationShop() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {medications.map((medication, index) => (
        <ShopItem
          key={index}
          name={medication.name}
          brand={medication.brand}
          price={medication.price}
          description={medication.description}
          imageUrl={medication.imageUrl}
          link={medication.link}
        />
      ))}
    </div>
  )
}

