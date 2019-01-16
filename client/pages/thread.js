import React from "react";
import PropTypes from "prop-types";

import MainLayout from "../components/MainLayout";
import Question from "../components/Question";
import Reply from "../components/Reply";
import Loading from "../components/Loading";

class Thread extends React.Component {
	state = {
		thread: {}
	};

	static async getInitialProps({query}) {
		return {id: query.id};
	}

	async componentDidMount() {
		const {id} = this.props;

		try {
			const response = await fetch(`http://localhost:5000/thread/${id}`, {credentials: "include"});
			if (response.status !== 200) {
				throw new Error("Unauthorized!");
			}

			const {thread} = await response.json();

			this.setState(() => ({thread}));
		} catch (error) {
			console.error(error);
			return {error};
		}
	}

	onSubmitReply() {
		// ...
	}

	render() {
		const {id} = this.props;
		const {question, replies} = this.state.thread;

		console.log(this.state.thread);

		if (!id || this.state.error) { // TODO: Properly inform the user of the error in case it isn't `null`.
			return (
				<MainLayout>
					<Loading mounted noWrapper loading={false} status="Thread with given ID not found."/>
				</MainLayout>
			);
		}
		if (id && Object.keys(this.state.thread).length === 0) {
			return (
				<MainLayout>
					<Loading mounted noWrapper loading={false} status="Loading thread..."/>
				</MainLayout>
			);
		}

		return (
			<MainLayout>
				<Question data={question}/>
				{replies.map(reply => <Reply key={reply._id} data={reply}/>)}
			</MainLayout>
		);
	}
}

Thread.propTypes = {
	id: PropTypes.string.isRequired
};

export default Thread;
