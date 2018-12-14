import React from "react";
import MainLayout from "../components/MainLayout";
import Question from "../components/Answer";
import Answer from "../components/Question";
class Thread extends React.Component {
	render() {
		// TODO - fix items loading in reverse order from MainLayout
		return (
			<MainLayout>
				<Answer />
				<Question />
			</MainLayout>
		);
	}
}

export default Thread;
