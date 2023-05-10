import React, { useEffect } from "react";
import { fetchAllCustomers } from "../../../actions/customer/action";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as uiHelpers from "../CustomersUIHelpers";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import BootstrapTable from "react-bootstrap-table-next";
import {useHistory} from 'react-router-dom'
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";

function CustomerTable() {
  // const customersUIContext = useCustomerUIContext();
  const dispatch = useDispatch();

  const currentState = useSelector(
    (state) => ({ customers: state.customers }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]);
  const entities = currentState.customers?.entities;
 const history = useHistory()
 const handleEdit = (id)=>{
 
  history.push(`/setup/customers/${id}/edit`)
}
  const columns = [
    {
      dataField: "_id",
      text: "_id",
      hidden: true,
    },
    {
      dataField: "customerCode",
      text: "customerCode",
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
      dataField: "customerType",
      text: "customerType",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "policyAbbreviation",
      text: "policy Abbreviation",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "productId.desc",
      text: "Product",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "bookFees",
      text: "bookFees",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "Actions",
      text: "Actions",
      formatter: (cell,row) => {
          return   <OverlayTrigger
          overlay={<Tooltip id="products-edit-tooltip">Edit Customer</Tooltip>}
        >
          <a
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
            onClick={() => handleEdit(row._id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
              />
            </span>
          </a>
        </OverlayTrigger>
    
      },
  },

    // {
    //   dataField: "action",
    //   text: "Actions",
    //   formatter: columnFormatters.ActionsColumnFormatter,
    //   formatExtraData: {
    //     openEditProductPage: customersUIContext.openEditProductPage,
    //     // openDeleteProductDialog: productsUIProps.openDeleteProductDialog,
    //   },
    //   classes: "text-center pr-0",
    //   headerClasses: "text-center pr-3",
    //   style: {
    //     minWidth: "100px",
    //   },
    // },
  ];

  return (
    <>
      {currentState.customers.loading ? (
        "loading"
      ) : (
        <BootstrapTable
          wrapperClasses="table-responsive"
          classes="table table-head-custom table-vertical-center overflow-hidden"
          bootstrap4
          bordered={true}
          keyField="_id"
          data={currentState.customers.entities.length === 0 ? [] : entities}
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

export default CustomerTable;
