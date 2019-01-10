import React from "react";
import MainLayout from "../components/MainLayout";
import Answer from "../components/Answer";
import Question from "../components/Question";
class Thread extends React.Component {
	// Add state just for thread, may change down road
	// State should represent the entire tree of comments in nested json format
	state = {
		questions: [
			{
				id: "1112345",
				createdAt: "2015-05-10",
				updatedAt: "2017-05-15",
				body: "Lorem Ipsum lorem ipsum",
				authorId: "dhouston",
				replyId: "1112555",
				title: "Whats the best way to learn to program?",
				tags: ["javascsript", "programming", "beginner"]
			}
		],
		comments: {
			2921983: {
				by: "norvig",
				id: 2921983,
				parent: 2921506,
				kids: [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141],
				text:
					"Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
				time: 1314211127,
				type: "comment"
			},
			35156123: {
				by: "vincentntang",
				id: 35156123,
				parent: 2921506,
				kids: [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141],
				text: "Look at me ma I'm a comment!",
				time: 131411555,
				// use unix based time
				type: "comment"
			}
		}
	};
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
