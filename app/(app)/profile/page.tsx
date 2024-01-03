'use client'

import { randomNumber } from '@/lib/faker'
import useCartStore from '@/store/cart-store'
import ky from 'ky'

export default function Page() {
  const { cartItemsStore } = useCartStore()

  const handleGetProduct = async () => {
    const order_id = randomNumber()
    const data: any = await ky.post(`/api/cart`, { json: cartItemsStore }).json()
    console.log(data)

    const checkoutData = { ...data, order_id: order_id }
    const checkout = await ky
      .post(`/api/midtrans/generate-checkout-data`, { json: checkoutData })
      .json()
    // console.log(checkout)

    const token = await ky
    .post(`/api/midtrans/generate-token`, { json: checkout })
    .json()

    console.log(token);
  }

  return (
    <>
      <h4>Profile</h4>
      <button onClick={handleGetProduct} className='bg-black p-4 text-white'>
        Get Product with cart-store
      </button>
    </>
  )
}
