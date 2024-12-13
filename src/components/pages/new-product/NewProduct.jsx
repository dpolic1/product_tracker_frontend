import React from "react";
import NewProductForm from "./components/NewProductForm";
import ExcelImport from "./components/ExcelImport";

export default function NewProduct() {
  return (
    <div className="w-full flex flex-row space-x-4 px-6">
      {/* Left Side - Form */}
      <div className="w-4/5">
        <NewProductForm />
      </div>

      {/* Right Side - Excel Import Button */}
      <div className="w-1/5 flex justify-center items-center">
        <ExcelImport />
      </div>
    </div>
  );
}