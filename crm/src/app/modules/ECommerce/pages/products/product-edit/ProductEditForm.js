// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";

// Validation schema
const ProductEditSchema = Yup.object().shape({
  code: Yup.number()
    .required("code is required"),
});

export function ProductEditForm({ product, btnRef, saveProduct }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={product}
        validationSchema={ProductEditSchema}
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
                    name="code"
                    placeholder="Product Code"
                    label="product code"
                    component={Input}

                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="classCode"
                    placeholder="class code"
                    label="class code"
                    component={Input}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="desc"
                    component={Input}
                    placeholder="Description"
                    label="Description"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="descBl"
                    component={Input}
                    placeholder="Description Bl"
                    label="Description Bl"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="shortDesc"
                    component={Input}
                    placeholder="Description Bl"
                    label="Description Bl"
                    />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="shortDescBl"
                    component={Input}
                    placeholder="shortDescBl"
                    label="shortDescBl"
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
    </>
  );
}
