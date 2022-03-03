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

  AgreementStatus: {
    type: String,
    default: "Active",
  },
});

module.exports = tenantAgreementSettings = mongoose.model(
  "tenantAgreementSettings",
  TenantAgreementDetails
);
