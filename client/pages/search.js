import React from "react";
import Link from "next/link";

import MainLayout from "../components/MainLayout";
import SearchForm from "../components/SearchForm";
import QuestionList from "../components/QuestionList";
import SearchTag from "../components/SearchTag";

import "../static/styles/Search.css";

class Search extends React.Component {
	state = {
		activeTags: [],
		questions: [],
		stemmedWords: [],
		showPost: false
	};

	querySearch = async query => {
		const hasTags = this.state.activeTags.length > 0;
		let tagParam = "";
		if (hasTags) {
			tagParam = this.state.activeTags.reduce((acc, curr, i) => i === this.state.activeTags.length - 1 ?
				acc += `t=${curr}` :
				acc += `t=${curr}&`, "");
		}

		try {
			const queryString = hasTags ?
				`q=${encodeURIComponent(query)}&${tagParam}` :
				`q=${encodeURIComponent(query)}`;
			const res = await fetch(`http://localhost:5000/search?${queryString}`);
			const json = await res.json();

			console.log("search results:", json);
			this.setState({
				questions: json.result,
				stemmedWords: json.stemmedWords
			});
		} catch (error) {
			console.error(error);
		}
	};

	updateActiveTags = tag => {
		this.setState(prevState => ({
			activeTags: [...prevState.activeTags, tag]
		})
		);
	}

	updatePostQuestion = authState => {
		this.setState(() => ({
			showPost: authState === "logged in"
		}));
	};

	render() { // TODO: Only show the option to post a new question once a user searches something, and hide it when the query text field changes.
		const {showPost, questions, stemmedWords} = this.state;
		return (
			<MainLayout authStateListener={this.updatePostQuestion}>
				<SearchForm search={this.querySearch}/>
				<SearchTag stemmedWords={stemmedWords} updateTags={this.updateActiveTags}/>
				<QuestionList questions={questions}/>  {/* TODO: Set the list to `loading` when searching a query. */}
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
