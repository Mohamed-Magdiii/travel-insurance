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
import {fetchAllCodes}from '../../../actions/codes/actions'

const CoverEditSchema = Yup.object().shape({
    desc: Yup.string(),
    productId:Yup.string(),
    coverType:  Yup.string(),
    descAr:  Yup.string(),
    serialNumber:  Yup.string(),
    valueFrom:  Yup.string(),
    valueTo:  Yup.string()
  });
export function EditCodeForm({ code, btnRef, saveCover ,id}) {

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchAllProducts());
      // dispatch(fetchAllCodes());
    }, [dispatch]);
    const currentState = useSelector(
      (state) => ({
        product: state.products,
        codes:state.codes,
      }),
      shallowEqual
    );
  return (
    <>
      {!currentState.codes.loading && (
        <Formik
          enableReinitialize={true}
          initialValues={code}
          validationSchema={CoverEditSchema}
          onSubmit={(values) => {
            saveCover(values);
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="desc"
                      placeholder="Description"
                      label="Desciption"
                      component={Input}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select name="productId" label="Product">
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
                    <Select name="coverType" label="Cover Type">
                      {currentState.codes?.entities.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.desc}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-lg-4">
                  <Field
                      name="serialNumber"
                      placeholder="Serial Number"
                      label="Serial Number"
                      component={Input}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="valueFrom"
                      component={Input}
                      placeholder="Value From"
                      label="nameEn"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="valueTo"
                      component={Input}
                      placeholder="Value To"
                      label="Value To"
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
      )}
    </>
  );
}
