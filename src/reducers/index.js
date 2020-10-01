import { combineReducers } from "redux";

import authReducer from "./authReducer";
import customerReducer from "./customerReducer";

export default combineReducers({
  auth: authReducer,
  customer: customerReducer,
 
});