import React, { useEffect } from "react";
import {
  DatePickerField,
  Input,
  Select,
} from "../../../../../../_metronic/_partials/controls";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../products/actions/actions";
// import { InputLabel } from "@material-ui/core";
import { fetchAllCustomers } from "../../../actions/customer/action";
import { getRoles } from "../../../actions/users/actions";

// Validation schema
const CustomerEditSchema = Yup.object().shape({
  
  username: Yup.string().required("username is required"),
  nameEn: Yup.string().required("nameEn is required"),
  nameAr: Yup.string().required("nameAr is required"),
  productId: Yup.string().required("Product is required"),
  from: Yup.mixed()
    .nullable(false)
    .required("From is required"),
  to: Yup.mixed()
    .nullable(false)
    .required("To is required"),
  isActive: Yup.boolean(),
  incentive: Yup.string(),
  incentiveAmount: Yup.string(),
});
export function UserEditForm({ users, btnRef, saveProduct }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCustomers());
    dispatch(getRoles());
  }, [dispatch]);
  const currentState = useSelector(
    (state) => ({
      product: state.products,
      customers: state.customers,
      users:state.users,
    }),
    shallowEqual
  );
  return (
    <div>
      {!currentState.customers.loading && (
        <Formik
        enableReinitialize={true}
        initialValues={users}
        validationSchema={CustomerEditSchema}
        onSubmit={(values) => {
          saveProduct(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="username"
                    placeholder="username"
                    label="username"
                    component={Input}
                  />
                </div>
                <div className="col-lg-4">
                  <Select name="productId" label="Product">
                  <option value={users?.productId?._id}>{users?.productId?.desc}</option>
                    {currentState.product?.entities.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.desc}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Select name="customerId" label="Customer">
                  <option value={ users?.customerId?._id}> 
                  {users?.customerId.nameEn}
                  </option>
                    {currentState.customers?.entities.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.nameEn}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-4">
                  <Field 
                   name="password"
                   component={Input}
                   placeholder="password"
                   label="password"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="nameEn"
                    component={Input}
                    placeholder="nameEn"
                    label="nameEn"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="nameAr"
                    component={Input}
                    placeholder="nameAr"
                    label="nameAr"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="email"
                    component={Input}
                    placeholder="email"
                    label="email"
                  />
                </div>
                <div className="col-lg-4">
                <Select name="roleId" label="Roles">
                  <option value={users.roleId?._id}>{users.roleId?.key}</option>
                    {currentState.users?.roles.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.key}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                <label>Date From</label>
                <DatePickerField
                      name="from"
                      format='dd-mm-yyyy' 
                    />
                </div>
                <div className="col-lg-4">
                    <label>Date To</label>
                <DatePickerField
                      name="to"
                      format='dd-mm-yyyy' 
                    />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="incentive"
                    component={Input}
                    placeholder="incentive"
                    label="incentive"
                  />
                  
                </div>
                <div className="col-lg-4">
                <Field
                    name="incentiveAmount"
                    component={Input}
                    placeholder="incentiveAmount"
                    label="incentiveAmount"
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
      ) }
      
    </div>
  );
}
