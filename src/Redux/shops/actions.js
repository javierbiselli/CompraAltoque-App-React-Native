import {
  GET_SHOPS_SUCCESS,
  GET_SHOPS_PENDING,
  GET_SHOPS_ERROR,
} from "./constants";

export const getShopsPending = () => ({
  type: GET_SHOPS_PENDING,
});

export const getShopsSuccess = (shops) => ({
  type: GET_SHOPS_SUCCESS,
  payload: shops,
});

export const getShopsError = () => ({
  type: GET_SHOPS_ERROR,
});
