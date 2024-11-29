import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { keycloak } from "../../common/keycloak/KeycloakConfiguration";
import ProductsTable from "./components/ProductsTable";
import ProductsSearchBar from "./components/ProductsSearchBar";
import ProductsPaginationBar from "./components/ProductsPaginationBar";

export default function Products() {
	const navigate = useNavigate();

	useEffect(() => {
		const isAuthenticated = keycloak.authenticated;
		const isAdmin = keycloak.realmAccess?.roles?.includes("ADMIN_PRIVILEGES");

		if (!isAuthenticated || !isAdmin) {
			navigate("/home");
		}
	}, [navigate]);

	return (
		<div>
      <ProductsSearchBar />
			<ProductsTable />
      <ProductsPaginationBar />
		</div>
	);
}