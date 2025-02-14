// FileUploadForm.js
import React, { useState } from "react";
import api from "./api";

const FileUpload = ({ id }) => {
  const [selectedFiles, setSelectedFiles] = useState({
    file: null,
    file1: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
  });

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setSelectedFiles((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    for (let key in selectedFiles) {
      if (selectedFiles[key]) {
        formData.append(key, selectedFiles[key]);
      }
    }

    try {
      const response = await api.put(`/updateApplicationAdd/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" onChange={handleFileChange} />
      <input type="file" name="file1" onChange={handleFileChange} />
      <input type="file" name="file2" onChange={handleFileChange} />
      <input type="file" name="file3" onChange={handleFileChange} />
      <input type="file" name="file4" onChange={handleFileChange} />
      <input type="file" name="file5" onChange={handleFileChange} />
      <button type="submit">Upload Files</button>
    </form>
  );
};

export default FileUpload;
