import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { idrFormatter } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  data: any
}

export default function OrderItem(props: Props) {
  const data = props.data
  const { thumbnail, quantity, price, name, url } = data

  const formattedPrice = idrFormatter(price)
  const totalPrice = idrFormatter(quantity * price)
  return (
    <Card>
      <CardHeader className='p-4'>
        <div className='flex gap-4'>
          <Link href={url}>
            <Image
              src={thumbnail}
              width={100}
              height={100}
              alt='product-img'
              className='object-cover'
            />
          </Link>
          <div className=''>
            <Link href={url}>
              <p className='text-base font-bold'>{name}</p>
            </Link>
            <p>
              {quantity} x {formattedPrice}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        <Separator className='mb-4' />
        <p className='text-xs'>Total Price:</p>
        <p className='font-bold'>{totalPrice}</p>
      </CardContent>
    </Card>
  )
}
