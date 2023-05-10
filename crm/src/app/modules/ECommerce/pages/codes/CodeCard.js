import React from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
  } from "../../../../../_metronic/_partials/controls";
  import {useHistory} from 'react-router-dom'
  import {CodesTable} from './codes-table/CodesTable'
export  function CodeCard() {
    const history = useHistory()
  return (
    <Card>
    <CardHeader title="Codes list">
      <CardHeaderToolbar>
        <button
          type="button"
          className="btn btn-primary"
          onClick={()=>history.push('/setup/codes/new')}
        >
          Add Code
        </button>
      </CardHeaderToolbar>
    </CardHeader>
    <CardBody>
      <CodesTable />
    </CardBody>
  </Card>
  )

}
