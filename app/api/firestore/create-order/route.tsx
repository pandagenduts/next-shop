import { db } from '@/app/firebase'
import { addDoc, collection } from 'firebase/firestore/lite'
import { NextResponse } from 'next/server'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { Session } from 'next-auth'

type ExtendedSession = Session & {
  uid: string
} | null

export async function POST(req: Request) {
  const session: ExtendedSession = await getServerSession(authOptions)
  const body = await req.json()
  
  if (!session) return NextResponse.json('What r u looking for man? u r not logged in!')

  const uid = session.uid

  try {
    const docRef = await addDoc(collection(db, 'users', uid, 'orders'), {
      name: 'from backend',
    })
    console.log(docRef)

    return NextResponse.json(docRef)
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
}
