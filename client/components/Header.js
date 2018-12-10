import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {Layout, Menu, Icon, Drawer} from "antd";

import "../static/styles/Header.css";

const {Header} = Layout;
const MenuItem = Menu.Item;

const MainMenu = ({mode = "horizontal", className = "header__menu", theme = "light"}) => (
	<Menu theme={theme} mode={mode} className={className}>
		<div className="logo"/>
		<MenuItem key="1">
			<span className="nav-text">
				<Link href="/">
					<a>Home</a>
				</Link>
			</span>
		</MenuItem>
		<MenuItem key="2">
			<span className="nav-text">
				<Link href="/search">
					<a>Search</a>
				</Link>
			</span>
		</MenuItem>
		<MenuItem key="3">
			<span className="nav-text">
				<Link href="/login">
					<a>Login</a>
				</Link>
			</span>
		</MenuItem>
		<MenuItem key="4">
			<span className="nav-text">
				<Link href="/register">
					<a>Register</a>
				</Link>
			</span>
		</MenuItem>
	</Menu>
);

MainMenu.propTypes = {
	mode: PropTypes.string,
	className: PropTypes.string,
	theme: PropTypes.string
};

MainMenu.defaultProps = {
	mode: "horizontal",
	className: "header__menu",
	theme: "light"
};

const MainDrawer = ({drawerIsVisible, onClose}) => {
	return (
		<div>
			<Drawer visible={drawerIsVisible} onClose={onClose}>
				<MainMenu mode="vertical" className="mobile__menu"/>
			</Drawer>
		</div>
	);
};

MainDrawer.propTypes = {
	drawerIsVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
};

export default class MainHeader extends React.Component {
	state = {
		drawerIsVisible: false
	}

	openDrawer = () => {
		this.setState({
			drawerIsVisible: true
		});
	}

	closeDrawer = () => {
		this.setState({
			drawerIsVisible: false
		});
	}

	render() {
		const {drawerIsVisible} = this.state;
		return (
			<Header className="header">
				<nav className="header__nav">
					<div className="header__nav--brand">
						<Link href="/">
							<a>Knowledge</a>
						</Link>
					</div>
					<MainMenu/>
					<div className="header__drawer--toggle" onClick={this.openDrawer}>
						<Icon type="bars" onClick={this.openDrawer}/>
					</div>
					<MainDrawer drawerIsVisible={drawerIsVisible} onClose={this.closeDrawer}/>
				</nav>
			</Header>
		);
	}
}
