const mongoose = require("mongoose");
// Setting a few options to remove warnings on feature deprecations.
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const MONGO_URI = "mongodb://mongo:27017/knowledge_data";
const PORT = 5000;

mongoose.connect(MONGO_URI)
	.then(() => {
		console.log("Successfully connected to database!");
	})
	.catch(error => {
		console.log(`Error connecting to database: ${error}`);
	});

const app = require("./app");

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
