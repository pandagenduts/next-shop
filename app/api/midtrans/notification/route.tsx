import { UpdateOrder } from '@/lib/actions/firestore/update-order'
import { NextResponse } from 'next/server'

const midtransClient = require('midtrans-client')

export async function POST(req: Request) {
  const body = await req.json()
  const notificationJson = body

  let apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT,
  })

  apiClient.transaction.notification(notificationJson).then((statusResponse: any) => {
    let orderId = statusResponse.order_id
    let transactionStatus = statusResponse.transaction_status
    let fraudStatus = statusResponse.fraud_status
    let uid = statusResponse.metadata.extra_info.user_id

    console.log(
      `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`,
    )

    // Sample transactionStatus handling logic

    if (transactionStatus == 'capture') {
      // capture only applies to card transaction, which you need to check for the fraudStatus
      if (fraudStatus == 'challenge') {
        // TODO set transaction status on your databaase to 'challenge'
      } else if (fraudStatus == 'accept') {
        // TODO set transaction status on your databaase to 'success'
      }
    } else if (transactionStatus == 'settlement') {
      // TODO set transaction status on your databaase to 'success'
      UpdateOrder(uid, orderId, { payment_status: 'success' })
        .then((res) => 'update success')
        .catch((err) => console.log(err))
    } else if (transactionStatus == 'deny') {
      // TODO you can ignore 'deny', because most of the time it allows payment retries
      // and later can become success
    } else if (transactionStatus == 'cancel' || transactionStatus == 'expire') {
      // TODO set transaction status on your databaase to 'failure'
      UpdateOrder(uid, orderId, { payment_status: 'failure' })
        .then((res) => 'update success')
        .catch((err) => console.log(err))
    } else if (transactionStatus == 'pending') {
      // TODO set transaction status on your databaase to 'pending' / waiting payment
      UpdateOrder(uid, orderId, { payment_status: 'pending' })
        .then((res) => 'update success')
        .catch((err) => console.log(err))
    }
  })
  return NextResponse.json({ success: true }, { status: 200 })
}
