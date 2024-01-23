import { PackageX } from 'lucide-react'

export default function OrdersEmptyPlaceholder() {
  return (
    <div className='pt-8 flex flex-col items-center gap-4'>
      <PackageX className='h-8 w-8' strokeWidth={1} />
      <p className='text-center'>
        Whoops, looks like you haven&rsquo;t placed any orders yet :( <br />
        Start shopping to see your orders here! ^^
      </p>
    </div>
  )
}
