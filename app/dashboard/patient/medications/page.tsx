"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { PatientSidebar } from "@/components/patient-sidebar"
import { MedicationCarousel } from "@/components/medication-carousel"
import { MedicationShop } from "@/components/medication-shop"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"
import { ShoppingCart } from "@/components/shopping-cart"
import { CartProvider } from "@/components/cart-context"

export default function MedicationsPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <CartProvider>
      <SidebarProvider>
        <PatientSidebar />

        <SidebarInset>
          <PageWrapper>
            <main className="flex-1 p-4 md:p-6">
              <div className="mx-auto max-w-7xl">
                {/* Page Header */}
                <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent glow-text">
                      Medications
                    </h1>
                    <p className="text-muted-foreground mt-2">
                      Manage your medications and purchase supplies
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <ShoppingCart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
                    <ThemeToggle />
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Current Medications */}
                  <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl font-semibold">Current Medications</CardTitle>
                      <CardDescription>Track your prescribed medications and refill status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MedicationCarousel />
                    </CardContent>
                  </Card>

                  {/* Shop Section */}
                  <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl font-semibold">Medical Supplies Shop</CardTitle>
                      <CardDescription>Purchase medications and health supplies</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MedicationShop />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </PageWrapper>
        </SidebarInset>
      </SidebarProvider>
    </CartProvider>
  )
}
