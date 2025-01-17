const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { successResponse } = require("../helpers/responseHelpers");
const { createToken } = require("../helpers/jsonwebtoken");
const { jwtActivationKey, clientURL } = require("../secret");
const emailWithNodeMailer = require("../helpers/email");
const {
  userActionMange,
  findUsers,
  updateUserById,
  findUserById,
  deleteUserById,
  UpdatePasswordById,
  forgetPasswordByEmail,
  resetPasswordByEmail,
} = require("../services/userService");

const mongoose = require("mongoose");
const { uploadUserFile } = require("../middlewares/uploadFile");

exports.getAllUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { users, pagination } = await findUsers(search, limit, page);

    return successResponse(res, {
      statusCode: 200,
      message: "Users returned successfully",
      payload: {
        users,
        pagination,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getSingleUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const option = { password: 0 };
    const user = await findUserById(id, option);
    return successResponse(res, {
      statusCode: 200,
      message: "User returned successfully",
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.exists({ email });
    if (existUser)
      throw createError(409, "User all ready exist : Please sign in");

    const newUser = {
      name,
      email,
      password,
    };

    const token = createToken(newUser, jwtActivationKey, "30m");
    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `<h2>Hello ${name}!</h2>
      <p>Please click here this link <a href="${clientURL}/api/users/activate/${token}" target="_blank">Activate your account</a></p>`,
    };
    try {
      await emailWithNodeMailer(emailData);
    } catch (emailError) {
      next(createError(500, "Failed to send verification email"));
    }
    return successResponse(res, {
      statusCode: 201,
      message: `Please go to your (${email}) for completing your registration process`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

exports.activateUser = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) throw createError(404, "Token not found");
    const decoded = jwt.verify(token, jwtActivationKey);
    if (!decoded) throw createError(401, "Unable to verify user");
    const existUser = await User.exists({ email: decoded.email });
    if (existUser) {
      throw createError(409, "User already exists: Please sign in");
    }

    await User.create(decoded);

    return successResponse(res, {
      statusCode: 201,
      message: "User registered successfully",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      next(createError(401, "Token has expired"));
    } else if (error.name === "JsonWebTokenError") {
      next(createError(401, "Invalid token"));
    } else {
      next(error);
    }
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    await deleteUserById(id, options);
    return successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const image = req.file?.path;
    const updateUser = await updateUserById(req, userId, image);
    return successResponse(res, {
      statusCode: 200,
      message: "User updated successfully",
      payload: { updateUser },
    });
  } catch (error) {
    next(error);
  }
};

exports.manageUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const action = req.body.action;
    const successMessage = await userActionMange(userId, action);

    return successResponse(res, {
      statusCode: 200,
      message: successMessage,
    });
  } catch (error) {
    throw error;
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { email, oldPassword, newPassword, confirmedPassword } = req.body;
    const updateUser = await UpdatePasswordById(
      userId,
      email,
      oldPassword,
      newPassword,
      confirmedPassword
    );
    return successResponse(res, {
      statusCode: 200,
      message: "Password updated successfully",
      payload: { updateUser },
    });
  } catch (error) {
    throw error;
  }
};

exports.forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await forgetPasswordByEmail(email);
    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your (${email}) for reset the password`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    await resetPasswordByEmail(token, password);

    return successResponse(res, {
      statusCode: 200,
      message: "Password reset successfully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};
