import React from "react";

export default function EditProductForm({
  product,
  editedProduct,
  handleInputChange,
  handleFormSubmit,
  onClose,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Edit Product</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="gtin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              GTIN
            </label>
            <input
              type="text"
              id="gtin"
              name="gtin"
              value={editedProduct.gtin}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              disabled
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gpcBrickCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              GPC Brick Code
            </label>
            <input
              type="text"
              id="gpcBrickCode"
              name="gpcBrickCode"
              value={editedProduct.gpcBrickCode}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gpcBrickText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              GPC Brick Text
            </label>
            <input
              type="text"
              id="gpcBrickText"
              name="gpcBrickText"
              value={editedProduct.gpcBrickText || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="manuallyAssignedGpcFlag"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Manually Assigned GPC Flag
            </label>
            <select
              id="manuallyAssignedGpcFlag"
              name="manuallyAssignedGpcFlag"
              value={editedProduct.manuallyAssignedGpcFlag ? "true" : "false"}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
