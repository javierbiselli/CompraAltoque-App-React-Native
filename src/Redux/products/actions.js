import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_PENDING,
  GET_PRODUCT_ERROR,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_PENDING,
  SEARCH_PRODUCTS_ERROR,
} from "./constants";

export const getProductsPending = () => ({
  type: GET_PRODUCTS_PENDING,
});

export const getProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const getProductsError = () => ({
  type: GET_PRODUCTS_ERROR,
});

export const getProductPending = () => ({
  type: GET_PRODUCT_PENDING,
});

export const getProductSuccess = (product) => ({
  type: GET_PRODUCT_SUCCESS,
  payload: product,
});

export const getProductError = () => ({
  type: GET_PRODUCT_ERROR,
});

export const searchProductsPending = () => ({
  type: SEARCH_PRODUCTS_PENDING,
});

export const searchProductsSuccess = (products) => ({
  type: SEARCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const searchProductsError = () => ({
  type: SEARCH_PRODUCTS_ERROR,
});
