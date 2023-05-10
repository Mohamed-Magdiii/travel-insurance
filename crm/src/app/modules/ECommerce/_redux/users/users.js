import {
    GET_USERS,CREATE_USER,GET_USER_BYID,UPDATE_USER,
    GET_ROLES
  } from "../../actions/users/types";
  
  const initialState = {
    loading: true,
   entities:[],
   entity:null,
   count:0,
   error:null,
   roles:[]
  };
  
  const coverReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USERS:
        return {
          ...state,
          loading: false,
          entities:action.payload,
          count:action.payload.length,
        };
        case CREATE_USER:
          return {
            ...state,
            loading:false,
            entities:[...state.entities, action.payload],
            count:action.payload.length
          }
            case UPDATE_USER:
            case GET_USER_BYID:
              return {
                ...state,
                loading:false,
                entity:action.payload,
              }
              case GET_ROLES:
                return{
                  ...state,
                  loading:false,
                  roles:action.payload
                }
      default:
        return state;
    }
  };
  
  export default coverReducer;
  