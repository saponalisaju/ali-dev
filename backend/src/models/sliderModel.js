const mongoose = require("mongoose");
const { defaultPath } = require("../../secret");

const sliderSchema = new mongoose.Schema(
  {
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true, default: defaultPath },
    path: { type: String },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);
const Slider = mongoose.model("Slider", sliderSchema);
module.exports = Slider;
