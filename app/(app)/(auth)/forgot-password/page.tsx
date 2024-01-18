'use client'

import { auth } from '@/app/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sendPasswordResetEmail } from 'firebase/auth'
import { FormEventHandler, useState } from 'react'

export default function Page() {
  const [email, setEmail] = useState('')
  const [errorStatus, setErrorStatus] = useState('')
  const [success, setSuccess] = useState(false)

  const handleForgotPassword: FormEventHandler = (e) => {
    e.preventDefault()

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent!')
        setErrorStatus('')
        setSuccess(true)
      })
      .catch((error) => {
        console.log(error)
        setErrorStatus(error.code)
      })
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
          {success && (
            <p className='mb-4 text-center'>Password reset link has been sent to your email.</p>
          )}
          <Button className='w-full' disabled={email == ''}>
            Send password reset link
          </Button>
        </form>
      </section>
    </div>
  )
}
