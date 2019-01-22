import React from "react";
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
    		const tagResponse = await fetch("http://localhost:5000/tag/get-all");
    		const tags = await tagResponse.json();
    		this.setState(() => ({
    			tags
    		}));
    	} catch (error) {
    		console.log(error);
    	}
    }

    componentDidUpdate(prevProps, prevState) {
    	if (this.props.stemmedWords && prevProps.stemmedWords !== this.props.stemmedWords) {
    		const uniqueWords = this.props.stemmedWords.filter(word => {
    			return !this.state.activeTags.includes(word);
    		});

    		this.setState({
    			activeTags: [
    				...this.state.activeTags,
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

export default SearchTag;
