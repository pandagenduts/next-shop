import { db } from '@/app/firebase'
import { doc, getDoc } from 'firebase/firestore/lite'

export async function getOrder(uid: string, order_id: string) {
  try {
    const docRef = doc(db, 'users', uid, 'orders', order_id)
    const document = await getDoc(docRef)
    const data = { ...document.data(), order_id: document.id }

    return data
  } catch (error) {
    console.log(error)
    return error as Error
  }
}
