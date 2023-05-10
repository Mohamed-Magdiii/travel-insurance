import {GET_USERS,CREATE_USER,GET_USER_BYID,UPDATE_USER,GET_ROLES} from './types'
import axios from 'axios'


export const fetchAllUsers = ()=>async (dispatch) =>{
    try { 
const users = await axios.get(`${process.env.REACT_APP_API_URL}/users`)
        dispatch({
            type:GET_USERS,
            payload:users.data.result
        })
} catch (error) {
        console.log(error);
    }
}


export const createNewUser = (form)=>async (dispatch) =>{
    try { 
const users = await axios.post(`${process.env.REACT_APP_API_URL}/users`,form )
        dispatch({
            type:CREATE_USER,
            payload:users.data.result
        })
} catch (error) {
        console.log(error.message);
    }
}


export const updateUser = (form , id)=>async (dispatch) =>{
    try { 

const user = await axios.patch(`${process.env.REACT_APP_API_URL}/users/${id}`,form )
        dispatch({
            type:UPDATE_USER,
            payload:user.data.result
        })
} catch (error) {
        console.log(error.response);
    }
}


export const getUserById = (id)=>async (dispatch) =>{
    try { 
        if(id){
const user = await axios.get(`${process.env.REACT_APP_API_URL}/users/find/${id}`)
        dispatch({
            type:GET_USER_BYID,
            payload:user.data.result
        })
    }else{
        dispatch({
            type:GET_USER_BYID,
            payload:undefined
        })
    }
} catch (error) {
        console.log(error);
    }
}


export const getRoles = ()=>async (dispatch) =>{
    try { 
const role = await axios.get(`${process.env.REACT_APP_API_URL}/roles`)
        dispatch({
            type:GET_ROLES,
            payload:role.data.result
        })
} catch (error) {
        console.log(error);
    }
}



