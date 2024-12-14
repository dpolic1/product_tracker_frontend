import React, { useState } from "react";
import EditProductForm from "./EditProductForm";
import FlagProductForm from "./FlagProductForm";
import { keycloak } from "../../../common/keycloak/KeycloakConfiguration";

export default function ProductsTable({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
  const [flaggedProduct, setFlaggedProduct] = useState(null);

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

// Open the flag modal with the selected product's data
const openFlagModal = (product) => {
  setFlaggedProduct(product);
};

// Handle form submission for edit product
const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log("Updated Product:", editedProduct);
  setSelectedProduct(null); // Close the modal
};

const handleFlagSubmit = async ({ warningLevel, description }) => {
  try {
    const response = await fetch("http://localhost:8100/products/flag-product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gtin: flaggedProduct.gtin,
        warningLevel,
        description
      }),
    });

    if (response.ok) {
      setFlaggedProduct(null);
    } else {
      console.error("Failed to flag product:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error flagging product:", error);
  }
};


return (
  <>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">GTIN</th>
            <th scope="col" className="px-6 py-3">Product Name</th>
            <th scope="col" className="px-6 py-3">GPC Brick</th>
            <th scope="col" className="px-6 py-3">Manually Assigned GPC</th>
            <th scope="col" className="px-6 py-3">Action</th>
            <th scope="col" className="px-6 py-3">Flag Product</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr
                key={product.gtin || index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-3">{product.gtin}</td>
                <td className="px-6 py-3">{product.name}</td>
                <td className="px-6 py-3">{product.gpcBrickText || "N/A"}</td>
                <td className="px-6 py-3">{product.manuallyAssignedGpcFlag ? "Yes" : "No"}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => openEditModal(product)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => openFlagModal(product)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Flag
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-3 text-center text-gray-500 dark:text-gray-400">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Edit Product Modal */}
    {selectedProduct && (
      <EditProductForm
        product={selectedProduct}
        editedProduct={editedProduct}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        onClose={() => setSelectedProduct(null)}
      />
    )}

    {/* Flag Product Modal */}
    {flaggedProduct && (
      <FlagProductForm
        product={flaggedProduct}
        flagProduct={flaggedProduct}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFlagSubmit}
        onClose={() => setFlaggedProduct(null)}
      />
    )}
  </>
);
}