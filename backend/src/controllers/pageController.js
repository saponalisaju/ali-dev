const Page = require("../models/pageModel");

exports.fetchPage = async (req, res) => {
  try {
    const pages = await Page.find({});
    res.json(pages);
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

exports.addPage = async (req, res) => {
  try {
    const newPage = new Page(req.body);
    await newPage.save();
    res.status(201).json(newPage);
  } catch (error) {
    console.error("Error adding page:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while adding the page." });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPage = await Page.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    await updatedPage.save();
    res.status(200).json(updatedPage);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
exports.deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePage = await Page.findByIdAndDelete(id);
    if (!deletePage) {
      return res.status(404).json({ message: "Page not found" });
    }
    res.status(200).json({ message: "Page is deleted" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
