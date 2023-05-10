/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { ProductEditForm } from "./ProductEditForm";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import {createNewProduct, updateProduct,getProductById} from '../actions/actions'


const initProduct = {
  code:"",
  desc: "",
  descBl: "",
  shortDesc: "",
  shortDescBl: "",
  classCode: "",
 
};

export function ProductEdit({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(getProductById(id));
  }, [dispatch,id]);

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, productForEdit ,auth } = useSelector(
    (state) => ({
      actionsLoading: state.products.actionsLoading,
      productForEdit: state.products.entity,
      auth:state.auth.user.result._id
    }),
    shallowEqual
  );
    

  useEffect(() => {
    let _title = id ? "" : "New Product";
    if (productForEdit ) {
      _title = `Edit product '${productForEdit.code} - ${productForEdit.shortDesc}'`

    }
    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productForEdit, id]);

  const saveProduct = (values) => {
    if (!id) {
      values.userId= auth
      dispatch(createNewProduct(values)).then(() => 
      backToProductsList()
      );
    } else {
      dispatch(updateProduct(values ,id)).then(() => backToProductsList());
    }
  };

  const btnRef = useRef();  
  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
      console.log(btnRef.current.click());
    }
  };

  const backToProductsList = () => {
    history.push(`/setup/products`);
  };
  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToProductsList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
       
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveProductClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("basic")}>
            <a
              className={`nav-link ${tab === "basic" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "basic").toString()}
            >
              Basic info
            </a>
          </li>
       
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <ProductEditForm
              actionsLoading={actionsLoading}
              product={productForEdit || initProduct}
              btnRef={btnRef}
              saveProduct={saveProduct}
            />
          )}
        
        </div>
      </CardBody>
    </Card>
  );
}
