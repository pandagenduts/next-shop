import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useLayoutEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  token: string
}

export default function MidtransPayment(props: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const token = props.token

  const handleMidtransSnap = () => {
    setIsOpen(true)
    window.snap.embed(token, {
      embedId: 'snap-container',
      onSuccess: function (result: any) {
        toast.success('Payment success!')
      },
      onPending: function (result: any) {
        toast('Waiting for payment...')
      },
      onError: function (result: any) {
        toast.error('Payment failed somehow..')
      },
      onClose: function () {
        toast('Midtrans payment closed')
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
      <div className='my-8 flex justify-between'>
        <p className='mb-2'>Payment Link</p>
        <Button onClick={handleMidtransSnap}>Click Here</Button>
      </div>
      {isOpen && (
        <>
          <p className='text-center'>
            You can simply{' '}
            <strong>simulate the payment using the tools below the Midtrans section.</strong>
          </p>
          <p className='mb-8 mt-4 text-center'>
            Anyway, hey, thank you for checking my app out! ^^
          </p>
        </>
      )}

      <div id='snap-container' className='w-full'></div>

      {isOpen && (
        <>
          <Separator className='my-8' />
          <p className='mb-4 text-center font-bold'>Copy the VA number above ☝</p>
          <p className='mb-4 text-center font-bold'>Simulate the payment here 👇</p>
          <div className='overflow-hidden -mb-28'>
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
