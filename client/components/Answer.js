import React from "react";
import "../static/styles/Answer.css";
import "../static/styles/Question.css";
// import { downvoteArrow, upvoteArrow } from "../helpers/SVG-icons";
// TODO get importing arrow to work

const Answer = props => (
	<div className="a-wrapper">
		<div className="a-vote">
			<div className="arrow-up" />
			<div className="padding" />
			<div className="arrow-down" />
		</div>
		<div className="a-comment">
			<div className="username">Random User1123</div>
			<p>
				Computer problems. Listen carefully. Are you listening carefully? If
				your computer screws up here's how to fix it. This is going to blow your
				mind. Seriously my company charges $500/hour for me to fix customers'
				servers and this is exactly what I do (no kidding).
			</p>
		</div>
	</div>
);

export default Answer;
