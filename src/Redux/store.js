import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { shopsReducer } from "./shops/reducer";
import { productsReducer } from "./products/reducer";

const rootReducer = combineReducers({
  shops: shopsReducer,
  products: productsReducer,
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
