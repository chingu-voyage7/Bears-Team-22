const {expect} = require("chai");
const Post = require("../post-model");
const {replaceTagNameWithTagId} = require("../../utils");

console.log("post-model");
describe(" -- POST MODEL -- ", () => {
	let mockPost;
	beforeEach(() => {
		mockPost = {
			title: "myFirstPost",
			body: "Hey, this is my first post! :D",
			tags: ["testTag", "testTag2"],
			authorId: "5c07a5a54a9d0c0012cd8b35"
		};
	});

	it("should replace the tag names with the tag ids", async () => {
		const mockTagArray = ["test1", "test2"];
		const mockIdArray = await replaceTagNameWithTagId(mockTagArray);
		expect(mockIdArray).to.have.lengthOf(2);
	});

	it("should be rejected if no title is provided in a question", async () => {
		delete mockPost.title;
		mockPost.isQuestion = true;
		const tagIds = await replaceTagNameWithTagId(mockPost.tags);
		mockPost.tags = tagIds;
		const newPost = new Post(mockPost);
		await newPost.validate(err => {
			const arrErrors = Object.keys(err.errors);
			expect(arrErrors).to.have.lengthOf(1);
			expect(arrErrors).to.include("title");
			expect(err.errors.title.message).to.equal("Path `title` is required.");
		});
	});

	it("should be rejected if no body is provided", async () => {
		delete mockPost.body;
		const tagIds = await replaceTagNameWithTagId(mockPost.tags);
		mockPost.tags = tagIds;
		const newPost = new Post(mockPost);
		newPost.validate(err => {
			const arrErrors = Object.keys(err.errors);
			expect(arrErrors).to.have.lengthOf(1);
			expect(arrErrors).to.include("body");
			expect(err.errors.body.message).to.equal("Path `body` is required.");
		});
	});

	it("should be rejected if no authorId is provided", async () => {
		delete mockPost.authorId;
		const tagIds = await replaceTagNameWithTagId(mockPost.tags);
		mockPost.tags = tagIds;
		const newPost = new Post(mockPost);
		newPost.validate(err => {
			const arrErrors = Object.keys(err.errors);
			expect(arrErrors).to.have.lengthOf(1);
			expect(arrErrors).to.include("authorId");
			expect(err.errors.authorId.message).to.equal("Path `authorId` is required.");
		});
	});
});

