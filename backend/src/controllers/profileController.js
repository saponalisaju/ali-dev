const { createToken } = require("../helpers/jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { jwtActivationKey } = require("../secret");

exports.createProfile = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Passwords do not match" });
  }
  try {
    const user = await User.exists({ email });
    if (!user) throw createError(409, "User all ready exist : Please sign in");

    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: true,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating admin user:", error);
    res
      .status(500)
      .json({ success: false, message: "Error creating admin user" });
  }
};
