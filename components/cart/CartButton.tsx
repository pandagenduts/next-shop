'use client'

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
import { useEffect, useState } from 'react'
import { idrFormatter } from '@/lib/utils'

import { Minus, Plus } from 'lucide-react'

import Link from 'next/link'
import Image from 'next/image'

export default function CartButton() {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { cartItems, addItemToCart, removeItemFromCart } = useCartStore()

  // useEffect(() => {
  //   const formattedTotalPrice = idrFormatter(grandTotalPrice)

  //   setCartTotalQuantity(totalQuantityOnCart)
  //   setTotalPrice(formattedTotalPrice)
  // }, [totalQuantityOnCart])

  const handleClose = () => setIsOpen(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant='outline' className='rounded-full'>
          <ShoppingCart className='mr-2 h-4 w-4' />
          <span>0</span>
        </Button>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col min-[500px]:max-w-sm sm:max-w-md'>
        <SheetHeader className='mb-4'>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>Cart is empty</SheetDescription>
        </SheetHeader>
        {/* {cartItems.length > 0 && (
          <div className='flex flex-1 flex-col gap-8 overflow-y-hidden'>
            <div className='flex flex-1 flex-col gap-4 overflow-hidden overflow-y-auto'>
              {cartItems.map((item) => (
                // <CartItem key={item.id} data={item} handleSheetClose={handleClose} />
                <div className='flex gap-4' key={item.id}>
                  <div className='max-w-[90px]'>
                    <Link href='/' onClick={handleClose}>
                      <Image
                        src='/products/classic-1.webp'
                        width={90}
                        height={90}
                        alt='product'
                        className='object-cover'
                      />
                    </Link>
                  </div>
                  <div className='flex flex-1 flex-col justify-between'>
                    <Link href='/' className='font-bold' onClick={handleClose}>
                      Corte Mid Full Black
                    </Link>
                    <div className='flex justify-between gap-4'>
                      <div className='flex w-full max-w-[80px] items-center justify-between'>
                        <Button
                          onClick={() => removeItemFromCart(item.id)}
                          className='h-auto cursor-pointer p-[6px]'
                          variant='outline'
                        >
                          <Minus
                            className='cursor-pointer'
                            size={8}
                            strokeWidth={4}
                          />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          onClick={() => addItemToCart(item.id)}
                          className='h-auto cursor-pointer p-[6px]'
                          variant='outline'
                        >
                          <Plus
                            className='cursor-pointer'
                            size={8}
                            strokeWidth={4}
                          />
                        </Button>
                      </div>
                      <div>Rp 123.000,-</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className='mb-5 flex justify-between '>
                <span>Subtotal</span>
                <p className='text-right'>Rp 123.000,-</p>
              </div>
              <p className='mb-5 text-center text-xs text-gray-500'>
                Shipping, taxes, and discount codes calculated at checkout.
              </p>
              <Button className='w-full'>Checkout</Button>
            </div>
          </div>
        )} */}
      </SheetContent>
    </Sheet>
  )
}
