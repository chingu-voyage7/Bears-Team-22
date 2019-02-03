import React from "react";
import Link from "next/link";

import MainLayout from "../components/MainLayout";
import SearchForm from "../components/SearchForm";
import QuestionList from "../components/QuestionList";

import {get} from "../http";

import "../static/styles/Search.css";

class Search extends React.Component {
	state = {
		activeTags: [],
		questions: [],
		stemmedWords: [],
		ranSearch: false,
		showPost: false
	};

	querySearch = async query => {
		const joinedTags = this.state.activeTags.join(",");
		const encodedQuery = encodeURIComponent(query);
		const queryString = joinedTags ? `q=${encodedQuery}&tags=${joinedTags}` : `q=${encodedQuery}`;

		try {
			const response = await get(`/search?${queryString}`);
			const json = await response.json();

			console.log("search results:", json);

			this.setState({
				questions: json.result,
				stemmedWords: json.stemmedWords
			});
		} catch (error) {
			console.error(error);
		}

		return this.setState({ranSearch: true});
	};

	updateActiveTags = tags => {
		this.setState({
			activeTags: [...tags]
		});
	}

	updatePostQuestion = authState => {
		this.setState(() => ({
			showPost: authState === "logged in"
		}));
	};

	render() { // TODO: Only show the option to post a new question once a user searches something, and hide it when the query text field changes.
		const {questions, stemmedWords, ranSearch, showPost} = this.state;

		return (
			<MainLayout authStateListener={this.updatePostQuestion}>
				<SearchForm search={this.querySearch} ranSearch={ranSearch} stemmedWords={stemmedWords} updateTags={this.updateActiveTags}/>
				<QuestionList questions={questions} ranSearch={ranSearch && questions.length === 0}/>  {/* TODO: Set the list to `loading` when searching a query. */}
				{showPost ?
					<div className="post__question">
						<p>Couldn't find a result that answers your question?</p> {/* eslint-disable-line react/no-unescaped-entities */}
						<Link href="/post-question">
							<a>Post a new question</a>
						</Link>
					</div> :
					null}
			</MainLayout>
		);
	}
}

export default Search;
