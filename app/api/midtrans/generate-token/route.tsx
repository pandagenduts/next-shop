const midtransClient = require('midtrans-client') 
import { NextResponse } from 'next/server'
import { randomNumber } from '@/lib/faker'
import { Api_Midtrans_Generate_Checkout_Data } from '../generate-checkout-data/route'

export type Api_Midtrans_Generate_Token = {
  token: string
  redirect_url: string
}

export async function POST(req: Request) {
  const body = await req.json()
  const checkoutData: Api_Midtrans_Generate_Checkout_Data = body.checkoutData
  const orderId = body.orderId

  // the Midtrans Part - Generate Token
  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT,
  })

  let parameter = JSON.stringify({
    transaction_details: {
      order_id: orderId,
      gross_amount: checkoutData.gross_amount,
    },
    item_details: checkoutData.items,
    page_expiry: {
      duration: 3,
      unit: 'hours',
    },
  })

  const token: Api_Midtrans_Generate_Token = await snap.createTransaction(parameter)

  return NextResponse.json(token)
}
