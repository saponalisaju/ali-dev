require("dotenv").config();

const mongoose = require("mongoose");
const { defaultImagePath } = require("../../secret");

const applicationSchema = mongoose.Schema(
  {
    surname: { type: String, required: true },
    givenN: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    nationalId: { type: String, required: true },
    sex: { type: String, required: true, enum: ["Male", "Female"] },
    dob: { type: Date, required: true },
    birthCity: { type: String, required: true },
    currentN: { type: String, required: true },
    identification: { type: String, required: true },
    company: { type: String, required: true },
    dutyDuration: { type: String, required: true },
    jobTitle: { type: String, required: true },
    salary: { type: String, required: true },
    image: { type: String, default: defaultImagePath, required: true },
    path: { type: String },
    passport: { type: String, required: true },
    issuedCountry: { type: String, required: true },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
