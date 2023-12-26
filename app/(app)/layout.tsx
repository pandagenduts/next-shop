import ProfileNav from '@/components/layout/ProfileNav'
import { Separator } from '@/components/ui/separator'
import { User, Package } from 'lucide-react'

const profileMenu = [
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

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-5 md:gap-10 pt-4 md:flex-row'>
      <div className='flex-1  md:max-w-[200px]'>
        <h1 className='hidden md:block mb-2'>Menu</h1>
        {/* <div className='flex gap-1 overflow-auto md:flex-col md:overflow-visible'>
          {profileMenu.map((menu) => (
            <Button
              variant={pathname === menu.href ? 'secondary' : 'ghost'}
              size='sm'
              className='justify-start md:w-full'
              asChild
            >
              <Link href={menu.href}>
                {menu.icon && <menu.icon className='mr-2 h-4 w-4' />}
                {menu.title}
              </Link>
            </Button>
          ))}
        </div> */}
        <ProfileNav />
      </div>
      <Separator className='block md:hidden' />
      <div className='flex-1'>{children}</div>
    </div>
  )
}
