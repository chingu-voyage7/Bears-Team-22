import React from "react";

import Router from "next/router";
import MainLayout from "../components/MainLayout";
import "firebase/auth";

class Home extends React.Component {
	logout() {
		fetch("http://localhost:5000/auth/logout", {credentials: "include"})
			.then(() => Router.push("/login")) // eslint-disable-line promise/prefer-await-to-then
			.catch(error => console.log(error));
	}

	render() {
		return (
			<MainLayout>
				<h2>Welcome!</h2>
				<button type="button" onClick={this.logout}>Sign out</button>
			</MainLayout>
		);
	}
}

export default Home;
