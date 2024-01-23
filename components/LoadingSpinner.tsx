import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type Props = {
  className?: string
}

export default function LoadingSpinner(props: Props) {
  const className = props.className

  return <Loader2 className={cn('h-4 w-4 animate-spin', className)} />
}
