import React from "react";

import MainLayout from "../components/MainLayout";
import SearchForm from "../components/SearchForm";
import QuestionList from "../components/QuestionList";

class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			questions: []
		}
	}

	querySearch = querySearch => {
		fetch(`http://localhost:5000/search?q=${encodeURIComponent(querySearch)}`)
		.then(res => res.json())
		.then(result => {
			this.setState({
				questions: result.result
			})
		})
		.catch(err => console.log('err', err));
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
