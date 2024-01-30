import { Badge } from '@/components/ui/badge'
import { firstLetterUppercase } from '@/lib/utils'

type Props = {
  status: string
}

export default function OrderStatus(props: Props) {
  const status = props.status
  const formattedStatus = firstLetterUppercase(status)
  let variant: 'secondary' | 'outline' | 'default' | 'destructive' | null | undefined = 'default'

  if (status === 'pending') {
    variant = 'secondary'
  } else if (status === 'failure') {
    variant = 'destructive'
  } else if (status === 'success') {
    variant = 'default'
  }

  return (
    <Badge className='font-semibold md:px-4 md:text-sm' variant={variant}>
      {formattedStatus}
    </Badge>
  )
}
