'use client'

import { Button } from '@/components/ui/button'
import useCartStore from '@/store/cart-store'
import { DocumentReference } from 'firebase/firestore/lite'
import ky from 'ky'
import { useEffect } from 'react'

type Token = {
  token: string
  redirect_url: string
}

export default function Page() {
  const { cartItemsStore } = useCartStore()

  const handleGetProduct = async () => {
    const token: Token = await ky
      .post(`/api/midtrans/generate-token`, { json: cartItemsStore })
      .json()
    console.log(token.token)

    window.snap.embed(token.token, {
      embedId: 'snap-container',
      onSuccess: function (result: any) {
        alert('payment success!')
        console.log(result)
      },
      onPending: function (result: any) {
        alert('wating your payment!')
        console.log(result)
      },
      onError: function (result: any) {
        alert('payment failed!')
        console.log(result)
      },
      onClose: function () {
        alert('you closed the popup without finishing the payment')
      },
    })
  }

  useEffect(() => {
    // inject Midtrans Snap script
    const script = document.createElement('script')
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT as string)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleCreateDocument = async () => {
    try {
      const addDocument: DocumentReference = await ky.post('/api/midtrans/create-order', { json: cartItemsStore }).json()

      console.log(addDocument)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h4>Profile</h4>
      <button onClick={handleGetProduct} className='bg-black p-4 text-white'>
        Get Product with cart-store
      </button>

      <Button onClick={handleCreateDocument}>Create Document on Backend</Button>
      <div id='snap-container' className='w-full'></div>
    </>
  )
}
