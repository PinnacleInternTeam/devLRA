const mongoose = require("mongoose");

const TenantAgreementDetails = new mongoose.Schema({
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
    required: true,
  },
});

module.exports = tenantAgreementSettings = mongoose.model(
  "tenantAgreementSettings",
  TenantAgreementDetails
);
