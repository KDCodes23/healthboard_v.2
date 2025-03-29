"use client"

import { useState } from "react"
import { ShoppingCartIcon as CartIcon, X, Plus, Minus, CreditCard, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"

interface ShoppingCartProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function ShoppingCart({ isOpen, setIsOpen }: ShoppingCartProps) {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false)

  const hasItems = items.length > 0
  const hasPrescriptionItems = items.some((item) => item.prescription)
  const total = getTotal()

  const handleCheckout = () => {
    // In a real app, this would process the payment
    setOrderComplete(true)
    clearCart()
    setCheckoutOpen(false)
  }

  const handlePrescriptionUpload = () => {
    // Simulate prescription upload
    setPrescriptionUploaded(true)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative rounded-full">
            <CartIcon className="h-5 w-5" />
            {hasItems && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </Badge>
            )}
            <span className="sr-only">Open cart</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col w-full sm:max-w-md">
          <SheetHeader className="px-1">
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>

          {hasItems ? (
            <>
              <div className="flex-1 overflow-auto py-4">
                {hasPrescriptionItems && !prescriptionUploaded && (
                  <Alert className="mb-4 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 border-amber-200 dark:border-amber-900">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Prescription Required</AlertTitle>
                    <AlertDescription>
                      Some items in your cart require a valid prescription. Please upload your prescription before
                      checkout.
                    </AlertDescription>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-400"
                      onClick={handlePrescriptionUpload}
                    >
                      Upload Prescription
                    </Button>
                  </Alert>
                )}

                {hasPrescriptionItems && prescriptionUploaded && (
                  <Alert className="mb-4 bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-900">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Prescription Uploaded</AlertTitle>
                    <AlertDescription>
                      Your prescription has been uploaded and will be verified before shipping.
                    </AlertDescription>
                  </Alert>
                )}

                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="h-20 w-20 rounded-md overflow-hidden bg-muted/30 flex-shrink-0">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.brand}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none rounded-l-md"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none rounded-r-md"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$5.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${(total + 5.99 + total * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <SheetFooter className="mt-4">
                  <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full" disabled={hasPrescriptionItems && !prescriptionUploaded}>
                        Checkout
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Complete Your Purchase</DialogTitle>
                        <DialogDescription>Enter your payment details to complete your order.</DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Name on card</Label>
                          <Input id="name" placeholder="John Smith" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="card">Card number</Label>
                          <div className="relative">
                            <Input id="card" placeholder="4242 4242 4242 4242" />
                            <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="expiry">Expiry date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setCheckoutOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCheckout}>Pay ${(total + 5.99 + total * 0.08).toFixed(2)}</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </SheetFooter>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
              <div className="rounded-full bg-muted p-6">
                <CartIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">Your cart is empty</h3>
                <p className="text-muted-foreground mt-1">
                  {orderComplete
                    ? "Thank you for your order! Your medications will be shipped soon."
                    : "Add items to your cart to get started."}
                </p>
              </div>
              <SheetClose asChild>
                <Button variant="outline" className="mt-4">
                  Continue Shopping
                </Button>
              </SheetClose>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}

