const Salary = require("../models/salaryModel");

exports.fetchSalary = async (req, res) => {
  try {
    console.log("Fetching all salaries...");
    const allSalary = await Salary.find();
    console.log("Salary data:", allSalary);
    res.json(allSalary);
  } catch (error) {
    console.error("Error fetching salaries:", error.message);
    res
      .status(500)
      .json({
        message: "An error occurred while fetching salaries.",
        error: error.message,
      });
  }
};

exports.addSalary = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if a salary record with the same name already exists
    const existingRecord = await Salary.findOne({ name });

    if (existingRecord) {
      return res.status(400).json({ message: "Salary record already exists" });
    }

    // If no such record exists, create a new one
    const newSalary = new Salary({ name });
    await newSalary.save();

    // Respond with the newly created salary record
    res.status(201).json(newSalary);
  } catch (error) {
    // Log the error for debugging
    console.error("Error adding salary record:", error.message);

    res
      .status(500)
      .json({ message: "An error occurred while adding the salary record." });
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
