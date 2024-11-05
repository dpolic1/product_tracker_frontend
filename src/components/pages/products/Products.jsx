import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { keycloak } from "../../common/keycloak/KeycloakConfiguration";

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
		console.log("ok"),
		<div>
			
			<h1>THIS IS PRODUCTS PAGE</h1>
			<h1>THIS IS PRODUCTS PAGE</h1>
			<h1>THIS IS PRODUCTS PAGE</h1>
			<h1>THIS IS PRODUCTS PAGE</h1>
			<h1>THIS IS PRODUCTS PAGE</h1>
			<h1>THIS IS PRODUCTS PAGE</h1>
		</div>
	);
}