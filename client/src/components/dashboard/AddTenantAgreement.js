import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddTenantSettingsform } from "../../actions/staff";
import Select from "react-select";
import { Redirect } from "react-router-dom";
const AddTenantAgreement = ({ user, loggedStaff, AddTenantSettingsform }) => {
  const PaymentMethods = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
  ];

  //formData
  const [formData, setFormData] = useState({
    tenantRentAmount: "",
    tenantLeaseStartDate: "",
    tenantName: "",
    tenantPhone: "",
    tenantFirmName: "",
    tenantAddr: "",
    tenantAdharNo: "",
    tenantPanNo: "",
    tenantDepositAmt: "",
    tenantPaymentMode: "",
    isSubmitted: false,
  });

  const {
    tenantRentAmount,
    tenantLeaseStartDate,
    tenantName,
    tenantPhone,
    tenantFirmName,
    tenantAddr,
    tenantAdharNo,
    tenantPanNo,
    tenantDepositAmt,
    tenantPaymentMode,
    tenantChequenoOrDdno,
    isSubmitted,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showHide, setShowHide] = useState({
    showChequenoSection: false,
  });
  const { showChequenoSection } = showHide;

  const onPaymentModeChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        tenantPaymentMode: e.value,
      });
    }
    if (e.value === "Cheque") {
      setShowHide({
        ...showHide,
        showChequenoSection: true,
      });
    } else {
      setShowHide({
        ...showHide,
        showChequenoSection: false,
      });
    }
  };

  const onSubmit = () => {
    const finalData = {
      tenantRentAmount: tenantRentAmount,
      tenantLeaseStartDate: tenantLeaseStartDate,
      tenantName: tenantName,
      tenantPhone: tenantPhone,
      tenantFirmName: tenantFirmName,
      tenantAddr: tenantAddr,
      tenantAdharNo: tenantAdharNo,
      tenantPanNo: tenantPanNo,
      tenantDepositAmt: tenantDepositAmt,
      tenantPaymentMode: tenantPaymentMode,
      tenantChequenoOrDdno: tenantChequenoOrDdno,
      tenantstatus: "Active",
    };

    AddTenantSettingsform(finalData);
    setFormData({ ...formData, isSubmitted: true });

    //  window.location.reload();
  };
  if (isSubmitted) {
    return <Redirect to="/tenant-add-details" />;
  }
  return (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <h2 className="heading_color">
                Add Tenant Agreement Details for{" "}
              </h2>
            </div>
            <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
              <div className="col-lg-2 col-md-2 col-sm-1 col-12">
                <label> File No :</label>
              </div>

              <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                <input
                  type="text"
                  name="tenantFileNo"
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
                <label>{}</label>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                <label>Door no :</label>
              </div>

              <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                <input
                  type="text"
                  name="tenantDoorNo"
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
            </div>

            <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
              <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                <label> Rent Amount:</label>
              </div>

              <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                <input
                  type="text"
                  name="tenantRentAmount"
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
            </div>

            <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
              <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                <label> Lease Start Date:</label>
              </div>

              <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  dateFormat="dd-MM-yyyy"
                  //   min={yesterdayDt}
                  //   max={today2}
                  className="form-control cpp-input datevalidation"
                  name="tenantLeaseStartDate"
                  //   value={startSelectedDate}
                  //   onChange={(e) => onDateChange(e)}
                  style={{
                    width: "55%",
                  }}
                />
              </div>
              <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                <label>Lease End Date:</label>
              </div>

              <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  dateFormat="dd-MM-yyyy"
                  //   min={yesterdayDt}
                  //   max={today2}
                  className="form-control cpp-input datevalidation"
                  name="selectedDate"
                  //   value={startSelectedDate}
                  //   onChange={(e) => onDateChange(e)}
                  style={{
                    width: "55%",
                  }}
                />
              </div>
            </div>

            <div className="col-lg-8 Savebutton" size="lg">
              <button
                variant="success"
                className="btn sub_form btn_continue Save"
                onClick={() => onSubmit()}
                style={
                  tenantLeaseStartDate !== "" &&
                  tenantName !== "" &&
                  tenantPhone !== "" &&
                  tenantFirmName !== "" &&
                  tenantDepositAmt !== "" &&
                  tenantAdharNo !== "" &&
                  tenantAddr !== "" &&
                  tenantPanNo !== ""
                    ? { opacity: "1" }
                    : { opacity: "1", pointerEvents: "none" }
                }
              >
                Save
              </button>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

AddTenantAgreement.propTypes = {
  auth: PropTypes.object.isRequired,
  AddTenantSettingsform: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  AddTenantSettingsform,
})(AddTenantAgreement);
