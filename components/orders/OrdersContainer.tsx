'use client'

import OrdersCard from './OrdersCard'
import OrdersEmptyPlaceholder from './OrdersEmptyPlaceholder'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/lib/actions/firestore/get-orders'
import LoadingText from '../LoadingText'

type Props = {
  uid: string
}

export default function OrdersContainer(props: Props) {
  const uid = props.uid
  const {
    data,
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
        <LoadingText />
      </div>
    )
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        {!data && <OrdersEmptyPlaceholder />}
        {data && data.map((order: any) => <OrdersCard key={order.order_id} data={order} />)}
      </div>
    </>
  )
}
