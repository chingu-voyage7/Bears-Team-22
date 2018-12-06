import React from "react";
import {Layout} from "antd";

import Head from "./Head";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";

const {Content} = Layout;

export default class MainLayout extends React.Component {
	state = {
		loading: true
	}

	componentDidMount() {
		this.setState(() => ({
			loading: false
		}));
	}

	render() {
		const {children} = this.props;
		const {loading} = this.state;

		if (loading) {
			return <Loading size="large"/>;
		}

		return (
			<React.Fragment>
				<Head/>
				<Layout style={{minHeight: "100vh"}}>
					<Header/>
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
