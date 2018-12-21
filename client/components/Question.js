import React from "react";
import "../static/styles/Question.css";

const Question = props => (
	<React.Fragment>
		<div style={styles.wrapper}>
			<div style={styles.qvote}>
				<div style={styles.arrowUp} />
				<div className="vote-data">33.0k</div>
				<div style={styles.arrowDown} />
			</div>
			<div className="q-title">
				<h4 style={styles.title}>What's not as bad as everyone says?</h4>
				<span>submitted 11 hours ago by [RANDOM GUY]</span>
			</div>
		</div>
		<form method="post" action="comment">
			<textarea />
			<input type="submit" value="add comment" />
		</form>
	</React.Fragment>
);

const styles = {
	wrapper: {
		display: "flex"
	},
	qvote: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		paddingRight: "10px"
	},
	arrowUp: {
		width: "0",
		height: "0",
		borderLeft: "5px solid transparent",
		borderRight: "5px solid transparent",
		borderBottom: "5px solid black"
	},
	arrowDown: {
		width: "0",
		height: "0",
		borderLeft: "5px solid transparent",
		borderRight: "5px solid transparent",
		borderTop: "5px solid black"
	},
	title: {
		margin: "0px"
	}
};

export default Question;
