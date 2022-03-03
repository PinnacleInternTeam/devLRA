import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTenantReportYearMonth } from "../../actions/tenants";

const TenantReport = ({ auth: { expReport }, getTenantReportYearMonth }) => {
  console.log(expReport);
  return (
    <Fragment>
      <div className="container container_align">
        <section className="body">
          <div className="col-lg-5 col-md-12 col-sm-12 col-12">
            <h2 className="heading_color">Tenant Reports for{} </h2>
          </div>
          <div className="body-inner no-padding  table-responsive fixTableHead">
            <table
              className="table table-bordered table-striped table-hover"
              id="datatable2"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Door No</th>
                  <th>File No</th>
                  <th>Expiry Date</th>
                  <th>Charges</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {expReport &&
                  expReport[0] &&
                  expReport.map((expReportVal, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{expReportVal.tenantName}</td>
                        <td>{expReportVal.tenantDoorNo}</td>
                        <td>{expReportVal.tenantFileNo}</td>
                        <td>{expReportVal.tenantLeaseEndDate}</td>
                        <td>{}</td>
                        <td>{}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

// export default TenantReport;

TenantReport.propTypes = {
  auth: PropTypes.object.isRequired,
  getTenantReportYearMonth: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getTenantReportYearMonth })(
  TenantReport
);
