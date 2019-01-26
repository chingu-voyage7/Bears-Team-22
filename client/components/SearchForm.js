import React from "react";
import PropTypes from "prop-types";
import {Form, Input} from "antd";

import SearchTag from "./SearchTag";

import "antd/dist/antd.css";
import "../static/styles/SearchForm.css";

const InputSearch = Input.Search;

class SearchForm extends React.Component {

	state = {
		isNew: true
	}

	handleChange = e => {
		if(e.target.value.length === 1) {
			this.setState({
				isNew: true
			});
		}
	}

	onSearch = value => {
		this.props.search(value)
		.then(() => 
			this.setState({isNew: false})
		)
		.catch(err => console.error('err', err));
		
	}

	render() {
		const {ranSearch = false, stemmedWords = [], updateTags} = this.props;

		return (
			<div>
				<h1 className="search_input--title">Search</h1>
				<InputSearch
					enterButton
					className="search_input"
					placeholder="Type your query here..."
					onSearch={this.onSearch}
					onChange={this.handleChange}
					/>
				<SearchTag ranSearch={ranSearch} stemmedWords={stemmedWords} updateTags={updateTags} isNew={this.state.isNew}/>
			</div>
		);
	}
}

SearchForm.propTypes = {
	search: PropTypes.func.isRequired,
	ranSearch: PropTypes.bool,
	stemmedWords: PropTypes.arrayOf(PropTypes.string),
	updateTags: PropTypes.func
};
SearchForm.defaultProps = {
	ranSearch: false,
	stemmedWords: [],
	updateTags: () => {}
};

export default Form.create()(SearchForm);
