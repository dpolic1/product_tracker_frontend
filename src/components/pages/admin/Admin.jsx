import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { keycloak } from "../../common/keycloak/KeycloakConfiguration";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = keycloak.authenticated;
    const isAdmin = keycloak.realmAccess?.roles?.includes("ADMIN_PRIVILEGES");

    if (!isAuthenticated) {
      navigate("/login");
    }
    else if (!isAdmin) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    console.log("ok"),
    <div>
      <h1>THIS IS ADMIN PAGE</h1>
      <h1>THIS IS ADMIN PAGE</h1>
      <h1>THIS IS ADMIN PAGE</h1>
      <h1>THIS IS ADMIN PAGE</h1>
      <h1>THIS IS ADMIN PAGE</h1>
      <h1>THIS IS ADMIN PAGE</h1>
      <h1>THIS IS ADMIN PAGE</h1>
      <h1>THIS IS ADMIN PAGE</h1>
    </div>
  );
}