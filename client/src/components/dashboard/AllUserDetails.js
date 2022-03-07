import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import AddShopDetails from "./AddShopDetails";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllLevels } from "../../actions/tenants";
import { getAllUsers } from "../../actions/auth";
import AddUser from "./AddUser";

const AllUserDetails = ({ auth: { allUser }, getAllUsers }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const [showAddUserSettingModal, setShowEditModal] = useState(false);
  const handleAddUserModalClose = () => setShowEditModal(false);
  const onClickHandler = () => {
    setShowEditModal(true);
  };
  return (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
              <h2 className="heading_color">All User Details </h2>
            </div>
            <div className="col-lg-2 col-md-11 col-sm-11 col-11 py-4">
              <img
                className="img_icon_size log"
                onClick={() => onClickHandler()}
                src={require("../../static/images/add-icon.png")}
                alt="refresh"
                title="Refresh"
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
            <AddUser />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllUserDetails.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  staff: state.staff,
});

export default connect(mapStateToProps, {
  getAllUsers,
})(AllUserDetails);
