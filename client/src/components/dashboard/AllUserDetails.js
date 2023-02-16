import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions/auth";
import AddUser from "./AddUser";

const AllUserDetails = ({
  auth: { allUser, isAuthenticated, user, users },
  getAllUsers,
}) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const [showAddUserSettingModal, setShowEditModal] = useState(false);
  const handleAddUserModalClose = () => setShowEditModal(false);
  const onClickHandler = () => {
    setShowEditModal(true);
  };

  const onAddUserModalChange = (e) => {
    if (e) {
      handleAddUserModalClose();
    }
  };
  const onInputChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showInformationModal, setShowInformation] = useState(false);
  const handleInformationModalClose = () => setShowInformation(false);
  const LogoutModalClose = () => {
    handleInformationModalClose();
  };


  return isAuthenticated || user || users && users.usergroup == "Super Admin" ? (
    <Fragment>
      {/* add user data starting */}
      <Fragment>

        <div className="container container_align">
          <div className="col-lg-5 col-md-12 col-sm-12 col-12 ">
            <h2 className="heading_color">Add User Details </h2>
          </div>
          <div className="  col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            {/* ---------Name----------- */}
            <div className="col-lg-2 col-md-2 col-sm-4 col-12 ">
              <label className="field_font"> Name<i className="text-danger"><b>*</b></i>:</label>
            </div>

            <div className="col-lg-8 col-md-4 col-sm-4 col-12">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                onChange={(e) => onInputChange(e)}                
                required
              /><br></br>
            </div>

            {/* ---- Email label --------- */}
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label className="field_font">Email <i className="text-danger "><b>*</b></i>:</label>
            </div>
            <div className="col-lg-8  col-md-4 col-sm-4 col-12">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              /><br></br>
            </div>
            {/* ---- phone --------- */}

            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label className="field_font">Phone No<i className="text-danger "><b>*</b></i>:</label>
            </div>

            <div className="col-lg-8 col-md-4 col-sm-4 col-12">
              <input
                type="number"
                placeholder="Phone No"
                
                className="form-control"
                onChange={(e) => onInputChange(e)}
                      required
              /><br></br>
            </div>
            {/* ---- password --------- */}
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label className="field_font">Password<i className="text-danger "><b>*</b></i>:</label>
            </div>

            <div className="col-lg-8 col-md-4 col-sm-4 col-12">
              <input
                type="number"
                placeholder="Password"
                
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              /><br></br>
            </div>
            {/* ---- cpassword --------- */}
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label className="field_font">ConfirmPassword<i className="text-danger "><b>*</b></i>:</label>
            </div>
            <div className="col-lg-8 col-md-4 col-sm-4 col-12">
              <input
                type="number"
                placeholder="Enter Name"
                
                className="form-control "
                onChange={(e) => onInputChange(e)}
                required
              /><br></br>
            </div>

            {/* ---- Address --------- */}

            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label className="field_font"> Address <i className="text-danger "><b>*</b></i>:</label>
            </div>

            <div className="col-lg-8 col-md-4 col-sm-6 col-12">
              <textarea
                
                id="tenantAddr"
                className="textarea form-control "
                rows="3"
                placeholder="Address"
                onChange={(e) => onInputChange(e)}
                style={{ width: "100%" }}
                required
              ></textarea><br></br>
            </div>
            {/* ---- Organisation --------- */}
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label className="field_font"> Org belongs to<i className="text-danger "><b>*</b></i>:</label>
            </div>
            <div className="col-lg-8 col-md-4 col-sm-4 col-12">
              <select
              id="Org_belongs"
              className="textarea form-control"
              placeholder="select"
              style={{width:"100%"}}>

                <option value="fruit">Mandavi</option>

                <option value="vegetable">Pruthvi Arcade</option>

                <option value="meat">Pragathi ganesh</option>

              </select>

            </div>

          </div>

        </div>

        <div className="col-lg-12 Savebutton " size="lg">
          <button
            variant="success"
            className="btn sub_form btn_continue Save float-right"
          //onClick={() => onSubmit()}
          //  style={
          //    tenantName !== "" &&
          //      tenantPaymentMode !== "" &&
          //      tenantDepositAmt !== "" &&
          //      tenantAddr !== ""
          //      ? { opacity: "1" }
          //      : { opacity: "1", pointerEvents: "none" }
          //   }
          >
            Save
          </button>
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

      {/* add user data ending */}
    </Fragment >
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
              <h2 className="heading_color">All User Details </h2>
            </div>
            <div className="col-lg-2 col-md-11 col-sm-11 col-11 py-4">
              <img
                className="img_icon_size log"
                onClick={() => onClickHandler()}
                src={require("../../static/images/add-icon.png")}
                alt="Add User"
                title="Add User"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-11 col-md-11 col-sm-11 col-11 text-center ">
              <section className="body">
                <div className="body-inner no-padding  table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped table-hover"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Group</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUser &&
                        allUser.map((allusers, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{allusers.userfullName}</td>
                              <td>{allusers.useraddr}</td>
                              <td>{allusers.useremail}</td>
                              <td>{allusers.userphone}</td>
                              <td>{allusers.usergroup}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>
        <Modal
          show={showAddUserSettingModal}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Add User</h3>
            </div>
            <div className="col-lg-2">
              <button onClick={handleAddUserModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <AddUser onAddUserModalChange={onAddUserModalChange} />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllUserDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  staff: state.staff,
});

export default connect(mapStateToProps, {
  getAllUsers,
})(AllUserDetails);
