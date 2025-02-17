const UserManagement = require("../models/userManageModel");

exports.fetchUserManagement = async (req, res) => {
  try {
    const users = await UserManagement.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user management records:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching user management records.",
      error: error.message,
    });
  }
};

exports.addUserManagement = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserManagement.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUserManagement = new UserManagement({ name, email, password });
    await newUserManagement.save();
    return res.status(201).json(newUserManagement);
  } catch (error) {
    console.error("Error adding user management record:", error.message);
    return res.status(500).json({
      message: "An error occurred while adding the user management record.",
    });
  }
};

exports.updateUserManagement = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUserManagement = await UserManagement.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    await updatedUserManagement.save();
    res.json(updatedUserManagement);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteUserManagement = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUserManagement = await UserManagement.findByIdAndDelete(id);
    if (!deletedUserManagement) {
      return res.status(404).json({ message: "UserManagement not found" });
    }
    res.json({ message: "UserManagement deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
