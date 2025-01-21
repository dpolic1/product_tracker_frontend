import React, { useEffect, useState } from "react";
import { keycloak } from "../../../common/keycloak/KeycloakConfiguration.jsx";

export default function NotificationsTable({ notifications }) {

  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`http://localhost:8200/notifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${keycloak.token}`, // Add the Bearer token
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to delete notification.");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-slate-100">
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Product GTIN</th>
            <th scope="col" className="px-6 py-3">Warning Level</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Viewed</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <tr
                key={notification.id || index}
                className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${!notification.viewedFlag ? "font-bold" : ""
                  }`}
              >
                <td className="px-6 py-4">{notification.id}</td>
                <td className="px-6 py-4">{notification.productGtin}</td>
                <td className="px-6 py-4">{notification.warningLevel}</td>
                <td className="px-6 py-4">{notification.description}</td>
                <td className="px-6 py-4">{notification.viewedFlag ? "Yes" : "No"}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                No notifications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}