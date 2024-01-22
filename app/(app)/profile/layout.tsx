'use client'

import TanstackQueryProvier from '@/components/TanstackQueryProvier'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { profileMenu } from '@/lib/config'
import { cn, isOrderDetails } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() as string
  const urlSplit = pathname.split('/')
  // check if user is on order details, hide the menu on mobile
  const orderDetailsPage = isOrderDetails(urlSplit)

  return (
    <div className='flex flex-col gap-5 md:flex-row md:gap-10'>
      <div className={cn('flex-1 md:max-w-[200px]', orderDetailsPage ? 'hidden md:block' : '')}>
        <h4 className='mb-2 hidden md:block'>Menu</h4>
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
      </div>
      <Separator className={cn('block md:hidden', orderDetailsPage ? 'hidden' : '')} />
      <div className='flex-1'>
        <TanstackQueryProvier>{children}</TanstackQueryProvier>
      </div>
    </div>
  )
}
