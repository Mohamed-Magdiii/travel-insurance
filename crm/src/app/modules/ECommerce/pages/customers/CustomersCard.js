import React from 'react'
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import CustomerTable from './customerComponent/CustomerTable';

export  function CustomersCard() {
  const history = useHistory()
  return (
    <Card>
    <CardHeader title="Products List">
      <CardHeaderToolbar>
        <button
          type="button"
          className="btn btn-primary"
          onClick={()=>history.push('/setup/customers/new')}
        >
          Add Customer
        </button>
      </CardHeaderToolbar>
    </CardHeader>
    <CardBody>
      <CustomerTable />
    </CardBody>
  </Card>
  )
}
