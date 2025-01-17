const Company = require("../models/companyModel");

exports.fetchCompany = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching companies.",
      error: error.message,
    });
  }
};

exports.addCompany = async (req, res) => {
  try {
    const { name } = req.body;
    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists" });
    }

    const newCompany = new Company({ name });
    await newCompany.save();

    res.status(201).json(newCompany);
  } catch (error) {
    console.error("Error adding company:", error.message);

    res
      .status(500)
      .json({ message: "An error occurred while adding the company." });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    await updatedUser.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json({ message: "Company deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
