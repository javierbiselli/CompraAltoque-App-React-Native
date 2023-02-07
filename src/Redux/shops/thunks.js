import { getShopsPending, getShopsSuccess, getShopsError } from "./actions";

export const getShops = () => {
  return async (dispatch) => {
    dispatch(getShopsPending());
    try {
      const response = await fetch("http://192.168.0.95:5000/shops");
      const res = await response.json();
      dispatch(getShopsSuccess(res.data));
      return response.data;
    } catch (error) {
      dispatch(getShopsError(error.toString()));
    }
  };
};
