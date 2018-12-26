const { promisify } = require("util");

const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');

const admin = require('firebase-admin');
const session = require('express-session');
const Filestore = require('session-file-store')(session);

const userRoutes = require("./components/users/user-routes");
const authRoutes = require("./components/auth/auth-routes");
const serviceAccount = require('./stuff.json');

const port = 5000;
const app = express();

const firebase = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://react-firebase-85039.firebaseio.com"
  }, 'server');

// Setting a few options to remove warnings on feature deprecations.
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

mongoose.connect("mongodb://mongo:27017/test_db")
	.then(() => {
		console.log("Successfully connected to Mongo!");
	})
	.catch(error => {
		console.log(`Error connecting to Mongo: ${error}`);
	});
const corsMiddleware = cors({origin: 'http://localhost:3000', optionsSuccessStatus: 200, credentials: true});

app.use(corsMiddleware);
app.options('*', corsMiddleware);

app.use(session({
	secret: 'this_is_a_secret',
	saveUninitialized: false,
	resave: false,
	store: new Filestore({ path: '/tmp/sessions', secret: 'super_this_secret_is_a'}),
	cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use((req, res, next) => {
	req.firebaseServer = firebase;
	next();
})

app.use(express.json());
app.use("/user", userRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
