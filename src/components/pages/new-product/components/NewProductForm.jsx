import React, { useState } from "react";
import { keycloak } from "../../../common/keycloak/KeycloakConfiguration.jsx";

export default function NewProductForm({
  handleFormSubmit,
}) {
  const [predictionData, setPredictionData] = useState(null); // Store API response for predictions
  const [loading, setLoading] = useState(false); // Manage loading state
  const [gpcFamilies, setGpcFamilies] = useState([]); // Store the list of GPC families
  const [gpcClasses, setGpcClasses] = useState([]); // Store the list of GPC classes
  const [gpcBricks, setGpcBricks] = useState([]); // Store the list of GPC bricks
  const [formComplete, setFormComplete] = useState(false); // Check if the form is complete

  // Local state for form input fields
  const [formData, setFormData] = useState({
    gtin: "",
    name: "",
    gpcSegmentText: "",
    gpcFamilyText: "",
    gpcClassText: "",
    gpcBrickText: "",
    gpcSegmentCode: "",  // Store the code of the GPC segment
    gpcFamilyCode: "",   // Store the code of the GPC family
    gpcClassCode: "",    // Store the code of the GPC class
    gpcBrickCode: "",    // Store the code of the GPC brick
  });

  // Handle the Predict button click and fetch data from the API
  const handlePredictClick = async () => {
    try {
      setLoading(true); // Start loading

      const response = await fetch("http://localhost:8200/predicted-categories/test", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${keycloak.token}`, // Keycloak token for authorization
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Prediction data:", data);
        setPredictionData(data); // Update state with prediction data
      } else {
        console.error("Error fetching prediction data: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching prediction data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle the prediction button click and update the input fields
  const handlePredictionButtonClick = async (prediction) => {
    setFormData({
      ...formData,
      gpcSegmentText: prediction.gpcSegmentText,
      gpcSegmentCode: prediction.gpcSegmentCode,
      gpcFamilyText: "",
      gpcFamilyCode: "",
      gpcClassText: "",
      gpcClassCode: "",
      gpcBrickText: "",
      gpcBrickCode: "", // Clear all related fields
    });

    // Call API to fetch GPC families based on the segment code
    await fetchGpcFamilies(prediction.gpcSegmentCode);
  };

  // Fetch GPC families based on the gpcSegmentCode
  const fetchGpcFamilies = async (segmentCode) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8101/gpc-families/gpc-segment/${segmentCode}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("GPC Families:", data);
        setGpcFamilies(data); // Update GPC families state
      } else {
        console.error("Error fetching GPC families: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching GPC families:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle family selection and fetch classes
  const handleFamilyChange = async (e) => {
    const selectedFamilyText = e.target.value;
    const selectedFamily = gpcFamilies.find(family => family.text === selectedFamilyText);

    setFormData({
      ...formData,
      gpcFamilyText: selectedFamilyText,
      gpcFamilyCode: selectedFamily.code,  // Store the code
    });

    // Fetch GPC classes based on the selected family's code
    await fetchGpcClasses(selectedFamily.code);
  };

  // Fetch GPC classes based on the selected family's code
  const fetchGpcClasses = async (familyCode) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8101/gpc-classes/gpc-family/${familyCode}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("GPC Classes:", data);
        setGpcClasses(data); // Update GPC classes state
      } else {
        console.error("Error fetching GPC classes: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching GPC classes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle class selection and fetch bricks
  const handleClassChange = async (e) => {
    const selectedClassText = e.target.value;
    const selectedClass = gpcClasses.find(gpcClass => gpcClass.text === selectedClassText);

    setFormData({
      ...formData,
      gpcClassText: selectedClassText,
      gpcClassCode: selectedClass.code,  // Store the code
    });

    // Fetch GPC bricks based on the selected class's code
    await fetchGpcBricks(selectedClass.code);
  };

  // Fetch GPC bricks based on the selected class's code
  const fetchGpcBricks = async (classCode) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8101/gpc-bricks/gpc-class/${classCode}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("GPC Bricks:", data);
        setGpcBricks(data); // Update GPC bricks state
      } else {
        console.error("Error fetching GPC bricks: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching GPC bricks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle brick selection and update the field
  const handleBrickChange = (e) => {
    const selectedBrickText = e.target.value;
    const selectedBrick = gpcBricks.find(brick => brick.text === selectedBrickText);

    setFormData({
      ...formData,
      gpcBrickText: selectedBrickText,
      gpcBrickCode: selectedBrick.code,  // Store the code
    });
    setFormComplete(true); // Mark the form as complete
  };

  // Check if the form is valid for submission
  const isFormValid = formData.gpcBrickText !== ""; // Ensure brick is selected

  return (
    <div className="relative overflow-x-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">New Product</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-[70%_30%] gap-4">
          {/* Left Side of the Form (Single Column Layout) */}
          <div className="space-y-4">
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
                onChange={(e) => setFormData({ ...formData, gtin: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                required
              />
            </div>

            {/* GPC Fields */}
            <div className="mb-4">
              <label htmlFor="gpcSegmentText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                GPC Segment
              </label>
              <input
                type="text"
                id="gpcSegmentText"
                name="gpcSegmentText"
                value={formData.gpcSegmentText}
                onChange={(e) => setFormData({ ...formData, gpcSegmentText: e.target.value })}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                required
              />
            </div>

            {/* GPC Family */}
            <div className="mb-4">
              <label htmlFor="gpcFamilyText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                GPC Family
              </label>
              <select
                id="gpcFamilyText"
                name="gpcFamilyText"
                value={formData.gpcFamilyText}
                onChange={handleFamilyChange}
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
            </div>

            {/* GPC Class */}
            <div className="mb-4">
              <label htmlFor="gpcClassText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                GPC Class
              </label>
              <select
                id="gpcClassText"
                name="gpcClassText"
                value={formData.gpcClassText}
                onChange={handleClassChange}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                required
              >
                <option value="">Select a GPC Class</option>
                {gpcClasses.map((gpcClass, index) => (
                  <option key={index} value={gpcClass.text}>
                    {gpcClass.text}
                  </option>
                ))}
              </select>
            </div>

            {/* GPC Brick */}
            <div className="mb-4">
              <label htmlFor="gpcBrickText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                GPC Brick
              </label>
              <select
                id="gpcBrickText"
                name="gpcBrickText"
                value={formData.gpcBrickText}
                onChange={handleBrickChange}
                className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                required
              >
                <option value="">Select a GPC Brick</option>
                {gpcBricks.map((brick, index) => (
                  <option key={index} value={brick.text}>
                    {brick.text}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Side: Prediction Buttons and Submit Button */}
          <div className="flex flex-col h-full justify-between space-y-4 items-center">
            {/* Predict Categories Button */}
            <button
              type="button"
              onClick={handlePredictClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-6 w-4/5"
            >
              {loading ? "Loading..." : "Predict Categories"}
            </button>

            {predictionData && (
              <div className="mt-4 space-y-2">
                {predictionData.map((prediction, index) => (
                  <button
                    key={index}
                    type="button"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    onClick={() => handlePredictionButtonClick(prediction)}
                  >
                    {`Prediction ${index + 1}: ${prediction.gpcSegmentText} (Confidence: ${prediction.predictionConfidence.toFixed(2)})`}
                  </button>
                ))}
              </div>
            )}

            {/* Submit Button at the Bottom */}
            <button
              type="submit"
              disabled={!formComplete}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-6 w-4/5 ${!formComplete ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
