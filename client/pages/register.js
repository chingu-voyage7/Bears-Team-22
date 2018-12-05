import React from "react";

import MainLayout from "../components/MainLayout";
import RegisterForm from "../components/RegisterForm";

class Register extends React.Component {
	render() {
		return (
			<MainLayout>
				<RegisterForm/>
			</MainLayout>
		);
	}
}

export default Register;
