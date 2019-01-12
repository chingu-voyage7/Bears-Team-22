import React from "react";
import {Form, Input} from "antd";

import "antd/dist/antd.css";
import "../static/styles/SearchForm.css";

const InputSearch = Input.Search;

class SearchForm extends React.Component {
	onSearch = value => {
		this.props.search(value);
	}

	render() {
		return (
			<div>
				<h1 className="search__input--title">Search</h1>
				<InputSearch
					enterButton
					className="search__input"
					placeholder="Type your query here..."
					onSearch={this.onSearch}/>
			</div>
		);
	}
}

export default Form.create()(SearchForm);
