import React from "react";

import {Button} from "antd";
import MainLayout from "../components/MainLayout";
import Question from "../components/Question";
import Reply from "../components/Reply";
import Loading from "../components/Loading";
import ReplyForm from "../components/ReplyForm";

class Thread extends React.Component {
	state = {
		thread: {},
		replyIsActive: false,
		auth: false
	};

	static getInitialProps({query}) {
		return {id: query.id};
	}

	componentDidMount() {
		this.fetchThread();
	}

	updateAuthState = authState => {
		this.setState(() => ({
			auth: authState === "logged in"
		}));
	};

	async fetchThread() {
		const {id} = this.props;

		try {
			const response = await fetch(`http://localhost:5000/thread/${id}`, {credentials: "include"});
			if (response.status !== 200) {
				throw new Error("Thread not found!");
			}

			const {thread} = await response.json();

			this.setState(() => ({thread}));
		} catch (error) {
			console.error(error);
			return {error};
		}
	}

	onReply = () => {
		this.setState({
			replyIsActive: true
		});
	};

	onSubmitReply = async replyData => {
		if (replyData) { // TODO: Keep the reply active and display some sort of error message in case the given reply is empty / invalid (i.e. too short / has empty fields).
			const questionId = this.state.thread.question._id;
			const fetchOpts = {
				method: "POST",
				headers: new Headers({"Content-Type": "application/json"}),
				credentials: "include",
				body: JSON.stringify({type: "reply", questionId, ...replyData})
			};

			try {
				const res = await fetch("http://localhost:5000/content/create", fetchOpts);

				if (res.status === 201) {
					this.fetchThread();
				} else {
					console.log("failed to post the reply");
				}
			} catch (error) {
				console.log("error", error);
			}
		}

		this.setState({
			replyIsActive: false
		});
	};

	render() {
		const {id} = this.props;
		const {thread, auth} = this.state;
		const {question, replies} = thread;

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
					<Loading mounted noWrapper loading={false} status=""/>
				</MainLayout>
			);
		}

		const replyActions = this.state.replyIsActive ?
			<ReplyForm submit={this.onSubmitReply}/> :
			<Button className="create_reply" onClick={this.onReply}>Reply</Button>;

		return (
			<MainLayout authStateListener={this.updateAuthState}>
				<Question data={question}/>
				{replies.map(reply => <Reply key={reply._id} data={reply}/>)}
				{auth ?
					<div className="reply_actions">
						{replyActions}
					</div> :
					null}
			</MainLayout>
		);
	}
}

export default Thread;
