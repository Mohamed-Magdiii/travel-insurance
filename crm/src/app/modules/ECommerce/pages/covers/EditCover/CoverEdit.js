import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import {CoverEditForm} from './EditCoverForm'
import { useDispatch , useSelector} from "react-redux";
import { getCoverById} from "../../../actions/covers/actions";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useHistory } from "react-router-dom";
import {createNewCover,updateCover} from "../../../actions/covers/actions"

export function CoverEdit({
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(getCoverById(id));
  }, [dispatch,id]);


  const { actionsLoading, coverForEdit,auth } = useSelector(
    (state) => ({
      actionsLoading: state.covers.loading,
      coverForEdit: state.covers.entity,   
    }),
  );
  const initCover = {
    productId: "",
    parentCover: null,
    coverCode: "",
    coverType: "",
    nameEn: "",
    nameAr: "",
    shortNameEn: "",
    shortNameAr: "",
    longDescrEn: "",
    longDescrAr: "",
    from: "",
    to: "",
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
    history.push(`/setup/covers`);
  };
  
  const backToProductsList = () => {
    history.push(`/setup/covers`);
  };
  const saveCover = (values) => {
    if (!id) {
      dispatch(createNewCover(values)).then(() => 
      backToProductsList()
      );
    } else {
      dispatch(updateCover(values ,id)).then(() => backToProductsList());
    }
  };
  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title="Covers">
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
            <CoverEditForm
              actionsLoading={actionsLoading}
              cover={coverForEdit || initCover}
              btnRef={btnRef}
              saveCover={saveCover}
              id={id}
            />
          )}
        
        </div> 
      </CardBody>
    </Card>
  );
}
