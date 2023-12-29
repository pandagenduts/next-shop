import { create } from 'zustand'
import { ProductType } from '@/types/types'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItemsType } from '@/types/types'
import { toast } from 'sonner'

type CartState = {
  items: CartItemsType[]
  totalQuantityOnCart: number
  addItem: (item: ProductType) => void
  removeItem: (id: number) => void
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      totalQuantityOnCart: 0,
      addItem: (item) => {
        const currentItems = get().items
        const isProductExist = currentItems.find(
          (currentItem) => currentItem.id === item.id,
        )

        if (isProductExist) {
          const updatedItems = currentItems.map((currentItem) => {
            if (currentItem.id === item.id) {
              currentItem.quantity += 1
            }
            return currentItem
          })
          set({ items: updatedItems, totalQuantityOnCart: countTotalQuantity(updatedItems) })
        } else {
          const newItem = { ...item, quantity: 1 }
          const updatedItems = [...currentItems, newItem]
          set({ items: updatedItems, totalQuantityOnCart: countTotalQuantity(updatedItems) })
        }
      },
      removeItem: (id) => {
        const currentItems = get().items
        const product = currentItems.find(
          (currentItem) => currentItem.id === id,
        )!

        if (product.quantity > 1) {
          const updatedItems = currentItems.map((currentItem) => {
            if (currentItem.id === id) {
              currentItem.quantity -= 1
            }
            return currentItem
          })
          set({ items: updatedItems, totalQuantityOnCart: countTotalQuantity(updatedItems) })
        } else {
          const filteredItems = currentItems.filter(
            (currentItem) => currentItem.id !== id,
          )
          set({ items: filteredItems, totalQuantityOnCart: countTotalQuantity(filteredItems) })
          toast.success('Item removed from cart.')
        }
      },
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

function countTotalQuantity (items: CartItemsType[]) {
  let total = 0
  items.forEach((item) => {
    total += item.quantity
  })

  return total
}

export default useCartStore
