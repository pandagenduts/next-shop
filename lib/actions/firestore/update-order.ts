import { db } from "@/app/firebase"
import { doc, updateDoc } from "firebase/firestore/lite"

// update order document on firestore

export async function UpdateOrder(uid: string, orderId: string, data: {}) {
  try {
    const docRef = doc(db, 'users', uid, 'orders', orderId)
    const update = await updateDoc(docRef, {...data})

    return 'update success'
  } catch (error) {
    console.log(error)
    return error
  }
}
