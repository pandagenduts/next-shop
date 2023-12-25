import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui/button'

export default function CartItem() {
  return (
    <div className='flex gap-4'>
      <div className='max-w-[90px]'>
        <a href='/'>
          <img src='/product-1.webp' alt='product-img' />
        </a>
      </div>
      <div className='flex flex-1 flex-col justify-between'>
        <a href='/' className='font-bold'>Product Title</a>
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
