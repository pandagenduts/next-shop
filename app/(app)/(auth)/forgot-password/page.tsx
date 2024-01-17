'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { FormEventHandler } from 'react'

export default function Page() {
  const handleForgotPassword: FormEventHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className='mx-auto mt-20 max-w-md'>
    <section className='mb-10 flex flex-col items-center'>
      <h2>Reset password</h2>
    </section>

    <section>
      <form onSubmit={handleForgotPassword}>
        <div className='mb-6'>
          <label htmlFor='email' className='mb-2 block font-medium'>
            Email address
          </label>
          <Input type='email' id='email' placeholder='Email' required />
        </div>

        <Button className='mt-6 w-full'>Send password reset link</Button>
      </form>
    </section>
  </div>
  )
}
