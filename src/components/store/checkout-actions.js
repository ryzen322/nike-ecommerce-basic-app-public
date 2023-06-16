const FIREBASE_DOMAIN =
  "https://react-http-41d46-default-rtdb.asia-southeast1.firebasedatabase.app";

// add the sendOrderData
export const sendOrderData = (orders) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await fetch(`${FIREBASE_DOMAIN}/shoeOrder.json`, {
        method: "POST",
        body: JSON.stringify({
          orders: orders.orders,
        }),
      });
      if (!res.ok) {
        throw new Error("Sending order data failed!");
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
