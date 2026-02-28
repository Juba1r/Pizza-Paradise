import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  id: string;
  pizzaId: string;
  name: string;
  quantity: number;
  price: number;
  size: string;
  imageUrl: string;
}

interface Order {
  id: string;
  status: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  estimatedTime: number;
  createdAt: string;
}

interface OrderState {
  currentOrder: Order | null;
  orderHistory: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  orderHistory: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>,
    ) => {
      if (state.currentOrder?.id === action.payload.id) {
        state.currentOrder.status = action.payload.status;
      }
      const historyOrder = state.orderHistory.find(
        (o) => o.id === action.payload.id,
      );
      if (historyOrder) {
        historyOrder.status = action.payload.status;
      }
    },
    setOrderHistory: (state, action: PayloadAction<Order[]>) => {
      state.orderHistory = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentOrder,
  updateOrderStatus,
  setOrderHistory,
  clearCurrentOrder,
  setLoading,
  setError,
} = orderSlice.actions;

export default orderSlice.reducer;
