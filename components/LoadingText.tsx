import LoadingSpinner from './LoadingSpinner'

export default function LoadingText() {
  return (
    <p className='flex gap-4'>
      <LoadingSpinner /> Loading...
    </p>
  )
}
