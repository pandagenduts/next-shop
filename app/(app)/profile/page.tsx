'use client'

import useCartStore from '@/store/cart-store'
import ky from 'ky'
import { useEffect } from 'react'

type Token = {
  token: string
  redirect_url: string
}

export default function Page() {
  const { cartItemsStore } = useCartStore()

  const handleGetProduct = async () => {
    const token: Token = await ky.post(`/api/midtrans/generate-token`, { json: cartItemsStore }).json()

    window.snap.embed(token.token, {
      embedId: 'snap-container',
      onSuccess: function (result: any) {
        alert('payment success!');
        console.log(result);
      },
      onPending: function (result: any) {
        alert('wating your payment!');
        console.log(result);
      },
      onError: function (result: any) {
        alert('payment failed!');
        console.log(result);
      },
      onClose: function () {
        alert('you closed the popup without finishing the payment');
      },
    });
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

  return (
    <>
      <h4>Profile</h4>
      <button onClick={handleGetProduct} className='bg-black p-4 text-white'>
        Get Product with cart-store
      </button>
      <div id='snap-container' className='w-full'></div>
    </>
  )
}
