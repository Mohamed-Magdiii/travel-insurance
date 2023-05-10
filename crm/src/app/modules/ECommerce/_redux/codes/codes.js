import {
    GET_CODES,CREATE_CODES,GET_CODE_BYID,UPDATE_CODES
  } from "../../actions/codes/types";

  const initialState = {
    loading: true,
   entities:[],
   entity:null,
   totalCount:0,
   error:null
  };
  
  const codeReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CODES:
        return {
          ...state,
          loading: false,
          entities:action.payload,
          count:action.payload.length,
        };
        case CREATE_CODES:
          return {
            ...state,
            loading:false,
            entities:[...state.entities, action.payload],
            count:action.payload.length
          }
            case UPDATE_CODES:
            case GET_CODE_BYID:
              return {
                ...state,
                loading:false,
                entity:action.payload,
              }

      default:
        return state;
    }
  };
  
  export default codeReducer;
  