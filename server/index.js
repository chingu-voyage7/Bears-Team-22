const {promisify} = require("util");

const mongoose = require("mongoose");
const express = require("express");

const userRoutes = require("./components/users/user-routes");

// Setting a few options to remove warnings on feature deprecations.
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

promisify(mongoose.connect)("mongodb://mongo:27017/test_db")
	.then(() => {
		console.log("Successfully connected to Mongo!");
	})
	.catch(error => {
		console.log(`Error connecting to Mongo: ${error}`);
	});

const port = 5000;

const app = express();

app.use(express.json());
app.use("/user", userRoutes);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
