const { deleteImage } = require("../helpers/deleteFileImage");
const Slider = require("../models/sliderModel");

exports.fetchSlider = async (req, res) => {
  try {
    const usersAll = await Slider.find();
    console.log(usersAll);
    res.json(usersAll);
  } catch (error) {
    console.error("Error fetching sliders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.addSlider = async (req, res) => {
  try {
    const { thumbnail, title, status } = req.body;
    const image = req.file?.path;
    if (!req.file || !title) {
      return res.status(400).json({ message: "Image and title are required" });
    }
    const newSlider = new Slider({ thumbnail, title, image, status });
    await newSlider.save();
    console.log("New slider added:", newSlider);
    res.status(201).json(newSlider);
  } catch (error) {
    console.error("Error adding slider:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const sliderExist = await Slider.findById(id);
    if (!sliderExist) {
      return res.status(404).json({ message: "Slider not found" });
    }
    const updatedSlider = await Slider.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updatedSlider);
  } catch (error) {
    console.error("Error updating slider:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSlider = async (req, res) => {
  const { id } = req.params;
  try {
    const slider = await Slider.findByIdAndDelete(id);
    if (!slider) {
      return res.status(404).json({ message: "Slider not found" });
    }
    if (slider.image) {
      try {
        await deleteImage(slider.image);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
    res.json({ message: "Slider is deleted" });
  } catch (error) {
    console.error("Error deleting slider:", error);
    res.status(500).json({ message: error.message });
  }
};
