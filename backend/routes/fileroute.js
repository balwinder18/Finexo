const express = require("express");
const { uploadFile } = require("../controllers/filecontroller");
const upload = require("../utils/multer"); // Import Multer middleware

const router = express.Router();

// Apply Multer middleware to handle file upload
router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;