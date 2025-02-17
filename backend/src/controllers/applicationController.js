const fs = require("fs");
const path = require("path");
const { deleteImage } = require("../helpers/deleteFileImage");
const Application = require("../models/applicationModel");
const { error } = require("console");
const moment = require("moment");
const sendEmail = require("../helpers/mail");
const passport = require("passport");

exports.fetchApplication = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  try {
    const app = await Application.find({});
    const applications = await Application.find({
      passport: { $regex: search, $options: "i" },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    console.log(app);

    const count = await Application.countDocuments({
      passport: { $regex: search, $options: "i" },
    });

    res.json({
      applications,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalApplication: count,
    });
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

exports.fetchApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findById(id);
    console.log(application);
    res.json(application);
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

exports.fetchApplicationEnquiry = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    search1 = "",
    search2 = "",
  } = req.query;
  try {
    const applications = await Application.find({
      passport: { $regex: search, $options: "i" },
      currentN: { $regex: search1, $options: "i" },
      dob: { $regex: search2, $options: "i" },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Application.countDocuments({
      passport: { $regex: search, $options: "i" },
      currentN: { $regex: search1, $options: "i" },
      dob: { $regex: search2, $options: "i" },
    });

    res.json({
      applications,
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

exports.addApplication = async (req, res) => {
  try {
    const existingUser = await Application.findOne({
      $or: [{ email: req.body.email }, { passport: req.body.passport }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or passport already exists." });
    }

    if (!req.file || !req.body.email) {
      return res
        .status(400)
        .json({ message: "Both file and email are required." });
    }

    const image = req.file.filename;
    const imagePath = req.file.path;

    const newApplication = new Application({
      ...req.body,
      image: image,
      path: imagePath,
    });
    await newApplication.save();
    console.log(newApplication);
    res.status(201).json(newApplication);
  } catch (error) {
    console.error("Error adding application:", error);
    res.status(500).json({
      message: "Error adding application. Please try again.",
      error: error.message,
    });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await Application.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    await updatedUser.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateApplicationAdd = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;

    const file = files && files["file"] ? files["file"][0].filename : "";
    const filePath = files && files["file"] ? files["file"][0].path : "";
    const file1 = files && files["file1"] ? files["file1"][0].filename : "";
    const filePath1 = files && files["file1"] ? files["file1"][0].path : "";
    const file2 = files && files["file2"] ? files["file2"][0].filename : "";
    const filePath2 = files && files["file2"] ? files["file2"][0].path : "";
    const file3 = files && files["file3"] ? files["file3"][0].filename : "";
    const filePath3 = files && files["file3"] ? files["file3"][0].path : "";
    const file4 = files && files["file4"] ? files["file4"][0].filename : "";
    const filePath4 = files && files["file4"] ? files["file4"][0].path : "";
    const file5 = files && files["file5"] ? files["file5"][0].filename : "";
    const filePath5 = files && files["file5"] ? files["file5"][0].path : "";

    const existingUser = await Application.findById(id);
    if (!existingUser) {
      return res.status(404).send("Application not found");
    }
    const oldFilePaths = [
      existingUser.filePath,
      existingUser.filePath1,
      existingUser.filePath2,
      existingUser.filePath3,
      existingUser.filePath4,
      existingUser.filePath5,
    ];

    oldFilePaths.forEach((filePath) => {
      if (filePath) {
        deleteImage(filePath);
      }
    });
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      {
        ...req.body,
        file,
        filePath,
        file1,
        filePath1,
        file2,
        filePath2,
        file3,
        filePath3,
        file4,
        filePath4,
        file5,
        filePath5,
      },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).send(`Server Error: ${error.message}`);
  }
};

exports.updateApplicationApprove = async (req, res) => {
  try {
    const { id } = req.params;
    const appUser = await Application.findById(id);
    if (appUser) {
      const updatedUser = await Application.findByIdAndUpdate(
        id,

        { approve: moment().format("YYYY-MM-DD"), isStatus: "approved" },
        { new: true }
      );

      sendEmail(appUser.email, appUser.surname);

      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateApplicationPending = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await Application.findByIdAndUpdate(
      id,
      req.body,
      { isStatus: "pending" },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateApplicationReject = async (req, res) => {
  try {
    const { id } = req.params;
    const appUser = await Application.findById(id);
    if (appUser) {
      const updatedUser = await Application.findByIdAndUpdate(
        id,
        { isStatus: "rejected" },
        { new: true }
      );
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findByIdAndDelete({ _id: id });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const filePaths = [
      application.path,
      application.filePath,
      application.filePath1,
      application.filePath2,
      application.filePath3,
      application.filePath4,
      application.filePath5,
    ];

    for (const filePath of filePaths) {
      if (filePath) {
        try {
          await deleteImage(filePath);
        } catch (error) {
          console.error(`Error deleting file at path ${filePath}:`, error);
        }
      }
    }

    res.json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicationUser = async (req, res) => {
  try {
    const { passport } = req.params;
    const applications = await Application.findOne({ passport });
    if (applications) {
      res.json(applications);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
