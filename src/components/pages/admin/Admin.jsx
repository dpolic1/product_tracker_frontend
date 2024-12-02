import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { keycloak } from "../../common/keycloak/KeycloakConfiguration";
import UsersTable from "./components/UsersTable";
import config from "../../../config.js";

export default function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const isAuthenticated = keycloak.authenticated;
    const isAdmin = keycloak.realmAccess?.roles?.includes("ADMIN_PRIVILEGES");

    if (!isAuthenticated) {
      navigate("/login");
    } else if (!isAdmin) {
      navigate("/home");
    } else {
      fetchUsers();
      fetchRoles();
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${config.KEYCLOAK_URL}/admin/realms/${config.REALM}/users?first=0&max=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${keycloak.token}`, // Include bearer token
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }
  
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  const fetchRoles = async () => {
    try {
      const response = await fetch(
        `${config.KEYCLOAK_URL}/admin/realms/${config.REALM}/roles`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${keycloak.token}`, // Include bearer token
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch roles: ${response.statusText}`);
      }
  
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleUpdateUser = (updatedUser) => {
    // Update user via API
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === updatedUser.username ? updatedUser : user
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <UsersTable users={users} roles={roles} onUpdateUser={handleUpdateUser} />
    </div>
  );
}
