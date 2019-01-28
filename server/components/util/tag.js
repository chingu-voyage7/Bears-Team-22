const Tag = require("../tags/tag-model");

exports.resolveTagNames = async tags => {
	const resolvedTags = await Promise.all(tags.map(async tag => {
		try {
			const tagDoc = await Tag.findOne({name: tag}).exec();
			return tagDoc ? tagDoc._id : false;

			/* (Commented out the creation of the tag since it has
			   to be submitted to approval.)

			   const newTag = await new Tag({name: tag}).save();
			   return newTag._id;
			*/
		} catch (_) {
			return false;
		}
	}));

	return resolvedTags.filter(Boolean);
};
