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

const DeactiveTenantDetails = ({
  user,
  tenants,
  // loggedStaff,
  //onAbsentModalChange,
  editStaffDetails,
}) => {
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
      <div className="col-lg-12 col-md-9 col-sm-9 col-12 py-3">
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-12 col-md-4 col-sm-4 col-12">
            <label>Reason For Deactivation:</label>
          </div>
          <div className="col-lg-12  col-md-4 col-sm-4 col-12">
            <textarea
              name="tenantdeactivereason"
              id="tenantdeactivereason"
              className="textarea form-control"
              rows="3"
              placeholder="Deactive Reason"
              onChange={(e) => onInputChange(e)}
              style={{ width: "100%" }}
              required
            ></textarea>
          </div>
        </div>
        <div className="row col-lg-12 col-md-4 col-sm-4 col-12 ">
          <label>Are You Sure You Want to Deactivate??</label>
        </div>

        <div
          className="col-lg-12 col-md-9 col-sm-9 col-12 Savebutton"
          size="lg"
        >
          <button
            variant="success"
            className="btn sub_form btn_continue Save float-right "
            style={
              tenantdeactivereason !== ""
                ? { opacity: "1" }
                : { opacity: "1", pointerEvents: "none" }
            }
            onClick={() => onSubmit(tenants)}
          >
            Save
          </button>
        </div>
      </div>
    </Fragment>
  );
};

DeactiveTenantDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  deactiveTenantsDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deactiveTenantsDetails,
})(DeactiveTenantDetails);
