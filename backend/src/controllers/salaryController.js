const Salary = require("../models/salaryModel");

exports.fetchSalary = async (req, res) => {
  const allSalary = await Salary.find();
  console.log(allSalary);
  res.json(allSalary);
};
exports.addSalary = async (req, res) => {
  try {
    const { name } = req.body;
    //const user = await Salary.findOne({ name });
    //if (user) return res.status(400).json({ message: "User all ready exists" });
    const newUser = new Salary({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSalary = await Salary.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    await updatedSalary.save();
    res.json(updatedSalary);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.deleteSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSalary = await Salary.findByIdAndDelete(id);
    if (!deleteSalary) {
      res.status(404).json({ message: "Salary not found" });
    }
    res.json({ message: "Salary is deleted" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
