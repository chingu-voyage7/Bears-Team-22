import React from "react";
import Router from "next/router"; // TODO: Use `withRouter` instead of Router (see https://github.com/zeit/next.js/blob/master/errors/url-deprecated.md).
import delay from "delay";
import "firebase/auth";

import Loading from "../components/Loading";

export default class Logout extends React.Component {
	state = {
		status: "Logging out...",
		loading: true
	}

	async componentDidMount() {
		try {
			await fetch("http://localhost:5000/auth/logout", {credentials: "include"});
			this.setState(() => ({
				status: "Logged out successfully! Redirecting you to the homepage...",
				loading: false
			}));
			await delay(500);
			await Router.push("/");
		} catch (error) {
			this.setState(() => ({
				status: `Error logging out:\n\n${error}`,
				loading: false
			}));
			console.log(error);
		}
	}

	render() {
		const {loading, status} = this.state;

		return (
			<Loading mounted loading={loading} status={status}/>
		);
	}
}
