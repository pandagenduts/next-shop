import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <>
      <Separator className="mb-4" />
      <p className="text-xs text-gray-500 block mb-8 text-center">Created by: <a href="https://github.com/pandagenduts/next-shop" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">Donny Rendi</a></p>
    </>
  )
}
