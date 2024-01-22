import { db } from "@/app/firebase"
import { collection, getDocs } from "firebase/firestore/lite"

export async function getOrders(uid: string) {
  try {
    const docRef = collection(db, 'users', uid, 'orders')
    const documents = await getDocs(docRef)

    return documents
  } catch (error) {
    console.log(error)
    return error as Error
  }
}