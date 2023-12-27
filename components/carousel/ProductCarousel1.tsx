'use client'

import { CSSProperties, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import Image from 'next/image'

type PropsType = {
  images: string[]
}

export default function ProductCarousel1(props: PropsType) {
  const { images } = props
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const handleSwiper = (swiper: any) => {
    setThumbsSwiper(swiper)
  }

  return (
    <>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={image}
              alt='Product Image'
              width={750}
              height={750}
            />
          </SwiperSlide>
        ))}

      </Swiper>
      <Swiper
        onSwiper={handleSwiper}
        spaceBetween={10}
        slidesPerView={'auto'}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='thumbs-container'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={image}
              alt='Product Image'
              width={750}
              height={750}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
