import Keycloak from 'keycloak-js';
import config from '../../../config'; // Adjust the path as necessary

const keycloak = new Keycloak({
	url: config.KEYCLOAK_URL,
	realm: config.REALM,
	clientId: config.CLIENT_ID,
});

const initKeycloak = () =>
	keycloak
		.init({ onLoad: 'login-required', redirectUri: `${config.BASE_URL}/home` })
		.then(authenticated => {
			if (!authenticated) {
				keycloak.login();
			}
			else {
				// Log the Access Token and Refresh Token after successful authentication
				console.log("Access Token:", keycloak.token);
				console.log("Refresh Token:", keycloak.refreshToken);
			}
			return authenticated;
		})
		.catch(error => console.error('Failed to initialize Keycloak', error));

export { keycloak, initKeycloak };