'use client'

import { auth } from '@/app/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FormEventHandler, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [errorStatus, setErrorStatus] = useState('')
  const [success, setSuccess] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const router = useRouter()

  const handleLogin: FormEventHandler = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((response) => {
        console.log(response.user)
        setErrorStatus('')
        setSuccess(true)
        setLoginData({
          email: '',
          password: '',
        })

        setTimeout(() => {
          router.push('/')
        }, 5000)
      })
      .catch((error) => {
        console.log(error)
        error.code == 'auth/invalid-credential'
          ? setErrorStatus('The email and password did not match. Please try again.')
          : setErrorStatus(error.code)
      })
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
            <Input
              type='email'
              id='email'
              placeholder='Email'
              required
              value={loginData.email}
              onChange={(e) => {
                setErrorStatus('')
                setLoginData((prev) => ({ ...prev, email: e.target.value }))
              }}
            />
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
            <Input
              type='password'
              id='password'
              placeholder='Password'
              required
              value={loginData.password}
              onChange={(e) => {
                setErrorStatus('')
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
              }}
            />
          </div>

          {errorStatus && <p className='mb-4 text-center text-destructive'>{errorStatus}</p>}
          {success && (
            <p className='mb-4 text-center'>
              Log in succeeded! Redirecting you to the home page...
            </p>
          )}
          <Button className='w-full' disabled={loginData.email == '' || loginData.password == ''}>
            Log in
          </Button>
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
