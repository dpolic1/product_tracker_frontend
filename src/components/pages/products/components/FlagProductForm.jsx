import React, { useState } from "react";

export default function FlagProductForm({
  product,
  flagProduct,
  handleInputChange,
  handleFormSubmit,
  onClose,
}) {
  const [warningLevel, setWarningLevel] = useState("");
  const [description, setDescription] = useState("");

  const handleWarningLevelChange = (e) => {
    setWarningLevel(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFlagSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit({ warningLevel, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[600px]">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Flag Product</h3>
        <form onSubmit={handleFlagSubmit}>
          <div className="grid grid-cols-1 gap-4">
            {/* Product GTIN */}
            <div className="mb-4">
              <label
                htmlFor="gtin"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                GTIN
              </label>
              <input
                type="text"
                id="gtin"
                name="gtin"
                value={product.gtin}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                disabled
              />
            </div>

            {/* Product Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                disabled
              />
            </div>

            {/* Warning Level */}
            <div className="mb-4">
              <label
                htmlFor="warningLevel"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Warning Level
              </label>
              <select
                id="warningLevel"
                name="warningLevel"
                value={warningLevel}
                onChange={handleWarningLevelChange}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              >
                <option value="">Select Level</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 text-gray-600 dark:text-gray-400 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Submit Flag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}