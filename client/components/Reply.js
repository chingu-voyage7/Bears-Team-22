import React from "react";
import PropTypes from "prop-types";
import {Card} from "antd";
import moment from "moment";

import "../static/styles/Reply.css";

export default class Reply extends React.Component {
	render() {
		const {authorId, createdAt, body} = this.props.data;

		return (
			<Card className="reply_card">
				<div className="reply_card__creation">
					<span>posted {moment(createdAt).fromNow()} by {authorId.name}</span>
				</div>
				<div className="reply_card__body">
					<span>{body}</span>
				</div>
			</Card>
		);
	}
}

Reply.propTypes = {
	data: PropTypes.object.isRequired
};
