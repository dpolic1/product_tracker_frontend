import React from "react";

export default function ProductsPaginationBar({ currentPage, totalPages, handlePageChange }) {
  return (
    <div className="mx-auto flex items-center justify-between mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md w-[50%]">
      {/* Previous Button */}
      {currentPage > 0 ? (
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      ) : (
        <div className="w-24"></div> // Placeholder for alignment
      )}

      {/* Current Page Info */}
      <div className="flex-grow text-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Page {currentPage + 1} of {totalPages}
        </span>
      </div>

      {/* Next Button */}
      {currentPage < totalPages - 1 ? (
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      ) : (
        <div className="w-24"></div> // Placeholder for alignment
      )}
    </div>
  );
}