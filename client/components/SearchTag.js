import React from "react";
import PropTypes from "prop-types";
import {Select} from "antd";

import {get} from "../http";

import "antd/dist/antd.css";

const {Option} = Select;

class SearchTag extends React.Component {
	state = {
		tags: [],
		activeTags: []
	}

	updateTags = async e => {
		try {
			const response = await get(`/tag/tags/${e ? encodeURIComponent(e.target.value) : ""}`);
			const {tags = []} = await response.json();

			this.setState({tags});
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	componentDidMount() {
		this.updateTags();
	}

	componentDidUpdate(prevProps) { // TODO: Only update the tags if a new query has been searched for (i.e. the user has removed all contents from the search input and then typed a new query).
		if (this.tagSelect instanceof HTMLElement) {
			const tagInputField = this.tagSelect.querySelector(".ant-select-search__field");
			if (tagInputField) {
				tagInputField.addEventListener("input", this.updateTags); // TODO: Make sure that we always have at least 5 tags in the autocomplete list.
			}
		}

		const {isNewQuery = true, extractedTags = []} = this.props;

		if (extractedTags && isNewQuery && prevProps.extractedTags !== extractedTags) { // TODO: Check if the last comparison even works, and if it doens't fix it.
			// TODO: Find a solution better than updating the state of the component in `componentDidUpdate`.
			this.setState({ // eslint-disable-line react/no-did-update-set-state
				activeTags: [...extractedTags]
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
	}

	handleChange = tag => {
		this.setState(prevState => ({
			activeTags: this.toggleElementIntoArray(tag, prevState.activeTags)
		}), () => {
			this.props.updateTags(this.state.activeTags);
		});
	}

	render() {
		const {ranSearch = false} = this.props;
		const tags = this.state.tags || [];
		const {activeTags} = this.state;

		if (!ranSearch) {
			return <></>;
		}

		return (
			// TODO: Figure out how to stop the options popup from jumping around, and make it stay under the tag field.
			<div
				ref={element => {
					this.tagSelect = element;
				}}
			>
				<Select
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
						.filter(option => !activeTags.includes(option.key))
					}
				</Select>
			</div>
		);
	}
}

SearchTag.propTypes = {
	ranSearch: PropTypes.bool,
	isNewQuery: PropTypes.bool,
	extractedTags: PropTypes.arrayOf(PropTypes.string),
	updateTags: PropTypes.func.isRequired
};
SearchTag.defaultProps = {
	ranSearch: false,
	isNewQuery: true,
	extractedTags: []
};

export default SearchTag;
