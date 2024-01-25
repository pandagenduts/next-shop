'use client'

import { Button } from '@/components/ui/button'
import useCartStore from '@/store/cart-store'
import { DocumentReference } from 'firebase/firestore/lite'
import ky from 'ky'
import { toast } from 'sonner'

type Token = {
  token: string
  redirect_url: string
}

export default function Page() {
  const { cartItemsStore, clearCart } = useCartStore()

  const handleCreateDocument = async () => {
    try {
      const addDocument: DocumentReference = await ky
        .post('/api/midtrans/create-order', { json: cartItemsStore })
        .json()

      console.log(addDocument)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClearCart = () => {
    clearCart()
    toast.success('cart cleared!')
  }

  return (
    <>
      <h4>Profile</h4>
      {/* <p className='mt-8'>Coming soon! ^^</p> */}

      <Button className='mt-8' onClick={handleCreateDocument}>
        Create Order
      </Button>
      <Button onClick={handleClearCart}>
        Clear Cart
      </Button>
    </>
  )
}
