const midtransClient = require('midtrans-client')

import { UpdateOrder } from '@/lib/actions/firestore/update-order'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const notificationJson = body

  let apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT,
  })

  try {
    const statusResponse = await apiClient.transaction.notification(notificationJson)
    let orderId = statusResponse.order_id
    let transactionStatus = statusResponse.transaction_status
    let fraudStatus = statusResponse.fraud_status
    let uid = statusResponse.metadata.extra_info.user_id

    console.log(
      `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`,
    )

    // Sample transactionStatus handling logic
    if (transactionStatus == 'settlement') {
      // TODO set transaction status on your database to 'success'
      await UpdateOrder(uid, orderId, { payment_status: 'success' })
      return NextResponse.json({ success: true }, { status: 200 })
    } else if (transactionStatus == 'deny') {
      // TODO you can ignore 'deny'
      return NextResponse.json({ success: true }, { status: 200 })
    } else if (transactionStatus == 'cancel' || transactionStatus == 'expire') {
      // TODO set transaction status on your database to 'failure'
      await UpdateOrder(uid, orderId, { payment_status: 'failure' })
      return NextResponse.json({ success: true }, { status: 200 })
    } else if (transactionStatus == 'pending') {
      // TODO set transaction status on your database to 'pending' / waiting payment
      await UpdateOrder(uid, orderId, { payment_status: 'pending' })
      return NextResponse.json({ success: true }, { status: 200 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
