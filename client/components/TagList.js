import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {Tag} from "antd";

import "antd/dist/antd.css";
import "../static/styles/TagList.css";

class TagList extends React.Component {
	render() {
		const {tags} = this.props;

		return (
			<div className="tag_list">
				<span className="tag_list__text">Tags:</span>
				{tags.map(tag => (
					<div key={tag.name}>
						<Link href={`/tag?name=${tag.name}`}>
							<a>
								<Tag>
									{tag.name}
								</Tag>
							</a>
						</Link>
					</div>
				))}
			</div>
		);
	}
}

TagList.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TagList;
