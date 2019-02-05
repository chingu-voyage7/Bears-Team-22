import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {Menu} from "antd";

const HeaderMenu = ({currentItem = "0", handleClick, authState = "unchecked", className = "header__menu", mode = "horizontal"}) => {
	return (
		<Menu
			mode={mode}
			className={className}
			theme="light"
			selectedKeys={[currentItem]}
			onClick={handleClick}
		>
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
	);
};

HeaderMenu.propTypes = {
	mode: PropTypes.string,
	className: PropTypes.string,
	authState: PropTypes.string,
	handleClick: PropTypes.func.isRequired,
	currentItem: PropTypes.string
};
HeaderMenu.defaultProps = {
	mode: "horizontal",
	className: "header__menu",
	authState: "unchecked",
	currentItem: "0"
};

export default HeaderMenu;
