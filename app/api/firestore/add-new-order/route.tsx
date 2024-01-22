import { db } from '@/app/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore/lite'
import { NextResponse } from 'next/server'

export async function POST(req: Request, res: Response) {
  const body = await req.json()
  const checkoutData = body.checkoutData
  const token = body.token
  const uid = body.uid

  // create document on firestore
  try {
    const docRef = await addDoc(collection(db, 'users', uid, 'orders'), {
      date: serverTimestamp(),
      gross_amount: checkoutData.gross_amount,
      payment_status: 'pending',
      token: token,
      items: checkoutData.items,
    })

    return NextResponse.json(docRef.id)
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
}
