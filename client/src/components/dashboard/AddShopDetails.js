import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import { AddShopDetailsform } from "../../actions/tenants";
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

const AddShopDetails = ({ AddShopDetailsform }) => {
  //formData
  const [formData, setFormData] = useState({
    shopFileNo: "",
    shopDoorNo: "",

    isSubmitted: false,
  });

  const { shopFileNo, shopDoorNo, isSubmitted } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    const finalData = {
      shopFileNo: shopFileNo,
      shopDoorNo: shopDoorNo,
      shopStatus: "Available",
    };

    AddShopDetailsform(finalData);
    setFormData({ ...formData, isSubmitted: true });

    window.location.reload();
  };

  return (
    <Fragment>
      <>
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-4">
          <div className="col-lg-2 col-md-2 col-sm-1 col-12">
            <label> File No :</label>
          </div>

          <div className="col-lg-4  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="shopFileNo"
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-4 col-12">
            <label>Door no :</label>
          </div>

          <div className="col-lg-4  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="shopDoorNo"
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
        </div>
        <div className="col-lg-8 Savebutton " size="lg">
          <button
            variant="success"
            className="btn sub_form btn_continue Save float-right"
            onClick={() => onSubmit()}
            style={
              shopFileNo !== "" && shopDoorNo !== ""
                ? { opacity: "1" }
                : { opacity: "1", pointerEvents: "none" }
            }
          >
            Save
          </button>
        </div>
      </>
    </Fragment>
  );
};

AddShopDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  AddShopDetailsform: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  AddShopDetailsform,
})(AddShopDetails);
