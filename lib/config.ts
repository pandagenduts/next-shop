import { User, Package } from 'lucide-react'

// HEADER
export const navMenu = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Shop',
    href: '/shop',
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