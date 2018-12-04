import React from "react";
import {Layout} from "antd";
import Head from "./Head";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";

const {Content} = Layout;

export default class extends React.Component {
	state = {
		loading: true,
	}

	componentDidMount() {
		this.setState(prevState => ({
			loading: false,
		}));
	}

	render() {
		const { children } = this.props;
		const { loading } = this.state;

		if(loading) {
			return <Loading size="large" />;
		}

		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Head/>
				<Sidebar/>
				<Layout>
					<Header/>
					<Content style={{margin: "24px 16px 0"}}>
						<div style={{padding: 24, background: "#fff", minHeight: 360}}>
							{children}
						</div>
					</Content>
					<Footer/>
				</Layout>
			</Layout>
		);
	}
}
