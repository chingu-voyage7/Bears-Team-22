import React from "react";
import Router from "next/router";
import delay from "delay";

import MainLayout from "../components/MainLayout";
import QuestionForm from "../components/QuestionForm";
import Loading from "../components/Loading";

import "isomorphic-unfetch";

class QuestionPage extends React.Component {
	state = {
		status: "drafting"
	}

	constructor(props) {
		super(props);

		this.postQuestion = this.postQuestion.bind(this);
	}

	async postQuestion(questionData) {
		this.setState(() => ({
			status: "posting"
		}));

		const fetchOpts = {
			method: "POST",
			headers: new Headers({"Content-Type": "application/json"}),
			credentials: "include",
			body: JSON.stringify({type: "question", ...questionData})
		};

		try {
			const res = await fetch("http://localhost:5000/content/create", fetchOpts);
			const {status: statusCode} = res;

			const json = await res.json();
			const {_id: questionId} = json;

			if (statusCode === 201) {
				this.setState(() => ({
					status: "posted"
				}));

				await delay(500);
				await Router.push(`/thread?id=${questionId}`); // TODO: Redirect the user to the question's thread page instead of to the search page.
			} else {
				this.setState(() => ({
					status: "drafting"
				}));
				console.log("failed to post the question");
			}
		} catch (error) {
			console.log("error", error);

			this.setState(() => ({
				status: "drafting"
			}));
		}
	}

	render() {
		const {status} = this.state;

		return (
			<MainLayout>
				{status === "drafting" ?
					<QuestionForm postQuestion={this.postQuestion}/> :
					<Loading mounted noWrapper loading={status === "posting"} status={status === "posting" ? "Posting the question..." : "Question posted! Redirecting you to the thread page..."}/>
				}
			</MainLayout>
		);
	}
}

export default QuestionPage;
