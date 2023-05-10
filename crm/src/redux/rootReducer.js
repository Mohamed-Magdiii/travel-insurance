import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import productRoducer from "../app/modules/ECommerce/pages/products/_redux/products";
import coverRoducer from "../app/modules/ECommerce/_redux/covers/covers";
import usersRoducer from "../app/modules/ECommerce/_redux/users/users";
import customerReducer from "../app/modules/ECommerce/_redux/customers/customer";
import codeReducer from "../app/modules/ECommerce/_redux/codes/codes";
// import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";
// import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
// import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  products: productRoducer,
  covers:coverRoducer,
  users:usersRoducer,
  customers: customerReducer,
  codes: codeReducer,
  product: productsSlice.reducer,
  // remarks: remarksSlice.reducer,
  // specifications: specificationsSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
