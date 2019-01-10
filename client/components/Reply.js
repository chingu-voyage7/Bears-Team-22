import React from "react";
import "../static/styles/Answer.css";
import "../static/styles/Question.css";
// import { downvoteArrow, upvoteArrow } from "../helpers/SVG-icons";
// TODO get importing arrow to work

const Answer = props => (
	<div style={styles.wrapper}>
		<div style={styles.avote}>
			<div style={styles.arrowUp} />
			<div style={styles.padding} />
			<div style={styles.arrowDown} />
		</div>
		<div style={styles.commentBlock}>
			<div style={styles.username}>Random User1123</div>
			<div style={styles.comment}>
				Computer problems. Listen carefully. Are you listening carefully? If
				your computer screws up here's how to fix it. This is going to blow your
				mind. Seriously my company charges $500/hour for me to fix customers'
				servers and this is exactly what I do (no kidding).
			</div>
			<div style={styles.reply}>Reply</div>
		</div>
	</div>
);

const styles = {
	wrapper: {
		display: "flex"
	},
	avote: {
		display: "flex",
		alignItems: "center",
		justifyContent: "start",
		flexDirection: "column",
		marginRight: "10px",
		width: "20px"
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
	padding: {
		padding: "5px"
	},
	// a comment
	commentBlock: {
		marginBottom: "10px"
	},
	username: {
		color: "rgb(130,130,130)"
	},
	reply: {
		textDecoration: "underline"
	}
};
export default Answer;
