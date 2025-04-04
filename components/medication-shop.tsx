"use client"

import { useState } from "react"
import { ShopItem } from "@/components/shop-item"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter } from "lucide-react"


const medications = [
  {
    id: "lisinopril-10mg",
    name: "Lisinopril 10mg",
    brand: "Zestril",
    price: 29.99,
    description: "ACE inhibitor for blood pressure management",
    imageUrl: "/Lisinopril.jpg",
    category: "Blood Pressure",
    inStock: true,
    prescription: true,
    popular: true,
  },
  {
    id: "metformin-500mg",
    name: "Metformin 500mg",
    brand: "Glucophage",
    price: 24.99,
    description: "Oral diabetes medicine to control blood sugar",
    imageUrl: "/Metformin 500mg.jpeg",
    category: "Diabetes",
    inStock: true,
    prescription: true,
    popular: true,
  },
  {
    id: "vitamin-d",
    name: "Vitamin D3 5000 IU",
    brand: "NatureWell",
    price: 15.99,
    description: "Supports bone health and immune function",
    imageUrl: "/NatureWell.avif",
    category: "Supplements",
    inStock: true,
    prescription: false,
    popular: true,
  },
  {
    id: "omega-3",
    name: "Omega-3 Fish Oil",
    brand: "KLAIRE Life",
    price: 19.99,
    description: "Supports heart and brain health",
    imageUrl: "/omega-3-mini-klaire-labs.jpg",
    category: "Supplements",
    inStock: false,
    prescription: false,
    popular: false,
  },
]

export function MedicationShop() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortOption, setSortOption] = useState("popular")
  const [activeTab, setActiveTab] = useState("all")

  const categories = ["all", ...new Set(medications.map((med) => med.category))]

  // 🔍 Filter logic
  const filtered = medications.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.brand.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || med.category === categoryFilter

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "prescription" && med.prescription) ||
      (activeTab === "otc" && !med.prescription)

    return matchesSearch && matchesCategory && matchesTab
  })

  // 📊 Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price
    if (sortOption === "price-high") return b.price - a.price
    if (sortOption === "popular") return (b.popular ? 1 : 0) - (a.popular ? 1 : 0)
    return 0
  })

  return (
    <div className="space-y-6">
      {/* 🔍 Search + Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search medications..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 📂 Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="prescription">Prescription</TabsTrigger>
          <TabsTrigger value="otc">Over the Counter</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {sorted.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sorted.map((med) => (
                <ShopItem key={med.id} {...med} />
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-muted-foreground">No results found.</p>
          )}
        </TabsContent>

        <TabsContent value="prescription" className="mt-6">
          {sorted.filter((m) => m.prescription).length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sorted.filter((m) => m.prescription).map((med) => (
                <ShopItem key={med.id} {...med} />
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-muted-foreground">No prescription meds found.</p>
          )}
        </TabsContent>

        <TabsContent value="otc" className="mt-6">
          {sorted.filter((m) => !m.prescription).length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sorted.filter((m) => !m.prescription).map((med) => (
                <ShopItem key={med.id} {...med} />
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-muted-foreground">No over-the-counter products found.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
