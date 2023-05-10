import React, { createContext, useContext } from "react";
// import { isEqual, isFunction } from "lodash";

const CustomersUIContext = createContext();

export function useCustomerUIContext() {
  return useContext(CustomersUIContext);
}

export const CustomerUIConsumer = CustomersUIContext.Consumer;

export function CustomersUIProvider({ customersUIEvents, children }) {
  // const [queryParams, setQueryParamsBase] = useState(initialFilter);
//   const [ids, setIds] = useState([]);
  // const setQueryParams = useCallback((nextQueryParams) => {
  //   setQueryParamsBase((prevQueryParams) => {
  //     if (isFunction(nextQueryParams)) {
  //       nextQueryParams = nextQueryParams(prevQueryParams);
  //     }

  //     if (isEqual(prevQueryParams, nextQueryParams)) {
  //       return prevQueryParams;
  //     }

  //     return nextQueryParams;
  //   });
  // }, []);
  const value = {
    // queryParams,
    // setQueryParamsBase,
    // ids,
    // setIds,
    // setQueryParams,
    newProductButtonClick: customersUIEvents.newProductButtonClick,
    openEditProductPage: customersUIEvents.openEditProductPage,
    
  };

  return (
    <CustomersUIContext.Provider value={value}>
      {children}
    </CustomersUIContext.Provider>
  );
}
