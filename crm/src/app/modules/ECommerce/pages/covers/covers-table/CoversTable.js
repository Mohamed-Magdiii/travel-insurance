import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as uiHelpers from "../ProductsUIHelpers";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import { useCoversUIContext } from "../CoversUIContext";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import moment from "moment";
import { fetchAllCovers } from "../../../actions/covers/actions";
import {useHistory} from 'react-router-dom'
export function CoversTable() {
  const history =  useHistory()
  // Products UI Context
  const coversUIContext = useCoversUIContext();
  const coversUIProps = useMemo(() => {
    return {
      ids: coversUIContext.ids,
      setIds: coversUIContext.setIds,
      queryParams: coversUIContext.queryParams,
      setQueryParams: coversUIContext.setQueryParams,
      openEditCoverPage: coversUIContext.openEditCoverPage,
      openDeleteCoverDialog: coversUIContext.openDeleteCoverDialog,
    };
  }, [coversUIContext]);
  // Products Redux state
  const dispatch = useDispatch();
  const currentState = useSelector(
    (state) => ({ covers: state.covers }),
    shallowEqual
  );
  const handleEdit = (id) => {
    history.push(`/setup/covers/${id}/edit`);
  };
  useEffect(() => {
    dispatch(fetchAllCovers());
  }, [coversUIProps.queryParams, dispatch]);
  const entities = currentState.covers?.entities;

  // Table columns
  const columns = [
    {
      dataField: "_id",
      text: "_id",
      hidden: true,
    },
    {
      dataField: "coverType",
      text: "CoverType",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "coverCode",
      text: "coverCode",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "nameEn",
      text: "nameEn",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "createdAt",
      text: "Created-At",
      sort: true,
      sortCaret: sortCaret,
      formatter: (entities) => moment(entities.createdAt).format("YYYY-MM-DD"),
    },
    {
      dataField: "updatedAt",
      text: "updatedAt",
      sort: true,
      sortCaret: sortCaret,
      formatter: (entities) => moment(entities.updatedAt).format("YYYY-MM-DD"),
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
      {currentState.covers.loading ? (
        "loading"
      ) : (
        <BootstrapTable
          wrapperClasses="table-responsive"
          classes="table table-head-custom table-vertical-center overflow-hidden"
          bootstrap4
          bordered={true}
          keyField="_id"
          data={currentState.covers.entities.length === 0 ? [] : entities}
          columns={columns}
          defaultSorted={uiHelpers.defaultSorted}
        >
          <PleaseWaitMessage entities={entities} />
          <NoRecordsFoundMessage entities={entities} />
        </BootstrapTable>
      )}
    </>
  );
}
