import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {Form, Input, Button} from "antd";

import {validateEmail} from "../validation/validators";

import "antd/dist/antd.css"; // TODO: Check if this `import` is even necessary.
import "../static/RegisterForm.css";

class RegisterForm extends React.Component {
	state = {
		confirmDirty: false // TODO: Figure out what this is used for and if we even need it.
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) { // The given inputs are valid.
				this.props.signup(values);
			}
		});
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

		return (
			<div>
				<h1 className="register_form--title">Register</h1>
				<Form className="register_form" onSubmit={this.handleSubmit}>
					<Form.Item>
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
					</Form.Item>
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
							})(<Input placeholder="Email"/>)
						}
					</Form.Item>
					<Form.Item>
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
					</Form.Item>
					<Form.Item>
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
					</Form.Item>
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
