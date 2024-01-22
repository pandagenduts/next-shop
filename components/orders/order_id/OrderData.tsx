'use client'

import { db } from '@/app/firebase'
import { doc, getDoc } from 'firebase/firestore/lite'
import { useEffect } from 'react'

type Props = {
  uid: string
  order_id: string
}

export default function OrderData(props: Props) {
  const uid = props.uid
  const order_id = props.order_id

  console.log(uid)

  useEffect(() => {
    const docRef = doc(db, 'users', uid, 'orders', order_id)

    getDoc(docRef)
      .then((doc) => {
        console.log(doc.data())
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return <div>Order Data</div>
}
