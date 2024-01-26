'use client'

import { auth } from '@/app/firebase'
import LoadingText from '@/components/LoadingText'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sendPasswordResetEmail } from 'firebase/auth'
import Link from 'next/link'
import { FormEventHandler, useState } from 'react'

export default function Page() {
  const [email, setEmail] = useState('')
  const [errorStatus, setErrorStatus] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleForgotPassword: FormEventHandler = (e) => {
    e.preventDefault()

    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent!')
        setErrorStatus('')
        setSuccess(true)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setErrorStatus(error.code)
        setIsLoading(false)
      })
  }

  return (
    <div className='mx-auto mt-20 max-w-md'>
      <section className='mb-10 flex flex-col items-center'>
        <h2>Reset password</h2>
      </section>

      <section>
        {success && (
          <>
            <p className='mb-4 text-center'>
              Password reset link has been sent, please check your email.
            </p>
            <Link href='/login' className='block font-bold hover:opacity-90 text-center'>
              Log in
            </Link>
          </>
        )}
        {!success && (
          <form onSubmit={handleForgotPassword}>
            <div className='mb-6'>
              <label htmlFor='email' className='mb-2 block font-medium'>
                Email address
              </label>
              <Input
                type='email'
                id='email'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => {
                  setErrorStatus('')
                  setEmail(e.target.value)
                }}
              />
            </div>

            {errorStatus && <p className='mb-4 text-center text-destructive'>{errorStatus}</p>}
            <Button className='w-full' disabled={isLoading || email == ''}>
              {isLoading ? <LoadingText /> : 'Send password reset link'}
            </Button>
          </form>
        )}
      </section>
    </div>
  )
}
