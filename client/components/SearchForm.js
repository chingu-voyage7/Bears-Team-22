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
		try {
			await this.props.search(value);
		} catch (error) {
			console.error("error", error);
		}

		if (this.state.isNewQuery) { // TODO: Check if conditionally updating the state even matters (compared to just overriding the current state).
			this.setState({isNewQuery: false});
		}
	}

	render() {
		const {ranSearch = false, extractedTags = [], updateTags} = this.props;

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
					<SearchTag ranSearch={ranSearch} extractedTags={extractedTags} updateTags={updateTags} isNewQuery={this.state.isNewQuery}/>
				</div>
			</div>
		);
	}
}

SearchForm.propTypes = {
	search: PropTypes.func.isRequired,
	ranSearch: PropTypes.bool,
	extractedTags: PropTypes.arrayOf(PropTypes.string),
	updateTags: PropTypes.func
};
SearchForm.defaultProps = {
	ranSearch: false,
	extractedTags: [],
	updateTags: () => {}
};

export default Form.create()(SearchForm);
