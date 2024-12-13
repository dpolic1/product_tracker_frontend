import React, { useState } from "react";
import { keycloak } from "../../../common/keycloak/KeycloakConfiguration.jsx";

export default function NewProductForm({
  handleFormSubmit,
}) {
  const [predictionData, setPredictionData] = useState(null); // Store API response
  const [loading, setLoading] = useState(false); // Manage loading state
  const [gpcFamilies, setGpcFamilies] = useState([]); // Store the list of GPC families for dropdown

  // Local state for form input fields
  const [formData, setFormData] = useState({
    gtin: "",
    name: "",
    gpcSegmentCode: "",
    gpcSegmentText: "",
    gpcFamilyCode: "",
    gpcFamilyText: "",
    gpcClassCode: "",
    gpcClassText: "",
    gpcBrickCode: "",
    gpcBrickText: "",
  });

  // Handle the Predict button click and fetch data from the API
  const handlePredictClick = async () => {
    try {
      setLoading(true); // Start loading

      const response = await fetch("http://localhost:8100/predicted-categories/test", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${keycloak.token}`, // Keycloak token for authorization
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPredictionData(data); // Update state with prediction data
      } else {
        console.error("Error fetching prediction data: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching prediction data:", error);
    } finally {
      setLoading(false); // Stop loading once the request is finished
    }
  };

  // Handle the prediction button click and update the input fields
  const handlePredictionButtonClick = async (gpcBrickCode, gpcBrickText) => {
    // Update the form fields with the clicked prediction data
    setFormData({
      ...formData,
      gpcSegmentCode: gpcBrickCode,
      gpcSegmentText: gpcBrickText,
    });

    // Fetch GPC families for the selected gpcSegmentCode
    try {
      const response = await fetch(`http://localhost:8101/gpc-families/gpc-segment/${gpcBrickCode}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${keycloak.token}`, // Keycloak token for authorization
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGpcFamilies(data); // Populate the GPC family options
      } else {
        console.error("Error fetching GPC families:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching GPC families:", error);
    }

    // Remove the prediction buttons by setting predictionData to null
    setPredictionData(null);
  };

  // Handle form input change (to update local state)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="relative overflow-x-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">New Product</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-[65%_33%] gap-4">
          {/* Left Side of the Form */}
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
                value={formData.gtin}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                required
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
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                required
              />
            </div>

            {/* GPC Fields */}
            {[
              { label: "GPC Segment Code", id: "gpcSegmentCode" },
              { label: "GPC Segment Text", id: "gpcSegmentText" },
              { label: "GPC Family Code", id: "gpcFamilyCode" },
              { label: "GPC Family Text", id: "gpcFamilyText" },
              { label: "GPC Class Code", id: "gpcClassCode" },
              { label: "GPC Class Text", id: "gpcClassText" },
              { label: "GPC Brick Code", id: "gpcBrickCode" },
              { label: "GPC Brick Text", id: "gpcBrickText" },
            ].map((field, index) => (
              <div className="mb-4" key={index}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {field.label}
                </label>
                {field.id === "gpcFamilyText" ? (
                  // Render GPC Family Text as a dropdown if GPC families are available
                  <select
                    id={field.id}
                    name={field.id}
                    value={formData.gpcFamilyText}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    required
                  >
                    <option value="">Select a GPC Family</option>
                    {gpcFamilies.map((family, index) => (
                      <option key={index} value={family.text}>
                        {family.text}
                      </option>
                    ))}
                  </select>
                ) : (
                  // Render other fields as text inputs
                  <input
                    type="text"
                    id={field.id}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                    required
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right Side of the Form (Third Column) */}
          <div className="mb-4 flex flex-col">
            {/* Predict Button */}
            <button
              type="button"
              onClick={handlePredictClick}
              className="bg-blue-600 text-white px-4 py-2 mt-6 rounded-md hover:bg-blue-700"
              disabled={loading} // Disable the button while loading
            >
              {loading ? "Loading..." : "Predict"}
            </button>

            {/* Prediction Results as Buttons */}
            {predictionData && (
              <div className="mt-4 space-y-2">
                {predictionData.map((prediction, index) => (
                  <button
                    key={index}
                    type="button"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    onClick={() => handlePredictionButtonClick(prediction.gpcBrickCode, prediction.gpcBrickText)}
                  >
                    {`Prediction ${index + 1}: ${prediction.gpcBrickCode} - ${prediction.gpcBrickText} (Confidence: ${prediction.predictionConfidence.toFixed(2)})`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
}