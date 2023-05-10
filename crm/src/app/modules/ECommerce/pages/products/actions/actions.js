import {GE_PRODUCTS,CREATE_PRODUCT ,UPDATE_PRODUCT,GET_PRODUCT_BYID,DELETE_PRODUCT} from './types'
import axios from 'axios'


export const fetchAllProducts = ()=>async (dispatch) =>{
    try { 
const products = await axios.get(`${process.env.REACT_APP_API_URL}/product`)
        dispatch({
            type:GE_PRODUCTS,
            payload:products.data.result
        })
} catch (error) {
        console.log(error);
    }
}


export const createNewProduct = (form)=>async (dispatch) =>{
    try { 
const products = await axios.post(`${process.env.REACT_APP_API_URL}/product`,form )
        dispatch({
            type:CREATE_PRODUCT,
            payload:products.data.result
        })
} catch (error) {
        console.log(error);
    }
}


export const updateProduct = (form , id)=>async (dispatch) =>{
    try { 
const products = await axios.patch(`${process.env.REACT_APP_API_URL}/product/${id}`,form )
        dispatch({
            type:UPDATE_PRODUCT,
            payload:products.data.result
        })
} catch (error) {
        console.log(error);
    }
}


export const getProductById = (id)=>async (dispatch) =>{
    try { 
        if(id){
const products = await axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`)
console.log(products);
        dispatch({
            type:GET_PRODUCT_BYID,
            payload:products.data.result
        })
    }else{
        dispatch({
            type:GET_PRODUCT_BYID,
            payload:undefined
        })
    }
} catch (error) {
        console.log(error);
    }
}


export const deleteProductId = (id)=>async (dispatch) =>{
    try { 
 await axios.delete(`${process.env.REACT_APP_API_URL}/product/${id}` )
        dispatch({
            type:DELETE_PRODUCT,
            payload:id
        })
} catch (error) {
        console.log(error);
    }
}
