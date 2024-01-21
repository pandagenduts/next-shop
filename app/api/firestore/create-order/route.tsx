import { db } from '@/app/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore/lite'
import { NextResponse } from 'next/server'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { Session } from 'next-auth'
import { Api_Midtrans_Generate_Checkout_Data } from '../../midtrans/generate-checkout-data/route'
import { ApiCart } from '../../cart/route'
import ky from 'ky'
import { CartItemsStore } from '@/store/cart-store'

type ExtendedSession = Session & {
  uid: string
} | null

export async function POST(req: Request) {
  const session: ExtendedSession = await getServerSession(authOptions)
  if (!session) return NextResponse.json('What r u looking for man? u r not logged in!')

  const uid = session.uid
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

  // generate token

  // create document
  try {
    const docRef = await addDoc(collection(db, 'users', uid, 'orders'), {
      date: serverTimestamp(),
      gross_amount: checkoutData.gross_amount,
      payment_status: 'pending',
      products: checkoutData.items,
    })
    console.log(docRef)

    return NextResponse.json(docRef)
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
}
