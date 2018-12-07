import React from "react";
import {Layout, Menu, Icon} from "antd";

import "../static/styles/Sidebar.css";

const {Sider} = Layout;
const MenuItem = Menu.Item;

const Sidebar = () => (
	<Sider
		collapsible
		defaultCollapsed
		breakpoint="xxl"
		collapsedWidth={0}
	>
		<div className="logo"/>
		<Menu theme="dark" mode="inline">
			<MenuItem key="1">
				<Icon type="home"/>
				<span className="nav-text">Home</span>
			</MenuItem>
			<MenuItem key="2">
				<Icon type="question"/>
				<span className="nav-text">About</span>
			</MenuItem>
			<MenuItem key="3">
				<Icon type="book"/>
				<span className="nav-text">Contact</span>
			</MenuItem>
		</Menu>
	</Sider>
);

export default Sidebar;
