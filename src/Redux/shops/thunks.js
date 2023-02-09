import { getShopsPending, getShopsSuccess, getShopsError } from "./actions";

export const getShops = () => {
  return async (dispatch) => {
    dispatch(getShopsPending());
    try {
      const response = await fetch(`${process.env.API_KEY}/shops`);
      const res = await response.json();
      dispatch(getShopsSuccess(res.data));
      return response.data;
    } catch (error) {
      dispatch(getShopsError(error.toString()));
    }
  };
};
