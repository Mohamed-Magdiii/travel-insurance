import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { useSubheader } from "../../../../../../_metronic/layout";
import { useDispatch ,shallowEqual, useSelector} from "react-redux";
import { getCustomerById , createNewCustomer,updateCustomer} from "../../../actions/customer/action";
import { CustomerEditForm } from "./EditCustomerForm";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useHistory } from "react-router-dom";

export function CustomerEdit({
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomerById(id));
  }, [dispatch,id]);


  const { actionsLoading, customerForEdit,auth } = useSelector(
    (state) => ({
      actionsLoading: state.customers.loading,
      customerForEdit: state.customers.entity,
      auth:state.auth.user.result._id
    }),
  );
  const initCustomer = {
    customerCode: "",
    nameEn: "",
    nameAr: "",
    customerType: "",
    policyAbbreviation: "",
    parentBorker:"",
    productId: "",
    bookFees: "",
    shortNameEn:"",
    shortNameAr:""
  };
  const history = useHistory();
  const suhbeader = useSubheader();
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const btnRef = useRef();
  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  const backToCustomersList = () => {
    history.push(`/setup/customers`);
  };
  
  const backToProductsList = () => {
    history.push(`/setup/customers`);
  };
  const saveProduct = (values) => {
    if (!id) {
      dispatch(createNewCustomer(values)).then(() => 
      backToProductsList()
      );
    } else {
      dispatch(updateCustomer(values ,id)).then(() => backToProductsList());
    }
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToCustomersList}
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
              Basic
            </a>
          </li>
        </ul>
         <div className="mt-5">
          {tab === "basic" && (
            <CustomerEditForm
              actionsLoading={actionsLoading}
              customer={customerForEdit || initCustomer}
              btnRef={btnRef}
              saveProduct={saveProduct}
            />
          )}
        
        </div> 
      </CardBody>
    </Card>
  );
}
