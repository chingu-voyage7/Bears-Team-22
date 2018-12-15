const chai = require("chai");
const chaiHttp = require("chai-http");

const {expect} = chai;
const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://mongo-test:27017/knowledge_test_db").catch(error => console.log("error on connecting local db", error));

const app = require("../../../app");

chai.use(chaiHttp);

describe(" -- USER ROUTES -- ", () => {
	afterEach(() => mongoose.connection.db.dropCollection("users").catch(() => {}));// Silently fail if user collection doesn't exist

	describe("GET /user/get-all", () => {
		it("should hit GET /user/get-all", done => {
			chai.request.agent(app)
				.get("/user/get-all")
				.end((err, res) => {
					// eslint-disable-next-line no-unused-expressions
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					done();
				});
		});

		it("should get all the registered users", done => {
			chai.request.agent(app)
				.get("/user/get-all")
				.end((err, res) => {
					// eslint-disable-next-line no-unused-expressions
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("array").to.have.lengthOf(0);
					done();
				});
		});
	});

	describe("POST /user/register", () => {
		it("should hit POST /user/register", done => {
			chai.request(app)
				.post("/user/register")
				.end((err, res) => {
					// eslint-disable-next-line no-unused-expressions
					expect(err).to.be.null;
					/*  The route is being hit but it thrown error
					 because of no body provided */
					expect(res).to.have.status(500);
					done();
				});
		});

		it("should register a user", done => {
			chai.request(app)
				.post("/user/register")
				.send({
					name: "mrMock",
					email: "mock@mock.com",
					password: "iamamo**cker"
				})
				.end((err, res) => {
					// eslint-disable-next-line no-unused-expressions
					expect(err).to.be.null;
					expect(res).to.have.status(201);
					expect(res.body.name).to.equal("mrMock");
					expect(res.body.email).to.equal("mock@mock.com");
					done();
				});
		});

		it("reject a user if email already exists", async () => {
			await chai.request(app)
				.post("/user/register")
				.send({
					name: "mrMock",
					email: "mock@mock.com",
					password: "iamamo**cker"
				});
			const createPostResponse = await chai.request(app)
				.post("/user/register")
				.send({
					name: "mrMock",
					email: "mock@mock.com",
					password: "iamamo**cker"
				});

			expect(createPostResponse).to.have.status(409);
		});
	});
});
