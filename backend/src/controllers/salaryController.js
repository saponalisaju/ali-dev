const Salary = require("../models/salaryModel");

exports.fetchSalary = async (req, res) => {
  try {
    const salary = await Salary.find({});
    res.status(200).json(salary);
  } catch (error) {
    console.error("Error fetching companies:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching companies.",
      error: error.message,
    });
  }
};

exports.addSalary = async (req, res) => {
  try {
    const newSalary = new Salary(req.body);
    await newSalary.save();
    res.status(201).json(newSalary);
  } catch (error) {
    console.error("Error adding salary record:", error.message);
    res.status(500).json({
      message: "An error occurred while adding the salary record.",
      error: error.message,
    });
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
