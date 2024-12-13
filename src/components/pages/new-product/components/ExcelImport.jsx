import React, { useRef, useState } from "react";
import { keycloak } from "../../../common/keycloak/KeycloakConfiguration.jsx";

export default function ExcelImportButton() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleSubmit = async () => {
    if (!fileInputRef.current.files.length) {
      alert("Please select a file to upload.");
      return;
    }

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8101/products/create/excel", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
        alert("File uploaded successfully!");
      } else {
        console.error("Error uploading file", response.statusText);
        alert("Failed to upload the file.");
      }
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Failed to upload the file.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept=".xlsx, .xls"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button
        onClick={handleButtonClick}
        className="bg-green-600 text-white rounded-md p-3 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Import Excel
      </button>
      {fileName && <p className="mt-2 text-gray-700">Selected File: {fileName}</p>}
      {fileName && (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded-md p-3 mt-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      )}
    </div>
  );
}
