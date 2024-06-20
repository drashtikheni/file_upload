const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    link: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: Number, required: true },
    createdBy: { type: mongoose.Types.ObjectId, required: true },
    publicId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("media", mediaSchema);
