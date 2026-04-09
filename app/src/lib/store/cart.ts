import type { BrowseBook } from "@/types/book.types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  book: BrowseBook;
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addToCart: (book: BrowseBook) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  increaseQuantity: (bookId: string) => void;
  decreaseQuantity: (bookId: string) => void;
  getItemQuantity: (bookId: string) => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (book) => {
        const existing = get().items.find((item) => item.book.ID === book.ID);

        if (existing) {
          set({
            items: get().items.map((item) =>
              item.book.ID === book.ID
                ? {
                    ...item,
                    quantity:
                      item.quantity < item.book.stock
                        ? item.quantity + 1
                        : item.quantity,
                  }
                : item
            ),
          });
          return;
        }

        set({
          items: [...get().items, { book, quantity: 1 }],
        });
      },

      removeFromCart: (bookId) => {
        set({
          items: get().items.filter((item) => item.book.ID !== bookId),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      increaseQuantity: (bookId) => {
        set({
          items: get().items.map((item) =>
            item.book.ID === bookId
              ? {
                  ...item,
                  quantity:
                    item.quantity < item.book.stock
                      ? item.quantity + 1
                      : item.quantity,
                }
              : item
          ),
        });
      },

      decreaseQuantity: (bookId) => {
        set({
          items: get()
            .items.map((item) =>
              item.book.ID === bookId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        });
      },

      getItemQuantity: (bookId) => {
        const item = get().items.find((item) => item.book.ID === bookId);
        return item ? item.quantity : 0;
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.book.price ?? 0) * item.quantity,
          0
        );
      },
    }),
    {
      name: "book-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);