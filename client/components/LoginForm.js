import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {Form, Input, Button, Icon, Alert} from "antd";

import {validateEmail} from "./validation/validators";

import "antd/dist/antd.css"; // TODO: Check if this `import` is even necessary.
import "../static/styles/LoginForm.css";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null
		};
	}

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields(async (err, values) => { // TODO: Modify `this.props.form.validateFields` to return a promise instead of receive a callback.
			if (!err) { // The given inputs are valid.
				let validationError;
				try {
					validationError = await this.props.login(values.email, values.password);
				} catch (error) {
					validationError = error;
				}

				this.setState({error: validationError});
			}
		});
	};

	render() {
		const {error} = this.state;
		const {getFieldDecorator} = this.props.form;
		return (
			<div>
				<h1 className="login_form--title">Login</h1>
				<Form className="login_form" onSubmit={this.handleSubmit}>
					<Form.Item>
						{
							getFieldDecorator("email", {
								rules: [
									{
										required: true,
										message: "Please enter your E-mail"
									}, {
										validator: validateEmail
									}
								]
							})(<Input prefix={<Icon type="mail"/>} placeholder="Email"/>)
						}
					</Form.Item>
					<Form.Item>
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
					</Form.Item>
					{error &&
						<Alert
							showIcon
							description={error.message}
							type="error"
						/>
					}
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
