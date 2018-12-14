import React from "react";
import "../static/styles/Question.css";

const Question = props => (
	<div className="q-wrapper">
		<div className="q-vote">
			<div className="arrow-up" />
			<div className="vote-data">33.0k</div>
			<div className="arrow-down" />
		</div>
		<div className="q-title">
			<h4>What's not as bad as everyone says?</h4>
			<p>submitted 11 hours ago by [RANDOM GUY]</p>
		</div>
	</div>
);

export default Question;
