/* global it */ // TODO: Replace this with a proper `mocha` env comment.

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<App/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
