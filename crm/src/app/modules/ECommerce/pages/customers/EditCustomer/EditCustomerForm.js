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

// Validation schema
const CustomerEditSchema = Yup.object().shape({
  customerCode: Yup.string().required("customerCode is required"),
  nameEn: Yup.string().required("nameEn is required"),
  nameAr: Yup.string().required("nameAr is required"),
  productId: Yup.string().required("Product is required"),
  customerType: Yup.string().required("code is required"),
  shortNameEn: Yup.string().required("shortNameEn is required"),
  shortNameAr: Yup.string().required("shortNameAr is required"),
   from: Yup.mixed()
    .nullable(false)
    .required("From is required"),
  to: Yup.mixed()
  .nullable(false)
  .required("To is required"),
});
export function CustomerEditForm({ customer, btnRef, saveProduct }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCustomers());
  }, [dispatch]);
  const currentState = useSelector(
    (state) => ({
      product: state.products,
      customers: state.customers,
    }),
    shallowEqual
  );
  return (
    <div>
      {!currentState.customers.loading && (
        <Formik
        enableReinitialize={true}
        initialValues={customer}
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
                    name="customerCode"
                    placeholder="Customer Code"
                    label="Customer code"
                    component={Input}
                  />
                </div>
                <div className="col-lg-4">
                  <Select name="productId" label="Product">
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
                  <Select name="parentBroker" label="Parent Broker">
                    {currentState.customers?.entities.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.nameEn}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-4">
                  <Select name="customerType" label="Customer Type">
                    <option value="Broker">Broker</option>
                    <option value="Customer">Customer</option>
                    <option value="Treay">Treay</option>
                  </Select>
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
                    name="shortNameEn"
                    component={Input}
                    placeholder="shortNameEn"
                    label="shortNameEn"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="shortNameAr"
                    component={Input}
                    placeholder="short NameAr"
                    label="short NameAr"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                <DatePickerField
                      name="from"
                      label="Date From"
                    />
                </div>
                <div className="col-lg-4">
                <DatePickerField
                      name="to"
                      label="Date To"
                    />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="bookFees"
                    component={Input}
                    placeholder="bookFees"
                    label="bookFees"
                  />
                </div>
                <div className="col-lg-4">
                <Select name="policyAbbreviation" label="policyAbbreviation">
                    <option value="GSAV">GSAV</option>
                    <option value="OTIC">OTIC</option>
                  </Select>
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
