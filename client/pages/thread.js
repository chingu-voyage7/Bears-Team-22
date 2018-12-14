import React from "react";
import MainLayout from "../components/MainLayout";
import Question from "../components/Answer";
import Answer from "../components/Question";
class Thread extends React.Component {
	render() {
		return (
			<MainLayout>
				<Question />
				<Answer />
			</MainLayout>
		);
	}
}

export default Thread;
