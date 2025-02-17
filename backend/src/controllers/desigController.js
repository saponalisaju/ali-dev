const Designation = require("../models/designationModel");

exports.fetchDesignation = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  try {
    const designations = await Designation.find({
      name: { $regex: search, $options: "i" },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Designation.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.json({
      designations,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

exports.addDesignation = async (req, res) => {
  const { name } = req.body;
  try {
    const newDesignation = new Designation({ name });
    await newDesignation.save();
    res.status(201).json(newDesignation);
  } catch (error) {
    console.error("Error adding designation:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.editDesignation = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedDesignation = await Designation.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedDesignation) {
      return res.status(404).json({ message: "Designation not found" });
    }
    res.status(200).json(updatedDesignation);
  } catch (error) {
    console.error("Error updating designation:", error);
    res.status(500).json({ message: error.message });
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
