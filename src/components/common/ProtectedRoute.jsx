// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { keycloak } from './keycloak/KeycloakConfiguration';

const ProtectedRoute = ({ element, role }) => {
  if (!keycloak.authenticated) {
    keycloak.login(); // Redirect to login if not authenticated
    return null;
  }

  if (role && !keycloak.hasRealmRole(role)) {
    return <Navigate to="/home" />;
  }

  return element;
};

export default ProtectedRoute;
