import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      // check existence
      // i saw your app it still add new item in array with the same name id and size it suppose to update the price
      const existingItem = state.items.find(
        (item) => item.cartId === newItem.cartId && item.size === newItem.size
      );

      state.changed = true;

      if (!existingItem) {
        state.items.push({
          defaultImage: newItem.defaultImage,
          cartId: newItem.cartId,
          productId: newItem.productId,
          name: newItem.name,
          size: newItem.size,
          price: newItem.price,
          colorId: newItem.colorId,
          type: newItem.type,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
    },
    removeItemFromCart(state, action) {
      const cartId = action.payload;
      const existingItem = state.items.find((item) => item.cartId === cartId);

      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.cartId !== cartId);
      } else {
        existingItem.quantity--;
      }
    },
    updateSizeInBag(state, action) {
      const newSize = action.payload.newSize;
      const cartId = action.payload.cartId;
      const existingItem = state.items.find((item) => item.cartId === cartId);
      state.changed = true;
      existingItem.size = newSize;
    },
    updateQuantityInBag(state, action) {
      const newQuantity = action.payload.newQuantity;
      const cartId = action.payload.cartId;
      const existingItem = state.items.find((item) => item.cartId === cartId);
      state.changed = true;
      existingItem.quantity = newQuantity;
    },
    getTotalQuantity(state) {
      state.totalQuantity = 0;
      if (state.items.length >= 1) {
        for (let i = 0; i < state.items.length; i++) {
          state.totalQuantity += state.items[i].quantity;
        }
      } else {
        state.totalQuantity = 0;
      }
    },
    getTotalAmount(state) {
      state.totalAmount = 0;
      if (state.items.length >= 1) {
        for (let i = 0; i < state.items.length; i++) {
          state.totalAmount += state.items[i].quantity * state.items[i].price;
        }
      } else {
        state.totalAmount = state.items.price;
      }
    },
    removeFromItems(state, action) {
      const itemToBeRemoved = action.payload;

      state.changed = true;
      state.items = state.items.filter(
        (item) => item.cartId !== itemToBeRemoved
      );
    },
    resetCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.changed = false;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
