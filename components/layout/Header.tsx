'use client';

import Link from 'next/link';
import UserAccountNav from '../auth/UserAccountNav';
import MobileMenu from './MobileMenu';
import CartButton from '../cart/CartButton';
import DesktopMenu from './DesktopMenu';
import LoginButton from './LoginButton';


export default function Header() {


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
        <CartButton />
        {/* <LoginButton /> */}
        <UserAccountNav />
      </div>
    </header>
  );
}
