const dotenv = require("dotenv");

dotenv.config();

const {projectId, privateKeyId, privateKey, clientEmail, clientId, clientCertUrl, databaseUrl} = process.env;

module.exports = {
	credentials: {
		type: "service_account",
		project_id: projectId,
		private_key_id: privateKeyId,
		private_key: privateKey,
		client_email: clientEmail,
		client_id: clientId,
		auth_uri: "https://accounts.google.com/o/oauth2/auth",
		token_uri: "https://oauth2.googleapis.com/token",
		auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
		client_x509_cert_url: clientCertUrl
	},
	databaseUrl
};
