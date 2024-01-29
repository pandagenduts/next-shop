'use client'

import { auth, db } from '@/app/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FormEventHandler, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { doc, setDoc } from 'firebase/firestore/lite'
import LoadingText from '@/components/LoadingText'

export default function Page() {
  const [errorStatus, setErrorStatus] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
  })
  const router = useRouter()

  const handleSignup: FormEventHandler = async (e) => {
    e.preventDefault()
    setErrorStatus('')
    setSuccess(false)
    setIsLoading(true)

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password,
      )

      const uid = response.user.uid
      const email = response.user.email

      // create user document on firestore with uid
      setDoc(doc(db, 'users', uid), {
        email: email,
      })
        .then(() => {
          // executed if document successfully created
          setErrorStatus('')
          setSuccess(true)
          setIsLoading(false)
          setTimeout(() => {
            router.push('/login')
          }, 5000)
        })
        .catch((error) => {
          // executed if document failed to create
          console.log(error)
          setErrorStatus(error.code)
          setIsLoading(false)
        })
    } catch (error: any) {
      // console.log(error)
      setIsLoading(false)
      setErrorStatus(error.code)
    }
  }

  return (
    <div className='mx-auto mt-20 max-w-md'>
      <section className='mb-10 flex flex-col items-center'>
        <h2>Create account</h2>
      </section>

      <section>
        <form onSubmit={handleSignup}>
          <div className='mb-6'>
            <label htmlFor='email' className='mb-2 block font-medium'>
              Email address
            </label>
            <Input
              type='email'
              id='email'
              placeholder='Email'
              required
              value={signupData.email}
              onChange={(e) => {
                setErrorStatus('')
                setSignupData((prev) => ({ ...prev, email: e.target.value }))
              }}
            />
          </div>

          <div className='mb-12'>
            <div className='flex justify-between'>
              <label htmlFor='password' className='mb-2 block font-medium'>
                Password
              </label>
            </div>
            <Input
              type='password'
              id='password'
              placeholder='Password'
              required
              value={signupData.password}
              onChange={(e) => {
                setErrorStatus('')
                setSignupData((prev) => ({ ...prev, password: e.target.value }))
              }}
            />
          </div>

          {errorStatus && <p className='mb-4 text-center text-destructive'>{errorStatus}</p>}
          {success && (
            <p className='mb-4 text-center'>
              Sign up succeeded! Redirecting you to the log in page...
            </p>
          )}
          <Button
            className='w-full'
            disabled={isLoading || signupData.email == '' || signupData.password == ''}
          >
            {isLoading ? <LoadingText /> : 'Sign up'}
          </Button>
        </form>

        <p className='mt-10 text-center text-sm text-gray-600'>
          Already a member?
          <Link href='/login' className='ml-2 font-bold text-primary hover:opacity-90'>
            Log in
          </Link>
        </p>
      </section>
    </div>
  )
}
