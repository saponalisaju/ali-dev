const Page = require("../models/pageModel");

exports.fetchPage = async (req, res) => {
  const allPages = await Page.find();
  res.json(allPages);
};
exports.addPage = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = await Page.findOne({ title });
    if (user) return res.status(400).json({ message: "User all ready exists" });
    const newUser = new Page({ title, content });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      res.status(404).json({ message: "Page not found" });
    }
    res.status(200).json({ message: "Page is deleted" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
