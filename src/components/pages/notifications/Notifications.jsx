import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { keycloak } from "../../common/keycloak/KeycloakConfiguration"; // Adjust the path as needed
import NotificationsTable from "./components/NotificationsTable";

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const isAuthenticated = keycloak.authenticated;

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      const fetchNotifications = async () => {
        try {
          const response = await fetch("http://localhost:8100/notifications", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch notifications");
          }

          const data = await response.json();
          setNotifications(data);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };

      fetchNotifications();
    }
  }, [navigate]);

  return (
    <div >
      <NotificationsTable notifications={notifications} />
    </div>
  );
}