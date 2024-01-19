import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { idrFormatter } from '@/lib/utils'
import useCartStore from '@/store/cart-store'
import { ExtendedCartItems } from './Cart'

type PropsType = {
  data: ExtendedCartItems
  isFetching: boolean
  handleSheetClose: () => void
}

export default function CartItem(props: PropsType) {
  const { addItemToCart, removeItemFromCart } = useCartStore()
  const { id, name, price, thumbnail, quantity, slug } = props.data

  const formattedPrice = idrFormatter(price)

  return (
    <div className='flex gap-4'>
      <div className='max-w-[90px]'>
        <Link href={`/products/${slug}`} onClick={props.handleSheetClose}>
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
        <Link
          href={`/products/${slug}`}
          className='font-bold'
          onClick={props.handleSheetClose}
        >
          {name}
        </Link>
        <div className='flex justify-between gap-4'>
          <div className='flex w-full max-w-[80px] items-center justify-between'>
            <Button
              onClick={() => removeItemFromCart(id)}
              className='h-auto cursor-pointer p-[6px]'
              variant='outline'
              disabled={props.isFetching}
            >
              <Minus className='cursor-pointer' size={8} strokeWidth={4} />
            </Button>
            <span>{quantity}</span>
            <Button
              onClick={() => addItemToCart(id)}
              className='h-auto cursor-pointer p-[6px]'
              variant='outline'
              disabled={props.isFetching}
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
