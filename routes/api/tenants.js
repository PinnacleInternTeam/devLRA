const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const TenantDetails = require("../../models/TenantDetails");
const TenantSettings = require("../../models/TenantSettings");
const ShopDetails = require("../../models/ShopDetails");
const TenentAgreement = require("../../models/TenantAgreementDetails");

router.post("/add-tenant-details", async (req, res) => {
  let data = req.body;
  const finalData = {
    tenantFileNo: data.tenantFileNo,
    tenantDoorNo: data.tenantDoorNo,
    tenantName: data.tenantName,
    tenantPhone: data.tenantPhone,
    tenantFirmName: data.tenantFirmName,
    tenantAddr: data.tenantAddr,
    tenantAdharNo: data.tenantAdharNo,
    tenantPanNo: data.tenantPanNo,
    tenantDepositAmt: data.tenantDepositAmt,
    tenantPaymentMode: data.tenantPaymentMode,
    tenantChequenoOrDdno: data.tenantChequenoOrDdno,
    tenantBankName: data.tenantBankName,
  };

  try {
    let tenantDetails = new TenantDetails(finalData);
    output = await tenantDetails.save();
    // console.log(output._id);
    const finalData1 = {
      tdId: output._id,
      tenantRentAmount: data.tenantRentAmount,
      tenantLeaseStartDate: data.tenantLeaseStartDate,
      tenantLeaseEndDate: data.tenantLeaseEndDate,
    };
    let tenantAgreementDetails = new TenentAgreement(finalData1);
    output1 = await tenantAgreementDetails.save();

    console.log(output1);
    // res.send(output);
    // res.send(output1);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-tenant-settings", async (req, res) => {
  let data = req.body;
  try {
    let tenantSettings = new TenantSettings(data);
    output = await tenantSettings.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-shop-details", async (req, res) => {
  let data = req.body;
  // console.log(data);
  try {
    let shopDetails = new ShopDetails(data);
    output = await shopDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

// Get Exp Month Count
router.get("/get-tenant-report", async (req, res) => {
  try {
    const tenantData = await TenantDetails.aggregate([
      {
        $group: {
          _id: "$sdId",
          tenantFileNo: { $first: "$tenantFileNo" },
          tenantDoorNo: { $first: "$tenantDoorNo" },
          tenantName: { $first: "$tenantName" },
          tenantPhone: { $first: "$tenantPhone" },
          tenantFirmName: { $first: "$tenantFirmName" },
          tenantAddr: { $first: "$output.tenantAddr" },
          tenantAdharNo: { $first: "$tenantAdharNo" },
          tenantPanNo: { $first: "$tenantPanNo" },
          tenantDepositAmt: { $first: "$tenantDepositAmt" },
        },
      },
    ]);
    res.json(tenantData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post(
  "/deactive-tenant",
  // [check("tdId", "Invalid Request").not().isEmpty()],

  async (req, res) => {
    console.log("api");
    try {
      let data = req.body;

      const updatedetails = await TenantDetails.updateOne(
        { _id: data.recordId },
        {
          $set: {
            tenantstatus: data.tenantstatus,
            tenantdeactivereason: data.tenantdeactivereason,
          },
        }
      );

      res.json(updatedetails);
    } catch (error) {
      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// router.post(
//   "/deactive-tenant",
//   // [check("tdId", "Invalid Request").not().isEmpty()],
//   async (req, res) => {
//     console.log("hi api");
//     try {
//       let data = req.body;
//       console.log(data);
//       const updatedetails = await Tenantdetails.updateOne(
//         { _id: data.tdId },
//         {
//           $set: {
//             tenantstatus: data.tenantstatus,
//           },
//         }
//       );
//       //console.log(data);
//       console.log(updatedetails);
//       res.json(updatedetails);
//     } catch (error) {
//       res.status(500).json({ errors: [{ msg: "Server Error" }] });
//     }
//   }
// );

// Get Exp Month Count
router.get("/get-month-exp-count", async (req, res) => {
  var yearVal = new Date().getFullYear();
  try {
    const MonthExpCntData = await TenentAgreement.aggregate([
      {
        $match: {
          tenantLeaseEndDate: { $regex: new RegExp("^" + yearVal, "i") },
        },
      },

      {
        $group: {
          _id: {
            year: {
              $year: { $dateFromString: { dateString: "$tenantLeaseEndDate" } },
            },
            month: {
              $month: {
                $dateFromString: { dateString: "$tenantLeaseEndDate" },
              },
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(MonthExpCntData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//Filter Exp Month Count filter
router.post("/get-month-exp-count-filter", async (req, res) => {
  const { selectedY } = req.body;
  try {
    const MonthExpCntData = await TenentAgreement.aggregate([
      {
        $match: {
          tenantLeaseEndDate: { $regex: new RegExp("^" + selectedY, "i") },
        },
      },

      {
        $group: {
          _id: {
            year: {
              $year: { $dateFromString: { dateString: "$tenantLeaseEndDate" } },
            },
            month: {
              $month: {
                $dateFromString: { dateString: "$tenantLeaseEndDate" },
              },
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(MonthExpCntData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-agreement-details", async (req, res) => {
  let data = req.body;
  console.log(data);
  try {
    let tenantAgreementDetails = new TenantAgreementDetails(data);
    output = await tenantAgreementDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-levels", async (req, res) => {
  try {
    const staffLevelData = await ShopDetails.find({});
    res.json(staffLevelData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//Exp Year Count filter
router.post("/get-previous-years-exp", async (req, res) => {
  const { selectedVal } = req.body;

  var date = new Date(selectedVal);
  var firstDay = new Date(date.getFullYear(), 0, 1).toISOString().split("T")[0];
  try {
    const MonthExpCntData = await TenentAgreement.find({
      tenantLeaseEndDate: { $lt: firstDay },
    }).count();
    res.json(MonthExpCntData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-tenant-exp-report", async (req, res) => {
  const { monthSearch, yearSearch } = req.body;
  var monthVal = monthSearch;
  if (monthSearch < 10 && monthSearch.length === 1) {
    var monthVal = "0" + monthSearch;
  }
  var yearMonth = yearSearch + "-" + monthVal;

  try {
    const tenantExpReport = await TenantDetails.aggregate([
      {
        $lookup: {
          from: "tenantagreementsettings",
          localField: "_id",
          foreignField: "tdId",
          as: "output",
        },
      },
      {
        $project: {
          tenantName: "$tenantName",
          tenantDoorNo: "$tenantDoorNo",
          tenantFileNo: "$tenantFileNo",
          tenantLeaseEndDate: "$output.tenantLeaseEndDate",
        },
      },
      {
        $match: {
          tenantLeaseEndDate: { $regex: new RegExp("^" + yearMonth, "i") },
        },
      },
    ]);
    res.json(tenantExpReport);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-tenants", async (req, res) => {
  try {
    const tenanatData = await TenantDetails.find({});
    res.json(tenanatData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-settings", async (req, res) => {
  try {
    const tenanatSettingData = await TenantSettings.find({});
    res.json(tenanatSettingData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-door-nos", async (req, res) => {
  try {
    const doorNoData = await ShopDetails.aggregate([
      {
        $match: {
          shopStatus: {
            $eq: "Available",
          },
        },
      },
      // {
      //   $group: {
      //     // _id: "$shopId",
      //     // shopDoorNo: { $first: "$shopDoorNo" },
      //   },
      // },
    ]);
    res.json(doorNoData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
module.exports = router;
