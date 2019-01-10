import React from "react";
import MainLayout from "../components/MainLayout";
import Reply from "../components/Reply";
import Question from "../components/Question";
import { sampleQuestions, sampleReplies } from "../sample/data-thread";

class Thread extends React.Component {
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
				{Object.keys(this.state.replies).map(reply => {
					return <Reply key={reply} />;
				})}
			</MainLayout>
		);
	}
}

export default Thread;
