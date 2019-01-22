const Tag = require("./tag-model");

exports.getTags = async (req, res) => {
	try {
		const tags = await Tag.find().select("name");
		res.status(200).json(tags);
	} catch (error) {
		res.status(500).json({error});
	}
};
