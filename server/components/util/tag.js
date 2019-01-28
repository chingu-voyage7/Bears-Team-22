const Tag = require("../tags/tag-model");

exports.resolveTagNames = tagArray => {
	return Promise.all(tagArray.map(async tag => {
		try {
			const tagDoc = await Tag.findOne({name: tag}).exec();

			if (tagDoc) {
				return tagDoc._id;
			}

			return;

			/* (Commented out the creation of the tag since it has
			   to be submitted to approval.)

			   const newTag = await new Tag({name: tag}).save();
			   return newTag._id;
			*/
		} catch (error) {
			return error;
		}
	})).then(tagIds => tagIds.filter(id => Boolean(id)));
};
