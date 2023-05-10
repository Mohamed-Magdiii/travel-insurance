import {GET_COVERS,CREATE_COVERS,GET_COVER_BYID,UPDATE_COVERS} from './types'
import axios from 'axios'


export const fetchAllCovers = ()=>async (dispatch) =>{
    try { 
const covers = await axios.get(`${process.env.REACT_APP_API_URL}/cover`)
console.log(covers);
        dispatch({
            type:GET_COVERS,
            payload:covers.data.result
        })
} catch (error) {
        console.log(error);
    }
}


export const createNewCover = (form)=>async (dispatch) =>{
    try { 
const covers = await axios.post(`${process.env.REACT_APP_API_URL}/cover`,form )
        dispatch({
            type:CREATE_COVERS,
            payload:covers.data.result
        })
} catch (error) {
        console.log(error.message);
    }
}


export const updateCover = (form , id)=>async (dispatch) =>{
    try { 
        console.log(form);

const cover = await axios.patch(`${process.env.REACT_APP_API_URL}/cover/${id}`,form )
        dispatch({
            type:UPDATE_COVERS,
            payload:cover.data.result
        })
        console.log(cover);
} catch (error) {
        console.log(error.response);
    }
}


export const getCoverById = (id)=>async (dispatch) =>{
    try { 
        if(id){
const cover = await axios.get(`${process.env.REACT_APP_API_URL}/cover/find/${id}`)
        dispatch({
            type:GET_COVER_BYID,
            payload:cover.data.result
        })
    }else {
        dispatch({
            type:GET_COVER_BYID,
            payload:undefined
        })
    }
} catch (error) {
        console.log(error);
    }
}
