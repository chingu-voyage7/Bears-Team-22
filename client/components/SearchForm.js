import React from "react";
import PropTypes from "prop-types";
import {Form, Input} from "antd";

import SearchTag from "./SearchTag";

import "antd/dist/antd.css";
import "../static/SearchForm.css";

class SearchForm extends React.Component {
	state = {
		isNewQuery: true // TODO: Make sure this always recognizes new queries correctly, even if we remove all query text except for one character.
	}

	componentDidUpdate() {
		const {isNewQuery} = this.state;

		if (this.searchInput instanceof HTMLElement) {
			const inputField = this.searchInput.querySelector(".ant-input");
			if (inputField === document.activeElement && !isNewQuery) {
				inputField.blur();
			}
		}
	}

	handleChange = event => {
		if (event.target.value.length === 1) {
			this.setState({
				isNewQuery: true
			});
		}
	}

	onSearch = async value => {
		if (this.state.isNewQuery) {
			this.setState({isNewQuery: false});
		}

		try {
			await this.props.search(value);
		} catch (error) {
			console.error("error", error);
		}
	}

	render() {
		const {ranSearch = false, stemmedWords = [], updateTags} = this.props;

		return (
			<div
				ref={input => {
					this.searchInput = input;
				}}
				className="search_input"
			>
				<h1 className="search_input--title">Search</h1>
				<Input.Search
					enterButton
					placeholder="Type your query here..."
					onSearch={this.onSearch}
					onChange={this.handleChange}
				/>
				<div className="search_input__tag_select">
					<SearchTag ranSearch={ranSearch} stemmedWords={stemmedWords} updateTags={updateTags} isNewQuery={this.state.isNewQuery}/>
				</div>
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
