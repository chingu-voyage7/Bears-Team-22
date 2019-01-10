import React from "react";

import MainLayout from "../components/MainLayout";
import QuestionForm from "../components/QuestionForm";

import "isomorphic-unfetch";

class QuestionPage extends React.Component {
	async postQuestion(questionData) {
		const fetchOpts = {
			method: "POST",
			headers: new Headers({"Content-Type": "application/json"}),
			credentials: "include",
			body: JSON.stringify({type: "question", ...questionData})
		};

		try {
			const res = await fetch("http://localhost:5000/content/create", fetchOpts);
			const json = await res.json();

			console.log("result", json);
		} catch (error) {
			console.log("error", error);
		}
	}

	render() {
		return (
			<MainLayout>
				<QuestionForm postQuestion={this.postQuestion}/>
			</MainLayout>
		);
	}
}

export default QuestionPage;
