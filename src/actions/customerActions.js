import {SET_CUSTOMER_DETAILS, SET_CUSTOMER_LIST} from "./types";

export const setCustomerList = customerList=>{
    return{
        type:SET_CUSTOMER_LIST,
        payload:customerList
    };
};

export const setCustomerDetails = customerDetails=>{
    return{
        type:SET_CUSTOMER_DETAILS,
        payload:customerDetails
    };
};