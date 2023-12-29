import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function CartItem() {
  return (
    <div className='flex gap-4'>
      <div className='max-w-[90px]'>
        <Link href='/'>
          <Image src='/product-1.webp' width={90} height={90} alt='product-img' className='object-cover' />
        </Link>
      </div>
      <div className='flex flex-1 flex-col justify-between'>
        <Link href='/' className='font-bold'>Corte Mid Full Black</Link>
        <div className='flex justify-between gap-4'>
          <div className='flex items-center justify-between max-w-[80px] w-full'>
            <Button className='cursor-pointer p-[6px] h-auto' variant='outline'>
              <Minus className='cursor-pointer' size={8} strokeWidth={4} />
            </Button>
            <span>1</span>
            <Button className='cursor-pointer p-[6px] h-auto' variant='outline'>
              <Plus className='cursor-pointer' size={8} strokeWidth={4} />
            </Button>
          </div>
          <div>Rp 123.000,-</div>
        </div>
      </div>
    </div>
  )
}
