import { PackageX } from 'lucide-react'

export default function OrderEmptyPlaceholder() {
  return (
    <div className='pt-8 flex flex-col items-center gap-4'>
      <PackageX className='h-8 w-8' strokeWidth={1} />
      <p className='text-center'>
        Whoops, order not found!<br />
        Are you sure you accessed the link correctly?
      </p>
    </div>
  )
}
