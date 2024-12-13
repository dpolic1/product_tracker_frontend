import React from "react";

export default function ExcelImportButton() {
  const handleExcelImport = () => {
    // Add logic to handle Excel file import
    console.log("Excel import triggered");
  };

  return (
    <button
      onClick={handleExcelImport}
      className="bg-green-600 text-white rounded-md p-3 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      Import Excel
    </button>
  );
}
