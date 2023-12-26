import ProfileNav from '@/components/layout/ProfileNav'
import { Separator } from '@/components/ui/separator'
import { User, Package } from 'lucide-react'

const profileMenu = [
  {
    title: 'Profile',
    href: '/profile',
    icon: User,
  },
  {
    title: 'Orders',
    href: '/profile/orders',
    icon: Package,
  },
]

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-5 md:gap-10 pt-4 md:flex-row'>
      <div className='flex-1  md:max-w-[200px]'>
        <h1 className='hidden md:block mb-2'>Menu</h1>
        <ProfileNav />
      </div>
      <Separator className='block md:hidden' />
      <div className='flex-1'>{children}</div>
    </div>
  )
}
