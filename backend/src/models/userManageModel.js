const mongoose = require("mongoose");

const userManagementSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    idAdmin: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const UserManagement = mongoose.model("UserManagement", userManagementSchema);
module.exports = UserManagement;
