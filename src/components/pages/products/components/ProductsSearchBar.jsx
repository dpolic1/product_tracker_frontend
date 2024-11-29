import React from "react";

export default function ProductsSearchBar({ onSearch }) {
  const handleInputChange = (event) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <div className="flex items-center justify-between mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
        onChange={handleInputChange}
      />
    </div>
  );
}