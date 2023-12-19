'use client';

import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import CartItem from './CartItem';

export default function CartButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' className='rounded-full'>
          <ShoppingCartIcon className='mr-2 h-4 w-4' />
          <span>0</span>
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col w-full min-[500px]:max-w-sm'>
        <SheetHeader className='mb-4'>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>Cart is empty</SheetDescription>
        </SheetHeader>
        <div className='flex flex-1 flex-col gap-8 overflow-y-hidden'>
          <div className='flex flex-1 flex-col gap-4 overflow-hidden overflow-y-auto'>
            <CartItem />
            <CartItem />
            <CartItem />
          </div>

          <div>
            <p className='text-right mb-4'>Total: Rp 0,-</p>
            <Button className='w-full'>Checkout</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
