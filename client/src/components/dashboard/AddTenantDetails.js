import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  AddTenantDetailsform,
  getAllDoorNos,
  getFileNoData,
} from "../../actions/tenants";
import Select from "react-select";
import { Redirect } from "react-router-dom";

const AddTenantDetails = ({
  tenants: { allDoorNos },
  getAllDoorNos,
  AddTenantDetailsform,
}) => {
  useEffect(() => {
    getAllDoorNos();
  }, [getAllDoorNos]);

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
    tenantchequeDate: "",
    tenantRentAmount: "",
    tenantLeaseStartDate: "",
    tenantLeaseEndDate: "",
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
    tenantRentAmount,
    tenantchequeDate,
    tenantLeaseStartDate,
    tenantLeaseEndDate,
    isSubmitted,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const [showHide, setShowHide] = useState({
    showChequenoSection: false,
  });
  const { showChequenoSection } = showHide;
  const [doorNo, getDoorNoData] = useState();
  const [shopfileNo, setFileNoData] = useState();

  const onDoorNoChange = (e) => {
    var shopfileNumber = "";
    getDoorNoData(e.value);

    allDoorNos.map((doorno) => {
      if (doorno.shopDoorNo === e.value) {
        shopfileNumber = doorno.shopFileNo;
      }
    });
    setFileNoData(shopfileNumber);
  };

  const [startSelectedDate, setChequeDate] = useState("");
  const onDateChange = (e) => {
    setChequeDate(e.target.value);
  };

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
  const shopdoorNo = [];
  allDoorNos.map((doorno) =>
    shopdoorNo.push({
      label: doorno.shopDoorNo,
      value: doorno.shopDoorNo,
    })
  );

  const onSubmit = () => {
    const finalData = {
      // tenantFileNo: tenantFileNo,
      tenantFileNo: shopfileNo,
      // tenantDoorNo: tenantDoorNo,
      tenantDoorNo: doorNo,
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
      tenantchequeDate: startSelectedDate,
      tenantRentAmount: tenantRentAmount,
      tenantLeaseStartDate: entryDate,
      tenantLeaseEndDate: newLeaseEndDate,
    };
    // console.log(finalData);
    AddTenantDetailsform(finalData);
    setFormData({ ...formData, isSubmitted: true });
    window.location.reload();
  };
  // if (isSubmitted) {
  //   return <Redirect to="/add-agreement-details" />;
  // }

  return (
    <Fragment>
      <div className="container container_align">
        <section className="sub_reg">
          <div className="col-lg-5 col-md-12 col-sm-12 col-12 ">
            <h2 className="heading_color">Add Tenant Details </h2>
          </div>
          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-1 col-md-2 col-sm-4 col-12">
              <label>DoorNo:</label>
            </div>
            <div className="col-lg-2  col-md-4 col-sm-4 col-12">
              <Select
                name="tenantDoorNo"
                options={shopdoorNo}
                isSearchable={false}
                placeholder="Select"
                onChange={(e) => onDoorNoChange(e)}
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
            <div className="col-lg-1 col-md-2 col-sm-1 col-12">
              <label> File No :</label>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 col-12">
              {/* <input
                type="text"
                name="tenantFileNo"
                value={shopfileNo}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              /> */}
              <label>{shopfileNo}</label>
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
                type="number"
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
                type="number"
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
                type="number"
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
                  className="form-control cpp-input datevalidation"
                  name="tenantchequeDate"
                  value={startSelectedDate}
                  onChange={(e) => onDateChange(e)}
                  style={{
                    width: "105%",
                  }}
                />
              </div>
            </div>
          )}

          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3"></div>
          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label> Rent Amount:</label>
            </div>

            <div className="col-lg-3  col-md-4 col-sm-4 col-12">
              <input
                type="number"
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
              <label>{leaseEndDate}</label>
            </div>
          </div>

          <div className="col-lg-6 Savebutton " size="lg">
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right"
              onClick={() => onSubmit()}
              style={
                tenantDoorNo !== "" &&
                tenantName !== "" &&
                tenantPhone !== "" &&
                // tenantFirmName !== "" &&
                tenantPaymentMode !== "" &&
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
        </section>
      </div>
    </Fragment>
  );
};

AddTenantDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  tenants: PropTypes.object.isRequired,
  AddTenantDetailsform: PropTypes.func.isRequired,
  getAllDoorNos: PropTypes.func.isRequired,
  getFileNoData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  AddTenantDetailsform,
  getAllDoorNos,
  // getFileNoData,
})(AddTenantDetails);
