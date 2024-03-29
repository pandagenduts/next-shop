import { NextResponse } from 'next/server'
import { allProducts } from '@/data/data'
import { countTotalPrice, countTotalQuantity } from '@/lib/utils'

export type ApiCart = {
  items: any
  total_quantity: number
  total_price: number
}

export async function POST(req: Request) {
  const body = await req.json()
  const cartItemsStore = body

  if (cartItemsStore.length === 0) {
    return NextResponse.json(
      {
        items: cartItemsStore,
        total_quantity: 0,
        total_price: 0,
      },
      { status: 200 },
    )
  }

  // get products based on id from cart store
  // inject quantity for that product from cart store
  const products: any = []
  for (let i = 0; i < cartItemsStore.length; ++i) {
    const product = allProducts.find((product) => product.id === cartItemsStore[i].id)
    const quantity = cartItemsStore[i].quantity
    products.push({ ...product, quantity: quantity })
  }

  const total_quantity = countTotalQuantity(cartItemsStore)
  const total_price = countTotalPrice(cartItemsStore, products)

  return NextResponse.json(
    {
      items: products,
      total_quantity: total_quantity,
      total_price: total_price,
    },
    { status: 200 },
  )
}
