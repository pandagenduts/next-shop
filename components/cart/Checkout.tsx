import { DocumentReference } from 'firebase/firestore/lite'
import useCartStore from '@/store/cart-store'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '../LoadingSpinner'
import ky from 'ky'
import { toast } from 'sonner'

type Props = {
  isFetching: boolean
  handleIsFetching: (state: boolean) => void
  handleSheetClose: () => void
}

export default function Checkout(props: Props) {
  const { isFetching, handleIsFetching, handleSheetClose } = props
  const { cartItemsStore, clearCart } = useCartStore()

  const handleCheckout = async () => {
    console.log('checkout')
    handleIsFetching(true)
    try {
      const addDocument: DocumentReference = await ky
        .post('/api/midtrans/create-order', { json: cartItemsStore })
        .json()

      // executed if order is successfully created
      console.log(addDocument)
      handleIsFetching(false)
      handleSheetClose()
      clearCart()
      toast.success('Order has been created!')
    } catch (error) {
      handleIsFetching(false)
      console.log(error)
      toast.error('Something went wrong when placing the order...')
    }
  }

  return (
    <>
      <Button className='w-full' disabled={isFetching} onClick={handleCheckout}>
        {isFetching ? (
          <p className='flex gap-4'>
            <LoadingSpinner /> Loading...
          </p>
        ) : (
          'Checkout'
        )}
      </Button>
    </>
  )
}
