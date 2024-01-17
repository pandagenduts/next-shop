'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FormEventHandler } from 'react'

export default function Page() {

  const handleLogin: FormEventHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className='mx-auto mt-20 max-w-md'>
      <section className='mb-10 flex flex-col items-center'>
        <h2>Log in to your account</h2>
      </section>

      <section>
        <form onSubmit={handleLogin}>
          <div className='mb-6'>
            <label htmlFor='email' className='mb-2 block font-medium'>
              Email address
            </label>
            <Input type='email' id='email' placeholder='Email' required />
          </div>

          <div className='mb-6'>
            <div className='flex justify-between'>
              <label htmlFor='password' className='mb-2 block font-medium'>
                Password
              </label>
              <Link href='/forgot-password' className='font-bold hover:opacity-90'>
                Forgot password?
              </Link>
            </div>
            <Input type='password' id='password' placeholder='Password' required />
          </div>

          <Button className='mt-6 w-full'>Log in</Button>
        </form>

        <p className='mt-10 text-center text-sm text-gray-600'>
          Not a member?
          <Link href='/signup' className='ml-2 font-bold text-primary hover:opacity-90'>
            Sign up
          </Link>
        </p>
      </section>
    </div>
  )
}
