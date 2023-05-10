import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ProductsPage } from "./products/ProductsPage";
import { CoversPage } from "./covers/CoversPage";
import { CustomersPage } from "./customers/CustomersPage";
import { CustomerEdit } from "./customers/EditCustomer/CustomerEdit";
import { CoverEdit } from "./covers/EditCover/CoverEdit";
import { ProductEdit } from "./products/product-edit/ProductEdit";
import { UserPage } from "./users/UserPage";
import { UserEdit } from "./users/EditUser/UserEdit";
import { CodeCard } from "./codes/CodeCard";
import { CodeEdit } from "./codes/EditCode/CodeEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function eCommercePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect exact={true} from="/setup" to="/setup/products" />
        }
        {/* <ContentRoute path="/e-commerce/customers" component={CustomersPage} /> */}
        <ContentRoute path="/setup/products/new" component={ProductEdit} />
        <ContentRoute path="/setup/products/:id/edit" component={ProductEdit} />
        <ContentRoute path="/setup/products" component={ProductsPage} />
      
        <ContentRoute path="/setup/covers/:id/edit" component={CoverEdit} />
        <ContentRoute path="/setup/covers/new" component={CoverEdit} />
        <ContentRoute path="/setup/covers" component={CoversPage} />

        <ContentRoute
          path="/setup/customers/:id/edit"
          component={CustomerEdit}
        />
        <ContentRoute path="/setup/customers/new" component={CustomerEdit} />
        <ContentRoute path="/setup/customers" component={CustomersPage} />


        <ContentRoute
          path="/setup/users/:id/edit"
          component={UserEdit}
        />
        <ContentRoute path="/setup/users/new" component={UserEdit} />
        <ContentRoute path="/setup/users" component={UserPage} />

        <ContentRoute
          path="/setup/codes/:id/edit"
          component={CodeEdit}
        />
         <ContentRoute path="/setup/codes/new" component={CodeEdit} />
        <ContentRoute path="/setup/codes" component={CodeCard} />
      </Switch>
    </Suspense>
  );
}
