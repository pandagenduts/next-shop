import { db } from "@/app/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore/lite"
import { Midtrans_Checkout_Data } from "../midtrans/generate-checkout-data"

// create document on firestore

export async function addNewOrder(uid: string, checkoutData: Midtrans_Checkout_Data) {
  
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
