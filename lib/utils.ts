import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CartItemsStore } from '@/store/cart-store'

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

export function extractProductsId(cartItems: CartItemsStore[]) {
  const productId: number[] = []

  cartItems.forEach((item) => {
    productId.push(item.id)
  })

  return productId
}

export function countTotalQuantity(items: CartItemsStore[]) {
  let total = 0
  items.forEach((item) => {
    total += item.quantity
  })

  return total
}

// export function countTotalPrice(items: CartItemsType[]) {
//   let total = 0
//   items.forEach((item) => {
//     total += item.quantity * item.price
//   })

//   return total
// }