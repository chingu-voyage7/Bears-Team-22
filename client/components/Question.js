import React from "react";
import PropTypes from "prop-types";
import {Card} from "antd";
import moment from "moment";

export default class Question extends React.Component {
	render() {
		const {title, authorId, createdAt, body} = this.props.data;

		return (
			<Card style={styles.card}>
				<div style={styles.wrapper}>
					<div className="q-title">
						<h4 style={styles.title}>{title}</h4>
						<span>posted {moment(createdAt).fromNow()} by {authorId.name}</span>
					</div>
					<div style={styles.body}>
						<span>{body}</span>
					</div>
				</div>
			</Card>
		);
	}
}

Question.propTypes = {
	data: PropTypes.object.isRequired
};

const styles = {
	card: {
		backgroundColor: "#3D7667",
		border: "0px",
		color: "white",
		margin: "10px",
		marginBottom: "25px"
	},
	wrapper: {
		display: "flex",
		flexDirection: "column"
	},
	body: {
		paddingTop: "10px"
	},
	title: {
		margin: "0px",
		color: "white"
	}
};
