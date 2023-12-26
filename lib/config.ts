import { User, Package } from 'lucide-react'

// HEADER
export const navMenu = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Products',
    href: '/products',
  },
]

// PROFILE
export const profileMenu = [
  {
    title: 'Profile',
    href: '/profile',
    icon: User,
  },
  {
    title: 'Orders',
    href: '/profile/orders',
    icon: Package,
  },
]