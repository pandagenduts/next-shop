'use client'

import { CSSProperties, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import Image from 'next/image'

export default function ProductCarousel1() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const handleSwiper = (swiper: any) => {
    setThumbsSwiper(swiper);
  }

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as CSSProperties}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        <SwiperSlide>
          <Image
            src='/products/classic-1.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/classic-2.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/classic-3.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/classic-4.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/classic-5.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/corsa-1.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/corsa-2.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/corsa-3.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/corsa-4.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/corsa-5.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={handleSwiper}
        spaceBetween={10}
        slidesPerView={'auto'}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Image
            src='/products/classic-1.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/classic-2.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/classic-3.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/classic-4.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/classic-5.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/corsa-1.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/corsa-2.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/corsa-3.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/corsa-4.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='/products/corsa-5.webp'
            alt='image'
            width={750}
            height={750}
          />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
