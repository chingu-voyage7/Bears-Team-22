import React from "react";
import Router from "next/router";
import delay from "delay";

import MainLayout from "../components/MainLayout";
import QuestionForm from "../components/QuestionForm";
import Loading from "../components/Loading";

import {post} from "../http";

class QuestionPage extends React.Component {
	state = {
		status: "drafting"
	};

	postQuestion = async questionData => {
		this.setState(() => ({
			status: "posting"
		}));

		const fetchOpts = {
			headers: new Headers({"Content-Type": "application/json"}),
			credentials: "include",
			body: JSON.stringify({type: "question", ...questionData})
		};

		try {
			const res = await post("/content/create", fetchOpts);

			const json = await res.json();
			const {_id: questionId} = json;

			if (res.status === 201) {
				this.setState(() => ({
					status: "posted"
				}));

				await delay(500);
				await Router.push(`/thread?id=${questionId}`);
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
	};

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
