const xlsx = require("xlsx");
const Data = require("../modals/datamodals");
const { validateData } = require("../utils/validation");

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetNames = workbook.SheetNames;
    const errors = [];

    for (const sheetName of sheetNames) {
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);

      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const validationErrors = validateData(row, sheetName);

        if (validationErrors.length > 0) {
          errors.push({ sheetName, rowNumber: i + 2, errors: validationErrors });
        } else {
          await Data.create({ ...row, sheetName });
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    res.status(200).json({ message: "File imported successfully" });
  } catch (error) {
    console.error("Error in uploadFile:", error); // Log the error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { uploadFile };