import { configureStore } from "@reduxjs/toolkit";

import ShoeSlice from "./shoe-slice";
import CartSlice from "./cart-slice";
import CheckoutSlice from "./checkout-slice";

const store = configureStore({
  reducer: {
    shoes: ShoeSlice.reducer,
    cart: CartSlice.reducer,
    checkout: CheckoutSlice.reducer,
  },
});

export default store;
