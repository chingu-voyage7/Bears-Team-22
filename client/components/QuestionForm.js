import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import {Form, Input, Button} from "antd";

import "antd/dist/antd.css";

import "../static/styles/QuestionForm.css";

const {Item: FormItem} = Form;
const {TextArea} = Input;

class QuestionForm extends React.Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.postQuestion(values);
			}
		});
	};

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
							})(<Input placeholder="The title of the question"/>)
						}
					</FormItem>
					<FormItem>
						{
							getFieldDecorator("body", {
								rules: [
									{
										required: true,
										min: 20,
										message: "The question's body cannot contain less than 20 character"
									}
								]
							})(<TextArea placeholder="The body of the question" autosize={{minRows: 5, maxRows: 5}}/>)
						}
					</FormItem>

					<Button type="danger" style={{marginRight: "1rem"}} onClick={this.cancel}>Cancel</Button>
					<Button type="primary" htmlType="submit">Post</Button>
				</Form>
			</div>
		);
	}
}

QuestionForm.propTypes = {
	form: PropTypes.object.isRequired,
	postQuestion: PropTypes.func.isRequired
};

export default Form.create()(QuestionForm);
