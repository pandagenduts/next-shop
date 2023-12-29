import { create } from 'zustand'
import { ProductType } from '@/types/types'

type CartState = {
  items: ProductType[]
  addItem: (item: ProductType) => void
  removeItem: (id: number) => void
  clearItems: () => void
}

const useCartStore = create<CartState>()((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => {
      const currentItems = [...state.items]
      const filteredItems = currentItems.filter(
        (currentItem) => currentItem.id !== id,
      )

      return {items: filteredItems}
    }),
  clearItems: () => set({ items: [] }),
}))

export default useCartStore