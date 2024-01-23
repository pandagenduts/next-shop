import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import OrderContainer from '@/components/orders/order_id/OrderContainer'
import serverUid from '@/lib/actions/auth/server-uid'

export default async function Page({ params }: { params: { order_id: string } }) {
  const { order_id } = params
  const uid = await serverUid() as string

  return (
    <>
      <Button size='sm' variant='ghost' asChild className='mb-8'>
        <Link href='/profile/orders'>
          <ArrowLeft className='mr-4 h-4 w-4' />
          Back
        </Link>
      </Button>

    <OrderContainer order_id={order_id} uid={uid} />
    </>
  )
}
