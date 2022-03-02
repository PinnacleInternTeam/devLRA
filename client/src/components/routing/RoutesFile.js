import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../layout/NotFound";

//user Section
import PrivateRoute from "./PrivateRoute";
import RouteDriver from "../dashboard/RouteDriver";

//DashBoard
import AllStaffDetails from "../dashboard/AllStaffDetails";
import AddStaffFeedBack from "../dashboard/AddStaffFeedBack";

import AddTenantDetails from "../dashboard/AddTenantDetails";
import TenantSettings from "../dashboard/TenantSettings";
import AddTenantAgreement from "../dashboard/AddTenantAgreement";
import TenantFilters from "../dashboard/TenantFilters";
import TenantReport from "../dashboard/TenantReport";
import ShopDetails from "../dashboard/ShopDetails";
const RoutesFile = () => {
  return (
    <section>
      <Switch>
        <PrivateRoute
          exact
          path="/add-tenant-details"
          component={AddTenantDetails}
        />
        <PrivateRoute exact path="/tenant-report" component={TenantReport} />
        <PrivateRoute exact path="/tenant-setting" component={TenantSettings} />

        <PrivateRoute exact path="/shop-Details" component={ShopDetails} />
        <PrivateRoute
          exact
          path="/add-agreement-details"
          component={AddTenantAgreement}
        />
        <PrivateRoute exact path="/shop-Details" component={ShopDetails} />
        <PrivateRoute exact path="/route-driver" component={RouteDriver} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default RoutesFile;
