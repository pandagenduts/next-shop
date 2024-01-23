'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { profileMenu } from '@/lib/config'
import { isOrderDetails } from '@/lib/utils'

export default function ProfileNav() {
  const pathname = usePathname() as string

  const urlSplit = pathname.split('/')

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
