import React from "react";
import Router from "next/router";
import delay from "delay";

import MainLayout from "../components/MainLayout";
import QuestionForm from "../components/QuestionForm";
import Loading from "../components/Loading";

import "isomorphic-unfetch";

const CenteredText = ({children}) => (
	<div className="big__text">
		<p>{children}</p>
		<style jsx>{`
			.big__text {
				display: grid;
				justify-content: center;
				align-items: center;
				justify-items: center;
				text-align: center;
				height: 100vh;
			}    
		`}
		</style>
	</div>
);

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
			const {status: statusCode} = await fetch("http://localhost:5000/content/create", fetchOpts);

			if (statusCode === 201) {
				this.setState(() => ({
					status: "posted"
				}));

				await delay(1500);
				await Router.push("/");
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
					<Loading mounted={true} loading={status === "posting"} noWrapper={true} status={status === "posting" ? "Posting the question..." : "Question posted! Redirecting you to the search page..."}/>
				}
			</MainLayout>
		);
	}
}

export default QuestionPage;
