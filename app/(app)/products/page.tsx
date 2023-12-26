import Image from 'next/image'
import Link from 'next/link'
import { allProducts } from '@/data/data'
import { Badge } from '@/components/ui/badge'

export default function Page() {
  return (
    <>
      <h1 className='mb-8 md:mt-10'>Shop Page</h1>

      <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
        {allProducts?.map((product) => (
          <div>
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
              <p className='text-xs text-center'>{product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
