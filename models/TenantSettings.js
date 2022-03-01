const mongoose = require("mongoose");

const TenantSettings = new mongoose.Schema({
  hikePercentage: {
    type: Number,
    Required: true,
  },
  stampDuty: {
    type: Number,
    required: true,
  },
  leaseTimePeriod: {
    type: Number,
    required: true,
  },
});

module.exports = tenantSettings = mongoose.model(
  "tenantSettings",
  TenantSettings
);
