import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { useSubheader } from "../../../../../../_metronic/layout";
import { useDispatch ,shallowEqual, useSelector} from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useHistory } from "react-router-dom";
import { createNewUser, getUserById, updateUser } from "../../../actions/users/actions";
import { UserEditForm } from "./UserEditForm";
import moment from "moment";

export function UserEdit({
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(getUserById(id));
  }, [dispatch,id]);


  const { actionsLoading, userForEdit,auth } = useSelector(
    (state) => ({
      actionsLoading: state.users.loading,
      userForEdit: state.users.entity,
      auth:state.auth.user.result._id
    }),
  );
  const initUser = {
    customerId: "",
    nameEn: "",
    nameAr: "",
    username: "",
    email: "",
    password:"",
    product: "",
    incentive: "",
    incentiveAmount:"",
    product:"",
    from:"",
    to:"",
    roleId:""
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
    history.push(`/setup/users`);
  };
  
  const backToProductsList = () => {
    history.push(`/setup/users`);
  };
  const saveProduct = (values) => {
    if (!id) {
      dispatch(createNewUser(values)).then(() => 
      backToProductsList()
      );
    } else {
      dispatch(updateUser(values ,id)).then(() => backToProductsList());
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
            <UserEditForm
              actionsLoading={actionsLoading}
              users={userForEdit || initUser}
              btnRef={btnRef}
              saveProduct={saveProduct}
            />
          )}
        
        </div> 
      </CardBody>
    </Card>
  );
}
