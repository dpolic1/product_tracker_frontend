import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"
import { keycloak } from "../keycloak/KeycloakConfiguration.jsx";


export default function Header() {
  const isAuthenticated = keycloak.authenticated;
  const isAdmin = keycloak.realmAccess?.roles?.includes("ADMIN_PRIVILEGES") || false;

  const handleLogout = () => {
    keycloak.logout();
  };

  if (!isAuthenticated) {
    return null;
  }

    return (
      <header className="main_header">
        <nav className="header_nav">
          <ul className="nav_list">
            <li className="nav_list_item">
              <Link to="/home" className="nav_link">
                Home
              </Link>
            </li>
            {isAdmin && (
              <li className="nav_list_item">
                <Link to="/admin" className="nav_link">
                  Admin
                </Link>
              </li>
            )}
          </ul>
          <button className="logout_button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>
    );
  }
