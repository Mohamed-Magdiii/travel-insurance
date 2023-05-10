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
import moment from "moment";
import { handleEdit } from "../../../utils/handleFunction";
import { fetchAllUsers } from "../../../actions/users/actions";
import SVG from "react-inlinesvg";
import {useHistory} from 'react-router-dom'


export function UsersTable() {
  const history = useHistory()
  const defaultSorted = [{ dataField: "id", order: "asc" }];
  const dispatch = useDispatch();
  const currentState = useSelector(
    (state) => ({ users: state.users }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  const entities = currentState.users?.entities;

  const columns = [
    {
      dataField: "_id",
      text: "_id",
      hidden: true,
    },
    {
      dataField: "username",
      text: "Username",
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
      dataField: "nameAr",
      text: "nameAr",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "isActive",
      text: "isFreeze",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "roleId.key",
      text: "Role",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "customerId.nameEn",
      text: "customer",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "issuing",
      text: "issuing",
      sort: true,
      sortCaret: sortCaret,
      
    },
    {
      dataField: "productId.desc",
      text: "product",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "from",
      text: "DateFrom",
      sort: true,
      sortCaret: sortCaret,
      formatter: (entities) => moment(entities).format("YYYY-MM-DD"),
    },
    {
      dataField: "to",
      text: "DateTo",
      sort: true,
      sortCaret: sortCaret,
      formatter: (entities) => moment(entities).format("YYYY-MM-DD"),
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
              onClick={() => handleEdit(row._id, "users", history)}
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
      {currentState.users.loading ? (
        "loading"
      ) : (
        <BootstrapTable
          wrapperClasses="table-responsive"
          classes="table table-head-custom table-vertical-center overflow-hidden"
          bootstrap4
          bordered={true}
          keyField="_id"
          data={currentState.users.entities.length === 0 ? [] : entities}
          columns={columns}
          defaultSorted={defaultSorted}
        >
          <PleaseWaitMessage entities={entities} />
          <NoRecordsFoundMessage entities={entities} />
        </BootstrapTable>
      )}
    </>
  );
}
