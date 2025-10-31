import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import themeReducer from "../features/theme/themeSlice";
import productReducer from "../features/products/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
