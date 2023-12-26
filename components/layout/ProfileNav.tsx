'use client'

import { Button } from '@/components/ui/button'
import { User, Package } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

export default function ProfileNav() {
  const pathname = usePathname()

  return (
    <div className='flex gap-1 overflow-auto md:flex-col md:overflow-visible'>
      {profileMenu.map((menu) => (
        <Button
          variant={pathname === menu.href ? 'secondary' : 'ghost'}
          size='sm'
          className='justify-start md:w-full'
          key={menu.title}
          asChild
        >
          <Link href={menu.href}>
            {menu.icon && <menu.icon className='mr-2 h-4 w-4' />}
            {menu.title}
          </Link>
        </Button>
      ))}
    </div>
  )
}
