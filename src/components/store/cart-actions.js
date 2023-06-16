import { cartActions } from "./cart-slice";

const FIREBASE_DOMAIN =
  "https://react-http-41d46-default-rtdb.asia-southeast1.firebasedatabase.app";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(`${FIREBASE_DOMAIN}/shoeCart.json`);

      if (!res.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = res.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
          totalAmount: cartData.totalAmount,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

// add the sendCartData
export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await fetch(`${FIREBASE_DOMAIN}/shoeCart.json`, {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
          totalAmount: cart.totalAmount,
        }),
      });
      if (!res.ok) {
        throw new Error("Sending cart data failed!");
      }
    };

    try {
      await sendRequest();
      console.log("Success!");
    } catch (error) {
      console.log(error);
    }
  };
};
