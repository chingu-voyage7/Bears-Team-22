const {promisify} = require("util");

const mongoose = require("mongoose");
const express = require("express");
const session = require('express-session');
const mongoSessionStore = require('connect-mongodb-session')(session);

const userRoutes = require("./components/users/user-routes");
const postRoutes = require("./components/posts/post-routes");const lookupRoutes = require("./components/lookups/lookup-routes");
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
const store = new mongoSessionStore({
	uri: "mongodb://mongo:27017/test_db_sessions",
	collection: 'knowledge_sessions'
});

store.on('error', error => {
	console.log('err up', error);		// handle it properly
})
const sessionOptions = {
	secret: 'WannaBeASecret!',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 60*60*1000 },
	store: store
	// secure: true - As per doc, is recommended but it needs a https connection^^
}

const app = express();

app.use(session(sessionOptions));
app.use(express.json());
app.use(userRoutes);
app.use(postRoutes);
app.use(lookupRoutes);
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
