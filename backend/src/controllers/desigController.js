const Designation = require("../models/designationModel");

exports.fetchDesignation = async (req, res) => {
  try {
    const usersAll = await Designation.find();
    if (!usersAll || usersAll.length === 0) {
      return res.status(404).json({ message: "No designations found" });
    }
    res.status(200).json(usersAll);
  } catch (error) {
    console.error("Error fetching designations:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addDesignation = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await Designation.findOne({ name });
    if (user) return res.status(400).json({ message: "User all ready exists" });
    const newUser = new Designation({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
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
