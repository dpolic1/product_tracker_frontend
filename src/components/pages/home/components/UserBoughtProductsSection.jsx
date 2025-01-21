import React, { useEffect, useState } from "react";
import { keycloak } from "../../../common/keycloak/KeycloakConfiguration";


export default function UserBoughtProductsSection() {
  const [userBoughtProducts, setUserBoughtProducts] = useState([]);

  useEffect(() => {
    const fetchUserBoughtProducts = async () => {
      try {
        const response = await fetch("http://localhost:8200/bought-products/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user bought products");
        }

        const data = await response.json();
        setUserBoughtProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchUserBoughtProducts();
  }
    , []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const gtin = formData.get("gtin");
    console.log(gtin);
    // Send the GTIN to the backend
  }

  return <div>
    <form onSubmit={handleSubmit} className="flex gap-12 items-center w-full bg-gray-100 dark:bg-gray-800 rounded-md shadow-md p-3">
      <input
        type="text"
        name="gtin"
        placeholder="Enter new product by GTIN"
        className="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
      />
      <button
        className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-4/5`}
      >
        Submit
      </button>
    </form>
    <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md pt-1">
      <div>
        <h1 className="text-lg font-semibold p-4 text-white">Recently Bought Products</h1>
      </div>
      <div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {userBoughtProducts.length > 0 ? (
              userBoughtProducts.map((product, index) => (
                <tr
                  key={product.id || index}
                  className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700`}
                >
                  <td className="px-4 py-3">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {product.dateCreated}
                    </div>
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {product.productName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {product.gpcSegmentText}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>


  </div>
}