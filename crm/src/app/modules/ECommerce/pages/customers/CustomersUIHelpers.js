// export const CustomerStatusCssClasses = ["success", "info", ""];
// export const CustomerStatusTitles = ["Selling", "Sold"];
// export const CustomerConditionCssClasses = ["success", "danger", ""];
// export const CustomerConditionTitles = ["New", "Used"];
export const defaultSorted = [{ dataField: "customerCode", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    Code: "",
  },
  sortOrder: "asc", // asc||desc
  sortField: "customerCode",

};
