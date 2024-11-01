import React, { useEffect, useState } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RootLayout from './components/common/root-layout/RootLayout';
import Home from './components/pages/home/Home';
import Admin from './components/pages/admin/Admin';
import { keycloak, initKeycloak } from './components/common/keycloak/KeycloakConfiguration';
import ProtectedRoute from './components/common/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="home" element={
        <ProtectedRoute element={<Home />} isAuthenticated={keycloak.authenticated} hasRole={true} />
      } />
      <Route path="admin" element={
        <ProtectedRoute element={<Admin />} isAuthenticated={keycloak.authenticated} hasRole={keycloak.realmAccess?.roles.includes('ADMIN_PRIVILEGE')} />
      } />
    </Route>
  )
);

function App() {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  useEffect(() => {
    const initializeKeycloak = async () => {
      await initKeycloak();
      setKeycloakInitialized(true);
    };

    initializeKeycloak();
  }, []);

  if (!keycloakInitialized) { 
    return <div>Loading...</div>; 
  }

  return <RouterProvider router={router} />;
}

export default App;
