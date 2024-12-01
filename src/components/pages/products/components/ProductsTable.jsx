import React, { useState } from "react";
import EditProductForm from "./EditProductForm";

export default function ProductsTable({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Open the edit modal with the selected product's data
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Product:", editedProduct);
    setSelectedProduct(null); // Close the modal
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">GTIN</th>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">GPC Brick Code</th>
              <th scope="col" className="px-6 py-3">GPC Brick Text</th>
              <th scope="col" className="px-6 py-3">Manually Assigned GPC</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product.gtin || index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">{product.gtin}</td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.gpcBrickCode}</td>
                  <td className="px-6 py-4">{product.gpcBrickText || "N/A"}</td>
                  <td className="px-6 py-4">{product.manuallyAssignedGpcFlag ? "Yes" : "No"}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openEditModal(product)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <EditProductForm
          product={selectedProduct}
          editedProduct={editedProduct}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
