import React from "react";
import PropTypes from "prop-types";
import {Select} from "antd";

import "isomorphic-unfetch";

import "antd/dist/antd.css";
import "../static/styles/SearchTag.css";

const {Option} = Select;

class SearchTag extends React.Component {
	state = {
		tags: [],
		activeTags: []
	};

	updateTags = async e => {
		try {
			const response = await fetch(`http://localhost:5000/tag/tags/${e ? encodeURIComponent(e.target.value) : ""}`);
			const {tags} = await response.json();

			this.setState({tags});
		} catch (error) {
			console.log(error);
			return [];
		}
	};

	componentDidMount() {
		this.updateTags();
	}

	componentDidUpdate(prevProps) { // TODO: Only update the tags if a new query has been searched for (i.e. the user has removed all contents from the search input and then typed a new query).
		const tagSearchField = document.querySelector(".ant-select-search__field");
		if (tagSearchField) {
			tagSearchField.addEventListener("input", this.updateTags); // TODO: Make sure that we always have at least 5 tags in the autocomplete list.
		}

		const {tags} = this.state;
		const {isNewQuery = true, stemmedWords} = this.props;

		const tagNames = tags.map(tag => tag.name);

		if (stemmedWords && isNewQuery && prevProps.stemmedWords !== stemmedWords) {
			const uniqueTags = stemmedWords.filter(word => tagNames.includes(word));

			// TODO: Find a solution better than updating the state of the component in `componentDidUpdate`.
			this.setState({ // eslint-disable-line react/no-did-update-set-state
				activeTags: [
					...uniqueTags
				]
			});
		}
	}

	toggleElementIntoArray = (element, arr) => {
		const clonedArr = [...arr];
		const elementIndex = arr.indexOf(element);

		if (elementIndex > -1) {
			clonedArr.splice(elementIndex, 1);
		} else {
			clonedArr.push(element);
		}

		return clonedArr;
	};

	handleChange = tag => {
		this.setState(prevState => ({
			activeTags: this.toggleElementIntoArray(tag, prevState.activeTags)
		}), () => {
			this.props.updateTags(this.state.activeTags);
		});
	};

	render() {
		const {ranSearch = false} = this.props;
		const tags = this.state.tags || [];
		const {activeTags} = this.state;

		if (!ranSearch) {
			return <></>;
		}

		return (
			<div className="search_input tag_select">
				<Select // TODO: Only allow users to select tags they haven't selected yet.
					mode="multiple"
					style={{width: "100%"}}
					placeholder="Tags to search for..."
					notFoundContent="No matching tags found"
					value={activeTags}
					onSelect={this.handleChange}
					onDeselect={this.handleChange}
				>
					{tags
						.map(tag => <Option key={tag.name}>{tag.name}</Option>)
						// Exclude all the already selected ones. Can't limit to 5 the result here
						// in case one of those 5 has already been included in activeTags
						// ( it won't be displayed -> unpredictable number of el displayed)
						.filter(el => !activeTags.includes(el.key))
						.filter((_, i) => i < 5)		// Limits to max 5 result
					}
				</Select>
			</div>
		);
	}
}

SearchTag.propTypes = {
	ranSearch: PropTypes.bool,
	isNewQuery: PropTypes.bool,
	stemmedWords: PropTypes.arrayOf(PropTypes.string),
	updateTags: PropTypes.func.isRequired
};
SearchTag.defaultProps = {
	ranSearch: false,
	isNewQuery: true,
	stemmedWords: []
};

export default SearchTag;
