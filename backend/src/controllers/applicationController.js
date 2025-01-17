const fs = require("fs");
const path = require("path");
const { deleteImage } = require("../helpers/deleteFileImage");
const Application = require("../models/applicationModel");
const { error } = require("console");

exports.serveApplicationPage = (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
};

exports.fetchApplication = async (req, res) => {
  const applicationUsers = await Application.find();
  res.json(applicationUsers);
};
exports.addApplication = async (req, res) => {
  const image = req.file?.path;
  try {
    if (!req.file || !{ email: req.body.email }) {
      return res.status(400).json({ message: error.message });
    }
    const newApplication = new Application({ ...req.body, image: image });
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

exports.deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findByIdAndDelete({ _id: id });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    if (application || application.image) {
      await deleteImage(application.image);
    }
    res.json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
