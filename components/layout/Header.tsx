'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import UserAccountNav from '../auth/UserAccountNav';

import MobileMenu from './MobileMenu';

const menu = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Shop',
    href: '/shop',
  },
];

export default function Header() {
  return (
    <header className='flex items-center justify-between py-4'>
      <div className='flex items-center gap-2'>
        <MobileMenu />
        
        <Link href='/' className='hidden md:block'>
          <p className='text-2xl font-light'>NextShop</p>
        </Link>
      </div>

      <div className='md:hidden'>
        <Link href='/'>
          <p className='text-xl font-light'>NextShop</p>
        </Link>
      </div>

      <div className='hidden md:block'>
        <NavigationMenu>
          <NavigationMenuList>
            {menu.map((menu) => (
              <NavigationMenuItem key={menu.title}>
                <Link href={menu.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {menu.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div>
        <UserAccountNav />
      </div>
    </header>
  );
}
