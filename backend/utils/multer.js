const multer = require("multer");

const storage = multer.memoryStorage(); // Store files in memory

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
    cb(null, true); // Accept .xlsx files
  } else {
    cb(new Error("Invalid file type. Only .xlsx files are allowed."), false); // Reject other files
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
  fileFilter: fileFilter,
});

module.exports = upload;