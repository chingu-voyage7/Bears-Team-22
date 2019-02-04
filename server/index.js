const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const cookieParser = require("cookie-parser");

const userRoutes = require("./components/users/user-routes");
const authRoutes = require("./components/auth/auth-routes");
const threadRoutes = require("./components/thread/thread-routes");
const searchRoutes = require("./components/search/search-routes");
const contentRoutes = require("./components/content/content-routes");
const tagRoutes = require("./components/tags/tag-routes");
const {credentials, databaseUrl, clientUrl} = require("./config");

const port = 5000;
const app = express();

const firebase = admin.initializeApp({
	credential: admin.credential.cert(credentials),
	databaseURL: "https://react-firebase-85039.firebaseio.com"
}, "server");

// Setting a few options to remove warnings on feature deprecations.
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

mongoose.connect(databaseUrl || "mongodb://mongo:27017/test_db")
	.then(() => {
		console.log("Successfully connected to Mongo!");
	})
	.catch(error => {
		console.log(`Error connecting to Mongo: ${error}`);
	});

const corsMiddleware = cors({origin: clientUrl, optionsSuccessStatus: 200, credentials: true});

app.use(corsMiddleware);
app.options("*", corsMiddleware);

app.use((req, res, next) => {
	req.firebaseServer = firebase;
	next();
});

app.use(cookieParser("this_is_a_secret"));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/content", contentRoutes);
app.use("/tag", tagRoutes);
app.use("/thread", threadRoutes);
app.use(searchRoutes);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
