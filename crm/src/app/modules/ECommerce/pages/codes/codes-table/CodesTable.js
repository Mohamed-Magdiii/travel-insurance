import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import moment from "moment";
import { fetchAllCodes } from "../../../actions/codes/actions";
import {useHistory} from 'react-router-dom'
export  function CodesTable() {
    const history =  useHistory()
    const dispatch = useDispatch();

    const currentState = useSelector(
      (state) => ({ codes: state.codes }),
      shallowEqual
    );
    const handleEdit = (id) => {
      history.push(`/setup/codes/${id}/edit`);
    };
    useEffect(() => {
        dispatch(fetchAllCodes());
      }, [dispatch]);
    const entities = currentState.codes?.entities;
    // Table columns
    const columns = [
      {
        dataField: "_id",
        text: "_id",
        hidden: true,
      },
    //   {
    //     dataField: "coverType",
    //     text: "CoverType",
    //     sort: true,
    //     sortCaret: sortCaret,
    //   },
      {
        dataField: "desc",
        text: "Description",
        sort: true,
        sortCaret: sortCaret,
      },
      {
        dataField: "descAr",
        text: "Arabic Description", 
        sort: true,
        sortCaret: sortCaret,
      },
      {
        dataField: "serialNumber",
        text: "serialNumber",
        sort: true,
        sortCaret: sortCaret,
      },
      {
        dataField: "valueFrom",
        text: "Value From",
        sort: true,
        sortCaret: sortCaret,
      },
      {
        dataField: "valueTo",
        text: "Value To",
        sort: true,
        sortCaret: sortCaret,
      },
      {
        dataField: "productId.desc",
        text: "product",
        sort: true,
      },
  
      {
        dataField: "Actions",
        text: "Actions",
        formatter: (cell, row) => {
          return (
            <OverlayTrigger
              overlay={<Tooltip id="products-edit-tooltip">Edit Cover</Tooltip>}
            >
              <a
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                onClick={() => handleEdit(row._id)}
              >
                <span className="svg-icon svg-icon-md svg-icon-primary">
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Communication/Write.svg"
                    )}
                  />
                </span>
              </a>
            </OverlayTrigger>
          );
        },
      },
    ];
  
  return (
    <>
    {currentState.codes.loading ? (
      "loading"
    ) : (
      <BootstrapTable
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center overflow-hidden"
        bootstrap4
        bordered={true}
        keyField="_id"
        data={currentState.codes.entities.length === 0 ? [] : entities}
        columns={columns}
        // defaultSorted={uiHelpers.defaultSorted}
      >
        <PleaseWaitMessage entities={entities} />
        <NoRecordsFoundMessage entities={entities} />
      </BootstrapTable>
    )}
  </>
  )
}
