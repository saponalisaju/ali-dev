const UserManagement = require("../models/userManageModel");

exports.fetchUserManagement = async (req, res) => {
  const usersAll = await UserManagement.find();
  res.json(usersAll);
};

exports.addUserManagement = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserManagement.findOne({ email });
    if (user) return res.status(400).json({ message: "User all ready exists" });
    const newUser = new UserManagement({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
