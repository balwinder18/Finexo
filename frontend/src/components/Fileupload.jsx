
import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && selectedFile.size <= 2 * 1024 * 1024) {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please upload a valid .xlsx file (max 2 MB)");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file to FormData

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData, // Send FormData in the request body
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const result = await response.json();
      console.log("File uploaded successfully:", result);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUpload;