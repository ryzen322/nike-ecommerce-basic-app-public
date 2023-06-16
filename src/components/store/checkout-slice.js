import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    orders: [],
    isDeliver: false,
    isPickUp: false,
  },
  reducers: {
    deliver(state) {
      state.isPickUp = false;
      state.isDeliver = true;
    },
    pickup(state) {
      state.isDeliver = false;
      state.isPickUp = true;
    },
    addOrder(state, action) {
      const newOrder = action.payload;
      if (state.isDeliver) {
        state.orders.push({
          deliver: true,
          orders: newOrder.order,
          totalAmount: newOrder.totalAmount,
          personalInfo: {
            firstName: newOrder.firstName,
            lastName: newOrder.lastName,
            address1: newOrder.addresss1,
            province: newOrder.province,
            city: newOrder.city,
            postalCode: newOrder.postalCode,
            barangay: newOrder.barangay,
            country: newOrder.country,
          },
          contactInfo: {
            email: newOrder.email,
            phoneNumber: newOrder.phoneNumber,
          },
        });
      } else if (state.isPickUp) {
        state.orders.push({
          pickup: true,
          orders: newOrder.order,
          totalAmount: newOrder.totalAmount,
          pickupBranch: newOrder.pickupBranchAddress,
          branchContactNum: newOrder.branchContactNum,
        });
      }
    },
    resetOrder(state) {
      state.orders = [];
      state.isDeliver = false;
      state.isPickUp = false;
    },
  },
});

export const checkoutActions = checkoutSlice.actions;

export default checkoutSlice;
