import React from 'react';
import { Navigate } from 'react-router-dom';
import { keycloak } from './keycloak/KeycloakConfiguration';

const ProtectedRoute = ({ element, role }) => {
  if (!keycloak.authenticated) {
    keycloak.login();
    return null;
  }

  if (role && !keycloak.hasRealmRole(role)) {
    return <Navigate to="/home" />;
  }

  return element;
};

export default ProtectedRoute;
