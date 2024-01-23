'use client'

import Link from 'next/link'
import UserAccountNav from '../auth/UserAccountNav'
import MobileMenu from './MobileMenu'
import DesktopMenu from './DesktopMenu'
import Cart from '../cart/Cart'
import LoginButton from './LoginButton'
import { useSession } from 'next-auth/react'

export default function Header() {
  const session = useSession()

  return (
    <header className='flex items-center justify-between py-4'>
      <div className='flex items-center gap-2'>
        <MobileMenu />

        <Link href='/' className='hidden md:block'>
          <p className='text-2xl font-bold'>NextShop</p>
        </Link>
      </div>
      <div className='hidden md:block'>
        <DesktopMenu />
      </div>

      <div className='flex items-center gap-4'>
        <Cart />

        {session.status === 'unauthenticated' ? <LoginButton /> : <UserAccountNav />}
      </div>
    </header>
  )
}
