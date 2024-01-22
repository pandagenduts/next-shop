import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import OrderData from '@/components/orders/order_id/OrderData'

export default async function Page({ params }: { params: { order_id: string } }) {
  const { order_id } = params
  const session: any = await getServerSession(authOptions)
  const uid = session?.uid

  return (
    <>
      <OrderData uid={uid} order_id={order_id} />

      <Button size='sm' variant='ghost' asChild className='mb-8'>
        <Link href='/profile/orders'>
          <ArrowLeft className='mr-4 h-4 w-4' />
          Back
        </Link>
      </Button>

      <h4 className='mb-4'>Product Details</h4>
      <div className='mb-8'>
        <Card>
          <CardHeader className='p-4'>
            <div className='flex gap-4'>
              <Image
                src='/product-1.webp'
                width={100}
                height={100}
                alt='product-img'
                className='object-cover'
              />
              <div className=''>
                <p className='text-base font-bold'>Product Title</p>
                <p>1 x Rp 123.000,-</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className='p-4 pt-0'>
            <Separator className='mb-4' />
            <p className='text-xs'>Total Price:</p>
            <p className='font-bold'>Rp 123.000,-</p>
          </CardContent>
        </Card>
      </div>

      <h4 className='mb-4'>Payment Details</h4>
      <div>
        <div className='mb-2 flex justify-between'>
          <p>Total Price (10 Products)</p>
          <p>Rp 123.000,-</p>
        </div>
        <div className='flex justify-between'>
          <p>Payment Status</p>
          {/* <Badge className='font-semibold md:px-4 md:text-sm'>Paid</Badge> */}
          <Badge className='text-sm font-semibold md:px-4' variant='secondary'>
            Pending
          </Badge>
          {/* <Badge className='font-semibold md:px-4 md:text-sm' variant='outline'>Expired</Badge> */}
        </div>
        <div className='mt-8 flex justify-between'>
          <p className='mb-2'>Payment Link</p>
          <Button>Click Here</Button>
        </div>
      </div>
    </>
  )
}
