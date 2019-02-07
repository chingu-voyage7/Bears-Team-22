import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Link from "next/link";
import {Layout, Menu} from "antd";

import HeaderMenu from "./HeaderMenu";

import "antd/dist/antd.css";
import "../static/Header.css";

const {Header} = Layout;

export default class MainHeader extends React.Component {
	state = {
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

	render() {
		const {currentItem} = this.state;
		const {authState} = this.props;

		return (
			<Header className="header">
				<nav className="header__nav">
					<div className="header__nav--brand">
						<a onClick={this.navigateHome}>Knowledge</a>
					</div>
					<HeaderMenu authState={authState} currentItem={currentItem}/>
					<Menu
						theme="light"
						mode="horizontal"
						selectedKeys={[currentItem === "1" || currentItem === "2" ? "1" : "0"]}
						className="header__join"
					>
						<Menu.Item key="1">
							<Link href="/register">
								<a>Join</a>
							</Link>
						</Menu.Item>
					</Menu>
				</nav>
			</Header>
		);
	}
}

MainHeader.propTypes = {
	authState: PropTypes.string.isRequired
};
