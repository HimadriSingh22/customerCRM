
import {
    SET_CUSTOMER_LIST,
    SET_CUSTOMER_DETAILS
    
  } from "../actions/types";
  
  const initialState = {
    customerList:[]
    
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case SET_CUSTOMER_LIST: {
        console.log("Action Executed!");
        return {
          ...state,
          customerList:action.payload
        };
      }

      case SET_CUSTOMER_DETAILS:{
          return{...state,customerDetails:action.payload}
      }
  
     
     
      default:
        return state;
    }
  }
  