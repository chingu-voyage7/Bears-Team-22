import React from "react";

import Layout from "../components/Layout";
import RegisterForm from "../components/RegisterForm";

class Register extends React.Component {
	render() {
		return (
			<Layout>
				<RegisterForm/>
			</Layout>
		);
	}
}

export default Register;
