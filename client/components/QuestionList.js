import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {List} from "antd";

import TagList from "./TagList";

import "antd/dist/antd.css";
import "../static/QuestionList.css";

class QuestionList extends React.Component {
	render() {
		const {ranSearch = false, questions = []} = this.props;

		return (
			<div className="search__questions_list">
				<List
					itemLayout="horizontal"
					locale={{emptyText: ranSearch ? "No results matching the given query where found." : " "}}
					dataSource={questions}
					renderItem={item => {
						const {_id, authorId, tags, title, body} = item;
						const tagsAction = tags.length > 0 ? [<TagList tags={tags}/>] : []; // eslint-disable-line react/jsx-key

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
			</div>
		);
	}
}

QuestionList.propTypes = {
	ranSearch: PropTypes.bool,
	questions: PropTypes.array.isRequired
};
QuestionList.defaultProps = {
	ranSearch: false
};

export default QuestionList;
