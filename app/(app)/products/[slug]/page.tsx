'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { allProducts } from '@/data/data'
import ProductCarousel1 from '@/components/carousel/ProductCarousel1'
import { idrFormatter } from '@/lib/utils'

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const getProduct = allProducts.filter((product) => product.slug === slug)
  const { name, price, description, gallery, hot } = getProduct[0]
  const formattedPrice = idrFormatter(price)

  const handleAddToCart = () => {
    
  }

  return (
    <>
      <div className='mb-10 mt-5 flex gap-4 md:mt-0'>
        <Link href='/'>Home</Link>
        <span>/</span>
        <Link href='/products'>Products</Link>
        <span>/</span>
        <p className='text-gray-500'>{name}</p>
      </div>

      <div className='md:grid md:grid-cols-5' id='product-details'>
        <div className='col-span-3 mb-8 md:mb-0 md:pr-10 lg:pr-20'>
          <ProductCarousel1 images={gallery} />
        </div>
        <div className='col-span-2'>
          <h1 className='mb-2 text-3xl text-center md:text-left font-medium md:mb-4'>{name}</h1>
          <p className='mb-8 text-xl text-center md:text-left'>{formattedPrice}</p>
          <div className='mb-10'>
            <h2 className='mb-2'>Description</h2>
            <p>{description}</p>
          </div>
          <Button onClick={handleAddToCart} className='h-12 w-full rounded-full text-base'>
            Add to cart
          </Button>
        </div>
      </div>
    </>
  )
}
