import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CartItemsStore } from '@/store/cart-store'
import { ProductType } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isOrderDetails(urlSplit: string[]) {
  return urlSplit[2] === 'orders' && urlSplit.length === 4
}

export function idrFormatter(num: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(num)
}

export function extractProductsId(cartItemsStore: CartItemsStore[]) {
  const productId: number[] = []

  cartItemsStore.forEach((item) => {
    productId.push(item.id)
  })

  return productId
}

export function countTotalQuantity(cartItemsStore: CartItemsStore[]) {
  let totalQuantity = 0
  cartItemsStore.forEach((item) => {
    totalQuantity += item.quantity
  })

  return totalQuantity
}

export function countTotalPrice(cartItemsStore: CartItemsStore[], products: ProductType[]) {
  let totalPrice = 0
  for (let i = 0; i < cartItemsStore.length; i++) {
    totalPrice += products[i].price * cartItemsStore[i].quantity
  }

  return totalPrice
}