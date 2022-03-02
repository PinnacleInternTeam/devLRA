const mongoose = require("mongoose");

const TenantAgreementDetails = new mongoose.Schema({
  tdId: {
    type: String,
    // required: true,
  },
  tenantRentAmount: {
    type: Number,
    required: true,
  },
  tenantLeaseStartDate: {
    type: String,
    required: true,
  },
  tenantLeaseEndDate: {
    type: String,
    // required: true,
  },
  tenantFileNo: {
    type: String,
    // required: true,
  },
  tenantDoorNo: {
    type: String,
    // required: true,
  },
});

module.exports = tenantAgreementSettings = mongoose.model(
  "tenantAgreementSettings",
  TenantAgreementDetails
);
