import React from "react";
import MainLayout from "../components/MainLayout";
import Answer from "../components/Answer";
import Question from "../components/Question";
class Thread extends React.Component {
	render() {
		const Tester = () => <div>Yo hey what's up dude</div>;
		return (
			<MainLayout>
				<Question />
				{[1, 2, 3, 4, 5, 6].map((value, index) => {
					return <Answer key={index}>{value}</Answer>;
				})}
			</MainLayout>
		);
	}
}

export default Thread;
