import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { allProducts } from '@/data/data'

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const getProduct = allProducts.filter((product) => product.slug === slug)
  const { name, price, description, gallery, hot } = getProduct[0]

  return (
    <>
      <div className='mb-10 mt-5 flex gap-4 md:mt-0'>
        <Link href='/'>Home</Link>
        <span>/</span>
        <Link href='/products'>Products</Link>
        <span>/</span>
        <p className='text-gray-500'>{name}</p>
      </div>

      <div className='flex flex-col gap-5 md:flex-row'>
        <div className='flex-1 lg:basis-3/5'>
          
        </div>
        <div className='flex-1 lg:basis-2/5'>
          <h1 className='mb-4 text-3xl font-medium'>{name}</h1>
          <p className='mb-8 text-xl'>{price}</p>
          <div className='mb-10'>
            <h2 className='mb-2'>Description</h2>
            <p>{description}</p>
          </div>
          <Button className='h-12 w-full text-base'>Add to cart</Button>
        </div>
      </div>
    </>
  )
}
