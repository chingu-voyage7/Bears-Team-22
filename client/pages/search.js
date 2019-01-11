import React from "react";
import Link from "next/link";

import MainLayout from "../components/MainLayout";
import SearchForm from "../components/SearchForm";
import QuestionList from "../components/QuestionList";

import "../static/styles/Search.css";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: []
		};

		this.querySearch = this.querySearch.bind(this);
	}

	async querySearch(query) {
		try {
			const res = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`);
			const json = await res.json();

			console.log("search results:", json);

			this.setState({
				questions: json.result
			});
		} catch (error) {
			console.error(error);
		}
	}

	render() { // TODO: Only show the option to post a new question once a user searches something, and hide it when the query text field changes.
		return (
			<MainLayout>
				<SearchForm search={this.querySearch}/>
				<QuestionList questions={this.state.questions}/>
				<div className="post__question">
					<p>Couldn't find a result that answers your question?</p> {/* eslint-disable-line react/no-unescaped-entities */}
					<Link href="/post-question">
						<a>Post a new question</a>
					</Link>
				</div>
			</MainLayout>
		);
	}
}

export default Search;
