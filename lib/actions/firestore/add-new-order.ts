import { db } from "@/app/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore/lite"
import { Midtrans_Checkout_Data } from "../midtrans/generate-checkout-data"

export async function addNewOrder(uid: string, checkoutData: Midtrans_Checkout_Data) {
  // create document on firestore
  
  try {
    const docRef = await addDoc(collection(db, 'users', uid, 'orders'), {
      date: serverTimestamp(),
      ...checkoutData,
    })

    return docRef.id
  } catch (error) {
    console.log(error)
    return error as Error
  }
}
