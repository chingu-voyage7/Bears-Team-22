import React from 'react';

import MainLayout from '../components/MainLayout';
import QuestionForm from '../components/QuestionForm';
import Router from 'next/router';

import 'isomorphic-unfetch';

class QuestionPage extends React.Component {

	postQuestion = questionData => {
		
		const fetchOpts = {
			method: "POST",
			headers: new Headers({"Content-Type": "application/json"}),
			credentials: "include",
			body: JSON.stringify({type: 'question', ...questionData})
		};

		return fetch('http://localhost:5000/content/create-content', fetchOpts)
			.then(res => res.json())
			.then(result => {
				console.log('result', result);
			})
			.catch(err => console.log("err", err));
	}

	render() {
		return (
			<MainLayout>
				<QuestionForm postQuestion={this.postQuestion} />
			</MainLayout>
		);
	}
}

export default QuestionPage;
