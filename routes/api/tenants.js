const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
//const StaffPerf = require("../../models/staffPerformence");
const TenantDetails = require("../../models/TenantDetails");
const TenantSettings = require("../../models/TenantSettings");
const ShopDetails = require("../../models/ShopDetails");
const TenantAgreementDetails = require("../../models/TenantAgreementDetails");

router.post("/add-tenant-details", async (req, res) => {
  let data = req.body;

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
module.exports = router;
