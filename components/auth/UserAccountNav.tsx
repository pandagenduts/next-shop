'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { User as UserIcon, Package as PackageIcon, LogOut as LogOutIcon } from 'lucide-react';

const menu = [
  {
    title: 'Profile',
    href: '/profile',
    icon: UserIcon,
  },
  {
    title: 'Orders',
    href: '/profile/orders',
    icon: PackageIcon,
  },
];

export default function UserAccountNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <Avatar className='cursor-pointer'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menu.map((menu) => (
          <DropdownMenuItem>
            <Link href={menu.href} className='flex'>
              <menu.icon className='mr-2 h-4 w-4' />
              {menu.title}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer'><LogOutIcon className='mr-2 h-4 w-4' />Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
