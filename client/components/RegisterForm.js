import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {Form, Input, Button, Alert} from "antd";

import "antd/dist/antd.css"; // TODO: Check if this `import` is even necessary.
import "../static/styles/RegisterForm.css";

const FormItem = Form.Item;

class RegisterForm extends React.Component {
	state = {
		confirmDirty: false,
		error: null
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) { // The given inputs are valid.
				this.props.signup(values)
					.then(error => {
						this.setState({error});
					})
					.catch(error => {
						this.setState({error});
					});
			}
		});
	};

	validateEmail = (rule, value, callback) => {
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (value && !emailRegex.test(value.toLowerCase())) {
			callback("Badly formatted email");
		}

		callback();
	};

	compareToFirstPassword = (rule, value, callback) => {
		const {form} = this.props;
		if (value && value !== form.getFieldValue("password")) {
			callback("The two given passwords do not match.");
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const {form} = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(["confirm"], {force: true});
		}

		callback();
	};

	render() {
		const {getFieldDecorator} = this.props.form;
		const {error} = this.state;

		return (
			<div>
				<h1 className="register__form--title">Register</h1>
				<Form className="register__form" onSubmit={this.handleSubmit}>
					<FormItem>
						{
							getFieldDecorator("name", {
								rules: [
									{
										required: true,
										message: "Please enter your name"
									}
								]
							})(<Input placeholder="Name"/>)
						}
					</FormItem>
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
							})(<Input placeholder="E-mail"/>)
						}
					</FormItem>
					<FormItem>
						{
							getFieldDecorator("password", {
								rules: [
									{
										required: true,
										message: "Please enter your password"
									}, {
										validator: this.validateToNextPassword
									}
								]
							})(<Input type="password" placeholder="Password"/>)
						}
					</FormItem>
					<FormItem>
						{
							getFieldDecorator("confirmPassword", {
								rules: [
									{
										required: true,
										message: "Please confirm your password"
									}, {
										validator: this.compareToFirstPassword
									}
								]
							})(<Input type="password" placeholder="Confirm Password"/>)
						}
					</FormItem>
					{error &&
						<Alert
							description={error.message}
							type="error"
							showIcon
						/>
					}
					<Button type="primary" htmlType="submit">
					Register
					</Button>
					<p>already have an account?</p>
					<Link href="/login">
						<a>Log in</a>
					</Link>
				</Form>
			</div>
		);
	}
}

RegisterForm.propTypes = {
	form: PropTypes.object.isRequired,
	signup: PropTypes.func.isRequired
};

export default Form.create()(RegisterForm);
