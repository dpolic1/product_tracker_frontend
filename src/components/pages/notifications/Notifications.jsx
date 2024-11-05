import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { keycloak } from "../../common/keycloak/KeycloakConfiguration"; // Adjust the path as needed

export default function Notifications() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = keycloak.authenticated;

    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Notifications</h1>
      <h1>Notifications</h1>
      <h1>Notifications</h1>
      <h1>Notifications</h1>
      <h1>Notifications</h1>
      <p>This is the notifications page, accessible by any authenticated user.</p>
    </div>
  );
}