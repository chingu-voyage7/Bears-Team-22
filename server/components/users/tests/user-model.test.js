const {expect} = require("chai");
const User = require("../user-model");

describe(" -- USER MODEL -- ", () => {
	let mockUser;
	beforeEach(() => {
		mockUser = {
			name: "mrMock",
			email: "mock@mock.com",
			passwordHash: "iamamo**cker"
		};
	});

	it("should be rejected if no name is provided", done => {
		delete mockUser.name;
		const newUser = new User(mockUser);
		newUser.validate(err => {
			const arrErrors = Object.keys(err.errors);
			expect(arrErrors).to.have.lengthOf(1);
			expect(arrErrors).to.include("name");
			expect(err.errors.name.message).to.equal("Path `name` is required.");
			done();
		});
	});

	it("should be rejected if no email is provided", done => {
		delete mockUser.email;
		const newUser = new User(mockUser);
		newUser.validate(err => {
			const arrErrors = Object.keys(err.errors);
			expect(arrErrors).to.have.lengthOf(1);
			expect(arrErrors).to.include("email");
			expect(err.errors.email.message).to.equal("Path `email` is required.");
			done();
		});
	});

	it("should be rejected if no password is provided", done => {
		delete mockUser.passwordHash;
		const newUser = new User(mockUser);
		newUser.validate(err => {
			// This error is thrown by bcrypt when try to hash an 'undefined' variable
			expect(err.message).to.equal("Illegal arguments: undefined, number");
			done();
		});
	});

	it("should hash the password", done => {
		const newUser = new User(mockUser);
		newUser.validate(() => {
			expect(newUser.passwordHash).to.not.equal(mockUser.passwordHash);
			done();
		});
	});
});
