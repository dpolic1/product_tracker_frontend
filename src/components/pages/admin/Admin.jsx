import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/home");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div>
      <h1>THIS IS ADMIN PAGE</h1>
    </div>
  );
}