const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const TenantDetails = require("../../models/TenantDetails");
const TenantSettings = require("../../models/TenantSettings");
const ShopDetails = require("../../models/ShopDetails");
const TenantAgreementDetails = require("../../models/TenantAgreementDetails");

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
    console.log(output._id);
    const finalData1 = {
      tdId: output._id,
      tenantRentAmount: data.tenantRentAmount,
      tenantLeaseStartDate: data.tenantLeaseStartDate,
      tenantLeaseEndDate: data.tenantLeaseEndDate,
    };
    let tenantAgreementDetails = new TenantAgreementDetails(finalData1);
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
      // { $sort: { _id: -1 } },
    ]);
    res.json(tenantData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-door-nos", async (req, res) => {
  try {
    const doorNoData = await ShopDetails.find({
      $group: {
        _id: "$shopId",
        shopDoorNo: { $first: "$shopDoorNo" },
      },
    });
    res.json(doorNoData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-agreement-details", async (req, res) => {
  let data = req.body;
  // console.log(data);
  try {
    let tenantAgreementDetails = new TenantAgreementDetails(data);
    output = await tenantAgreementDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
module.exports = router;
