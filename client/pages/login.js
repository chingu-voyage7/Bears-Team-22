import React from "react";

import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";

class Login extends React.Component {
	render() {
		return (
			<Layout>
				<LoginForm/>
			</Layout>
		);
	}
}

export default Login;
