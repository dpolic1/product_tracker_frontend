import React, { useEffect, useState } from "react";
import ProductsTable from "./components/ProductsTable";
import ProductsPaginationBar from "./components/ProductsPaginationBar";

export default function Products() {
  const [products, setProducts] = useState([]); // Product list
  const [loading, setLoading] = useState(true); // Loading state
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Debounced search term
  const [currentPage, setCurrentPage] = useState(0); // Current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Total pages

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Wait 0.5s after user stops typing

    return () => {
      clearTimeout(handler); // Clean up the previous timeout
    };
  }, [searchTerm]); // Only runs when searchTerm changes

  // Fetch products when debounced search term or page changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading state to true before request

      try {
        let url;
        if (debouncedSearchTerm) {
          url = `http://localhost:8101/products/search/name?keyword=${debouncedSearchTerm}&page=${currentPage}&size=10`;
        } else {
          url = `http://localhost:8101/products/search/name?page=${currentPage}&size=10`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.content); // Set the products list
        setTotalPages(data.totalPages); // Set the total number of pages
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchProducts(); // Call fetch when debouncedSearchTerm or currentPage changes
  }, [debouncedSearchTerm, currentPage]); // Trigger the effect when debouncedSearchTerm or currentPage changes

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage); // Update the current page
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="flex items-center justify-between mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Set searchTerm as user types
          placeholder="Search for products..."
          className="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
        />
      </div>

      {/* Product Table */}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <ProductsTable products={products} />
          <ProductsPaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
