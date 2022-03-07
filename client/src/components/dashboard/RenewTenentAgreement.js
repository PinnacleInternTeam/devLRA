import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { RenewTenantDetailsform } from "../../actions/tenants";

const RenewTenentAgreement = ({ user, tenants, RenewTenantDetailsform }) => {
  const [error, setError] = useState({
    nextBtnStyle: { opacity: "0.5", pointerEvents: "none" },
    selBtnStyle: { opacity: "0.5", pointerEvents: "none" },
  });
  const { nextBtnStyle } = error;

  //formData
  const [formData, setFormData] = useState({
    isSubmitted: false,
  });

  const { recordId, tenantstatus, tenantdeactivereason, isSubmitted } =
    formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [showEditModal, setShowEditModal] = useState(false);

  const onSubmit = () => {
    const finalData = {
      tenantRentAmount: tenants.chargesCal,
      tenantFileNo: tenants.tenantFileNo,
      tenantLeaseStartDate: entryDate,
      tenantLeaseEndDate: newLeaseEndDate,
      tdId: tenants.tdId,
      AgreementStatus: "Active",
      agreementId: tenants.agreementId,
    };
    console.log(finalData);
    RenewTenantDetailsform(finalData);
    setFormData({ ...formData, isSubmitted: true });
    window.location.reload();
  };
  const [entryDate, setEntryDate] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState("");
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

  // if (isSubmitted) {
  //   return <Redirect to="/all-staff-details" />;
  // }
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
              style={
                leaseEndDate !== ""
                  ? { opacity: "1" }
                  : { opacity: "1", pointerEvents: "none" }
              }
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
  RenewTenantDetailsform: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  RenewTenantDetailsform,
})(RenewTenentAgreement);
