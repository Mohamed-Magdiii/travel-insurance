import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import {UsersTable}from './users-table/UsersTable'
import {handleAdd} from '../../utils/handleFunction'
import {useHistory} from 'react-router-dom'
export function UserCard() {
  const history = useHistory()
  return (
    <Card>
      <CardHeader title="List User">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleAdd("users" ,history)}
          >
            Add User
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
        <UsersTable/>
      </CardBody>
    </Card>
  );
}
