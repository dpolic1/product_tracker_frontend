import React, { useEffect, useState, setLoading } from "react";
import { keycloak } from "../../../common/keycloak/KeycloakConfiguration";

export default function RecentlyFlaggedProductsTable() {
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8101/gpc-segments`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("GPC Families:", data);
          setCategories(data); // Update GPC families state
          console.log("GPC Families:", categories);
        } else {
          console.error("Error fetching GPC families: ", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching GPC families:", error);
      }
    };

    fetchCategories()
  }, []);

  

  const handleCategoryChange = async (event) => {
    const selectedCategory = event.target.value;
    try {
      const response = await fetch(`http://localhost:8200/bought-products/category/${selectedCategory}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Filtered products:", data);
        setFilteredProducts(data); // Update GPC families state
      } else {
        console.error("Error : ", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
    <div className="mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Recently Flagged Products</h3>
      </div>
      <select
        id="categoryFilter"
        name="categoryFilter"
        onChange={handleCategoryChange}
        className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.code} value={category.code}>
            {category.text}
          </option>
        ))}
      </select>
    </div>

    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
      <tbody>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <tr
              key={product.id || index}
              className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 ${index === filteredProducts.length - 1 ? 'rounded-b-lg' : 'border-b'} dark:border-gray-700`}
            >
              <td className="px-6 py-4">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {product.dateCreated}
                </div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {product.productName}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {product.gpcSegmentText}
                </div>
                <div className="text-sm text-gray-500 dark:text-red-400">
                  {product.warningLevel}
                </div>
                <div className="text-sm text-red-500 dark:text-yellow-400">
                  {product.description}
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 rounded-b-lg">
              Choose a category.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
}