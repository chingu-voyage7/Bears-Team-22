const express = require("express");

const userRoutes = require("./components/users/user-routes");
const postRoutes = require("./components/posts/post-routes");
const lookupRoutes = require("./components/lookups/lookup-routes");

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(postRoutes);
app.use(lookupRoutes);

module.exports = app;
