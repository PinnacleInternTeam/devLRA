import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddTenantAgreementform } from "../../actions/tenants";
import Select from "react-select";
import { Redirect } from "react-router-dom";
const AddTenantAgreement = ({
  user,
  AddTenantAgreementform,
  tenants: { newtenantdetails },
}) => {
  var today = new Date();
  var today2 = new Date();

  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  var dd1 = today2.getDate() - 1;
  var mm1 = today2.getMonth();
  var yyyy1 = today2.getFullYear();

  if (dd < 10 || dd1 < 10) {
    dd = "0" + dd;
    dd1 = "0" + dd1;
  }
  if (mm < 10 || mm1 < 10) {
    mm = "0" + mm;
    mm1 = "0" + mm1;
  }
  var todayDatedmy = dd + "-" + mm + "-" + yyyy;
  var yesterdayDt = yyyy1 + "-" + mm1 + "-" + dd1;
  //console.log(yesterdayDt);
  //For setting mindate as todays date
  var today2 = yyyy + "-" + mm + "-" + dd;

  const PaymentMethods = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
  ];

 

  //formData
  const [formData, setFormData] = useState({
    tenantRentAmount: "",
    tenantLeaseStartDate: "",
    tenantLeaseEndDate: "",
    tdId: "",
    tenantFileNo: "",
    tenantDoorNo: "",
    isSubmitted: false,
  });
  const {
    tenantRentAmount,
    tenantLeaseStartDate,
    tenantLeaseEndDate,
    tdId,
    tenantFileNo,
    tenantDoorNo,
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
  const [entryDate, setEntryDate] = useState(today2);
  const onDateChangeEntry = (e) => {
    setEntryDate(e.target.value);
  };
  const onSubmit = () => {
    const finalData = {
      tenantRentAmount: tenantRentAmount,
      tenantLeaseStartDate: entryDate,
      tenantLeaseEndDate: tenantLeaseEndDate,
      tdId: tdId,
      tenantFileNo: tenantFileNo,
      tenantDoorNo: tenantDoorNo,
    };
    // console.log(finalData);
    AddTenantAgreementform(finalData);
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
              {newtenantdetails &&
                newtenantdetails.map((newtenantdetail) => {
                  <div>
                    <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                      <label>Door no :</label>
                    </div>
                    <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                      <label>{}</label>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-1 col-12">
                      <label> File No :</label>
                    </div>
                    <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                      <label>{}</label>
                    </div>
                  </div>;
                })}
            </div>
            <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3"></div>
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
                  value={entryDate}
                  onChange={(e) => onDateChangeEntry(e)}
                  style={{
                    width: "55%",
                  }}
                />
              </div>
              <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                <label>Lease End Date:</label>
              </div>

              <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                <label></label>
              </div>
            </div>

            <div className="col-lg-8 Savebutton" size="lg">
              <button
                variant="success"
                className="btn sub_form btn_continue Save"
                onClick={() => onSubmit()}
                // style={
                //   tenantLeaseStartDate !== "" &&
                //   tenantName !== "" &&
                //   tenantPhone !== "" &&
                //   tenantFirmName !== "" &&
                //   tenantDepositAmt !== "" &&
                //   tenantAdharNo !== "" &&
                //   tenantAddr !== "" &&
                //   tenantPanNo !== ""
                //     ? { opacity: "1" }
                //     : { opacity: "1", pointerEvents: "none" }
                // }
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
  tenants: PropTypes.object.isRequired,
  AddTenantAgreementform: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  AddTenantAgreementform,
})(AddTenantAgreement);
