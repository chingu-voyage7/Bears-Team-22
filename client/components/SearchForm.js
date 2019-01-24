import React from "react";
import PropTypes from "prop-types";
import {Form, Input} from "antd";

import SearchTag from "./SearchTag";

import "antd/dist/antd.css";
import "../static/styles/SearchForm.css";

const InputSearch = Input.Search;

class SearchForm extends React.Component {
	onSearch = value => {
		this.props.search(value);
	}

	render() {
		const {ranSearch, stemmedWords, updateTags} = this.props;

		return (
			<div>
				<h1 className="search_input--title">Search</h1>
				<InputSearch
					enterButton
					className="search_input"
					placeholder="Type your query here..."
					onSearch={this.onSearch}/>
				<SearchTag ranSearch={ranSearch} stemmedWords={stemmedWords} updateTags={updateTags}/>
			</div>
		);
	}
}

SearchForm.propTypes = { // TODO: Set the `defaultProps` as well.
	search: PropTypes.func.isRequired,
	ranSearch: PropTypes.bool,
	stemmedWords: PropTypes.arrayOf(PropTypes.string),
	updateTags: PropTypes.func
};

export default Form.create()(SearchForm);
