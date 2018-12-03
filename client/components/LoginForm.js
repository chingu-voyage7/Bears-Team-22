import React from "react";
import Link from "next/link";
import {Form, Input, Button, Icon} from "antd";

import "antd/dist/antd.css";
import "../styles/LoginForm.css";

const FormItem = Form.Item;

class LoginForm extends React.Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log("all good!", values);
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

export default Form.create()(LoginForm);
