import {
  getProductsPending,
  getProductsSuccess,
  getProductsError,
  getProductPending,
  getProductSuccess,
  getProductError,
  searchProductsPending,
  searchProductsSuccess,
  searchProductsError,
} from "./actions";

export const getProducts = () => {
  return async (dispatch) => {
    dispatch(getProductsPending());
    try {
      const response = await fetch(`${process.env.API_KEY}/products`, {
        headers: {
          "Content-type": "application/json",
        },
      });
      const res = await response.json();
      dispatch(getProductsSuccess(res.data));
      return res;
    } catch (error) {
      dispatch(getProductsError(error.toString()));
    }
  };
};

export const getProductById = (productId) => {
  return async (dispatch) => {
    dispatch(getProductPending());
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await fetch(
        `${process.env.API_KEY}/products/${productId}`,
        {
          headers: {
            "Content-type": "application/json",
            token,
          },
        }
      );
      const res = await response.json();
      dispatch(getProductSuccess(res.data));
      return res;
    } catch (error) {
      dispatch(getProductError(error.toString()));
    }
  };
};

export const searchProducts = (searchTerm) => {
  return async (dispatch) => {
    dispatch(searchProductsPending());
    try {
      const response = await fetch(
        `${process.env.API_KEY}/products/search?q=${searchTerm}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const res = await response.json();
      console.log("search executed");
      dispatch(searchProductsSuccess(res.data));
      return res;
    } catch (error) {
      dispatch(searchProductsError(error.toString()));
    }
  };
};
