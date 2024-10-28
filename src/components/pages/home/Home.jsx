import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { keycloak } from "../../common/keycloak/KeycloakConfiguration";

const Home = () => {
  return (
    <div>
      {keycloak.authenticated && <h1>THIS IS HOME PAGE</h1>}
    </div>
  );
};

export default Home;