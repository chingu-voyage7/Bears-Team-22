import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import {Form, Input, Button} from "antd";

import "antd/dist/antd.css";

import "../static/styles/QuestionForm.css";

const {Item: FormItem} = Form;
const {TextArea} = Input;

class QuestionForm extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.postQuestion(values);
			}
		});
	}

	cancel() {
		Router.push("/");
	}

	render() {
		const {getFieldDecorator} = this.props.form;

		return (
			<div>
				<h1 className="post__question__form--title">Post a new question</h1>
				<Form className="post__question__form" onSubmit={this.handleSubmit}>
					<FormItem>
						{
							getFieldDecorator("title", {
								rules: [
									{
										required: true,
										message: "A title is required "
									}
								]
							})(<Input placeholder="title"/>)
						}
					</FormItem>
					<FormItem>
						{
							getFieldDecorator("body", {
								rules: [
									{
										required: true,
										min: 20,
										message: "Body of the question cannot contain less than 20 character"
									}
								]
							})(<TextArea placeholder="body" autosize={{minRows: 5, maxRows: 5}}/>)
						}
					</FormItem>

					<Button type="danger" style={{marginRight: "1rem"}} onClick={this.cancel}>Cancel</Button>
					<Button type="primary" htmlType="submit">Submit</Button>
				</Form>
			</div>
		);
	}
}

QuestionForm.propTypes = {
	form: PropTypes.object.isRequired
};

export default Form.create()(QuestionForm);
