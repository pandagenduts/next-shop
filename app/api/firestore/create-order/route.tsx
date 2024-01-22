import { db } from '@/app/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore/lite'
import { NextResponse } from 'next/server'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { Session } from 'next-auth'
import { Api_Midtrans_Generate_Checkout_Data } from '../../midtrans/generate-checkout-data/route'
import ky from 'ky'
import { CartItemsStore } from '@/store/cart-store'

type ExtendedServerSession = Session & {
  uid: string
} | null

export async function POST(req: Request) {
  const session: ExtendedServerSession = await getServerSession(authOptions)
  if (!session) return NextResponse.json('What r u looking for man? u r not logged in!')

  const uid = session.uid
  const body = await req.json()
  const cartItemsStore: CartItemsStore[] = body

  const checkoutData: Api_Midtrans_Generate_Checkout_Data = await ky
  .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/midtrans/generate-checkout-data`, {
    json: cartItemsStore,
  })
  .json()

  // create document
  try {
    const docRef = await addDoc(collection(db, 'users', uid, 'orders'), {
      date: serverTimestamp(),
      gross_amount: checkoutData.gross_amount,
      payment_status: 'pending',
      products: checkoutData.items,
    })

    return NextResponse.json(docRef.id)
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
}
