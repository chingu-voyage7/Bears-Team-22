import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {Layout, Menu, Icon, Drawer} from "antd";
import "../static/styles/Header.css";

const {Header} = Layout;

export default class MainHeader extends React.Component {
	state = {
		drawerIsVisible: false
	};

	openDrawer = () => {
		this.setState({
			drawerIsVisible: true
		});
	};

	closeDrawer = () => {
		this.setState({
			drawerIsVisible: false
		});
	};

	render() {
		const {drawerIsVisible} = this.state;
		const {authState} = this.props;

		return (
			<Header className="header">
				<nav className="header__nav">
					<div className="header__nav--brand">
						<Link href="/">
							<a>Knowledge</a>
						</Link>
					</div>
					<Menu mode="horizontal" className="header__menu" theme="light">
						{authState !== "unchecked" ? // eslint-disable-line no-negated-condition
							<Menu.Item key="1">
								<Link href={`/${authState === "logged in" ? "logout" : "login"}`}>
									<a>{authState === "logged in" ? "Logout" : "Login"}</a>
								</Link>
							</Menu.Item> :
							null}
						{authState === "logged out" ?
							<Menu.Item key="2">
								<Link href="/register">
									<a>Register</a>
								</Link>
							</Menu.Item> :
							null}
					</Menu>
					<div className="header__drawer--toggle" onClick={this.openDrawer}>
						<Icon type="bars" onClick={this.openDrawer}/>
					</div>
					<Drawer visible={drawerIsVisible} onClose={this.closeDrawer}>
						<Menu mode="vertical" className="mobile__menu"/>
					</Drawer>
				</nav>
			</Header>
		);
	}
}

MainHeader.propTypes = {
	authState: PropTypes.string.isRequired
};
