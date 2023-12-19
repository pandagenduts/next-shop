'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';

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
    <header className='flex items-center justify-between'>
      <h1>NextShop</h1>
      <div>
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
        
      </div>
    </header>
  );
}
