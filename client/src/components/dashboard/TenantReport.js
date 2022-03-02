import React, { Fragment } from "react";

const TenantReport = () => {
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
                {/* {allTenantDetails &&
                        allTenantDetails[0] &&
                        allTenantDetails.map((, idx) => { */}
                {/* return ( */}
                <tr>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
                {/* ); */}
                {/* })} */}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default TenantReport;
