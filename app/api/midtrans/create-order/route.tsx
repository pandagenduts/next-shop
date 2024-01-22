import { CartItemsStore } from '@/store/cart-store'
import ky from 'ky'
import { NextResponse } from 'next/server'
import { Api_Midtrans_Generate_Token } from '../generate-token/route'
import { Api_Midtrans_Generate_Checkout_Data } from '../generate-checkout-data/route'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

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

  // console.log(checkoutData)

  // midtrans: generate token
  const token: Api_Midtrans_Generate_Token = await ky
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/midtrans/generate-token`, { json: checkoutData })
    .json()

  // console.log(token)

  // firestore: add new order document
  const orderDoc = await ky
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/firestore/add-new-order`, {
      json: { uid: uid, checkoutData: checkoutData, token: token.token },
    })
    .json()

  console.log(orderDoc)

  return NextResponse.json(orderDoc)
}
