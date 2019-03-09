import React from "react";
import PropTypes from "prop-types";

import MainLayout from "../components/MainLayout";
import QuestionList from "../components/QuestionList";

import {get} from "../http";

import "../static/Tag.css";

class Tag extends React.Component {
	state = {
		questions: []
	}

	static getInitialProps({query}) {
		return {
			tagName: encodeURIComponent((query.name || "").toLowerCase())
		};
	}

	componentDidMount() {
		this.fetchTagData();
	}

	componentDidUpdate() {
		this.fetchTagData();
	}

	async fetchTagData() {
		const {tagName} = this.props;

		try {
			const response = await get(`/tag/browse/${tagName}`, {credentials: "include"});
			if (response.status !== 200) {
				console.error(`Tag ${tagName} not found.`);
			}

			const {questions} = await response.json();

			this.setState(() => ({questions}));
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const {tagName} = this.props;
		const {questions} = this.state;

		return (
			<MainLayout>
				<div className="tag_questions">
					<h1 className="tag_questions__title">
						Questions tagged [{tagName}]
					</h1>
					<div className="tag_questions__content">
						<QuestionList ranSearch questions={questions}/>
					</div>
				</div>
			</MainLayout>
		);
	}
}

Tag.propTypes = {
	tagName: PropTypes.string
};
Tag.defaultProps = {
	tagName: ""
};

export default Tag;
