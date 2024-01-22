import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { firestoreDateFormatter, firstLetterUppercase, idrFormatter } from '@/lib/utils'
import OrderStatus from './OrderStatus'

type Props = {
  data: any
}

export default function OrdersCard(props: Props) {
  const { date, gross_amount, items, token, order_id, payment_status, total_quantity } = props.data
  const { thumbnail, name } = items[0]

  const formattedDate = firestoreDateFormatter(date)
  const totalOrder = idrFormatter(gross_amount)
  // const status = firstLetterUppercase(payment_status)

  return (
    <Link href={`/profile/orders/${order_id}`}>
      <div className='flex w-full gap-4 rounded-lg border p-4'>
        <div className='max-w-[70px] md:max-w-[150px]'>
          <Image
            src={thumbnail}
            width={150}
            height={150}
            alt='product-img'
            className='object-cover'
          />
        </div>
        <div className='flex flex-1 flex-col'>
          <div className='mb-1 flex justify-between'>
            <p className='text-[#929292]'>{formattedDate}</p>
            <OrderStatus status={payment_status} />
          </div>
          <div className='flex flex-1 flex-col justify-between'>
            <div className='mb-4'>
              <p className='text-base font-bold'>{name}</p>
              {items.length > 1 && <p className='text-xs'>+{items.length - 1} other products</p>}
            </div>
            <div>
              <Separator className='mb-2' />
              <p className='text-xs'>Total Order:</p>
              <p className='font-bold'>{totalOrder}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
