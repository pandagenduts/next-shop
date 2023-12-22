'use client'

import { Menu as MenuIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navMenu } from '@/lib/config'
import { cn } from '@/lib/utils'

export default function MobileMenu() {
  const pathName = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuIcon className='ml-2 h-4 w-4 md:hidden' />
      </SheetTrigger>
      <SheetContent side='left' className='focus:[&>button]:shadow-none'>
        <SheetHeader className='mb-8'>
          <SheetTitle>
            <Link href='/'>
              <p className='text-left text-xl font-bold'>NextShop</p>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <ul className='flex flex-col gap-4 text-sm'>
          {navMenu.map((menu) => (
            <li key={menu.title}>
              <Link
                href={menu.href}
                className={cn(pathName === menu.href && 'font-bold')}
              >
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}
