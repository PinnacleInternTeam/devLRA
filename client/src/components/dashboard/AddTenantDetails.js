import React, { useState, Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  AddTenantDetailsform,
  getAllDoorNos,
  AddOrganization,
  getAllSettings,
} from "../../actions/tenants";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import ImageUpload from "./FileUpload";

//THIS PAGE IS CONNECTED TO TENANTS.JS

const AddTenantDetails = ({
  tenants: { allDoorNos, allTenantSetting },
  auth: { isAuthenticated, user, users },
  getAllDoorNos,
  AddTenantDetailsform,
  AddOrganization,
  getAllSettings,
}) => {
  useEffect(() => {
    getAllDoorNos();
  }, [getAllDoorNos]);
  useEffect(() => {
    getAllSettings();
  }, [getAllSettings]);

<<<<<<< HEAD
  const [inputdata, setinput] = useState('');
=======
  //
  const [inputdata, setinput] = useState("");
>>>>>>> 053cb2ccc747692d403e77c771b84e4278504d6b
  const [items, setitem] = useState([]);

  const handleLocationclose = (index) => {
    const delitem = items.filter((ele, ind) => {
<<<<<<< HEAD
      return ind != index
    })
    setitem(delitem)
  }

  const addItem = () => {
    if (!inputdata) {

    } else {
      setitem([...items, inputdata])
      setinput('')
    }

  }
=======
      return ind != index;
    });
    setitem(delitem);
  };

  const addItem = () => {
    if (!inputdata) {
    } else {
      setitem([...items, inputdata]);
      setinput("");
    }
  };
>>>>>>> 053cb2ccc747692d403e77c771b84e4278504d6b

  const PaymentMethods = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
  ];
  //ORGANIZATION DATA
  const [formDataORG, setFormDataORG] = useState({
    OrganizationName: "",
    OrganizationEmail: "",
    OrganizationNumber: "",
    OrganizationAddress: "",
    Logo: "",
    Location: [],
  });

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
    tenantEnteredBy: "",
    tenantDate: "",
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
    tenantEnteredBy,
    tenantDate,
    isSubmitted,
  } = formData;

  const {
    OrganizationName,
    OrganizationEmail,
    OrganizationNumber,
    OrganizationAddress,
    Logo,
    Location,
  } = formDataORG;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //For setting mindate as todays date
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

  //For setting mindate as todays date

  const [entryDate, setEntryDate] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState();
  const [newLeaseEndDate, setNewLeaseEndDate] = useState();

  const onDateChangeEntry = (e) => {
    setEntryDate(e.target.value);
    var newDate = e.target.value;
    var calDate = new Date(newDate);

    var leaseMonth = allTenantSetting[0].leaseTimePeriod;

    //Calculating lease end date
    var dateData = calDate.getDate();
    calDate.setMonth(calDate.getMonth() + +leaseMonth);
    if (calDate.getDate() !== dateData) {
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
  const [shopId, setShopID] = useState();

  const onDoorNoChange = (e) => {
    var shopfileNumber = "";
    var shopdetailsId = "";
    getDoorNoData(e);

    allDoorNos.map((doorno) => {
      if (doorno.shopDoorNo === e.value) {
        shopfileNumber = doorno.shopFileNo;
        shopdetailsId = doorno._id;
      }
    });
    setFileNoData(shopfileNumber);
    setShopID(shopdetailsId);
  };

  const [startSelectedDate, setChequeDate] = useState("");
  const onDateChange = (e) => {
    setChequeDate(e.target.value);
  };
  const [showInformationModal, setShowInformation] = useState(false);

  const handleInformationModalClose = () => setShowInformation(false);
  const LogoutModalClose = () => {
    handleInformationModalClose();
  };
  const onPaymentModeChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        tenantPaymentMode: e,
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

  //this function is used to handle and to type in textbox email ...formorgdata will keep all the records  and change the email part only
  const onORGchange = (e) => {
    setFormDataORG({
       ...formDataORG,
        [e.target.name]: e.target.value });
  };

  // longer way of doing onchange method

  // const onchange = (e) => {
  //   console.log(e.target.value)
  //   setFormDataORG({ ...formDataORG, OrganizationName: e.target.value });
  // };

  // const onchange = (e) => {
  //   setFormDataORG({ ...formDataORG, OrganizationNumber: e.target.value });
  // };
  // const onAchange = (e) => {
  //   setFormDataORG({ ...formDataORG, OrganizationAddress: e.target.value });
  // };

  const onSubmitORGdata = () => {
    const finalORGdata = {
      OrganizationName: OrganizationName,
      OrganizationEmail: OrganizationEmail,
      OrganizationNumber: OrganizationNumber,
      OrganizationAddress: OrganizationAddress,
      Logo: "",
      Location: items,
    };
    console.log(
      "this is in main" + finalORGdata.OrganizationAddress,
      OrganizationNumber
    );

    AddOrganization(finalORGdata);
    setFormDataORG({
      ...formDataORG,
      OrganizationName: "" /*name*/,
      OrganizationEmail: "",
      OrganizationNumber: "",
      OrganizationAddress: "",
      Logo: "",
      Location: [],
    });
  };

  const onSubmit = () => {
    const finalData = {
      tenantFileNo: shopfileNo,
      tenantDoorNo: doorNo.value,
      tenantName: tenantName,
      tenantPhone: tenantPhone,
      tenantFirmName: tenantFirmName,
      tenantAddr: tenantAddr,
      tenantAdharNo: tenantAdharNo,
      tenantPanNo: tenantPanNo,
      tenantDepositAmt: tenantDepositAmt,
      tenantPaymentMode: tenantPaymentMode.value,
      tenantChequenoOrDdno: tenantChequenoOrDdno,
      tenantBankName: tenantBankName,
      tenantchequeDate: startSelectedDate,
      tenantRentAmount: tenantRentAmount,
      tenantLeaseStartDate: entryDate,
      tenantLeaseEndDate: newLeaseEndDate,
      shopId: shopId,
      tenantEnteredBy: user && user._id,
      tenantDate: todayDateymd,
    };
    AddTenantDetailsform(finalData);
    setFormData({
      ...formData,
      tenantFileNo: "",
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
      tenantLeaseEndDate: "",
      tenantChequenoOrDdno: "",
    });
    setShowInformation(true);
    setEntryDate("");
    getDoorNoData("");
    setLeaseEndDate("");
    setNewLeaseEndDate("");
    setChequeDate("");
    setFileNoData("");
  };

<<<<<<< HEAD
  return isAuthenticated || user || users && users.usergroup == "Super Admin" ? (
=======
  return isAuthenticated ||
    user ||
    (users && users.usergroup == "Super Admin") ? (
>>>>>>> 053cb2ccc747692d403e77c771b84e4278504d6b
    <Fragment>
      {/* Organisation details starting */}
      {/* -------------need to add the organisation details with storing the values---------- */}
      <Fragment>
        <div className="container container_align">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
            <h2 className="heading_color"><marquee>Organization</marquee> </h2>
          </div>
          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
<<<<<<< HEAD


            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label className="field_font"> Organization Name<i className="text-danger "><b>*</b></i>:</label>
=======
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label> Organization Name:</label>
>>>>>>> 053cb2ccc747692d403e77c771b84e4278504d6b
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <input
                type="text"
                name="OrganizationName"
                value={OrganizationName}
                className="form-control"
<<<<<<< HEAD
                onChange={(e) => onInputChange(e)}
                
                required
              /><br></br>
=======
                onChange={(e) => onORGchange(e)}
                required
              />
              {/* <input type='text' value={OrganizationEmail}></input> */}
>>>>>>> 053cb2ccc747692d403e77c771b84e4278504d6b
            </div>

            {/*---- Email label ---------*/}
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label className="field_font">Email <i className="text-danger "><b>*</b></i>:</label>
            </div>
            <div className="col-lg-4  col-md-4 col-sm-4 col-12">
              <input
                type="email"
                name="OrganizationEmail"
                value={OrganizationEmail}
                className="form-control"
                onChange={(e) => onORGchange(e)}
                required
              /><br></br>
            </div>
            {/*---- Email label ---------*/}

            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label className="field_font">Phone No<i className="text-danger "><b>*</b></i>:</label>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <input
                type="number"
                name="OrganizationNumber"
                value={OrganizationNumber}
                className="form-control"
                onChange={(e) => onORGchange(e)}
                required
              /><br></br>
            </div>

            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label className="field_font">Number of User<i className="text-danger "><b>*</b></i>:</label>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <input
                type="number"
                //  name=""
                //  value={tenantPhone}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
<<<<<<< HEAD

            {/* <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3"> */}

=======
          </div>

          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
>>>>>>> 053cb2ccc747692d403e77c771b84e4278504d6b
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label className="field_font"> Address <i className="text-danger "><b>*</b></i>:</label>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <textarea
                name="OrganizationAddress"
                value={OrganizationAddress}
                // id="tenantAddr"
                className="textarea form-control"
                rows="3"
                placeholder="Address"
                onChange={(e) => onORGchange(e)}
                style={{ width: "100%" }}
                required
              ></textarea><br></br>
            </div>
            {/*------------- Multiple Location adding details starting------------ */}
            <div className="addItem  col-lg-2 col-md-2 col-sm-4 col-12">
              <label className="field_font">Location<i className="text-danger "><b>*</b></i> :</label>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <input
                className=""
                type='text'
                name="Location"
                value={inputdata}
                onChange={(e) => setinput(e.target.value)}
                placeholder="Location"
                id="Location"></input>
              <Button className="loc_add_btn m-2" onClick={addItem}>+</Button>
              <div className="showItem ">

                {
                  items.map((ele, index) => {
                    return (
                      <div className="eachItem" key={index}>
                        <span>{ele}</span> <button onClick={() => handleLocationclose(index)} className="loc_close_btn m-2">X</button>
                      </div>
                    )
                  })
                }

              </div>
            </div>
            {/*------------- Multiple Location adding details Ending------------ */}

            {/*---------- Image upload starting------------ */}
         

              <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                <label className="field_font"> Upload Logo :</label>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                <ImageUpload />
              </div>
            
          </div>
<<<<<<< HEAD
          
        </div>
        {/* it is connected to files 1) goto FileUpload  in dashboard 
                             2) that file upload is connected to Services folder 
                             3) uunder that folder some code is generated
                             4) goto  http-common.jsx file */}
        {/* ----------Image upload Ending */}
        {/* </div> */}
=======
          {/*------------- Multiple Location adding details starting------------ */}
          <div className="addItem">
            <label>Location :</label>
            <input
              type="text"
              name="Location"
              value={inputdata}
              onChange={(e) => setinput(e.target.value)}
              placeholder="Location"
              id="Location"
            ></input>
            <Button onClick={addItem}>+</Button> *
          </div>
          <div className="showItem">
            {items.map((ele, index) => {
              return (
                <div className="eachItem" key={index}>
                  <span>{ele}</span>{" "}
                  <button onClick={() => handleLocationclose(index)}>X</button>
                </div>
              );
            })}
          </div>

          {/*------------- Multiple Location adding details Ending------------ */}

          {/*---------- Image upload starting------------ */}
          {/* it is connected to files 1) goto FileUpload  in dashboard 
                             2) that file upload is connected to Services folder 
                             3) uunder that folder some code is generated
                             4) goto  http-common.jsx file */}

          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label> Upload Logo *:</label>
            </div>
>>>>>>> 053cb2ccc747692d403e77c771b84e4278504d6b

            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <ImageUpload />
            </div>
          </div>

<<<<<<< HEAD
        <div className="col-lg-12 Savebutton " size="lg">
          <button
            variant="success"
            className="btn sub_form btn_continue Save float-right"
            onClick={() => onSubmit()}
            style={
              tenantName !== "" &&
                tenantPaymentMode !== "" &&
                tenantDepositAmt !== "" &&
                tenantAddr !== ""
                ? { opacity: "1" }
                : { opacity: "1", pointerEvents: "none" }
            }
=======
          {/* ----------Image upload Ending */}
        </div>

        <div className="col-lg-12 bg-danger " size="lg">
          <Button
            variant="success"
            className="btn sub_form btn_continue Save float-right bg-danger"
            onClick={() => onSubmitORGdata()}
>>>>>>> 053cb2ccc747692d403e77c771b84e4278504d6b
          >
            Save
          </Button>
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
            <h5> Congratz Organization Added!!</h5>
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

      {/* Organisation details ending */}
    </Fragment >
  ) : (
    <Fragment>
      <div className="container container_align">
        <section className="sub_reg">
          <div className="col-lg-5 col-md-12 col-sm-12 col-12 ">
            <h2 className="heading_color">Add Tenant Details </h2>
          </div>
          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div
              className="col-lg-1 col-md-2 col-sm-4 col-12"
              style={{ paddingRight: "0px" }}
            >
              <label>Door No*:</label>
            </div>
            <div className="col-lg-2  col-md-4 col-sm-4 col-12">
              <Select
                name="tenantDoorNo"
                options={shopdoorNo}
                isSearchable={true}
                placeholder="Select"
                value={doorNo}
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
              <label>{shopfileNo}</label>
            </div>
          </div>
          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label>Tenant Name *:</label>
            </div>

            <div className="col-lg-4  col-md-4 col-sm-4 col-12">
              <input
                type="text"
                name="tenantName"
                value={tenantName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label>Phone No:</label>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <input
                type="number"
                name="tenantPhone"
                value={tenantPhone}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
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
                value={tenantFirmName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label>Tenant's Address *:</label>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <textarea
                name="tenantAddr"
                value={tenantAddr}
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
              <label>Adhaar No:</label>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <input
                type="number"
                name="tenantAdharNo"
                value={tenantAdharNo}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
                required
              />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label>Pan Card No:</label>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <input
                type="text"
                name="tenantPanNo"
                value={tenantPanNo}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
                required
              />
            </div>
          </div>
          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label>Deposit Amount *:</label>
            </div>

            <div className="col-lg-2  col-md-4 col-sm-4 col-12">
              <input
                type="number"
                name="tenantDepositAmt"
                value={tenantDepositAmt}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
                required
              />
            </div>

            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label>Mode Of Payment *:</label>
            </div>

            <div className="col-lg-2  col-md-4 col-sm-4 col-12">
              <Select
                name="tenantPaymentMode"
                options={PaymentMethods}
                isSearchable={false}
                value={tenantPaymentMode}
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
                  value={tenantChequenoOrDdno}
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
                  value={tenantBankName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-1 col-md-4 col-sm-4 col-12">
                <label>ChequeDate:</label>
              </div>
              <div className="col-lg-3  col-md-4 col-sm-4 col-12">
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  name="tenantchequeDate"
                  value={startSelectedDate}
                  onChange={(e) => onDateChange(e)}
                  style={{
                    width: "75%",
                    marginLeft: "20%",
                  }}
                />
              </div>
            </div>
          )}

          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3"></div>
          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label> Rent Amount *:</label>
            </div>

            <div className="col-lg-3  col-md-4 col-sm-4 col-12">
              <input
                type="number"
                name="tenantRentAmount"
                value={tenantRentAmount}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
                required
              />
            </div>
          </div>

          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label> Lease Start Date *:</label>
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

          <div className="col-lg-12 Savebutton " size="lg">
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right"
<<<<<<< HEAD
              // onClick={() => onSubmit()}

=======
              onClick={() => onSubmit()}
>>>>>>> 053cb2ccc747692d403e77c771b84e4278504d6b
              style={
                tenantName !== "" &&
                  tenantPaymentMode !== "" &&
                  tenantDepositAmt !== "" &&
                  tenantAddr !== ""
                  ? { opacity: "1" }
                  : { opacity: "1", pointerEvents: "none" }
              }
            >
              Save
            </button>
          </div>
        </section>
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
      </div>
    </Fragment>
  );
};

AddTenantDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  tenants: PropTypes.object.isRequired,
  AddTenantDetailsform: PropTypes.func.isRequired,
  getAllDoorNos: PropTypes.func.isRequired,
  getAllSettings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  AddTenantDetailsform,
  getAllDoorNos,
  getAllSettings,
  AddOrganization,
})(AddTenantDetails);
