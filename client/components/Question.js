import React from "react";

const Question = props => (
	<React.Fragment>
		<div style={styles.wrapper}>
			<div style={styles.qvote}>
				<div style={styles.arrowUp} />
				<div className="vote-data">30k</div>
				<div style={styles.arrowDown} />
			</div>
			<div className="q-title">
				<h4 style={styles.title}>What's not as bad as everyone says?</h4>
				<span>submitted 11 hours ago by [RANDOM GUY]</span>
			</div>
		</div>
		<form style={styles.form} method="post" action="comment">
			<textarea style={styles.textarea} />
			<input style={styles.submit} type="submit" value="add comment" />
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
	title: {
		margin: "0px"
	},
	// Form
	form: {
		paddingLeft: "30px"
	},
	textarea: {
		display: "block",
		marginTop: "10px",
		marginBottom: "10px",
		width: "500px",
		height: "100px"
	},
	submit: {
		marginBottom: "20px"
	}
};

export default Question;
