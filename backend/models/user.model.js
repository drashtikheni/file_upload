const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", usersSchema);
