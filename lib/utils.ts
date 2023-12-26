import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isOrderDetails(urlSplit: string[]) {
  return urlSplit[2] === 'orders' && urlSplit.length === 4
}