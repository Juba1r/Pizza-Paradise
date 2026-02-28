import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import uiReducer from "./slices/uiSlice";
import orderReducer from "./slices/orderSlice";

import menuReducer from "./slices/menuSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    order: orderReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
