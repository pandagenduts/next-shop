import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { navMenu } from '@/lib/config'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DesktopMenu() {
  const pathName = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navMenu.map((menu) => (
          <NavigationMenuItem key={menu.title}>
            <Link
              href={menu.href}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink active={pathName === menu.href} className={navigationMenuTriggerStyle()}>
                {menu.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
