import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from 'sonner'

export type CartItemsStore = {
  id: number
  quantity: number
}

type CartState = {
  cartItemsStore: CartItemsStore[]
  addItemToCart: (id: number) => void
  removeItemFromCart: (id: number) => void
  clearCart: () => void
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cartItemsStore: [],
      addItemToCart: (id) => {
        const currentItems = get().cartItemsStore
        const itemExist = currentItems.find((currentItem) => currentItem.id === id)

        if (itemExist) {
          const updatedItems = currentItems.map((currentItem) => {
            if (currentItem.id === id) {
              currentItem.quantity += 1
            }
            return currentItem
          })

          set({ cartItemsStore: updatedItems })
        } else {
          set({ cartItemsStore: [...currentItems, { id: id, quantity: 1 }] })
        }
      },
      removeItemFromCart: (id) => {
        const currentItems = get().cartItemsStore
        const itemExist = currentItems.find((currentItem) => currentItem.id === id)!

        if (itemExist.quantity > 1) {
          const updatedItems = currentItems.map((currentItem) => {
            if (currentItem.id === id) {
              currentItem.quantity -= 1
            }
            return currentItem
          })

          set({ cartItemsStore: updatedItems })
        } else {
          const updatedItems = currentItems.filter((currentItem) => currentItem.id !== id)

          set({ cartItemsStore: updatedItems })
          toast.success('Item removed from the cart!')
        }
      },
      clearCart: () => {
        set({ cartItemsStore: [] })
      },
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useCartStore
