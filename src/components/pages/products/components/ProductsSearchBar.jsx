import React, { useState, useEffect } from "react";

export default function ProductsSearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Update the debounced search term after a delay of 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    // Cleanup the timeout if the user types again within 500ms
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Update search term based on input
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex items-center justify-between mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
      <input
        type="text"
        placeholder="Search products by name..."
        value={searchTerm} // Controlled input
        className="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
        onChange={handleInputChange}
      />
    </div>
  );
}
