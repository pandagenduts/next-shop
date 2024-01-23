'use client'

import { useQuery } from '@tanstack/react-query'
import OrderItem from './OrderItem'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getOrder } from '@/lib/actions/firestore/get-order'
import LoadingSpinner from '@/components/LoadingSpinner'
import { idrFormatter } from '@/lib/utils'
import OrderEmptyPlaceholder from './OrderEmptyPlaceholder'
import OrderStatus from '../OrderStatus'
import MidtransPayment from './MidtransPayment'

type Props = {
  order_id: string
  uid: string
}

export default function OrderContainer(props: Props) {
  const { order_id, uid } = props

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['order', { order_id: order_id, uid: uid }],
    queryFn: async () => await getOrder(uid, order_id),
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

  if (isError) {
    return <p>error</p>
  }

  if (!data) {
    return <OrderEmptyPlaceholder />
  }

  const { date, gross_amount, items, token, payment_status, total_quantity } = data as any

  const totalOrder = idrFormatter(gross_amount)

  return (
    <>
      <h4 className='mb-4'>Product Details</h4>
      <div className='mb-8 flex flex-col gap-4'>
        {items.map((item: any) => (
          <OrderItem key={item.id} data={item} />
        ))}
      </div>

      <h4 className='mb-4'>Payment Details</h4>
        <div className='mb-2 flex justify-between'>
          <p>Total Price ({total_quantity} Products)</p>
          <p>{totalOrder}</p>
        </div>
        <div className='flex justify-between'>
          <p>Payment Status</p>
          <OrderStatus status={payment_status} />
        </div>
        
        {payment_status !== 'success' && payment_status !== 'failure' && <MidtransPayment token={token} />}
    </>
  )
}
