const mongoose = require("mongoose");
const userAuthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const UserAuth = mongoose.model("UserAuth", userAuthSchema);

module.exports = UserAuth;
