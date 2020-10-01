import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import authReducer from "./reducers/authReducer";
import rootReducer from "./reducers/index";

// const initialState = [];

const middleware = [thunk];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

export default store;
