const Designation = require("../models/designationModel");

exports.fetchDesignation = async (req, res) => {
  try {
    const designations = await Designation.find({});
    res.status(200).json(designations);
  } catch (error) {
    console.error("Error fetching designations:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching designations.",
      error: error.message,
    });
  }
};

exports.addDesignation = async (req, res) => {
  try {
    const newDesignation = new Designation(req.body);
    await newDesignation.save();
    res.status(201).json(newDesignation);
  } catch (error) {
    console.error("Error adding designation:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.editDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await Designation.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    await updatedUser.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteDesignation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDesignation = await Designation.findByIdAndDelete(id);
    if (!deletedDesignation) {
      return res.status(404).json({ message: "Designation not found" });
    }
    res.json({ message: "Designation deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
