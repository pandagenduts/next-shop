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

export function firstLetterUppercase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function firestoreDateFormatter(firestoreTimestamp: { seconds: number, nanoseconds: number }): string {
  const date = new Date(firestoreTimestamp.seconds * 1000); // Convert seconds to milliseconds
  const formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}, ${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;

  function getMonthName(monthIndex: number): string {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[monthIndex];
  }

  function formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  return formattedDate;
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
