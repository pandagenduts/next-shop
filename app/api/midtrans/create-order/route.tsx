import { NextResponse } from 'next/server'
import { CartItemsStore } from '@/store/cart-store'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { Api_Midtrans_Generate_Token } from '../generate-token/route'
import { Api_Midtrans_Generate_Checkout_Data } from '../generate-checkout-data/route'
import ky from 'ky'
import { UpdateOrder } from '@/lib/actions/firestore/UpdateOrder'

export type Api_Midtrans_Create_Order = {}

export async function POST(req: Request) {
  const session: any = await getServerSession(authOptions)
  if (!session) return NextResponse.json('Not authenticated.')

  const body = await req.json()
  const cartItemsStore: CartItemsStore[] = body
  const uid = session.uid

  // midtrans: generate checkout data
  const checkoutData: Api_Midtrans_Generate_Checkout_Data = await ky
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/midtrans/generate-checkout-data`, {
      json: cartItemsStore,
    })
    .json()

  // firestore: add new order document
  const orderId: string = await ky
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/firestore/add-new-order`, {
      json: { uid: uid, checkoutData: checkoutData },
    })
    .json()

  console.log(orderId)

  // midtrans: generate token
  const token: Api_Midtrans_Generate_Token = await ky
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/midtrans/generate-token`, {
      json: { checkoutData: checkoutData, orderId: orderId },
    })
    .json()

  // console.log(token)
  const update = await UpdateOrder(uid, orderId, { token: token.token })
  console.log(update)

  return NextResponse.json(orderId)
}
