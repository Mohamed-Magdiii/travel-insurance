import {
  GE_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCT_BYID,
  DELETE_PRODUCT
} from "../actions/types";

const initialState = {
  loading: true,
 entities:[],
 entity:undefined,
 totalCount:0,
 error:null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GE_PRODUCTS:
      return {
        ...state,
        loading: false,
        entities:action.payload,
        count:action.payload.length,
        entity:undefined
      };
      case CREATE_PRODUCT:
        return {
          ...state,
          loading:false,
          entities:[...state.entities, action.payload],
          count:action.payload.length
        }
          case UPDATE_PRODUCT:
          case GET_PRODUCT_BYID:
            return {
              ...state,
              loading:false,
              entity:action.payload,
            }
            case DELETE_PRODUCT:
              return{
                ...state,
                loading:false,
                entities:state.entities.filter((entity)=> entity._id !== action.payload)
              }
    default:
      return state;
  }
};

export default productReducer;
