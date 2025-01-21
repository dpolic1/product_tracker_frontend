import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { keycloak } from "../../common/keycloak/KeycloakConfiguration";
import RecentlyFlaggedProductsTable from "./components/RecentlyFlaggedProductsTable";
import UserBoughtProductsSection from "./components/UserBoughtProductsSection";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = keycloak.authenticated;

    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex justify-evenly gap-16 w-full max-w-[95%] mx-auto mt-8">
        <UserBoughtProductsSection />
      <div>
        <RecentlyFlaggedProductsTable />
      </div>
    </div>
  );
}