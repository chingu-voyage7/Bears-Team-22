const Tag = require("./tags/tag-model");

/* 	This code replace the name of the tag with
	its id ( if exists otherwise it creates one); apparently
	is not possible to save an array of tags ref first assigning
	the name and then substituting directly into the model since even in the pre-hook the array of name is being filtered out. */

exports.replaceTagNameWithTagId = async tagArray => {
	const tagIds = tagArray.map(async tag => {
		try {
			const tagDoc = await Tag.findOne({name: tag}).exec();
			if (tagDoc) {
				return tagDoc._id;
			}

			const newTag = await new Tag({name: tag, children: []})
				.save();
			return newTag._id;
		} catch (error) {
			return error;
		}
	});
	return Promise.all(tagIds);
};
