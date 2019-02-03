import React from "react";
import PropTypes from "prop-types";
import {Form, Input, Button} from "antd";

import "../static/ReplyForm.css";

const {Item: FormItem} = Form;
const {TextArea} = Input;

class ReplyForm extends React.Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.submit(values);
			}
		});
	}

	render() {
		const {getFieldDecorator} = this.props.form;

		return (
			<Form className="post_reply__form" onSubmit={this.handleSubmit}>
				<FormItem>
					{
						getFieldDecorator("body", {
							rules: [
								{
									required: true,
									min: 20,
									message: "The reply's body cannot contain less than 20 character"
								}
							]
						})(<TextArea placeholder="The body of the reply" autosize={{minRows: 5, maxRows: 5}}/>)
					}
				</FormItem>

				<Button type="danger" className="post_reply__form--cancel" onClick={() => this.props.submit(null)}>Cancel</Button>
				<Button type="primary" htmlType="submit">Post</Button>
			</Form>
		);
	}
}

ReplyForm.propTypes = {
	form: PropTypes.object.isRequired,
	submit: PropTypes.func.isRequired
};

export default Form.create()(ReplyForm);
