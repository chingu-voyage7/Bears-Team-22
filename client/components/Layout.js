import React from "react";
import {Layout} from "antd";

import Head from "./Head";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const {Content} = Layout;

export default props => (
	<Layout>
		<Head/>
		<Sidebar/>
		<Layout style={{
			height: "100vh"
		}}
		>
			<Header/>
			<Content style={{
				margin: "24px 16px 0"
			}}
			>
				<div style={{
					padding: 24,
					background: "#fff",
					minHeight: 360
				}}
				>
					{props.children}
				</div>
			</Content>
			<Footer/>
		</Layout>
	</Layout>
);
