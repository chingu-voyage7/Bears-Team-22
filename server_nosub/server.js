const mongoose = require("mongoose");
// Setting few options to remove warning on feature deprecations
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

mongoose.connect(
  "mongodb://mongo:27017/test_db",
  err =>
    err
      ? console.log("Error on connecting mongodb", err)
      : console.log("Mongodb connected!")
);

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const app = express();
const userRoutes = require("./components/users/userRoutes");

app.use(express.json());

app.use(userRoutes);

app.listen(port, console.log(`Server listening on port ${port}`));
