'use client'

import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'

type PropsType = {
  images: string[]
}

export default function CarouselFade(props: PropsType) {
  const { images } = props

  return (
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
      {images?.map((image) => (
        <SwiperSlide key={image}>
          <Image
            src={image}
            alt='product-image'
            width={750}
            height={750}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
