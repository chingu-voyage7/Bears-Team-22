import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
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
				renderItem={item => {
					const {_id, authorId, tags, title, body} = item;
					const tagsList = tags.map(tag => tag.name).join(", ");
					const tagsAction = tagsList.length > 0 ? [<span>Tags: {tagsList}</span>] : []; // eslint-disable-line react/jsx-key

					return (
						<Link href={`/thread?id=${_id}`}>
							<a style={{textDecoration: "none"}}>
								<List.Item actions={[<span>Author: {authorId.name}</span>, ...tagsAction]}> {/* eslint-disable-line react/jsx-key */}
									<List.Item.Meta
										title={<b>{title}</b>}
										description={body}
									/>
								</List.Item>
							</a>
						</Link>
					);
				}}
			/>
		);
	}
}

QuestionList.propTypes = {
	search: PropTypes.func,
	questions: PropTypes.array.isRequired
};
QuestionList.defaultProps = {
	search: () => {}
};

export default QuestionList;
