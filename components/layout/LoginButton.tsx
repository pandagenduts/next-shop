import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LoginButton() {
  return (
    <Button size='sm'>
      <Link href='/login'>Log in</Link>
    </Button>
  )
}
