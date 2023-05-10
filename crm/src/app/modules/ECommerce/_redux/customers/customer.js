import {CREATE_CUSTOMER,
    UPDATE_CUSTOMER,
    GET_CUSTOMERS,
    GET_CUSTOMER_BYID,
    DELETE_CUSTOMER} from '../../actions/customer/types'
  
  const initialState = {
    loading: true,
   entities:[],
   entity:undefined,
   totalCount:0,
   error:null
  };
  
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CUSTOMERS:
        return {
          ...state,
          loading: false,
          entities:action.payload,
          totalCount:action.payload.length,
        };
        case CREATE_CUSTOMER:
          return {
            ...state,
            loading:false,
            entities:[...state.entities, action.payload],
            totalCount:action.payload.length
          }
            case UPDATE_CUSTOMER:
            case GET_CUSTOMER_BYID:
              return {
                ...state,
                loading:false,
                entity:action.payload,
              }
              case DELETE_CUSTOMER:
                return{
                  ...state,
                  loading:false,
                  entities:state.entities.filter((entity)=> entity._id !== action.payload)
                }
      default:
        return state;
    }
  };
  
  export default customerReducer;
  