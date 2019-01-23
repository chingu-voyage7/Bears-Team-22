import React from "react";
import PropTypes from "prop-types";
import {Select} from "antd";

import "isomorphic-unfetch";

const {Option} = Select;

class SearchTag extends React.Component {
	state = {
		tags: [],
		activeTags: []
	};

	async componentDidMount() {
		try {
			const response = await fetch("http://localhost:5000/tag/browse");
			const {tags} = await response.json();

			this.setState({tags});
		} catch (error) {
			console.log(error);
		}
	}

	componentDidUpdate(prevProps) {
		const {activeTags} = this.state;

		if (this.props.stemmedWords && prevProps.stemmedWords !== this.props.stemmedWords) {
			const uniqueWords = this.props.stemmedWords.filter(word => {
				return !activeTags.includes(word);
			});

			this.setState({ // eslint-disable-line react/no-did-update-set-state
				activeTags: [
					...activeTags,
					...uniqueWords
				]
			});
		}
	}

	handleChange = val => {
		this.setState({
			activeTags: val
		});

		this.props.updateTags(val);
	}

	render() {
		const tags = this.state.tags || [];
		console.log({tags});

		return (
			<Select
				mode="tags"
				style={{width: "100%"}}
				placeholder="Multiple Mode"
				tokenSeparators={[","]}
				value={this.state.activeTags}
				onChange={this.handleChange}
			>
				{tags.map(tag => <Option key={tag.name}>{tag.name}</Option>)}
			</Select>
		);
	}
}

SearchTag.propTypes = {
	stemmedWords: PropTypes.arrayOf(PropTypes.string),
	updateTags: PropTypes.func.isRequired
};
SearchTag.defaultProps = {
	stemmedWords: []
};

export default SearchTag;
