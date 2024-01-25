import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'


type Props = {
  token: string
  order_id: string
}

export default function MidtransPayment(props: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const {token, order_id} = props
  const router = useRouter()

  const handleMidtransSnap = () => {
    setIsOpen(true)
    window.snap.embed(token, {
      embedId: 'snap-container',
      onSuccess: function (result: any) {
        setIsOpen(false)
        alert('Payment success!')
        router.push(`/transaction-status?order_id=${order_id}&status_code=200&transaction_status=settlement`)
      },
      onPending: function (result: any) {
        setIsOpen(false)
        alert('Waiting for payment...')
        window.location.reload()
      },
      onError: function (result: any) {
        setIsOpen(false)
        alert('Payment failed somehow..')
        window.location.reload()
      },
      onClose: function () {
        setIsOpen(false)
        alert('Midtrans payment closed.')
        window.location.reload()
      },
    })
  }

  useLayoutEffect(() => {
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
      {!isOpen && (
        <div className='my-8 flex justify-between'>
          <p className='mb-2'>Payment Link</p>
          <Button onClick={handleMidtransSnap}>Click Here</Button>
        </div>
      )}
      {isOpen && (
        <>
          <p className='mt-8 text-center'>
            You can simply <strong>simulate the payment using the tools below the Midtrans section.</strong>
          </p>
          <p className='mb-8 mt-4 text-center'>
            Anyway, hey, thank you for checking my app out! ^^
          </p>
        </>
      )}

      <div id='snap-container' className={`w-full ${isOpen ? 'border' : ''}`}></div>

      {isOpen && (
        <>
          <Separator className='my-8' />
          <p className='mb-4 text-center font-bold'>Copy the VA number above ☝</p>
          <p className='mb-4 text-center font-bold'>Simulate the payment here 👇</p>
          <div className='-mb-28 overflow-hidden'>
            <iframe
              src='https://simulator.sandbox.midtrans.com/bca/va/index'
              title='Midtrans Payment Mock Simulator'
              className='relative -top-28 mx-auto h-[500px] w-full max-w-[700px]'
            ></iframe>
          </div>
        </>
      )}
    </>
  )
}
