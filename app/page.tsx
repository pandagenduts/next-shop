import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <section className='flex flex-col md:flex-row'>
        <div className='flex-1'>
          <h1>Discover Our Elegant and Dynamic Shoe Collection</h1>
          <p>
            Step into style with our minimalist colors and contemporary designs.
            Elevate your wardrobe today.
          </p>
          <Button>Shop Now</Button>
        </div>
        <div className='flex-1'>
          <Image
            src='/banners/banner-1.webp'
            alt='banner'
            width={1512}
            height={631}
            className=''
          />
        </div>
      </section>
    </>
  )
}
