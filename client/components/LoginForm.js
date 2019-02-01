import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {Form, Input, Button, Icon, Alert} from "antd";

import {validateEmail} from "../validation/validators";

import "antd/dist/antd.css"; // TODO: Check if this `import` is even necessary.
import "../static/styles/LoginForm.css";

class LoginForm extends React.Component {
	state = {
		error: null
	};

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields(async (err, values) => { // TODO: Modify `this.props.form.validateFields` to return a promise instead of receive a callback.
			let validationError;

			if (err) {
				validationError = err;
			} else {
				try {
					validationError = await this.props.login(values.email, values.password);
				} catch (error) {
					validationError = error;
				}
			}

			this.setState({
				error: validationError && validationError.message ? validationError : null
			});
		});
	};

	render() {
		const {error} = this.state;
		const {getFieldDecorator} = this.props.form;

		return (
			<div className="login_form">
				<h1 className="login_form--title">Login</h1>
				<Form className="login_form--form" onSubmit={this.handleSubmit}>
					<Form.Item>
						{
							getFieldDecorator("email", {
								rules: [
									{
										required: true,
										message: "Please enter your email"
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
						<div className="login_form--form__alert">
							<Alert
								showIcon
								message={error.message}
								type="error"
							/>
						</div>
					}
					<Button type="primary" htmlType="submit">
					Log in
					</Button>
					<p>or</p>
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
