import { PackageX } from 'lucide-react'

export default function OrdersEmptyPlaceholder() {
  return (
    <>
      <PackageX className='h-8 w-8' strokeWidth={1} />
      <p>
        Whoops, looks like you haven't placed any orders yet :( <br />
        Start shopping to see your orders here! ^^
      </p>
    </>
  )
}
