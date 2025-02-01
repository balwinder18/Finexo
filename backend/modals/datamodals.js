const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Amount: { type: Number, required: true },
  Date: { type: Date, required: true },
  Verified: { type: String, required: true },
  sheetName: { type: String, required: true },
});

module.exports = mongoose.model("Data", dataSchema);