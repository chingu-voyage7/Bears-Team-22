import React from "react";
import Link from "next/link";
import {Layout} from "antd";

import "../static/styles/Header.css";

const {Header} = Layout;

export default () => (
	<Header className="header">
		<nav className="header__nav">
			<div className="header__nav--brand">
			Knowledge
			</div>
			<div className="header__nav--item">
				<Link href="/login">
					<a>Login</a>
				</Link>
			</div>
			<div className="header__nav--item">
				<Link href="/register">
					<a>Register</a>
				</Link>
			</div>
		</nav>
	</Header>
);
