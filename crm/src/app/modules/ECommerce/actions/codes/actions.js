import {GET_CODES,CREATE_CODES,GET_CODE_BYID,UPDATE_CODES} from './types'
import axios from 'axios'


export const fetchAllCodes = ()=>async (dispatch) =>{
    try { 
const code = await axios.get(`${process.env.REACT_APP_API_URL}/code`)
        dispatch({
            type:GET_CODES,
            payload:code.data.result
        })
} catch (error) {
        console.log(error);
    }
}


export const createNewCode = (form)=>async (dispatch) =>{
    try { 
const code = await axios.post(`${process.env.REACT_APP_API_URL}/code`,form )
        dispatch({
            type:CREATE_CODES,
            payload:code.data.result
        })
} catch (error) {
        console.log(error.message);
    }
}


export const updateCode = (form , id)=>async (dispatch) =>{
    try { 
        console.log(form);

const code = await axios.patch(`${process.env.REACT_APP_API_URL}/code/${id}`,form )
        dispatch({
            type:UPDATE_CODES,
            payload:code.data.result
        })
} catch (error) {
        console.log(error.response);
    }
}


export const getCodeById = (id)=>async (dispatch) =>{
    try { 
        if(id){
            const code = await axios.get(`${process.env.REACT_APP_API_URL}/code/find/${id}`)
        dispatch({
            type:GET_CODE_BYID,
            payload:code.data.result
        })
    }else {
        dispatch({
            type:GET_CODE_BYID,
            payload:undefined
        })
    }
} catch (error) {
        console.log(error);
    }
}
