const Tag = require("../tags/tag-model");

exports.findTag = tagName => {
	return Tag.findOne({
		name: {
			$regex: tagName,
			$options: "i"
		}
	});
};

exports.findTags = query => {
	return Tag.find({
		name: {
			$regex: query,
			$options: "i"
		}
	});
};

exports.resolveTagNames = async tags => {
	const resolvedTags = await Promise.all(tags.map(async tag => {
		try {
			const tagDoc = await exports.findTag(tag);
			return tagDoc ? tagDoc._id : false;
		} catch (_) {
			return false;
		}
	}));

	return resolvedTags.filter(Boolean);
};

exports.filterTags = async words => {
	const tags = await Promise.all(words.map(async word => {
		try {
			const tagDoc = await exports.findTag(word);

			return tagDoc && tagDoc._id ? word : false;
		} catch (_) {
			return false;
		}
	}));

	return tags.filter(Boolean);
};
