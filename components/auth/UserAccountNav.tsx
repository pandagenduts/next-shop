'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import {
  User as UserIcon,
  Package as PackageIcon,
  LogOut as LogOutIcon,
} from 'lucide-react'
import { useState } from 'react'
import { signOutNextAuthFirebase } from '@/lib/actions/auth/sign-out-next-auth-firebase'

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
]

export default function UserAccountNav() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className='outline-none' asChild>
        <Avatar className='cursor-pointer'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menu.map((menu) => (
          <DropdownMenuItem key={menu.title} onClick={handleClose}>
            <Link href={menu.href} className='flex'>
              <menu.icon className='mr-2 h-4 w-4' />
              {menu.title}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' onClick={() => {
          handleClose()
          signOutNextAuthFirebase()
        }}>
          <LogOutIcon className='mr-2 h-4 w-4' />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
