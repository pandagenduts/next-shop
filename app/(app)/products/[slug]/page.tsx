import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  console.log(slug)

  return (
    <>
      <Button size='sm' variant='ghost' asChild className='mb-8'>
        <Link href='/products'>
          <ArrowLeft className='mr-4 h-4 w-4' />
          Back
        </Link>
      </Button>
      <h1>hello world</h1>
    </>
  )
}
