'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle, CircleEllipsis } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [countDown, setCountDown] = useState(5)
  const { order_id, status_code, transaction_status } = searchParams
  const router = useRouter()

  if (!order_id || !status_code || !transaction_status) {
    router.replace('/')
  }

  useEffect(() => {
    if(countDown > 0) {
      const interval = setTimeout(() => {
        setCountDown((prev) => prev - 1)
      }, 1000)
      return () => clearTimeout(interval)
    }
  }, [countDown])

  if (countDown === 0) {
    router.replace(`/profile/orders/${order_id}`)
  }

  if (transaction_status === 'settlement') {
    return (
      <section className='flex h-full flex-col items-center pt-20'>
        <CheckCircle className='mb-2 h-20 w-20 text-green-500' />
        <h2 className='mb-8 text-green-500'>Success</h2>
        <h3 className='mb-8 text-center'>Your payment has been processed successfully.</h3>
        <p className='mb-8'>
          <strong>Order ID</strong>: {order_id}
        </p>
        <p className='mb-4'>Page will be redirected in {countDown} seconds...</p>
        <p className='mb-12'>Or you can click the button bellow</p>
        <Button>
          <Link href={`/profile/orders/${order_id}`}>Go to Order</Link>
        </Button>
      </section>
    )
  } else if (transaction_status === 'pending') {
    return (
      <section className='flex h-full flex-col items-center pt-20'>
        <CircleEllipsis className='mb-2 h-20 w-20 text-slate-400' />
        <h2 className='mb-8 text-slate-400'>Pending</h2>
        <h3 className='mb-8 text-center'>Seems like your payment is still pending.</h3>
        <p className='mb-8'>
          <strong>Order ID</strong>: {order_id}
        </p>
        <p className='mb-4'>Page will be redirected in {countDown} seconds...</p>
        <p className='mb-12'>Or you can click the button bellow</p>
        <Button>
          <Link href={`/profile/orders/${order_id}`}>Finish Payment</Link>
        </Button>
      </section>
    )
  }
}
