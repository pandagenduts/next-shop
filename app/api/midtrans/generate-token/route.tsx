import { NextResponse } from 'next/server'
const midtransClient = require('midtrans-client')

export async function POST(req: Request) {
  const body = await req.json()
  const gross_amount = body.gross_amount
  const item_details = body.items
  const order_id = body.order_id

  // return NextResponse.json(body)

  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT,
  })

  let parameter = JSON.stringify({
    transaction_details: {
      order_id: order_id,
      gross_amount: gross_amount,
    },
    item_details: item_details,
    page_expiry: {
      duration: 3,
      unit: 'hours'
    }
  })

  const token = await snap.createTransaction(parameter)

  return NextResponse.json(token)

}