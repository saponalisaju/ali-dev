const fs = require("fs");
const path = require("path");
const { deleteImage } = require("../helpers/deleteFileImage");
const Application = require("../models/applicationModel");
const { error } = require("console");
const moment = require("moment");
const sendEmail = require("../helpers/mail");

exports.fetchApplication = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  try {
    const applications = await Application.find({
      passport: { $regex: search, $options: "i" },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

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
  const { page = 1, limit = 10, search = "" } = req.query;
  try {
    const applications = await Application.find({
      passport: { $regex: search, $options: "i" },
      currentN: { $regex: search, $options: "i" },
      dob: { $regex: search, $options: "i" },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Application.countDocuments({
      passport: { $regex: search, $options: "i" },
      currentN: { $regex: search, $options: "i" },
      dob: { $regex: search, $options: "i" },
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
  const image = req.file?.filename;
  const path = req.file?.path;
  try {
    const existingUser = await Application.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!req.file || !req.body.email) {
      return res.status(400).json({ message: "File and email are required." });
    }
    const newApplication = new Application({
      ...req.body,
      image: image,
      path: path,
    });
    await newApplication.save();
    console.log(newApplication);
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const file = req.file?.filename;
    const filePath = req.file?.path;

    const existingUser = await Application.findById(id);
    if (!existingUser) {
      return res.status(404).send("Application not found");
    }

    const updatedUser = await Application.findByIdAndUpdate(
      id,
      { ...req.body, file, filePath },
      {
        new: true,
      }
    );

    if (file && existingUser.filePath) {
      try {
        await deleteImage(existingUser.filePath);
      } catch (error) {
        return res.status(500).send(`Error deleting file: ${error.message}`);
      }
    }

    await updatedUser.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
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

exports.updateApplicationView = async (req, res) => {
  const { id } = req.params;
  const file = req.file?.filename;
  const filePath = req.file?.path;

  try {
    if (!id) {
      throw new Error("No ID provided");
    }

    const updatedUser = await Application.findByIdAndUpdate(
      id,
      { ...req.body, file: file, filePath: filePath },
      { new: true }
    );
    console.log("hello", updatedUser);
    res.json(updatedUser);
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
    if (application.path) {
      await deleteImage(application.path);
    }

    if (application.filePath) {
      await deleteImage(application.filePath);
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
