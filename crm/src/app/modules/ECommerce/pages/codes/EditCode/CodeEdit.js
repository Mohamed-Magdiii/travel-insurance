import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import {EditCodeForm} from './EditCodeForm'
import { useDispatch , useSelector} from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useHistory } from "react-router-dom";
import {createNewCode, updateCode ,getCodeById} from "../../../actions/codes/actions"
import {useParams} from 'react-router-dom'
export  function CodeEdit({
  //   match: {
  //   params: { id },
  // },
}) {
  const {id} = useParams()
  const dispatch = useDispatch();

  const { actionsLoading, codeForEdit} = useSelector(
    (state) => ({
      actionsLoading: state.codes.loading,
      codeForEdit: state.codes.entity,   
    }),
  );
  useEffect(() => {
     dispatch(getCodeById(id)) 
  }, [id, dispatch]);


 console.log(codeForEdit);
  const initCode = {
    productId: "",
    coverType: "",
    desc: "",
    descAr: "",
    serialNumber: "",
    valueFrom: "",
    valueTo: ""
  };
  const history = useHistory();
  const [tab, setTab] = useState("basic");
  const btnRef = useRef();
  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  const backToCustomersList = () => {
    history.push(`/setup/codes`);
  };
  
  const backToProductsList = () => {
    history.push(`/setup/codes`);
  };
  const saveCover = (values) => {
    if (!id) {
      dispatch(createNewCode(values)).then(() => 
      backToProductsList()
      );
    } else {
      dispatch(updateCode(values ,id)).then(() => backToProductsList());
    }
  };

  return (
    <Card>
    {actionsLoading && <ModalProgressBar />}
    <CardHeader title="Codes">
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
          <EditCodeForm
            actionsLoading={actionsLoading}
            code={codeForEdit || initCode}
            btnRef={btnRef}
            saveCover={saveCover}
            id={id}
          />
        )}
      </div> 
    </CardBody>
  </Card>
  )
}
