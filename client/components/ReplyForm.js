import React from "react";
import PropTypes from "prop-types";
import {Form, Input, Button} from "antd";

import "antd/dist/antd.css";

import "../static/styles/ReplyForm.css";

const {Item: FormItem} = Form;
const {TextArea} = Input;

class ReplyForm extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
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
			<div>
				<Form className="post__question__form" onSubmit={this.handleSubmit}>
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

					<Button type="danger" style={{marginRight: "1rem"}} onClick={() => this.props.submit(null)}>Cancel</Button>
					<Button type="primary" htmlType="submit">Submit</Button>
				</Form>
			</div>
		);
	}
}

ReplyForm.propTypes = {
	form: PropTypes.object.isRequired,
	submit: PropTypes.func.isRequired
};

export default Form.create()(ReplyForm);
