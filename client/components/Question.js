import React from "react";
import PropTypes from "prop-types";
import {Card} from "antd";
import moment from "moment";

import "../static/styles/Question.css";

export default class Question extends React.Component {
	render() {
		const {title, authorId, createdAt, body} = this.props.data;

		return (
			<Card className="question_card">
				<div className="question_card__meta">
					<h4 className="question_card__meta__title">{title}</h4>
					<span>posted {moment(createdAt).fromNow()} by {authorId.name}</span>
				</div>
				<div className="question_card__body">
					<span>{body}</span>
				</div>
			</Card>
		);
	}
}

Question.propTypes = {
	data: PropTypes.object.isRequired
};
