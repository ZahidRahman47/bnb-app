import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";  // Changed this line
import rootReducer from "./rootReducer";

const composeEnhancers =
  (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

const store = configureStore();

export default store;