import React from "react";

import MainLayout from "../components/MainLayout";
import SearchForm from "../components/SearchForm";
import QuestionList from "../components/QuestionList";

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

			this.setState({
				questions: json.result
			});
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		return (
			<MainLayout>
				<SearchForm search={this.querySearch}/>
				<QuestionList questions={this.state.questions}/>
			</MainLayout>
		);
	}
}

export default Search;
