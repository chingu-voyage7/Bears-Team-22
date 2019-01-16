import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {Form, Input, Button} from "antd";

import "antd/dist/antd.css";

import "../static/styles/RegisterForm.css";

const FormItem = Form.Item;

class RegisterForm extends React.Component {
	state = {
		confirmDirty: false
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => { // TODO: Visually inform the user if there are any issues with the given input.
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
