const midtransClient = require('midtrans-client')
import { Midtrans_Checkout_Data } from './generate-checkout-data'

export type Midtrans_Generate_Token = {
  token: string
  redirect_url: string
}

// helper function to generate token from Midtrans

export async function generateToken(
  checkoutData: Midtrans_Checkout_Data,
  orderId: string,
  uid: string,
): Promise<Midtrans_Generate_Token> {
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
    enabled_payments: ['bca_va'],
    user_id: uid,
  })

  const token: Midtrans_Generate_Token = await snap.createTransaction(parameter)

  return token
}
