import { NextResponse } from 'next/server'
const midtransClient = require('midtrans-client')
import ky from 'ky'
import { randomNumber } from '@/lib/faker'
import { ApiCart } from '../../cart/route'
import { Api_Midtrans_Generate_Checkout_Data } from '../generate-checkout-data/route'
import { CartItemsStore } from '@/store/cart-store'

export async function POST(req: Request) {
  const body = await req.json()
  const cartItemsStore: CartItemsStore[] = body

  const products: ApiCart = await ky
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, { json: cartItemsStore })
    .json()

  const checkoutData: Api_Midtrans_Generate_Checkout_Data = await ky
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/midtrans/generate-checkout-data`, {
      json: products,
    })
    .json()

  console.log(checkoutData)

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
