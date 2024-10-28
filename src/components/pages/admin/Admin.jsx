import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../common/auth-context/AuthContext";

// just display THIS IS ADMIN PAGE IF USER IS ADMIN, OTHERWISE REDIRECT TO HOME PAGE
export default function Admin() {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div>
      <h1>THIS IS ADMIN PAGE</h1>
    </div>
  );
}