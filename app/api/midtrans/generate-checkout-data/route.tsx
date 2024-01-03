import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const items = body.items
  const total_price = body.total_price

  const updatedItems = items.map((item: any) => {
    return {
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      name: item.name,
      brand: 'Next Shop',
      category: 'Shoes',
      merchant_name: 'Next Shop',
      url: `https://next-shop-flax-one.vercel.app/products/${item.slug}`,
    }
  })

  return NextResponse.json({
    items: updatedItems,
    gross_amount: total_price,
  })
}
