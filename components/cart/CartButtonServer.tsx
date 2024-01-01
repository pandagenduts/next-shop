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
import {
  countTotalPrice,
  countTotalQuantity,
  extractProductsId,
  idrFormatter,
} from '@/lib/utils'

import { Minus, Plus } from 'lucide-react'

import Link from 'next/link'
import Image from 'next/image'
import { getProducts } from '@/lib/actions/getProducts'
import { ProductType } from '@/lib/types'

type ExtendedCartItems = ProductType & {
  quantity: number
}

type CartItems = {
  items: ExtendedCartItems[] | []
  totalQuantity: number
  totalPrice: number
}

export default function CartButtonServer() {
  const { cartItemsStore, addItemToCart, removeItemFromCart } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [cartItems, setCartItems] = useState<CartItems>({
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
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
          <span>{cartItems.totalQuantity}</span>
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
                // <CartItem key={item.id} data={item} handleSheetClose={handleClose} />
                <div className='flex gap-4' key={item.id}>
                  <div className='max-w-[90px]'>
                    <Link href={`/products/${item.slug}`} onClick={handleClose}>
                      <Image
                        src={item.thumbnail}
                        width={90}
                        height={90}
                        alt='product'
                        className='object-cover'
                      />
                    </Link>
                  </div>
                  <div className='flex flex-1 flex-col justify-between'>
                    <Link href={`/products/${item.slug}`} className='font-bold' onClick={handleClose}>
                      {item.name}
                    </Link>
                    <div className='flex justify-between gap-4'>
                      <div className='flex w-full max-w-[80px] items-center justify-between'>
                        <Button
                          onClick={() => removeItemFromCart(item.id)}
                          className='h-auto cursor-pointer p-[6px]'
                          variant='outline'
                          disabled={isFetching}
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
                          disabled={isFetching}
                        >
                          <Plus
                            className='cursor-pointer'
                            size={8}
                            strokeWidth={4}
                          />
                        </Button>
                      </div>
                      <div>{idrFormatter(item.price)}-</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className='mb-5 flex justify-between '>
                <span>Subtotal</span>
                <p className='text-right'>{idrFormatter(cartItems.totalPrice)}</p>
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
