import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddTenantSettingform } from "../../actions/tenants";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import { getAllSettings } from "../../actions/tenants";
const TenantSettings = ({
  AddTenantSettingform,
  auth: { allTenantSetting },
  getAllSettings,
}) => {
  useEffect(() => {
    getAllSettings();
  }, [getAllSettings]);
  console.log(allTenantSetting);
  const PaymentMethods = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
  ];

  //formData
  const [formData, setFormData] = useState({
    hikePercentage: allTenantSetting ? allTenantSetting.hikePercentage : "",
    stampDuty: allTenantSetting.stampDuty,
    leaseTimePeriod: allTenantSetting ? allTenantSetting.leaseTimePeriod : "",

    //isSubmitted: false,
  });

  const {
    hikePercentage,
    stampDuty,
    leaseTimePeriod,

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
      hikePercentage: hikePercentage,
      stampDuty: stampDuty,
      leaseTimePeriod: leaseTimePeriod,
    };
    //console.log(finalData);
    AddTenantSettingform(finalData);
    setFormData({ ...formData, isSubmitted: true });

    window.location.reload();
  };

  //   if (isSubmitted) {
  //     return <Redirect to="/tenant-add-details" />;
  //   }
  return (
    <Fragment>
      {allTenantSetting &&
        allTenantSetting.map((tenantssettings) => {
          return (
            <div className="container container_align ">
              <section className="sub_reg">
                <div className="row">
                  <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
                    <div className="col-lg-4 col-md-2 col-sm-1 col-12">
                      <label> Hike Percentage :</label>
                    </div>

                    <div className="col-lg-5  col-md-4 col-sm-4 col-12">
                      <input
                        type="text"
                        name="hikePercentage"
                        className="form-control"
                        value={hikePercentage}
                        onChange={(e) => onInputChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
                    <div className="col-lg-4 col-md-2 col-sm-4 col-12">
                      <label>Stamp Duty :</label>
                    </div>

                    <div className="col-lg-5  col-md-4 col-sm-4 col-12">
                      <input
                        type="text"
                        name="stampDuty"
                        className="form-control"
                        value={stampDuty}
                        onChange={(e) => onInputChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
                    <div className="col-lg-4 col-md-2 col-sm-4 col-12">
                      <label>Lease Time Period :</label>
                    </div>

                    <div className="col-lg-5  col-md-4 col-sm-4 col-12">
                      <input
                        type="text"
                        name="leaseTimePeriod"
                        className="form-control"
                        value={leaseTimePeriod}
                        onChange={(e) => onInputChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 Savebutton" size="lg">
                    <button
                      variant="success"
                      className="btn sub_form btn_continue Save float-right"
                      onClick={() => onSubmit()}
                      style={
                        leaseTimePeriod !== "" &&
                        stampDuty !== "" &&
                        hikePercentage !== ""
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
          );
        })}
    </Fragment>
  );
};

TenantSettings.propTypes = {
  getAllSettings: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  AddTenantSettingform: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllSettings,
  AddTenantSettingform,
})(TenantSettings);
