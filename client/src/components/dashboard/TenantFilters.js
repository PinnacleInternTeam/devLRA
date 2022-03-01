import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

import AddTenantDetails from "./AddTenantDetails";
import TenantReport from "./TenantReport";

import DatePicker from "react-datepicker";

import { getAllUsers, getSearchUsersByFilter } from "../../actions/auth";
import NotFound from "../layout/NotFound";

const optName = [
  { value: "01", label: "Jan" },
  { value: "02", label: "Feb" },
  { value: "03", label: "Mar" },
  { value: "04", label: "Apr" },
  { value: "05", label: "May" },
  { value: "06", label: "Jun" },
  { value: "07", label: "Jul" },
  { value: "08", label: "Aug" },
  { value: "09", label: "Sep" },
  { value: "09", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dec" },
];

const TenantFilters = ({
  auth: { isAuthenticated, user, users },
  getAllUsers,
  getSearchUsersByFilter,
}) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const [userData, setUserData] = useState(null);
  const [loggedStaffData, setLoggedStaffData] = useState(null);

  const [searchData, setSearchData] = useState({
    alphaSearch: "",
  });

  const { alphaSearch } = searchData;

  const onSelectChange = (optFiltr) => {
    if (optFiltr) {
      setSearchData({
        ...searchData,
        alphaSearch: optFiltr.value,
      });
      const finalData = {
        alphaSearch: optFiltr.value,
      };

      getSearchUsersByFilter(finalData);
    }
  };

  const [startMonthDate, setMonthStartDate] = useState(new Date());
  const monthYearChange = (dt) => {
    if (dt) {
      setMonthStartDate(dt);
      setSearchData({
        ...searchData,
        selectedMY: dt,
      });
      const finalData = {
        selectedMY: dt,
        alphaSearch: alphaSearch,
      };
    }
  };
  return !isAuthenticated || !user || !users ? (
    <NotFound />
  ) : (
    <Fragment>
      <div className="container_align ">
        <div className="row ">
          <div className="col-lg-1 py-4 col-md-1 col-sm-1 col-1 text-center brdr-clr-styles top_menu">
            <form>
              <div className="py-2">
                <button className="btn btn_more" >100</button>
                {/* className="btn-rou" */}
              </div>
              <div className="py-3">
                <DatePicker
                  className="form-control yearpicker"
                  placeholder="yyyy"
                  //   maxDate={subMonths(new Date(), -1)}
                  onChange={(date) => monthYearChange(date)}
                  dateFormat="yyyy"
                  selected={startMonthDate}
                  style={{ textAlign: "center" }}
                  showYearPicker
                />
              </div>

              {optName &&
                optName.map((optFiltr, idx) => {
                  return (
                    <div className="py-2" key={idx}>
                      <div style={{color:"#fff"}}>
                        {" "}
                        <Link
                          to="#"
                          name="alphaSearch"
                          // className="btnLink"
                          onClick={() => onSelectChange(optFiltr)}
                          style={{ fontWeight: "bold", fontSize: "19px" }}
                        >
                          {optFiltr.label}
                        </Link>{" "}
                        &nbsp;
                        <label
                          className="btn-roun"
                          style={{ fontSize: "15px" ,color:"#429f8c", background:"#fff"}}
                        >
                          97
                        </label>
                      </div>
                      <div> </div>
                    </div>
                  );
                })}
            </form>
          </div>

          <div className="col-lg-10 col-md-7 col-sm-8 col-8">
            <AddTenantDetails />
          </div>

          {/* <div className="col-lg-4 col-md-7 col-sm-8 col-8">
            <TenantReport />
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};

TenantFilters.propTypes = {
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
})(TenantFilters);
