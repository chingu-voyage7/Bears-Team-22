import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import {Layout, Icon, Drawer} from "antd";

import HeaderMenu from "./HeaderMenu";

import "../static/Header.css";

const {Header} = Layout;

export default class MainHeader extends React.Component {
	state = {
		drawerIsVisible: false,
		currentItem: "0"
	}

	componentDidMount() {
		let currentItem = "0";

		const page = window.location.pathname.replace(/\//g, "");
		switch (page) {
			case "logout":
			case "login":
				currentItem = "1";
				break;
			case "register":
				currentItem = "2";
				break;
			default:
				break;
		}

		this.setState({currentItem});
	}

	navigateHome = () => {
		if (window.location.pathname === "/") {
			window.location.reload();
		} else {
			Router.push("/");
		}
	}

	openDrawer = () => {
		this.setState({
			drawerIsVisible: true,
			currentItem: "0"
		});
	}

	closeDrawer = () => {
		this.setState({
			drawerIsVisible: false
		});
	}

	render() {
		const {drawerIsVisible, currentItem} = this.state;
		const {authState} = this.props;

		return (
			<Header className="header">
				<nav className="header__nav">
					<div className="header__nav--brand">
						<a onClick={this.navigateHome}>Knowledge</a>
					</div>
					<HeaderMenu authState={authState} currentItem={currentItem}/>
					<div className="header__drawer--toggle" onClick={this.openDrawer}>
						<Icon type="bars" onClick={this.openDrawer}/>
					</div>
					<Drawer visible={drawerIsVisible} onClose={this.closeDrawer}>
						<HeaderMenu mode="vertical" className="mobile__menu" currentItem={currentItem}/>
					</Drawer>
				</nav>
			</Header>
		);
	}
}

MainHeader.propTypes = {
	authState: PropTypes.string.isRequired
};
