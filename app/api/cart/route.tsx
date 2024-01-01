import { NextResponse } from 'next/server'
import { allProducts } from '@/data/data'

export async function POST(req: Request) {
  const cartItemsStore = await req.json()
  console.log(cartItemsStore)
  // const productBasedOnId = getProducts

  return NextResponse.json({ message: cartItemsStore }, { status: 200 })
}
