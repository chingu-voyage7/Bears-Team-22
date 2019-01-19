import React from "react";
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
						<a>
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

export default QuestionList;
