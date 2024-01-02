'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '../ui/button'
import CartItem from './CartItem'
import useCartStore from '@/store/cart-store'
import { idrFormatter } from '@/lib/utils'
import { ProductType } from '@/lib/types'

export type ExtendedCartItems = ProductType & {
  quantity: number
}

type CartItems = {
  items: ExtendedCartItems[] | []
  total_quantity: number
  total_price: number
}

export default function CartButtonServer() {
  const { cartItemsStore } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [cartItems, setCartItems] = useState<CartItems>({
    items: [],
    total_quantity: 0,
    total_price: 0,
  })

  const handleClose = () => setIsOpen(false)

  useEffect(() => {
    setIsFetching(true)
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItemsStore),
    })
      .then((res) => res.json())
      .then((data) => {
        const cartData = data.message
        setIsFetching(false)
        setCartItems(cartData)
      })
      .catch((err) => {
        setIsFetching(false)
        throw new Error(err)
      })
  }, [cartItemsStore])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant='outline' className='rounded-full'>
          <ShoppingCart className='mr-2 h-4 w-4' />
          <span>{cartItems.total_quantity}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col min-[500px]:max-w-sm sm:max-w-md'>
        <SheetHeader className='mb-4'>
          <SheetTitle>Cart</SheetTitle>
          {cartItems.items.length === 0 && (
            <SheetDescription>Cart is empty</SheetDescription>
          )}
        </SheetHeader>
        {cartItems.items.length !== 0 && (
          <div className='flex flex-1 flex-col gap-8 overflow-y-hidden'>
            <div className='flex flex-1 flex-col gap-4 overflow-hidden overflow-y-auto'>
              {cartItems.items.map((item) => (
                <CartItem key={item.id} data={item} isFetching={isFetching} handleSheetClose={handleClose} />
              ))}
            </div>
            <div>
              <div className='mb-5 flex justify-between '>
                <span>Subtotal</span>
                <p className='text-right'>
                  {idrFormatter(cartItems.total_price)}
                </p>
              </div>
              <p className='mb-5 text-center text-xs text-gray-500'>
                Shipping, taxes, and discount codes calculated at checkout.
              </p>
              <Button className='w-full'>Checkout</Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
