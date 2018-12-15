const chai = require("chai");
const chaiHttp = require("chai-http");

const {expect} = chai;
const mongoose = require("mongoose");
const {replaceTagNameWithTagId} = require("../../utils");

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);

const app = require("../../../app");
const Post = require("../../posts/post-model.js");

chai.use(chaiHttp);

describe(" -- LOOKUP ROUTES -- ", () => {
	before(async () => {
		const firstPost = {
			_id: "5c152073f01305001307a3ad",
			title: "myFirstPost",
			body: "Hey, this is my first post! :D",
			isQuestion: true,
			tags: ["testTag", "testTag2"],
			authorId: "5c07a5a54a9d0c0012cd8b35",
			replyId: "5c151ffaf01305001307a3ab"
		};

		const secondPost = {
			_id: "5c151ffaf01305001307a3ab",
			//replyId: "5c1520faf01305001307a3ae",
			body: "Hey, this is my second post! :D",
			tags: ["testTag2", "testTag3"],
			authorId: "5c07a5a54a9d0c0012cd8b35"
		};

		const thirdPost = {
			_id: "5c152045f01305001307a3ac",
			body: "Hey, this is my third post! :D",
			tags: ["testTag3", "testTag4"],
			authorId: "5c07a5a54a9d0c0012cd8b35"
		};

		const firstPostTags = await replaceTagNameWithTagId(firstPost.tags);
		const secondPostTags = await replaceTagNameWithTagId(secondPost.tags);
		const thirdPostTags = await replaceTagNameWithTagId(thirdPost.tags);
		firstPost.tags = firstPostTags;
		secondPost.tags = secondPostTags;
		thirdPost.tags = thirdPostTags;

		new Post(firstPost).save();
		new Post(secondPost).save();
		new Post(thirdPost).save();
	});
	after(() => {
		mongoose.connection.db.dropCollection("posts");

		mongoose.connection.db.dropCollection("tags");
	});

	describe("POST /lookup/questions", () => {
		it("should hit POST /lookup/questions", done => {
			chai.request(app)
				.post("/lookup/questions")
				.end((err, res) => {
					// eslint-disable-next-line no-unused-expressions
					expect(err).to.be.null;
					// Hit route but no body provided
					expect(res).to.have.status(500);
					done();
				});
		});

		it("should retrieve posts based on the tags provided", done => {
			chai.request(app)
				.post("/lookup/questions")
				.send({tags: ["testTag2"]})
				.end((err, res) => {
					// eslint-disable-next-line no-unused-expressions
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					done();
				});
		});
	});

	describe("GET /lookup/thread", () => {
		it("should hit GET /lookup/thread", done => {
			chai.request(app)
				.get("/lookup/thread/5c152073f01305001307a3ad")
				.end((err, res) => {
					// eslint-disable-next-line no-unused-expressions
					expect(err).to.be.null;
					// Hit route but no body provided
					expect(res).to.have.status(200);
					done();
				});
		});

		it("should retrieve posts based on the id of the question", done => {
			chai.request(app)
				.get("/lookup/thread/5c152073f01305001307a3ad")
				.end((err, res) => {
					// eslint-disable-next-line no-unused-expressions
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					done();
				});
		});
	});

});
