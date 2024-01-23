import { Button } from '@/components/ui/button'
import { useEffect, useLayoutEffect } from 'react'

type Props = {
  token: string
}

export default function MidtransPayment(props: Props) {
  const token = props.token

  console.log(token)

  const handleMidtransSnap = () => {
    window.snap.embed(token, {
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
      <div id='snap-container' className='w-full'></div>
    </>
  )
}
