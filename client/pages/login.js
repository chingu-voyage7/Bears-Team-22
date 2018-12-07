import React from "react";

import MainLayout from "../components/MainLayout";
import LoginForm from "../components/LoginForm";

class Login extends React.Component {
	render() {
		return (
			<MainLayout>
				<LoginForm/>
			</MainLayout>
		);
	}
}

export default Login;
