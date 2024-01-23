import { db } from '@/app/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite'

export async function getOrders(uid: string) {
  try {
    const docRef = collection(db, 'users', uid, 'orders')
    const documents = await getDocs(query(docRef, orderBy('date', 'desc')));

    if (documents.docs.length === 0) return null

    let orders: any = []
    documents.forEach((document: any) => {
      const data = { ...document.data(), order_id: document.id }
      orders.push(data)
    })
    
    return orders
  } catch (error) {
    console.log(error)
    return error as Error
  }
}
