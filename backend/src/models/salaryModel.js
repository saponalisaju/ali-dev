const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Salary = mongoose.model("Salary", salarySchema);
module.exports = Salary;
