import React, { useState } from "react";
import EditUserForm from "./EditUserForm";

export default function UsersTable({ users, roles, onUpdateUser }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseEditForm = () => {
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    const { options } = e.target;
    const selectedRoles = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedRoles.push(options[i].value);
      }
    }
    setSelectedUser((prevUser) => ({
      ...prevUser,
      roles: selectedRoles,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Assuming onUpdateUser is a function passed down as a prop to update the user in the parent component
    onUpdateUser(selectedUser);
    handleCloseEditForm(); // Close the form after submission
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">First Name</th>
              <th scope="col" className="px-6 py-3">Last Name</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.username}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.firstName}</td>
                  <td className="px-6 py-4">{user.lastName}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <EditUserForm
          editedUser={selectedUser}  // the user to be edited
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          handleRoleChange={handleRoleChange}
          roles={roles} 
          onClose={handleCloseEditForm}
        />
      )}
    </>
  );
}
