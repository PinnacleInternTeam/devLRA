import React, { Fragment } from "react";

let userRow = {
  fontSize: "18px",

  lineHeight: "14px",
};

const AddStaffFeedBack = ({ user }) => {
  return (
    <Fragment>
      {/* <h4>Personal Details</h4> */}
      <div>
        <h4 style={userRow}>
          <b>Name: </b>
          {user && user.fullName}
        </h4>
        <h4 style={userRow}>
          <b>Designation: </b>
          {user && user.sdDesig}
        </h4>
      </div>
    </Fragment>
  );
};

export default AddStaffFeedBack;
