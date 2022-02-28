const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userStatus: {
    type: String,
    required: true,
  },
  userDate: {
    type: String,
    required: true,
  },
});

module.exports = UserDetails = mongoose.model("userdetails", StaffSchema);
