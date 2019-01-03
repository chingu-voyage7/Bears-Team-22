import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {Form, Input, Button, Icon} from "antd";

import "antd/dist/antd.css";

import "../static/styles/LoginForm.css";

const FormItem = Form.Item;

class LoginForm extends React.Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log("all good!", values);
				this.props.login(values.email, values.password);
			}
		});
	}

	render() {
		const {getFieldDecorator} = this.props.form;

		return (
			<div>
				<h1 className="login__form--title">Login</h1>
				<Form className="login__form" onSubmit={this.handleSubmit}>
					<FormItem>
						{
							getFieldDecorator("email", {
								rules: [
									{
										required: true,
										message: "Please enter your E-mail"
									}
								]
							})(<Input prefix={<Icon type="mail"/>} placeholder="E-mail"/>)
						}
					</FormItem>
					<FormItem>
						{
							getFieldDecorator("password", {
								rules: [
									{
										required: true,
										message: "Please enter your password"
									}
								]
							})(<Input prefix={<Icon type="lock"/>} type="password" placeholder="Password"/>)
						}
					</FormItem>
					<Button type="primary" htmlType="submit">
					Log in
					</Button>
					or
					<Link href="/register">
						<a>Register now</a>
					</Link>
				</Form>
			</div>
		);
	}
}

LoginForm.propTypes = {
	form: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired
};

export default Form.create()(LoginForm);
