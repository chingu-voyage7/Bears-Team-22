import React from "react";
import Router from "next/router"; // TODO: Use `withRouter` instead of Router (see https://github.com/zeit/next.js/blob/master/errors/url-deprecated.md).
import delay from "delay";
import "firebase/auth";

import Loading from "../components/Loading";

import {get} from "../http";

export default class Logout extends React.Component {
	state = {
		status: "Logging out...",
		loading: true
	}

	async componentDidMount() {
		try {
			await get("/auth/logout", {credentials: "include"});
			this.setState(() => ({
				status: "Logged out successfully! Returning to the previous page...",
				loading: false
			}));
			await delay(500);
			await Router.back();
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
