const UserManagement = require("../models/userManageModel");

exports.fetchUserManagement = async (req, res) => {
  try {
    console.log("Fetching all user management records...");
    const usersAll = await UserManagement.find();
    console.log("User management data:", usersAll);
    res.json(usersAll);
  } catch (error) {
    console.error("Error fetching user management records:", error.message);
    res
      .status(500)
      .json({
        message: "An error occurred while fetching user management records.",
        error: error.message,
      });
  }
};

exports.addUserManagement = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await UserManagement.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // If no such user exists, create a new one
    const newUser = new UserManagement({ name, email, password });
    await newUser.save();

    // Respond with the newly created user management record
    res.status(201).json(newUser);
  } catch (error) {
    // Log the error for debugging
    console.error("Error adding user management record:", error.message);

    return res
      .status(500)
      .json({
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
