'use client'

import { ShoppingCart as ShoppingCartIcon } from 'lucide-react'
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

export default function CartButton() {
  const { items: cartItems } = useCartStore()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' className='rounded-full'>
          <ShoppingCartIcon className='mr-2 h-4 w-4' />
          <span>0</span>
        </Button>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col min-[500px]:max-w-sm sm:max-w-md'>
        <SheetHeader className='mb-4'>
          <SheetTitle>Cart</SheetTitle>
          {cartItems.length === 0 && (
            <SheetDescription>Cart is empty</SheetDescription>
          )}
        </SheetHeader>
        {cartItems.length > 0 && (
          <div className='flex flex-1 flex-col gap-8 overflow-y-hidden'>
            <div className='flex flex-1 flex-col gap-4 overflow-hidden overflow-y-auto'>
              {cartItems.map((item) => (
                <CartItem key={item.id} data={item} />
              ))}
            </div>

            <div>
              <div className='mb-5 flex justify-between '>
                <span>Subtotal</span>
                <p className='text-right'>Rp 0,-</p>
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
