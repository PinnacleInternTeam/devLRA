import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { AddTenantDetailsform } from "../../actions/staff";
import Select from "react-select";
import { Redirect } from "react-router-dom";
const AddTenantDetails = ({ user, loggedStaff, AddTenantDetailsform }) => {
  const PaymentMethods = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
  ];

  //formData
  const [formData, setFormData] = useState({
    tenantFileNo: "",
    tenantDoorNo: "",
    tenantName: "",
    tenantPhone: "",
    tenantFirmName: "",
    tenantAddr: "",
    tenantAdharNo: "",
    tenantPanNo: "",
    tenantDepositAmt: "",
    tenantPaymentMode: "",
    tenantBankName: "",
    isSubmitted: false,
  });

  const {
    tenantFileNo,
    tenantDoorNo,
    tenantName,
    tenantPhone,
    tenantFirmName,
    tenantAddr,
    tenantAdharNo,
    tenantPanNo,
    tenantDepositAmt,
    tenantPaymentMode,
    tenantChequenoOrDdno,
    tenantBankName,
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
      tenantFileNo: tenantFileNo,
      tenantDoorNo: tenantDoorNo,
      tenantName: tenantName,
      tenantPhone: tenantPhone,
      tenantFirmName: tenantFirmName,
      tenantAddr: tenantAddr,
      tenantAdharNo: tenantAdharNo,
      tenantPanNo: tenantPanNo,
      tenantDepositAmt: tenantDepositAmt,
      tenantPaymentMode: tenantPaymentMode,
      tenantChequenoOrDdno: tenantChequenoOrDdno,
      tenantBankName: tenantBankName,
      tenantstatus: "Active",
    };

    //  AddTenantDetailsform(finalData);
    setFormData({ ...formData, isSubmitted: true });
  };
  if (isSubmitted) {
    return <Redirect to="/add-agreement-details" />;
  }
  return (
    <Fragment>
      <div className="container">
        <div className="col-lg-5 col-md-12 col-sm-12 col-12">
          <h2 className="heading_color">Add Tenant Details </h2>
        </div>
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-1 col-md-2 col-sm-1 col-12">
            <label> File No :</label>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="tenantFileNo"
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-lg-1 col-md-2 col-sm-4 col-12">
            <label>DoorNo:</label>
          </div>

          <div className="col-lg-2  col-md-4 col-sm-4 col-12">
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
            <label>Tenant Name:</label>
          </div>

          <div className="col-lg-4  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="tenantName"
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-4 col-12">
            <label>Phone no :</label>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="tenantPhone"
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
        </div>

        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-2 col-md-2 col-sm-4 col-12">
            <label> Firm Name :</label>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="tenantFirmName"
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>

          <div className="col-lg-2 col-md-2 col-sm-4 col-12">
            <label>Tenant's Address :</label>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <textarea
              name="tenantAddr"
              id="tenantAddr"
              className="textarea form-control"
              rows="3"
              placeholder="Address"
              onChange={(e) => onInputChange(e)}
              style={{ width: "100%" }}
              required
            ></textarea>
          </div>
        </div>

        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-2 col-md-2 col-sm-4 col-12">
            <label>Adhar No :</label>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="tenantAdharNo"
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-4 col-12">
            <label>Pancard No :</label>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="tenantPanNo"
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
        </div>
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-2 col-md-2 col-sm-4 col-12">
            <label>Deposit Amount :</label>
          </div>

          <div className="col-lg-2  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="tenantDepositAmt"
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>

          <div className="col-lg-2 col-md-2 col-sm-4 col-12">
            <label>Mode Of Payment :</label>
          </div>

          <div className="col-lg-2  col-md-4 col-sm-4 col-12">
            <Select
              name="tenantPaymentMode"
              options={PaymentMethods}
              isSearchable={false}
              placeholder="Select"
              onChange={(e) => onPaymentModeChange(e)}
              theme={(theme) => ({
                ...theme,
                height: 26,
                minHeight: 26,
                borderRadius: 1,
                colors: {
                  ...theme.colors,
                  primary: "black",
                },
              })}
            />
          </div>
        </div>

        {showChequenoSection && (
          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-2 col-md-4 col-sm-4 col-12">
              <label>Cheque No/DD No :</label>
            </div>

            <div className="col-lg-2  col-md-4 col-sm-4 col-12">
              <input
                type="text"
                name="tenantChequenoOrDdno"
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 col-12">
              <label>Bank Name :</label>
            </div>

            <div className="col-lg-2  col-md-4 col-sm-4 col-12">
              <input
                type="text"
                name="tenantBankName"
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 col-12">
              <label>ChequeDate:</label>
            </div>
            <div className="col-lg-2  col-md-4 col-sm-4 col-12">
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                dateFormat="dd-MM-yyyy"
                className="form-control cpp-input datevalidation"
                name="tenantchequeDate"
                // value={startSelectedDate}
                // onChange={(e) => onDateChange(e)}
                style={{
                  width: "105%",
                }}
              />
            </div>
          </div>
        )}

        <div className="col-lg-6 Savebutton " size="lg">
          <button
            variant="success"
            className="btn sub_form btn_continue Save float-right"
            onClick={() => onSubmit()}
            style={
              tenantFileNo !== "" &&
              tenantDoorNo !== "" &&
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
    </Fragment>
  );
};

AddTenantDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  AddTenantDetailsform: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  //AddTenantDetailsform,
})(AddTenantDetails);
