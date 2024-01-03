import { NextResponse } from 'next/server'
const midtransClient = require('midtrans-client')
import ky from 'ky'
import { randomNumber } from '@/lib/faker'

export async function POST(req: Request) {
  const body = await req.json()
  const cartItemsStore = body

  const products: any = await ky
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, { json: cartItemsStore })
    .json()

  const checkoutData: any = await ky
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/midtrans/generate-checkout-data`, {
      json: products,
    })
    .json()


  // the Midtrans Part - Generate Token
  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT,
  })

  let parameter = JSON.stringify({
    transaction_details: {
      order_id: randomNumber(),
      gross_amount: checkoutData.gross_amount,
    },
    item_details: checkoutData.items,
    page_expiry: {
      duration: 3,
      unit: 'hours',
    },
  })

  const token = await snap.createTransaction(parameter)

  return NextResponse.json(token)
}

