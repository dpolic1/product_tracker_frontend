import React from "react";
import { Link } from "react-router-dom";
import { keycloak } from "../keycloak/KeycloakConfiguration.jsx";


export default function Sidebar() {
  const isAuthenticated = keycloak.authenticated;
  const isAdmin = keycloak.realmAccess?.roles?.includes("ADMIN_PRIVILEGES") || false;

  const handleLogout = () => {
    keycloak.logout();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-52 bottom-0 bg-slate-900 px-9 py-5">
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
                Notifications
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
