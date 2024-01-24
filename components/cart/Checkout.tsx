import { Button } from '@/components/ui/button'

export default function Checkout() {
  const handleCheckout = async () => {
    console.log('checkout')
  }

  return (
    <>
      <Button className='w-full' onClick={handleCheckout}>Checkout</Button>
    </>
  )
}
