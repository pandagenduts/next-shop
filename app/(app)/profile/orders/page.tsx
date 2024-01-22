import OrdersEmptyPlaceholder from '@/components/orders/OrdersEmptyPlaceholder'
import OrdersCard from '@/components/orders/OrdersCard'

export default function Page() {
  return (
    <>
      <div className='flex flex-col gap-4'>
        <OrdersCard />
        <OrdersCard />
        <OrdersCard />
      </div>
      {/* <OrdersEmptyPlaceholder /> */}
    </>
  )
}
