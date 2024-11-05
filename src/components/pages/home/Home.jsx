import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { keycloak } from "../../common/keycloak/KeycloakConfiguration";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = keycloak.authenticated;

    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
    </div>
  );
}