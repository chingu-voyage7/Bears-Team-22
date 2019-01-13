import React from "react";
import {List} from "antd";

import "antd/dist/antd.css";

class QuestionList extends React.Component {
	onSearch = value => {
		this.props.search(value);
	}

	render() {
		return (
			<List
				itemLayout="horizontal"
				locale={{emptyText: " "}}
				dataSource={this.props.questions}
				renderItem={item => ( // eslint-disable-next-line react/jsx-key
					<List.Item actions={[<span>Author: {item.authorId.name}</span>]}>
						<List.Item.Meta
							title={<b>{item.title}</b>}
							description={item.body}
						/>
					</List.Item>
				)}
			/>
		);
	}
}

export default QuestionList;
