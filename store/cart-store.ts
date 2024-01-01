// @ts-nocheck

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from 'sonner'

type CartItemsType = {
  id: number
  quantity: number
}

type CartState = {
  cartItems: CartItemsType[]
  addItemToCart: (id: number) => void
  removeItemFromCart: (id: number) => void
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cartItems: [],
      addItemToCart: (id) => {
        const currentItems = get().cartItems
        const itemExist = currentItems.find(
          (currentItem) => currentItem.id === id,
        )

        if (itemExist) {
          const updatedItems = currentItems.map((currentItem) => {
            if (currentItem.id === id) {
              currentItem.quantity += 1
            }
            return currentItem
          })

          set({ cartItems: updatedItems })
        } else {
          set({ cartItems: [...currentItems, { id: id, quantity: 1 }] })
        }
      },
      removeItemFromCart: (id) => {
        const currentItems = get().cartItems
        const itemExist = currentItems.find(
          (currentItem) => currentItem.id === id,
        )

        if (itemExist.quantity > 1) {
          const updatedItems = currentItems.map((currentItem) => {
            if (currentItem.id === id) {
              currentItem.quantity -= 1
            }
            return currentItem
          })

          set({ cartItems: updatedItems })
        } else {
          const updatedItems = currentItems.filter(
            (currentItem) => currentItem.id !== id,
          )

          set({ cartItems: updatedItems })
        }
      },
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useCartStore
