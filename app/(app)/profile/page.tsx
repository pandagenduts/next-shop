'use client'

import { Button } from '@/components/ui/button'
import useCartStore from '@/store/cart-store'
import { DocumentReference } from 'firebase/firestore/lite'
import ky from 'ky'

type Token = {
  token: string
  redirect_url: string
}

export default function Page() {
  const { cartItemsStore } = useCartStore()

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

  return (
    <>
      <h4>Profile</h4>
      {/* <p className='mt-8'>Coming soon! ^^</p> */}

      <Button className='mt-8' onClick={handleCreateDocument}>
        Create Order
      </Button>
    </>
  )
}
