import OrdersEmptyPlaceholder from '@/components/OrdersEmptyPlaceholder'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      <div className='flex flex-col gap-4'>
        <Link href='/profile/orders/1'>
          <div className='flex w-full gap-4 rounded-lg border p-4'>
            <div className='max-w-[70px] md:max-w-[150px]'>
              <Image src='/product-1.webp' width={150} height={150} alt='product-img' className='object-cover' />
            </div>
            <div className='flex flex-1 flex-col'>
              <div className='mb-1 flex justify-between'>
                <p className='text-[#929292]'>12 Dec 2023</p>
                <Badge className='font-semibold md:px-4 md:text-sm'>Paid</Badge>
              </div>
              <div className='flex flex-1 flex-col justify-between'>
                <div className='mb-4'>
                  <p className='text-base font-bold'>Product Title</p>
                  <p className='text-xs'>+1 other products</p>
                </div>
                <div>
                  <Separator className='mb-2' />
                  <p className='text-xs'>Total Order:</p>
                  <p className='font-bold'>Rp 123.000,-</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
      {/* <OrdersEmptyPlaceholder /> */}
    </>
  )
}
