import {
  GET_SHOPS_SUCCESS,
  GET_SHOPS_PENDING,
  GET_SHOPS_ERROR,
} from "./constants";

const initialState = {
  list: [],
  isLoading: false,
  error: false,
};

export const shopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHOPS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SHOPS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    case GET_SHOPS_ERROR:
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
