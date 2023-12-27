'use client'

import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className='grid md:min-h-[450px] lg:min-h-[650px] grid-cols-1 items-center md:grid-cols-2'>
        <div className='mx-auto mt-8 mb-12 flex max-w-[600px] flex-col items-center md:m-0 md:max-w-none md:items-start md:pr-[10%]'>
          <h1 className='mb-4 text-center md:text-left'>
            Discover Our Elegant and Dynamic Shoe Collection
          </h1>
          <p className='mb-8 text-center md:text-left'>
            Step into style with our minimalist colors and contemporary designs.
            Elevate your wardrobe today.
          </p>
          <Button asChild className='px-12'>
            <Link href='/products'>Shop Now</Link>
          </Button>
        </div>
        <div className=''>
          <Swiper
            spaceBetween={30}
            effect={'fade'}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, EffectFade, Pagination]}
            className='mySwiper'
            speed={1000}
            autoplay={{
              delay: 6000,
            }}
          >
            <SwiperSlide>
              <Image
                src='/products/classic-1.webp'
                alt='product-image'
                width={750}
                height={750}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src='/products/corsa-2.webp'
                alt='product-image'
                width={750}
                height={750}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src='/products/white-3.webp'
                alt='product-image'
                width={750}
                height={750}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src='/products/corte-1.webp'
                alt='product-image'
                width={750}
                height={750}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section>
        <h2>Discover Our Products</h2>
      </section>
    </>
  )
}
