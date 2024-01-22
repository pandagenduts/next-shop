'use client'

import OrdersCard from './OrdersCard'
import OrdersEmptyPlaceholder from './OrdersEmptyPlaceholder'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/lib/actions/firestore/get-orders'
import LoadingSpinner from '../LoadingSpinner'

type Props = {
  uid: string
}

export default function OrdersContainer(props: Props) {
  const uid = props.uid
  const {
    data: datas,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => await getOrders(uid),
  })

  if (isLoading) {
    return (
      <div className='flex w-full justify-center pt-8'>
        <p className='flex gap-4'>
          <LoadingSpinner /> Loading...
        </p>
      </div>
    )
  }

  let orders: any = []
  datas?.forEach((item: any) => {
    const data = { ...item.data(), order_id: item.id }
    orders.push(data)
  })

  console.log(orders)

  return (
    <>
      <div className='flex flex-col gap-4'>
        {orders.length === 0 && <OrdersEmptyPlaceholder />}
        {orders && orders.map((order: any) => <OrdersCard key={order.order_id} data={order} />)}
      </div>
    </>
  )
}
