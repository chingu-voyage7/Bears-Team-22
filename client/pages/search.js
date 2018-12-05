import React from "react";

import MainLayout from "../components/MainLayout";
import SearchForm from "../components/SearchForm";

class Login extends React.Component {
	render() {
		return (
			<MainLayout>
				<SearchForm/>
			</MainLayout>
		);
	}
}

export default Login;
