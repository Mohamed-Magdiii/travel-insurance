import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CoversTable } from "./covers-table/CoversTable";
import {useHistory} from 'react-router-dom'
export function CoversCard() {
const history = useHistory()
  return (
    <Card>
      <CardHeader title="Covers list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={()=>history.push('/setup/covers/new')}
          >
            Add Cover
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <ProductsFilter /> */}
        {/* {coversUIProps.ids.length > 0 && (
          <>
            <ProductsGrouping />
          </>
        )} */}
        <CoversTable />
      </CardBody>
    </Card>
  );
}
