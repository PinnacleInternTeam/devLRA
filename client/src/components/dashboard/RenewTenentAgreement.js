import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deactiveTenantsDetails } from "../../actions/tenants";

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
var todayDateymd = yyyy + "-" + mm + "-" + dd;

const RenewTenentAgreement = ({ user, tenants }) => {
  const [error, setError] = useState({
    nextBtnStyle: { opacity: "0.5", pointerEvents: "none" },
    selBtnStyle: { opacity: "0.5", pointerEvents: "none" },
  });
  //console.log(tenants);
  const { nextBtnStyle } = error;

  //formData
  const [formData, setFormData] = useState({
    // sdId: user ? user._id : "",
    // slStaffName: user ? user.sdName : "",
    // slEnteredBy: loggedStaff ? loggedStaff._id : "",
    // slEnteredName: loggedStaff ? loggedStaff.sdName : "",
    // slVal: null,
    // slReason: "",
    isSubmitted: false,
  });

  const { recordId, tenantstatus, tenantdeactivereason, isSubmitted } =
    formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [showEditModal, setShowEditModal] = useState(false);
  const onSubmit = (tenants, idx) => {
    const finalData = {
      recordId: tenants ? tenants._id : "",
      tenantstatus: "Deactive",
      tenantdeactivereason: tenantdeactivereason,
    };
    // console.log(finalData);

    deactiveTenantsDetails(finalData);

    // editStaffDetails(finalData);
    setShowEditModal(false);
    window.location.reload();
    // onAbsentModalChange(true);
    // setFormData({ ...formData, isSubmitted: true });
  };

  //   if (isSubmitted) {
  //     return <Redirect to="/all-staff-details" />;
  //   }

  return (
    <Fragment>
      <section className="sub_reg">
        <div className="row">
          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-3 col-md-2 col-sm-4 col-12">
              <label>Door no :</label>
            </div>
            <div className="col-lg-3  col-md-4 col-sm-4 col-12">
              <label>{tenants.tenantDoorNo}</label>
            </div>
            <div className="col-lg-3 col-md-2 col-sm-1 col-12">
              <label> File No :</label>
            </div>
            <div className="col-lg-3  col-md-4 col-sm-4 col-12">
              <label>{tenants.tenantFileNo}</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label> Rent Amount:</label>
            </div>

            <div className="col-lg-3  col-md-4 col-sm-4 col-12">
              <input
                type="text"
                name="tenantRentAmount"
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-2 col-sm-4 col-12">
            <label> Lease Start Date:</label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              dateFormat="dd-MM-yyyy"
              //   min={yesterdayDt}
              //   max={today2}
              className="form-control cpp-input datevalidation"
              name="tenantLeaseStartDate"
              // value={entryDate}
              // onChange={(e) => onDateChangeEntry(e)}
              style={{
                width: "55%",
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-2 col-sm-4 col-12">
            <label>Lease End Date:</label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <label></label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 Savebutton" size="lg">
            <button
              variant="success"
              className="btn sub_form btn_continue Save"
              onClick={() => onSubmit()}
            >
              Save
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

RenewTenentAgreement.propTypes = {
  auth: PropTypes.object.isRequired,
  deactiveTenantsDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deactiveTenantsDetails,
})(RenewTenentAgreement);
