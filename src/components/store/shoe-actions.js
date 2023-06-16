import { shoesActions } from "./shoe-slice";

const FIREBASE_DOMAIN =
  "https://react-http-41d46-default-rtdb.asia-southeast1.firebasedatabase.app";

export const fetchShoeData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(`${FIREBASE_DOMAIN}/shoes.json`);

      if (!res.ok) {
        throw new Error("Could not be fetched the data!");
      }

      const data = res.json();

      return data;
    };

    try {
      const shoeData = await fetchData();
      dispatch(shoesActions.transformData(shoeData));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchSingleShoeData = (productId) => {
  return async (dispatch) => {
    const fetchSingleData = async () => {
      const res = await fetch(`${FIREBASE_DOMAIN}/shoes/${productId}.json`);

      if (!res.ok) {
        throw new Error("Could not be fetched the data!");
      }

      const data = res.json();

      return data;
    };

    try {
      const shoeSingleData = await fetchSingleData();
      dispatch(shoesActions.transoformSingleData(shoeSingleData));
    } catch (err) {
      console.log(err);
    }
  };
};
