const { deleteImage } = require("../helpers/deleteFileImage");
const Slider = require("../models/sliderModel");

exports.fetchSlider = async (req, res) => {
  const usersAll = await Slider.find();
  console.log(usersAll);
  res.json(usersAll);
};
exports.addSlider = async (req, res) => {
  try {
    const { thumbnail, title, status } = req.body;
    const image = req.file?.path;
    if (!req.file || !{ title })
      return res.status(400).json({ message: "No image uploaded" });
    const newUser = new Slider({
      thumbnail,
      title,
      image,
      status,
    });

    await newUser.save();
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSlider = await Slider.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    await updatedSlider.save();
    res.json(updatedSlider);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteSlider = async (req, res) => {
  const { id } = req.params;
  try {
    const slider = await Slider.findByIdAndDelete({ _id: id });
    if (!slider) {
      return res.status(404).json({ message: "Slider not found" });
    }
    if (slider || slider.image) {
      await deleteImage(slider.image);
    }
    res.json({ message: "Slider is deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
