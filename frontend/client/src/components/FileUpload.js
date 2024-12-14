import React, { useState, useRef } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null); // Reference to the file input element

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadedFiles([...uploadedFiles, response.data]);
      setFile(null); // Clear the file state after upload
      fileInputRef.current.value = ''; // Reset the file input field
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} ref={fileInputRef} />
      <button onClick={handleFileUpload}>Upload</button>
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file.id}>
            <a href={`http://localhost:5000/uploads/${file.name}`} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
