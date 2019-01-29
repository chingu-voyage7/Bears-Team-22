import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {Form, Input, Button, Icon} from "antd";

import "antd/dist/antd.css"; // TODO: Check if this `import` is even necessary.
import "../static/styles/LoginForm.css";

const {Item: FormItem} = Form;

class LoginForm extends React.Component {
	handleSubmit = e => {
		e.preventDefault();

		// TODO: Change the below function (`this.props.form.validateFields`) to return a promise instead of receive a callback.
		this.props.form.validateFields((err, values) => { // TODO: Visually inform the user if there are any issues with the given input.
			if (!err) { // The given inputs are valid.
				this.props.login(values.email, values.password);
			}
		});
	};

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
