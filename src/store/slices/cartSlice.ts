import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  pizzaId: string;
  name: string;
  price: number;
  basePrice: number;
  imageUrl: string;
  quantity: number;
  size: string;
  toppings: string[];
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("pizza-paradise-cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("pizza-paradise-cart", JSON.stringify(items));
};

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCart: (state) => {
      state.items = loadCartFromStorage();
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.pizzaId === action.payload.pizzaId &&
          item.size === action.payload.size,
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCartToStorage(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  initCart,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
} = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartIsOpen = (state: { cart: CartState }) =>
  state.cart.isOpen;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
