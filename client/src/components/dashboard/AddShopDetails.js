import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddShopDetailsform } from "../../actions/tenants";
import { Modal } from "react-bootstrap";
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

const AddShopDetails = ({
  auth: { isAuthenticated, user, users },
  AddShopDetailsform,
  onAddStaffModalChange,
}) => {
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

  const [showInformationModal, setShowInformation] = useState(false);

  const handleInformationModalClose = () => setShowInformation(false);
  const LogoutModalClose = () => {
    handleInformationModalClose();
  };
  const onSubmit = () => {
    const finalData = {
      shopFileNo: shopFileNo,
      shopDoorNo: shopDoorNo,
      shopStatus: "Available",
    };

    AddShopDetailsform(finalData);
    setFormData({
      ...formData,
      shopFileNo: "",
      shopDoorNo: "",
      isSubmitted: true,
    });
    setShowInformation(true);

    //  window.location.reload();
  };
  // if (isSubmitted) {
  //   setShowLogout(true);
  // }

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
              <h2 className="heading_color">Add Shop Details </h2>
            </div>
          </div>
          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-4">
            <div className="col-lg-2 col-md-2 col-sm-1 col-12">
              <label> File No * :</label>
            </div>

            <div className="col-lg-4  col-md-4 col-sm-4 col-12">
              <input
                type="text"
                name="shopFileNo"
                value={shopFileNo}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label>Door No * :</label>
            </div>

            <div className="col-lg-4  col-md-4 col-sm-4 col-12">
              <input
                type="text"
                name="shopDoorNo"
                value={shopDoorNo}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
          </div>
          <div className="col-lg-12 Savebutton " size="lg">
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
        </section>
      </div>
      <Modal
        show={showInformationModal}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="logout-modal"
      >
        <Modal.Header className="confirmbox-heading">
          <h4 className="mt-0">Information</h4>
        </Modal.Header>
        <Modal.Body>
          <h5>Shop Details Added!!</h5>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn_green_bg"
            onClick={() => LogoutModalClose()}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>
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
