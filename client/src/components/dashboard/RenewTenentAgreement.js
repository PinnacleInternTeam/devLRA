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
  // const onSubmit = (tenants, idx) => {
  //   const finalData = {
  //     recordId: tenants ? tenants._id : "",
  //     tenantstatus: "Deactive",
  //     tenantdeactivereason: tenantdeactivereason,
  //   };

  //   deactiveTenantsDetails(finalData);
  //   setShowEditModal(false);
  //   window.location.reload();
  //   // onAbsentModalChange(true);
  //   // setFormData({ ...formData, isSubmitted: true });
  // };

  const onSubmit = () => {
    const finalData = {
      tenantRentAmount: tenants.chargesCal,
      tenantFileNo: tenants.tenantFileNo,
      tenantLeaseStartDate: entryDate,
      tenantLeaseEndDate: newLeaseEndDate,
      tdId: tenants.tdId,
      AgreementStatus: "Active",
    };
    // AddTenantDetailsform(finalData);
    setFormData({ ...formData, isSubmitted: true });
    window.location.reload();
  };

  //   if (isSubmitted) {
  //     return <Redirect to="/all-staff-details" />;
  //   }
  const [entryDate, setEntryDate] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState();
  const [newLeaseEndDate, setNewLeaseEndDate] = useState();
  const onDateChangeEntry = (e) => {
    setEntryDate(e.target.value);
    var newDate = e.target.value;
    var calDate = new Date(newDate);

    var leaseMonth = 11;

    //Calculating lease end date
    var dateData = calDate.getDate();
    calDate.setMonth(calDate.getMonth() + +leaseMonth);
    if (calDate.getDate() != dateData) {
      calDate.setDate(0);
    }
    var dd1 = calDate.getDate();
    var mm2 = calDate.getMonth() + 1;
    var yyyy1 = calDate.getFullYear();
    if (dd1 < 10) {
      dd1 = "0" + dd1;
    }

    if (mm2 < 10) {
      mm2 = "0" + mm2;
    }
    var leaseEndDate = dd1 + "-" + mm2 + "-" + yyyy1;
    setLeaseEndDate(leaseEndDate);
    var newLeaseEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
    setNewLeaseEndDate(newLeaseEndDate);
  };

  return (
    <Fragment>
      <section className="sub_reg">
        <div className="row">
          <div className="col-lg-2 col-md-2 col-sm-4 col-12">
            <label>Door no:</label>
          </div>
          <div className="col-lg-4  col-md-4 col-sm-4 col-12">
            <label>{tenants.tenantDoorNo}</label>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-1 col-12">
            <label> File No:</label>
          </div>
          <div className="col-lg-4  col-md-4 col-sm-4 col-12">
            <label>{tenants.tenantFileNo}</label>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-6 col-md-2 col-sm-4 col-12">
            <label> Rent Amount:</label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="tenantRentAmount"
              className="form-control"
              value={tenants.chargesCal}
              onChange={(e) => onInputChange(e)}
              required
              style={{
                width: "70%",
              }}
            />
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-6 col-md-2 col-sm-4 col-12">
            <label> Lease Start Date:</label>
          </div>

          <div className="col-lg-6 col-md-4 col-sm-4 col-12">
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              dateFormat="dd-MM-yyyy"
              //   min={yesterdayDt}
              //   max={today2}
              className="form-control cpp-input datevalidation"
              name="tenantLeaseStartDate"
              // value={tenants.tenantLeaseEndDate}
              onChange={(e) => onDateChangeEntry(e)}
              style={{
                width: "70%",
              }}
            />
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-6 col-md-2 col-sm-4 col-12">
            <label>Lease End Date:</label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <label>{leaseEndDate}</label>
          </div>
        </div>
        <div className="row py-2">
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
