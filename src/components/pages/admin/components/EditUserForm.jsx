import React, { useEffect, useState } from "react";
import { keycloak } from "../../../common/keycloak/KeycloakConfiguration";
import config from "../../../../config.js";

export default function EditUserForm({
  editedUser,
  handleInputChange,
  handleFormSubmit,
  handleRoleChange,
  roles,
  onClose,
}) {
  const [userRoles, setUserRoles] = useState([]); // State to store fetched roles
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const excludedRoles = ["offline_access", "uma_authorization", "default-roles-dp-diplomski"]; // TODO: finish this

  // Fetch user-specific roles when the component is mounted
  useEffect(() => {
    const fetchUserRoles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${config.KEYCLOAK_URL}/admin/realms/${config.REALM}/users/${editedUser.id}/role-mappings`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${keycloak.token}`, // Include bearer token
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user roles");
        }
        const data = await response.json();
        setUserRoles([...data.realmMappings.map(realmMappingRole => realmMappingRole.name)]); // Assuming the response is an array of role names
      } catch (error) {
        console.error("Error fetching user-specific roles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRoles();
  }, [editedUser.id]);

  // Handle role selection or deselection
  const handleCheckboxChange = (roleName) => {
    const updatedUserRoles = [...userRoles];
    if (updatedUserRoles.includes(roleName)) {
      // If role is already selected, remove it
      const index = updatedUserRoles.indexOf(roleName);
      updatedUserRoles.splice(index, 1);
    } else {
      // If role is not selected, add it
      updatedUserRoles.push(roleName);
    }
    setUserRoles(updatedUserRoles); // Update the userRoles state
    handleRoleChange(updatedUserRoles); // Update parent state or submit form
  };

  console.log(roles);
  console.log(userRoles);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[1200px]">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Edit User
        </h3>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-[65%_33%] gap-4">
            {/* Left Side of the Form */}
            <div className="grid grid-cols-2 gap-4">
              {/* Username */}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editedUser.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                  disabled
                />
              </div>

              {/* First Name */}
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={editedUser.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={editedUser.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>

              {/* Roles */}
              <div className="mb-4 col-span-2">
                <label
                  htmlFor="roles"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Roles
                </label>
                {isLoading ? (
                  <div className="text-gray-500 dark:text-gray-400">Loading roles...</div> // Show loading text
                ) : (
                  <div className="grid grid-cols-2 gap-4"> {/* Make the layout more structured */}
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        className="flex items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-md border border-gray-300 dark:border-gray-600"
                      >
                        <input
                          type="checkbox"
                          id={`role-${role.name}`}
                          name="roles"
                          value={role.name}
                          checked={userRoles.includes(role.name)} // Check if the role is in userRoles
                          onChange={() => handleCheckboxChange(role.name)} // Handle role selection
                          className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-500 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                        <label
                          htmlFor={`role-${role.name}`}
                          className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {role.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Additional Details */}
            <div className="col-span-1">
              {/* Status */}
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={editedUser.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
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
