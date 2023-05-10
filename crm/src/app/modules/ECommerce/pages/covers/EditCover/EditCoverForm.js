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
import { InputLabel } from "@material-ui/core";
import {fetchAllCovers}from '../../../actions/covers/actions'
// Validation schema
const CoverEditSchema = Yup.object().shape({
  productId: Yup.string().required("productId is required"),
  coverCode: Yup.string().nullable(true),
  // parentCover: Yup.mixed(),
  nameEn: Yup.string().required("nameEn is required"),
  nameAr: Yup.string(),
  shortNameEn: Yup.string(),
  shortNameAr: Yup.string(),
  longDescrEn: Yup.string(),
  longDescrAr: Yup.string(),
  from: Yup.mixed().nullable(false),
  to: Yup.mixed().nullable(false),
});
export function CoverEditForm({ cover, btnRef, saveCover ,id}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCovers());
  }, [dispatch]);
  const currentState = useSelector(
    (state) => ({
      product: state.products,
      customers: state.customers,
      covers:state.covers,
    }),
    shallowEqual
  );
  return (
    <div>
      {!currentState.covers.loading && (
        <Formik
          enableReinitialize={true}
          initialValues={cover}
          validationSchema={CoverEditSchema}
          onSubmit={(values) => {
            console.log(values);
            // saveCover(values);
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="coverCode"
                      placeholder="Cover Code"
                      label="Cover code"
                      component={Input}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select name="productId" label="Product" >
                      {currentState.product?.entities.map((productId) => (
                        <option key={productId._id} value={productId._id}>
                          {productId.desc}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select name="parentCover" label="Parent Cover"  customFeedbackLabel={"Chhose product"}>
                    {!id &&  <option >
                      Select Parent Cover
                          </option> }
                      {currentState.covers?.entities.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.nameEn}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Select name="coverType" label="Cover Type">
                    {!id &&  <option value={null}>
                      Select Cover Type
                          </option> }
                      <option value="basic">Basic Cover</option>
                      <option value="additional">Additional Cover</option>
                      <option value="discount">Discount</option>
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
                  <div className="col-lg-8">
                    <label>Long Description</label>
                    <Field name="longDescrEn" component={Input} as="textarea" />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-8">
                    <label>Short Description</label>
                    <Field name="longDescrAr" component={Input} as="textarea" />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <label>Date from</label>
                    <DatePickerField name="from" />
                  </div>
                  <div className="col-lg-4">
                    <label>Date To</label>
                    <DatePickerField name="to" />
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
      )}
    </div>
  );
}
