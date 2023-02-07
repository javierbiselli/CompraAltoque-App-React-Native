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

const initialState = {
  results: [],
  list: [],
  product: {},
  isLoading: false,
  error: false,
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case GET_PRODUCT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isLoading: false,
      };
    case GET_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case SEARCH_PRODUCTS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        results: action.payload,
        isLoading: false,
      };
    case SEARCH_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    default: {
      return state;
    }
  }
};
