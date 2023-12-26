import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { allProducts } from '@/data/data'

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const getProduct = allProducts.filter((product) => product.slug === slug)
  const { name, price, description, gallery, hot } = getProduct[0]

  return (
    <>
      <Button size='sm' variant='ghost' asChild className='mb-8'>
        <Link href='/products'>
          <ArrowLeft className='mr-4 h-4 w-4' />
          Back
        </Link>
      </Button>
      <h1>{name}</h1>
      
    </>
  )
}
