// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as uiHelpers from "../ProductsUIHelpers";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { useProductsUIContext } from "../ProductsUIContext";

import moment from'moment'

import {fetchAllProducts}from "../actions/actions"
export function ProductsTable() {
  // Products UI Context
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      setIds: productsUIContext.setIds,
      queryParams: productsUIContext.queryParams,
      setQueryParams: productsUIContext.setQueryParams,
      openEditProductPage: productsUIContext.openEditProductPage,
      openDeleteProductDialog: productsUIContext.openDeleteProductDialog,
    };
  }, [productsUIContext]);
  // Products Redux state
  const dispatch = useDispatch();
  const  currentState  = useSelector(
    (state) => ({ products: state.products }),
    shallowEqual
  );
    
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [productsUIProps.queryParams, dispatch]);
  const entities = currentState.products?.entities
   
  // Table columns
  const columns = [
    {
      dataField: "_id",
      text: "_id",
      hidden: true,
    },
    {
      dataField: "code",
      text: "Code",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "desc",
      text: "Description",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "shortDesc",
      text: "Short-desccription",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "userId.username",
      text: "Created By",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "createdAt",
      text: "Created-At",
      sort: true,
      sortCaret: sortCaret,
      formatter: (entities) => moment(entities.createdAt).format("YYYY-MM-DD")
    },
    {
      dataField: "updatedAt",
      text: "updatedAt",
      sort: true,
      sortCaret: sortCaret,
      formatter:(entities) => moment(entities.updatedAt).format("YYYY-MM-DD")
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditProductPage: productsUIProps.openEditProductPage,
        openDeleteProductDialog: productsUIProps.openDeleteProductDialog,
      },
      classes: "text-center pr-0",
      headerClasses: "text-center pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  // const paginationOptions = {
  //   custom: true,
  //   totalSize: currentState.products.count,
  //   sizePerPageList: uiHelpers.sizePerPageList,
  //   sizePerPage: productsUIProps.queryParams.pageSize,
  //   page: productsUIProps.queryParams.pageNumber,
  // };
  return (
    <>
      {currentState.products.loading ? "loading": (
        // <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        // {({ paginationProps, paginationTableProps }) => {
        //   return (
        //     <Pagination
        //       isLoading={currentState.products.loading}
        //       paginationProps={paginationProps}
        //     >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={true}
                
                keyField="_id"
                data={currentState.products.entities.length === 0 ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                // onTableChange={getHandlerTableChange(
                //   productsUIProps.setQueryParams
                // )}
                // selectRow={getSelectRow({
                //   products:currentState.products.entities,
                //   ids: productsUIProps._id,
                //   setIds: productsUIProps.setIds,
                // })}
                // {...paginationTableProps}
              >
                 <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} /> 
              </BootstrapTable>
            // </Pagination>
      //     );
      //   }}
      // </PaginationProvider>
      )}
    </>
  );
}
