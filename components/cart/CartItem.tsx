import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { ProductType } from '@/types/types'
import { idrFormatter } from '@/lib/utils'

type PropsType = {
  data: ProductType
}

export default function CartItem(props: PropsType) {
  const { id, name, price, thumbnail } = props.data
  const formattedPrice = idrFormatter(price)

  const handleAddItem = () => {
    
  }

  const handleRemoveItem = () => {

  }

  return (
    <div className='flex gap-4'>
      <div className='max-w-[90px]'>
        <Link href='/'>
          <Image
            src={thumbnail}
            width={90}
            height={90}
            alt={name}
            className='object-cover'
          />
        </Link>
      </div>
      <div className='flex flex-1 flex-col justify-between'>
        <Link href='/' className='font-bold'>
          Corte Mid Full Black
        </Link>
        <div className='flex justify-between gap-4'>
          <div className='flex w-full max-w-[80px] items-center justify-between'>
            <Button
              onClick={handleRemoveItem}
              className='h-auto cursor-pointer p-[6px]'
              variant='outline'
            >
              <Minus className='cursor-pointer' size={8} strokeWidth={4} />
            </Button>
            <span>1</span>
            <Button
              onClick={handleAddItem}
              className='h-auto cursor-pointer p-[6px]'
              variant='outline'
            >
              <Plus className='cursor-pointer' size={8} strokeWidth={4} />
            </Button>
          </div>
          <div>{formattedPrice}</div>
        </div>
      </div>
    </div>
  )
}
