import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NotFound from "../layout/NotFound";
import Select from "react-select";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import AddStaffFeedBack from "./AddStaffFeedBack";

import { getAllUsers, getSearchUsersByFilter } from "../../actions/auth";

const optName = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
  { value: "F", label: "F" },
  { value: "G", label: "G" },
  { value: "H", label: "H" },
  { value: "I", label: "I" },
  { value: "J", label: "J" },
  { value: "K", label: "K" },
  { value: "L", label: "L" },
  { value: "M", label: "M" },
  { value: "N", label: "N" },
  { value: "O", label: "O" },
  { value: "P", label: "P" },
  { value: "Q", label: "Q" },
  { value: "R", label: "R" },
  { value: "S", label: "S" },
  { value: "T", label: "T" },
  { value: "U", label: "U" },
  { value: "V", label: "V" },
  { value: "W", label: "W" },
  { value: "X", label: "X" },
  { value: "Y", label: "Y" },
  { value: "Z", label: "Z" },
];

const AllStaffDetails = ({
  auth: { isAuthenticated, user, users },
  getAllUsers,
  getSearchUsersByFilter,
}) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  

  const [showModal, setShowModal] = useState(false);
  const handleViewModalClose = () => setShowModal(false);

  const [userData, setUserData] = useState(null);

  const handleViewModalShow = (user) => {
    setUserData(user);
    setShowModal(true);
  };

  const [searchData, setSearchData] = useState({
    alphaSearch: "",
  });

  const { alphaSearch } = searchData;

  const onSelectChange = (e) => {
    if (e) {
      setSearchData({
        ...searchData,
        alphaSearch: e.value,
      });
      const finalData = {
        alphaSearch: e.value,
      };

      getSearchUsersByFilter(finalData);
    }
  };

  // const onKeyUp = (e) => {
  //   if (e.keyCode === 13) {
  //     const finalData = {
  //       alphaSearch: "",
  //     };
  //     getSearchUsersByFilter(finalData);
  //   }
  // };

  const onClickReset = () => {
    //added the reference value

    setSearchData({
      ...searchData,
      alphaSearch: "",
    });
    getAllUsers();
  };

  return !isAuthenticated || !user ? (
    <NotFound />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <form>
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <h2 className="heading_color">All Staff Details</h2>
              </div>
              <div
                className="col-lg-2 col-md-6 col-sm-6 col-6 no_padding "
                style={{ marginTop: "15px" }}
              >
                <Select
                  name="alphaSearch"
                  options={optName}
                  isSearchable={false}
                  placeholder="Filter By:All"
                  onChange={(e) => onSelectChange(e)}
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

              <div className="col-lg-1 col-md-2 col-sm-12 col-12 label-control align_right">
                <img
                  className="img_icon_size log"
                  onClick={() => onClickReset()}
                  src={require("../../static/images/refresh-icon.png")}
                  alt="refresh"
                  title="Refresh"
                />
              </div>
            </div>
          </form>
          <section className="body">
            <div className="body-inner no-padding  table-responsive">
              <table
                className="table table-bordered table-striped table-hover"
                id="datatable2"
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>
                      <strong>Staff Name</strong>
                    </th>

                    <th>
                      <strong>Designation</strong>
                    </th>

                    <th>
                      <strong>Operations</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user, idx) => {
                      return (
                        <tr key={idx}>
                          <td></td>
                          <td>{user.fullName}</td>
                          <td></td>

                          <td style={{ width: "17%" }}>
                            <Link
                              to="#"
                              className="btnLink"
                              onClick={() => handleViewModalShow(user)}
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <Modal
                show={showModal}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header>
                  <div className="col-lg-10">
                    <h3 className="modal-title text-center">User Details</h3>
                  </div>
                  <div className="col-lg-2">
                    <button onClick={handleViewModalClose} className="close">
                      <img
                        src={require("../../static/images/close.png")}
                        alt="X"
                        style={{ height: "20px", width: "20px" }}
                      />
                    </button>
                  </div>
                </Modal.Header>

                <Modal.Body className="userDetailsModalBody">
                  <AddStaffFeedBack user={userData} />
                </Modal.Body>
              </Modal>
            </div>
          </section>
        </section>
      </div>
    </Fragment>
  );
};

AllStaffDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getSearchUsersByFilter: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllUsers,
  getSearchUsersByFilter,
})(AllStaffDetails);
