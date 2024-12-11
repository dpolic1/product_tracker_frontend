import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { keycloak } from "../keycloak/KeycloakConfiguration.jsx";


export default function Sidebar() {
  const isAuthenticated = keycloak.authenticated;
  const isAdmin = keycloak.realmAccess?.roles?.includes("ADMIN_PRIVILEGES") || false;
  const [unviewedNotifications, setUnviewedNotifications] = useState(0);

  const handleLogout = () => {
    keycloak.logout();
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchNotificationsCount = async () => {
        try {
          const response = await fetch("http://localhost:8100/notifications/count/not-viewed", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch notifications count");
          }
          const data = await response.json();
          
          // Check if response is directly the count or wrapped in an object
          if (typeof data === "number") {
            setUnviewedNotifications(data);
          } else if (data && typeof data.count === "number") {
            setUnviewedNotifications(data.count);
          } else {
            console.warn("Unexpected response format:", data);
          }
        } catch (error) {
          console.error("Error fetching notifications count:", error);
        }
      };
  
      fetchNotificationsCount();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-56 bottom-0 bg-slate-900 px-9 py-5">
      <nav className="flex flex-col gap-2 h-full">
        <ul className="flex flex-col gap-2 h-full">
          <>
            <li className="w-full">
              <Link to="/home" className="text-center text-white bg-slate-700 w-full block px-3 py-1 rounded-md">
                Home
              </Link>
            </li>
            <li className="">
              <Link to="/notifications" className="text-center text-white bg-slate-700 w-full block px-3 py-1 rounded-md">
                Notifications{unviewedNotifications > 0 ? ` (${unviewedNotifications})` : ""}
              </Link>
            </li>
          </>
          {isAdmin && (
            <>
              <li className="">
                <Link to="/products" className="text-center text-white bg-slate-700 w-full block px-3 py-1 rounded-md">
                  Products
                </Link>
              </li>
              <li className="">
                <Link to="/admin" className="text-center text-white bg-slate-700 w-full block px-3 py-1 rounded-md">
                  Admin
                </Link>
              </li>
            </>
          )}
        </ul>
        <button className="mt-auto text-white bg-slate-700 w-full block px-3 py-1 rounded-md" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
}
