import { NextResponse } from 'next/server'
import { CartItemsStore } from '@/store/cart-store'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { UpdateOrder } from '@/lib/actions/firestore/update-order'
import {
  Midtrans_Checkout_Data,
  generateCheckoutData,
} from '@/lib/actions/midtrans/generate-checkout-data'
import { addNewOrder } from '@/lib/actions/firestore/add-new-order'
import { Midtrans_Generate_Token, generateToken } from '@/lib/actions/midtrans/generate-token'

export type Api_Midtrans_Create_Order = {
  orderId: string
}

export async function POST(req: Request) {
  const session: any = await getServerSession(authOptions)
  if (!session) return NextResponse.json('Not authenticated.')

  const body = await req.json()
  const cartItemsStore: CartItemsStore[] = body
  const uid = session.uid

  // midtrans: generate checkout data from zustand cart items store
  const checkoutData: Midtrans_Checkout_Data = await generateCheckoutData(cartItemsStore)

  // firestore: add new order document
  const orderId: string = (await addNewOrder(uid, checkoutData)) as string

  // midtrans: generate token
  const token: Midtrans_Generate_Token = await generateToken(checkoutData, orderId)

  // firestore: add the token to the order document
  const update: string = (await UpdateOrder(uid, orderId, { token: token.token })) as string

  return NextResponse.json({ orderId: orderId })
}
