'use client';

import { Menu as MenuIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navMenu } from '@/lib/config';
import { cn } from '@/lib/utils';

export default function MobileMenu() {
  const pathName = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuIcon className='ml-2 h-4 w-4 md:hidden' />
      </SheetTrigger>
      <SheetContent side='left' className='focus:[&>button]:shadow-none'>
        <SheetHeader className='mb-8'>
          <SheetTitle>
            <Link href='/'>
              <p className='text-xl font-bold text-left'>NextShop</p>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <ul className='text-sm flex flex-col gap-4'>
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
  );
}
