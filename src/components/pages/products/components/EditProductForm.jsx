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
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[600px]">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Edit Product</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* GTIN */}
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

            {/* Product Name */}
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

            {/* GPC Segment Code */}
            <div className="mb-4">
              <label htmlFor="gpcSegmentCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                GPC Segment Code
              </label>
              <input
                type="text"
                id="gpcSegmentCode"
                name="gpcSegmentCode"
                value={editedProduct.gpcSegmentCode || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>

            {/* GPC Segment Text */}
            <div className="mb-4">
              <label htmlFor="gpcSegmentText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                GPC Segment Text
              </label>
              <input
                type="text"
                id="gpcSegmentText"
                name="gpcSegmentText"
                value={editedProduct.gpcSegmentText || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>

            {/* GPC Family Code */}
            <div className="mb-4">
              <label htmlFor="gpcFamilyCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                GPC Family Code
              </label>
              <input
                type="text"
                id="gpcFamilyCode"
                name="gpcFamilyCode"
                value={editedProduct.gpcFamilyCode || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>

            {/* GPC Family Text */}
            <div className="mb-4">
              <label htmlFor="gpcFamilyText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                GPC Family Text
              </label>
              <input
                type="text"
                id="gpcFamilyText"
                name="gpcFamilyText"
                value={editedProduct.gpcFamilyText || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>

            {/* GPC Class Code */}
            <div className="mb-4">
              <label htmlFor="gpcClassCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                GPC Class Code
              </label>
              <input
                type="text"
                id="gpcClassCode"
                name="gpcClassCode"
                value={editedProduct.gpcClassCode || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>

            {/* GPC Class Text */}
            <div className="mb-4">
              <label htmlFor="gpcClassText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                GPC Class Text
              </label>
              <input
                type="text"
                id="gpcClassText"
                name="gpcClassText"
                value={editedProduct.gpcClassText || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>

            {/* GPC Brick Code */}
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

            {/* GPC Brick Text */}
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

            {/* Manually Assigned GPC Flag */}
            <div className="mb-4 col-span-2">
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
