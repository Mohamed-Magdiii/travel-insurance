import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ProductsUIHelpers";

const CoversUIContext = createContext();

export function useCoversUIContext() {
  return useContext(CoversUIContext);
}

export const CoversUIConsumer = CoversUIContext.Consumer;

export function CoversUIProvider({ coversUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    newcoverButtonClick: coversUIEvents.newCoverButtonClick,
    openEditCoverPage: coversUIEvents.openEditCoverPage,
    openDeleteCoverDialog: coversUIEvents.openDeleteCoverDialog,
    openDeleteCoversDialog: coversUIEvents.openDeleteCoversDialog,
    openFetchCoversDialog: coversUIEvents.openFetchCoversDialog,
    openUpdateCoversStatusDialog:coversUIEvents.openUpdateCoversStatusDialog,
  };

  return (
    <CoversUIContext.Provider value={value}>
      {children}
    </CoversUIContext.Provider>
  );
}
