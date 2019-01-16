import React from "react";
import PropTypes from "prop-types";
import {Card} from "antd";
import moment from "moment";

import "../static/styles/Answer.css";
import "../static/styles/Question.css";

export default class Reply extends React.Component {
	render() {
		const {authorId, createdAt, body} = this.props.data;

		return (
			<Card style={styles.card}>
				<div style={styles.wrapper}>
					<div style={styles.commentBlock}>
						<div className="q-title">
							<span>posted {moment(createdAt).fromNow()} by {authorId.name}</span>
						</div>
						<div style={styles.comment}>
							<span>{body}</span>
						</div>
					</div>
				</div>
			</Card>
		);
	}
}

Reply.propTypes = {
	data: PropTypes.object.isRequired
};

const styles = {
	card: {
		backgroundColor: "#4FC089",
		border: "0px",
		margin: "10px",
		marginLeft: "50px",
		color: "white"
	},
	wrapper: {
		display: "flex"
	}
};
