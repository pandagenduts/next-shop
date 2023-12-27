'use client'

import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { idrFormatter } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { allProducts } from '@/data/data'

export default function Home() {
  return (
    <>
      <section className='mb-12 grid grid-cols-1 items-center md:mb-16 md:min-h-[450px] md:grid-cols-2 lg:min-h-[650px]'>
        <div className='mx-auto mb-12 mt-8 flex max-w-[600px] flex-col items-center md:m-0 md:max-w-none md:items-start md:pr-[10%]'>
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

      <section className='flex flex-col items-center'>
        <h2 className='mb-4 md:mb-8 w-full text-left'>Discover Our Products</h2>
        <div className='mb-10 grid grid-cols-2 md:grid-cols-4 gap-6'>
          {allProducts?.map((product) => {
            const formattedPrice = idrFormatter(product.price)

            return (
              <div key={product.id}>
                <Link href={`/products/${product.slug}`}>
                  <div className='relative'>
                    <Image
                      src={product.thumbnail}
                      width={350}
                      height={350}
                      alt={product.name}
                      className='mb-2 object-cover'
                    />
                    {product.hot && (
                      <Badge className='absolute right-2 top-2 text-[8px] leading-normal lg:text-xs'>
                        HOT
                      </Badge>
                    )}
                  </div>
                  <p className='mb-1 text-center text-sm lg:text-lg'>
                    {product.name}
                  </p>
                  <p className='text-center text-xs lg:text-sm'>
                    {formattedPrice}
                  </p>
                </Link>
              </div>
            )
          })}
        </div>
        <Button size='sm' asChild className='mx-auto'>
          <Link href='/products'>Explore Our Collection</Link>
        </Button>
      </section>
    </>
  )
}
