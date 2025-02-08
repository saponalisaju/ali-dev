const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String },
  },
  { timestamps: true }
);

// pageSchema.pre("save", function (next) {
//   const doc = this;
//   Counter.findByIdAndUpdate(
//     { _id: "pageId" },
//     { $inc: { seq: 1 } },
//     { new: true, upsert: true },
//     function (error, counter) {
//       if (error) return next(error);
//       doc.serial = counter.seq;
//       next();
//     }
//   );
// });

const Page = mongoose.model("Page", pageSchema);
module.exports = Page;
