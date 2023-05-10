import {
    GET_COVERS,
    CREATE_COVERS,
    UPDATE_COVERS,
    GET_COVER_BYID,
    DELETE_COVERS
  } from "../../actions/covers/types";
  
  const initialState = {
    loading: true,
   entities:[],
   entity:null,
   totalCount:0,
   error:null
  };
  
  const coverReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COVERS:
        return {
          ...state,
          loading: false,
          entities:action.payload,
          count:action.payload.length,
        };
        case CREATE_COVERS:
          return {
            ...state,
            loading:false,
            entities:[...state.entities, action.payload],
            count:action.payload.length
          }
            case UPDATE_COVERS:
            case GET_COVER_BYID:
              return {
                ...state,
                loading:false,
                entity:action.payload,
              }
              case DELETE_COVERS:
                return{
                  ...state,
                  loading:false,
                  entities:state.entities.filter((entity)=> entity._id !== action.payload)
                }
      default:
        return state;
    }
  };
  
  export default coverReducer;
  