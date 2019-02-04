import {apiUrl} from "./config";

const requestUrl = path => new URL(path, apiUrl);

export const get = (path, opts = {}) => fetch(requestUrl(path), opts);
export const post = (path, opts = {}) => fetch(requestUrl(path), {
	method: "POST",
	...opts
});
