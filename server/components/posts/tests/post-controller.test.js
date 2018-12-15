const chai = require("chai");
const chaiHttp = require("chai-http");

const {expect} = chai;
const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);

const app = require("../../../app");

chai.use(chaiHttp);

describe(" -- POST ROUTES -- ", () => {
	afterEach(() => {
		try {
			// Mongoose.connection.db.dropCollection("posts")
		} catch (error) {
			// Silently fail if user collection doesn't exist
		}
	});

	describe("GET /post/get-all", () => {
		it("should hit GET /post/get-all", done => {
			chai.request(app)
				.get("/post/get-all")
				.end((err, res) => {
					// eslint-disable-next-line no-unused-expressions
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					done();
				});
		});

		it("should return all the registered posts", done => {
			chai.request(app)
				.get("/post/get-all")
				.end((err, res) => {
					// eslint-disable-next-line no-unused-expressions
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("array").to.have.lengthOf(0);
					done();
				});
		});
	});

	describe("POST /post/create", () => {
		it("should hit POST /post/create", done => {
			chai.request(app)
				.post("/post/create")
				.end((err, res) => {
					// eslint-disable-next-line no-unused-expressions
					expect(err).to.be.null;
					/*  The route is being hit but it thrown error
					 because of no body provided */
					expect(res).to.have.status(500);
					done();
				});
		});

		it("should create a post", done => {
			chai.request(app)
				.post("/post/create")
				.send({
					title: "myFirstPost",
					body: "Hey, this is my first post! :D",
					isQuestion: false,
					tags: ["testTag", "testTag2"],
					authorId: "5c07a5a54a9d0c0012cd8b35"
				})
				.end((err, res) => {
					// eslint-disable-next-line no-unused-expressions
					expect(err).to.be.null;
					expect(res).to.have.status(201);
					expect(res.body.title).to.equal("myFirstPost");
					expect(res.body.body).to.equal("Hey, this is my first post! :D");
					done();
				});
		});
	});
});
