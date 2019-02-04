import React from "react";
import PropTypes from "prop-types";
import {Card} from "antd";
import moment from "moment";

import TagList from "./TagList";

import "antd/dist/antd.css";
import "../static/Question.css";

export default class Question extends React.Component {
	render() {
		const {title, authorId, tags, createdAt, body} = this.props.data;

		return (
			<Card className="question_card">
				<div className="question_card__meta">
					<h4 className="question_card__meta__title">{title}</h4>
					<span className="question_card__meta__creation">posted {moment(createdAt).fromNow()} by {authorId.name}</span>
				</div>
				<div className="question_card__body">
					<span>{body}</span>
				</div>
				{tags && tags.length > 0 ?
					<div className="question_card__tags">
						<TagList tags={tags}/>
					</div> :
					null}
			</Card>
		);
	}
}

Question.propTypes = {
	data: PropTypes.object.isRequired
};
