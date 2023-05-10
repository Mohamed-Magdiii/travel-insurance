import {CREATE_CUSTOMER,
    UPDATE_CUSTOMER,
    GET_CUSTOMERS,
    GET_CUSTOMER_BYID,
    } from './types'
import axios from 'axios'


export const fetchAllCustomers = ()=>async (dispatch) =>{
    try { 
const customers = await axios.get(`${process.env.REACT_APP_API_URL}/customer`)
        dispatch({
            type:GET_CUSTOMERS,
            payload:customers.data.result
        })
} catch (error) {
        console.log(error);
    }
}


export const createNewCustomer = (form)=>async (dispatch) =>{
    try { 
const customers = await axios.post(`${process.env.REACT_APP_API_URL}/customer`,form )
        dispatch({
            type:CREATE_CUSTOMER,
            payload:customers.data.result
        })
} catch (error) {
        console.log(error);
    }
}


export const updateCustomer = (form , id)=>async (dispatch) =>{
    try { 
const products = await axios.patch(`${process.env.REACT_APP_API_URL}/customer/${id}`,form )
        dispatch({
            type:UPDATE_CUSTOMER,
            payload:products.data.result
        })
} catch (error) {
        console.log(error);
    }
}


export const getCustomerById = (id)=>async (dispatch) =>{
    try { 
        if(id){
const customer = await axios.get(`${process.env.REACT_APP_API_URL}/customer/find/${id}`)
        dispatch({
            type:GET_CUSTOMER_BYID,
            payload:customer.data.result
        })
    }else{
        dispatch({
            type:GET_CUSTOMER_BYID,
            payload:undefined
        })
    }
} catch (error) {
        console.log(error);
    }
}


// export const deleteProductId = (id)=>async (dispatch) =>{
//     try { 
//  await axios.delete(`${process.env.REACT_APP_API_URL}/product/${id}` )
//         dispatch({
//             type:DELETE_PRODUCT,
//             payload:id
//         })
// } catch (error) {
//         console.log(error);
//     }
// }
