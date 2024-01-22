import { NextResponse } from 'next/server'
import { CartItemsStore } from '@/store/cart-store'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { Api_Midtrans_Generate_Token } from '../generate-token/route'
import { Api_Midtrans_Generate_Checkout_Data } from '../generate-checkout-data/route'
import ky from 'ky'
import { UpdateOrder } from '@/lib/actions/firestore/update-order'
import { Midtrans_Checkout_Data, generateCheckoutData } from '@/lib/actions/midtrans/generate-checkout-data'
import { addNewOrder } from '@/lib/actions/firestore/add-new-order'
import { generateToken } from '@/lib/actions/midtrans/generate-token'

export type Api_Midtrans_Create_Order = {
  orderId: string
}

export async function POST(req: Request) {
  const session: any = await getServerSession(authOptions)
  if (!session) return NextResponse.json('Not authenticated.')

  const body = await req.json()
  const cartItemsStore: CartItemsStore[] = body
  const uid = session.uid

  // midtrans: generate checkout data
  const checkoutData: Midtrans_Checkout_Data = await generateCheckoutData(cartItemsStore)

  // firestore: add new order document
  const orderId: string = await addNewOrder(uid, checkoutData) as string

  // midtrans: generate token
  const token = await generateToken(checkoutData, orderId)

  // firestore: add the token to the order document
  const update = await UpdateOrder(uid, orderId, { token: token.token })

  return NextResponse.json({orderId: orderId})
}
