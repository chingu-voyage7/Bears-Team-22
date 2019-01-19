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
				renderItem={item => (
					<Link href={`/thread?id=${item._id}`}>
						<a style={{textDecoration: "none"}}>
							<List.Item actions={[<span>Author: {item.authorId.name}</span>]}> {/* eslint-disable-line react/jsx-key */}
								<List.Item.Meta
									title={<b>{item.title}</b>}
									description={item.body}
								/>
							</List.Item>
						</a>
					</Link>
				)}
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
