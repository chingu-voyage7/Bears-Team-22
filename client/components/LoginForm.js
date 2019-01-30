import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {Form, Input, Button, Icon, Alert} from "antd";

import "antd/dist/antd.css"; // TODO: Check if this `import` is even necessary.
import "../static/styles/LoginForm.css";

const {Item: FormItem} = Form;

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null
		};
	}

	validateEmail = (rule, value, callback) => {
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (value && !emailRegex.test(value.toLowerCase())) {
			callback("Badly formatted email");
		}

		callback();
	};

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => { // TODO: Modify `this.props.form.validateFields` to return a promise instead of receive a callback.
			if (!err) { // The given inputs are valid.
				this.props.login(values.email, values.password)
					.then(error => {
						this.setState({error});
					})
					.catch(error => {
						this.setState({error});
					});
			}
		});
	};

	render() {
		const {error} = this.state;
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
									}, {
										validator: this.validateEmail
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
					{error &&
						<Alert
							description={error.message}
							showIcon
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
