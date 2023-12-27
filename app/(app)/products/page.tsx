import Image from 'next/image'
import Link from 'next/link'
import { allProducts } from '@/data/data'
import { Badge } from '@/components/ui/badge'
import { idrFormatter } from '@/lib/utils'

export default function Page() {
  return (
    <>
      <div className='flex gap-4 mt-5 mb-10 md:mt-0'>
        <Link href='/'>Home</Link>
        <span>/</span>
        <p className='text-gray-500'>Products</p>
      </div>
      <h2 className='mb-4 md:mb-8'>Products</h2>

      <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
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
              <p className='text-center text-xs lg:text-sm'>{formattedPrice}</p>
            </Link>
          </div>
        )})}
      </div>
    </>
  )
}
