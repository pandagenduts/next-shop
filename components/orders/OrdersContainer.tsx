'use client'

import { useEffect, useState } from 'react'
import OrdersCard from './OrdersCard'
import OrdersEmptyPlaceholder from './OrdersEmptyPlaceholder'
import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from '@/app/firebase'

type Props = {
  uid: string
}

export default function OrdersContainer(props: Props) {
  const uid = props.uid
  const [orders, setOrders] = useState<any>([])

  useEffect(() => {
    ;(async () => {
      try {
        const docRef = collection(db, 'users', uid, 'orders')
        const docs = await getDocs(docRef)

        let datas: any = []
        docs.forEach((doc) => {
          const data = { ...doc.data(), id: doc.id }
          datas.push(data)
        })
        setOrders(datas)
      } catch (error) {}
    })()
  }, [])

  console.log(orders)

  return (
    <>
      <div className='flex flex-col gap-4'>{orders && orders.map((order) => <OrdersCard key={order.id} />)}</div>
      {/* <OrdersEmptyPlaceholder /> */}
    </>
  )
}
