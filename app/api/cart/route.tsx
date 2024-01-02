import { NextResponse } from 'next/server'
import { allProducts } from '@/data/data'
import { countTotalPrice, countTotalQuantity } from '@/lib/utils'

export async function POST(req: Request) {
  const cartItemsStore = await req.json()

  if (cartItemsStore.length === 0) {
    return NextResponse.json(
      {
        message: {
          items: cartItemsStore,
          totalQuantity: 0,
          totalPrice: 0,
        },
      },
      { status: 200 },
    )
  }

  // get products based on id from cart store
  // inject quantity for that product from cart store
  const products: any = []
  for (let i = 0; i < cartItemsStore.length; ++i) {
    const product = allProducts.find(
      (product) => product.id === cartItemsStore[i].id,
    )
    const quantity = cartItemsStore[i].quantity
    products.push({...product, quantity: quantity})
  }

  const totalQuantity = countTotalQuantity(cartItemsStore)
  const totalPrice = countTotalPrice(cartItemsStore, products)

  return NextResponse.json(
    {
      message: {
        items: products,
        totalQuantity: totalQuantity,
        totalPrice: totalPrice,
      },
    },
    { status: 200 },
  )
}
