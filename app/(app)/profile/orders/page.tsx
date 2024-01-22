import serverUid from '@/lib/actions/auth/server-uid'
import OrdersContainer from '@/components/orders/OrdersContainer'

export default async function Page() {
  const uid = (await serverUid()) as string

  return (
    <>
      <OrdersContainer uid={uid} />
    </>
  )
}
