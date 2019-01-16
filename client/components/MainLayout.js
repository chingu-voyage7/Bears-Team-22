import React from "react";
import PropTypes from "prop-types";
import {Layout} from "antd";

import Head from "./Head";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";

const {Content} = Layout;

export default class MainLayout extends React.Component {
	state = {
		loading: true,
		authState: "unchecked" // TODO: Use a properly defined enum instead of a regular string here.
	}

	async currentAuthState() {
		try {
			const response = await fetch("http://localhost:5000/user/current-user", {credentials: "include"}); // TOOD: Find out how to stop this from logging errors to the console in case the server returned a 401 response.
			if (!response.ok) {
				return "logged out";
			}

			const {user} = await response.json();

			return user && user.email.length > 0 ? "logged in" : "logged out";
		} catch (_) {
			return "logged out";
		}
	}

	async componentDidMount() {
		this.setState(() => ({
			loading: false
		}));

		const authState = await this.currentAuthState();

		this.setState(() => ({authState}));

		if (this.props.authStateListener) {
			this.props.authStateListener(authState);
		}
	}

	render() {
		const {children} = this.props;
		const {loading, authState} = this.state;

		if (loading) {
			return <Loading mounted={false} size="large"/>;
		}

		return (
			<React.Fragment>
				<Head/>
				<Layout style={{minHeight: "100vh"}}>
					<Header authState={authState}/>
					<Content style={{margin: "24px 16px 0"}}>
						<div style={{padding: 24, background: "#fff", minHeight: 360}}>
							{children}
						</div>
					</Content>
					<Footer/>
				</Layout>
			</React.Fragment>
		);
	}
}

MainLayout.propTypes = {
	authStateListener: PropTypes.func.isRequired
};
