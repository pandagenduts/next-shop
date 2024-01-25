import useCartStore from '@/store/cart-store'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '../LoadingSpinner'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import ky from 'ky'

type Props = {
  isFetching: boolean
  handleIsFetching: (state: boolean) => void
  handleSheetClose: () => void
}

export default function Checkout(props: Props) {
  const { isFetching, handleIsFetching, handleSheetClose } = props
  const { cartItemsStore, clearCart } = useCartStore()
  const router = useRouter()

  const handleCheckout = async () => {
    handleIsFetching(true)
    try {
      const newOrder: { orderId: string } = await ky
        .post('/api/midtrans/create-order', { json: cartItemsStore })
        .json()

      // executed if order is successfully created
      handleIsFetching(false)
      handleSheetClose()
      clearCart()
      toast.success('Order has been created!')
      router.push(`/profile/orders/${newOrder.orderId}`)
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
