import React from "react";
import MainLayout from "../components/MainLayout";
import Reply from "../components/Reply";
import Question from "../components/Question";
import { sampleQuestions, sampleReplies } from "../sample/data-thread";

class Thread extends React.Component {
	// Add state just for thread, may change down road
	// State should represent the entire tree of comments in nested json format
	state = {
		questions: {},
		replies: {}
	};
	onSubmitReply = () => {};
	loadSampleData = () => {
		this.setState({
			questions: sampleQuestions,
			replies: sampleReplies
		});
	};
	render() {
		const Tester = () => <div>Yo hey what's up dude</div>;
		return (
			<MainLayout>
				<button onClick={this.loadSampleData}>Load Sample Data</button>
				<Question />
			</MainLayout>
		);
	}
}

export default Thread;

// {[1, 2, 3, 4, 5, 6].map((value, index) => {
// 	return <Answer key={index}>{value}</Answer>;
// })}
