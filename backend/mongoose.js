const mongoose = require("mongoose");

const initializeMongoose = async () => {
  mongoose.set("strictQuery", false);
  if (!mongoose.connections[0].readyState) {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => {
        console.log("⚡️ Connected to DB!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.initializeMongoose = initializeMongoose;
