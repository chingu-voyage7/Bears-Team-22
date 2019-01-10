import React from "react";
import MainLayout from "../components/MainLayout";
import Answer from "../components/Answer";
import Question from "../components/Question";
import { sampleQuestions, sampleReplies } from "../sample/data-thread";

class Thread extends React.Component {
	// Add state just for thread, may change down road
	// State should represent the entire tree of comments in nested json format
	state = {
		questions: {},
		reply: {}
	};
	onSubmitReply = () => {};
	loadSampleData = () => {
		this.setState({
			questions: sampleQuestions,
			reply: sampleReplies
		});
	};
	render() {
		const Tester = () => <div>Yo hey what's up dude</div>;
		return (
			<MainLayout>
				<button onClick={this.loadSampleData}>Load Sample Data</button>
				<Question submit />
				{[1, 2, 3, 4, 5, 6].map((value, index) => {
					return <Answer key={index}>{value}</Answer>;
				})}
			</MainLayout>
		);
	}
}

export default Thread;
