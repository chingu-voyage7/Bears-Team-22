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
			await fetch("http://localhost:5000/content/create", fetchOpts);

			this.setState(() => ({
				status: "posted"
			}));

			await delay(1500);
			await Router.push("/");
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
					<QuestionForm postQuestion={this.postQuestion}/>				:
					<p>{this.status === "posting" ? "Posting the question..." : "Question posted! Redirecting you to the search page..."}</p>
				}
				{status === "posting" ? <Loading/> : null}
			</MainLayout>
		);
	}
}

export default QuestionPage;
