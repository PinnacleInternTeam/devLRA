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
  console.log(data);
  try {
    let tenantDetails = new TenantDetails(data);
    output = await tenantDetails.save();
    res.send(output);
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

module.exports = router;
