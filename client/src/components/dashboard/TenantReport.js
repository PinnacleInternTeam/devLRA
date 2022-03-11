import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTenantReportYearMonth } from "../../actions/tenants";
import { Modal } from "react-bootstrap";
import RenewTenentAgreement from "./RenewTenentAgreement";

const TenantReport = ({ auth: { expReport }, getTenantReportYearMonth }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const [userData, setUserData] = useState(null);
  const onRenewal = (tenants, idx) => {
    setShowEditModal(true);
    setUserData(tenants);
  };
 
  return (
    <Fragment>
      <div className="container container_align">
        <section className="sub_reg">
          <div className="col-lg-5 col-md-12 col-sm-12 col-12">
            <h2 className="heading_color">Tenant Reports  </h2>
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
                  <th>Stamp Duty</th>
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
                        <td>{expReportVal.chargesCal.toFixed(2)}</td>
                        <td>{expReportVal.stampDuty.toFixed(2)}</td>
                        {expReportVal.AgreementStatus === "Expired" ? (
                          <td>
                            <button
                              variant="success"
                              className="btn sub_form"
                              onClick={() => onRenewal(expReportVal, idx)}
                            >
                              Renewal
                            </button>
                          </td>
                        ) : (
                          <td></td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
        <Modal
          show={showEditModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h4
                className="modal-title text-center"
                style={{ fontWeight: "bold" }}
              >
                Renewal Tenant Agreement
              </h4>
            </div>
            <div className="col-lg-2">
              <button onClick={handleEditModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <RenewTenentAgreement tenants={userData} />
          </Modal.Body>
        </Modal>
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
