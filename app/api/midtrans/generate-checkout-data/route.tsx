import ky from 'ky'
import { NextResponse } from 'next/server'
import { ApiCart } from '../../cart/route'
import { CartItemsStore } from '@/store/cart-store'

export type Api_Midtrans_Generate_Checkout_Data = {
  items: any
  gross_amount: number
  total_quantity: number
}

export async function POST(req: Request) {
  const body = await req.json()
  const cartItemsStore: CartItemsStore[] = body

  const products: ApiCart = await ky
  .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, { json: cartItemsStore })
  .json()

  const items = products.items
  const total_price = products.total_price
  const total_quantity = products.total_quantity

  const updatedItems = items.map((item: any) => {
    return {
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      name: item.name,
      thumbnail: item.thumbnail,
      brand: 'Next Shop',
      category: 'Shoes',
      merchant_name: 'Next Shop',
      url: `https://next-shop-flax-one.vercel.app/products/${item.slug}`,
    }
  })

  return NextResponse.json({
    items: updatedItems,
    gross_amount: total_price,
    total_quantity: total_quantity,
  })
}