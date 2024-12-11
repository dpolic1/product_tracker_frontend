import React, { useEffect, useState } from "react";

export default function NotificationsTable({ notifications }) {

return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Product GTIN</th>
            <th scope="col" className="px-6 py-3">Warning Level</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Viewed</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <tr
                key={notification.id || index}
                className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${
                  !notification.viewedFlag ? "font-bold" : ""
                }`}
              >
                <td className="px-6 py-4">{notification.id}</td>
                <td className="px-6 py-4">{notification.productGtin}</td>
                <td className="px-6 py-4">{notification.warningLevel}</td>
                <td className="px-6 py-4">{notification.description}</td>
                <td className="px-6 py-4">{notification.viewedFlag ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                No notifications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}