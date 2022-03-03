import React, { useState, Fragment, useEffect } from "react";
import { editStaffDetails } from "../../actions/tenants";
import DeactiveTenantDetails from "./DeactiveTenantDetails";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllTenants } from "../../actions/tenants";
import { Modal } from "react-bootstrap";

const AllTenantShopDetails = ({
  editStaffDetails,
  auth: { allTenants },
  getAllTenants,
}) => {
  useEffect(() => {
    getAllTenants();
  }, [getAllTenants]);

  const [formData, setFormData] = useState({
    isSubmitted: false,
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const [userData, setUserData] = useState(null);
  const onUpdate = (tenants, idx) => {
    setShowEditModal(true);
    setUserData(tenants);
  };

  return (
    <Fragment>
      <div className="container container_align">
        <section className="sub_reg">
          <div className="col-lg-5 col-md-12 col-sm-12 col-12">
            <h2 className="heading_color">All Tenants Shop Details</h2>
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
                  <th>Firm Name</th>
                  <th>Phone</th>
                  <th>Deposit Amount</th>
                  <th>Rent</th>
                  <th>Lease Start</th>
                  <th>Lease End</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {allTenants &&
                  allTenants.map((tenants, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{tenants.tenantName}</td>
                        <td>{tenants.tenantDoorNo}</td>
                        <td>{tenants.tenantFileNo}</td>
                        <td>{tenants.tenantFirmName}</td>
                        <td>{tenants.tenantPhone}</td>
                        <td>{tenants.tenantDepositAmt}</td>
                        <td>{tenants.tenantRentAmount}</td>
                        <td>{tenants.tenantLeaseStartDate}</td>
                        <td>{tenants.tenantLeaseEndDate}</td>

                        <td>
                          {tenants.tenantstatus &&
                          tenants.tenantstatus !== "Deactive" ? (
                            <button
                              variant="success"
                              className="btn sub_form  "
                              onClick={() => onUpdate(tenants, idx)}
                            >
                              Deactive
                            </button>
                          ) : (
                            <Fragment></Fragment>
                          )}
                        </td>
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
              <h3 className="modal-title text-center">Deactivate Tenant </h3>
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
            <DeactiveTenantDetails
              tenants={userData}
              //loggedStaff={loggedStaff}
              // onEditStaffModalChange={onEditStaffModalChange}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllTenantShopDetails.propTypes = {
  // editStaffDetails: PropTypes.func.isRequired,
  getAllTenants: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  // editStaffDetails,
  getAllTenants,
})(AllTenantShopDetails);
