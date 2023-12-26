import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <h1 className='mt-10 mb-8'>Shop Page</h1>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        <div>
          <Link href='/shop/1'>
            <Image
              src='/products/classic-1.webp'
              width={350}
              height={350}
              alt='product-image'
              className='mb-2 object-cover'
            />
            <p className='mb-1 text-center text-lg'>Corsa Classic White Navy</p>
            <p className='text-center'>Rp 428.000,-</p>
          </Link>
        </div>
      </div>
    </>
  )
}
